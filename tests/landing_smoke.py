"""Browser regression checks; uses the machine's existing Python Playwright.

Start the site, then run: python tests/landing_smoke.py
Override the origin with WRONGTRACE_SITE_URL. No installer is executed.
"""

import os
import re
import unittest
from pathlib import Path
from urllib.parse import urlsplit

from playwright.sync_api import expect, sync_playwright

ORIGIN = os.environ.get("WRONGTRACE_SITE_URL", "http://localhost:3000")
UNIX = "curl -fsSL https://raw.githubusercontent.com/WrongStack/WrongTrace/master/install.sh | sh"
WINDOWS = "irm https://raw.githubusercontent.com/WrongStack/WrongTrace/master/install.ps1 | iex"
ARTIFACTS = Path(".design/qa")


class LandingSmoke(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch()
        ARTIFACTS.mkdir(parents=True, exist_ok=True)

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    def page(self, width=1440, height=900, theme="dark", reduced=False):
        context = self.browser.new_context(
            viewport={"width": width, "height": height},
            color_scheme=theme,
            reduced_motion="reduce" if reduced else "no-preference",
        )
        context.add_init_script("""
          window.copiedCommands = [];
          Object.defineProperty(navigator, 'clipboard', {
            value: {writeText: async value => window.copiedCommands.push(value)}
          });
        """)
        self.addCleanup(context.close)
        page = context.new_page()
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.on("console", lambda message: errors.append(message.text)
                if message.type == "error" and "/_next/hmr" not in message.text else None)
        page.on("response", lambda response: errors.append(
            f"HTTP {response.status}: {response.url}")
            if response.status >= 400 and urlsplit(response.url).netloc == urlsplit(ORIGIN).netloc
            else None)
        response = page.goto(ORIGIN, wait_until="networkidle", timeout=30000)
        self.assertEqual(response.status, 200)
        expect(page.locator("h1")).to_have_count(1)
        return page, errors

    def assert_no_overflow(self, page):
        self.assertTrue(page.evaluate(
            "document.documentElement.scrollWidth <= document.documentElement.clientWidth"
        ))

    def test_responsive_themes_and_primary_action(self):
        for width, height in [(1440, 900), (1024, 650), (768, 900), (390, 844), (320, 640)]:
            for theme in ["light", "dark"]:
                with self.subTest(width=width, height=height, theme=theme):
                    page, errors = self.page(width, height, theme)
                    self.assert_no_overflow(page)
                    action = page.locator(".hero-actions").get_by_role("link", name="Install WrongTrace")
                    self.assertLessEqual(action.bounding_box()["y"] + action.bounding_box()["height"], height)
                    expect(page.locator(".oxog-pool")).to_have_count(0)
                    self.assertTrue(page.evaluate("""() => {
                      const footer = document.querySelector('footer');
                      return footer.previousElementSibling.classList.contains('wrongstack-banner') &&
                        footer.nextElementSibling.classList.contains('oxognet-banner');
                    }"""))
                    if width in (1440, 390):
                        page.screenshot(path=str(ARTIFACTS / f"hero-{width}-{theme}.png"))
                    self.assertEqual(errors, [])
                    page.context.close()

    def test_installer_platform_keyboard_and_clipboard(self):
        page, errors = self.page()
        installers = page.locator(".install-command")
        self.assertEqual(installers.count(), 3)
        for index in range(installers.count()):
            widget = installers.nth(index)
            unix = widget.get_by_role("tab", name="macOS / Linux", exact=True)
            unix.focus()
            expect(widget.get_by_role("tabpanel")).to_contain_text(UNIX)
            widget.get_by_role("button", name="Copy macOS / Linux installer").click()
            self.assertEqual(page.evaluate("window.copiedCommands.at(-1)"), UNIX)
            unix.focus()
            page.keyboard.press("ArrowRight")
            expect(widget.get_by_role("tab", name="Windows", exact=True)).to_be_focused()
            expect(widget.get_by_role("tabpanel")).to_contain_text(WINDOWS)
            widget.get_by_role("button", name="Copy Windows installer").click()
            self.assertEqual(page.evaluate("window.copiedCommands.at(-1)"), WINDOWS)
            self.assertNotIn("shirm", page.evaluate("window.copiedCommands.at(-1)"))
            widget.get_by_role("tab", name="Windows", exact=True).focus()
            page.keyboard.press("Home")
            expect(unix).to_have_attribute("aria-selected", "true")
        self.assertEqual(errors, [])

    def test_file_selection_changes_the_actual_diff_and_step_count(self):
        page, errors = self.page()
        original = page.locator(".diff-lines").inner_text()
        page.get_by_role("button", name=re.compile("DiffInspector.tsx")).click()
        expect(page.locator(".diff-lines")).to_contain_text("export function DiffInspector")
        self.assertNotEqual(page.locator(".diff-lines").inner_text(), original)
        expect(page.locator(".trace-timeline__meta strong")).to_have_text("01 / 11")
        page.get_by_role("button", name="Previous AST step").click()
        expect(page.locator(".trace-timeline__meta strong")).to_have_text("11 / 11")
        page.get_by_role("button", name="Next AST step").click()
        expect(page.locator(".trace-timeline__meta strong")).to_have_text("01 / 11")
        page.get_by_role("button", name="Play", exact=True).click()
        expect(page.get_by_role("button", name="Pause", exact=True)).to_have_attribute("aria-pressed", "true")
        page.get_by_role("button", name="Pause", exact=True).click()
        self.assertEqual(errors, [])

    def test_theme_keyboard_persistence_and_system_preference(self):
        page, errors = self.page(390, 600)
        trigger = page.get_by_role("button", name="Color theme: System")
        trigger.focus()
        page.keyboard.press("Enter")
        expect(page.get_by_role("radio", name="System", exact=True)).to_be_focused()
        page.get_by_role("radio", name="Light", exact=True).check()
        self.assertTrue(page.evaluate("document.documentElement.classList.contains('light')"))
        page.keyboard.press("Escape")
        expect(page.get_by_role("button", name="Color theme: Light")).to_be_focused()
        page.reload(wait_until="networkidle")
        self.assertTrue(page.evaluate("document.documentElement.classList.contains('light')"))
        page.get_by_role("button", name="Color theme: Light").click()
        page.get_by_role("radio", name="System", exact=True).check()
        page.emulate_media(color_scheme="dark")
        page.wait_for_function("!document.documentElement.classList.contains('light')")
        page.emulate_media(color_scheme="light")
        page.wait_for_function("document.documentElement.classList.contains('light')")
        self.assertEqual(errors, [])

    def test_documentation_routes_keep_shared_shell_usable(self):
        for width in (1440, 390):
            page, errors = self.page(width)
            for route in ("/docs", "/docs/quickstart", "/docs/cli", "/docs/mcp", "/docs/config", "/docs/dashboard"):
                with self.subTest(width=width, route=route):
                    response = page.goto(ORIGIN + route, wait_until="networkidle")
                    self.assertEqual(response.status, 200)
                    expect(page.locator("h1")).to_have_count(1)
                    self.assert_no_overflow(page)
            self.assertEqual(errors, [])

    def test_documentation_client_navigation_and_reload(self):
        page, errors = self.page()
        page.goto(ORIGIN + "/docs/quickstart/", wait_until="networkidle")
        initial_heading = page.get_by_role("heading", level=1).inner_text()
        navigation = page.get_by_role("navigation", name="Documentation pages", exact=True)
        next_page = navigation.get_by_role("link", name=re.compile(r"^Next"))
        destination = next_page.get_attribute("href")
        next_page.click()
        expect(page).to_have_url(re.compile(re.escape(destination) + r"/?$"))
        expect(page.get_by_role("heading", level=1)).not_to_have_text(initial_heading)
        page.wait_for_load_state("networkidle")
        response = page.reload(wait_until="networkidle")
        self.assertEqual(response.status, 200)
        navigation.get_by_role("link", name=re.compile(r"^Previous")).click()
        expect(page.get_by_role("heading", level=1)).to_have_text(initial_heading)
        page.wait_for_load_state("networkidle")
        self.assertEqual(errors, [])

    def test_copy_feedback_announces_success_and_denied_clipboard(self):
        page, errors = self.page()
        widget = page.locator(".install-command").first
        button = widget.get_by_role("button", name="Copy macOS / Linux installer")
        button.click()
        expect(widget.get_by_role("status")).to_contain_text("copied to the clipboard")
        page.evaluate("""() => {
          navigator.clipboard.writeText = async () => {
            throw new DOMException('Clipboard denied', 'NotAllowedError');
          };
        }""")
        button.click()
        expect(widget.get_by_role("status")).to_contain_text("clipboard is unavailable")
        self.assertEqual(errors, [])

    def test_dashboard_tabs_reference_a_live_panel(self):
        page, errors = self.page(reduced=True)
        tabs = page.get_by_role("tablist", name="Dashboard views").get_by_role("tab")
        self.assertEqual(tabs.count(), 4)
        for tab in tabs.all():
            expect(tab).to_have_attribute("aria-controls", "dashboard-panel")
            tab.click()
            expect(tab).to_have_attribute("aria-selected", "true")
            expect(page.get_by_role("tabpanel", name=tab.inner_text(), exact=True)).to_be_visible()
        self.assertEqual(errors, [])

    def test_mobile_menu_and_reduced_motion(self):
        page, errors = self.page(390, 650, reduced=True)
        expect(page.get_by_role("navigation", name="Primary mobile")).to_be_hidden()
        page.get_by_role("button", name="Open menu").click()
        expect(page.get_by_role("navigation", name="Primary mobile")).to_be_visible()
        page.get_by_role("navigation", name="Primary mobile").get_by_role("link", name="Dashboard").click()
        expect(page.get_by_role("navigation", name="Primary mobile")).to_be_hidden()
        expect(page.get_by_role("button", name="Manual", exact=True)).to_be_disabled()
        self.assertTrue(page.evaluate("""() => [...document.querySelectorAll('.oxog-mark path')]
          .every(p => parseFloat(getComputedStyle(p).animationDuration) < 0.01)"""))
        self.assert_no_overflow(page)
        self.assertEqual(errors, [])


if __name__ == "__main__":
    unittest.main(verbosity=2)
