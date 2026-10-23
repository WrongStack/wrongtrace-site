"""Validate the actual Pages artifact after `npm run build`; no web server needed."""

import mimetypes
import os
import re
import struct
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

ROOT = Path(__file__).resolve().parents[1]
EXPORT = Path(os.environ.get("WRONGTRACE_EXPORT_DIR", str(ROOT / "out")))
ORIGIN = os.environ.get("NEXT_PUBLIC_SITE_URL", "https://wrongtrace.oxog.dev").rstrip("/")
ORIGIN_HOST = urlsplit(ORIGIN).netloc


class Document(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.urls = []
        self.og_image = None
        self.canonical = None
        self.feed(text)

    def handle_starttag(self, tag, attributes):
        attributes = dict(attributes)
        if tag in ("a", "link") and attributes.get("href"):
            self.urls.append(attributes["href"])
        if tag in ("script", "img") and attributes.get("src"):
            self.urls.append(attributes["src"])
        if tag == "link" and attributes.get("rel") == "canonical":
            self.canonical = attributes.get("href")
        if tag == "meta" and attributes.get("property") == "og:image":
            self.og_image = attributes.get("content")


def artifact_for(url):
    path = unquote(urlsplit(url).path).lstrip("/")
    candidate = EXPORT / path
    if candidate.is_dir():
        return candidate / "index.html"
    return candidate


class StaticExport(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if not (EXPORT / "index.html").is_file():
            raise AssertionError(f"Missing static homepage: {EXPORT / 'index.html'}")

    def test_custom_domain_and_pages_markers(self):
        self.assertEqual((EXPORT / "CNAME").read_text().strip(), "wrongtrace.oxog.dev")
        self.assertTrue((EXPORT / ".nojekyll").is_file())
        self.assertIn("WrongTrace", (EXPORT / "404.html").read_text(encoding="utf-8"))

    def test_every_documentation_section_has_direct_entry_html(self):
        source = (ROOT / "src/lib/docs.ts").read_text(encoding="utf-8")
        slugs = re.findall(r'^\s+slug: "([^"]+)"', source, re.MULTILINE)
        self.assertGreater(len(slugs), 0)
        for route in ["docs", *(f"docs/{slug}" for slug in slugs)]:
            with self.subTest(route=route):
                text = (EXPORT / route / "index.html").read_text(encoding="utf-8")
                self.assertIn("<h1", text)
                self.assertIn("WrongTrace", text)

    def test_local_navigation_and_html_assets_resolve_without_next_server(self):
        documents = list(EXPORT.rglob("*.html"))
        self.assertGreater(len(documents), 2)
        checked = 0
        for file in documents:
            relative = file.relative_to(EXPORT).as_posix()
            route = relative.removesuffix("index.html")
            document = Document(file.read_text(encoding="utf-8"))
            for value in document.urls:
                url = urljoin(f"{ORIGIN}/{route}", value)
                parsed = urlsplit(url)
                if parsed.scheme != "https" or parsed.netloc != ORIGIN_HOST:
                    continue
                with self.subTest(document=relative, url=value):
                    self.assertNotIn("/_next/image", parsed.path)
                    self.assertTrue(artifact_for(url).is_file(), f"Missing artifact for {url}")
                checked += 1
        self.assertGreater(checked, 30)
        self.assertTrue(any((EXPORT / "_next/static").rglob("*.js")))
        self.assertTrue(any((EXPORT / "_next/static").rglob("*.css")))

    def test_nested_segment_payloads_have_the_browser_requested_flat_names(self):
        for directory in EXPORT.rglob("__next.*"):
            if not directory.is_dir():
                continue
            for source in directory.rglob("*.txt"):
                filename = ".".join((directory.name, *source.relative_to(directory).parts))
                target = directory.parent / filename
                with self.subTest(payload=filename):
                    self.assertTrue(target.is_file(), f"Missing browser prefetch payload: {target}")
                    self.assertEqual(source.read_bytes(), target.read_bytes())
        self.assertTrue((EXPORT / "docs/__next.docs.__PAGE__.txt").is_file())

    def test_each_index_has_its_own_canonical_url(self):
        for file in [EXPORT / "index.html", *(EXPORT / "docs").rglob("index.html")]:
            relative = file.relative_to(EXPORT).as_posix().removesuffix("index.html")
            document = Document(file.read_text(encoding="utf-8"))
            with self.subTest(route=relative):
                self.assertEqual(document.canonical, f"{ORIGIN}/{relative}")

    def test_crawler_metadata_is_exported_with_the_custom_origin(self):
        robots = (EXPORT / "robots.txt").read_text(encoding="utf-8")
        sitemap = (EXPORT / "sitemap.xml").read_text(encoding="utf-8")
        self.assertIn(f"Sitemap: {ORIGIN}/sitemap.xml", robots)
        self.assertIn(f"<loc>{ORIGIN}</loc>", sitemap)

    def test_advertised_open_graph_image_is_a_real_exported_png(self):
        document = Document((EXPORT / "index.html").read_text(encoding="utf-8"))
        self.assertIsNotNone(document.og_image)
        self.assertEqual(urlsplit(document.og_image).netloc, ORIGIN_HOST)
        self.assertEqual(mimetypes.guess_type(urlsplit(document.og_image).path)[0], "image/png")
        data = artifact_for(document.og_image).read_bytes()
        self.assertEqual(data[:8], b"\x89PNG\r\n\x1a\n")
        self.assertEqual(struct.unpack(">II", data[16:24]), (1200, 630))


if __name__ == "__main__":
    unittest.main(verbosity=2)
