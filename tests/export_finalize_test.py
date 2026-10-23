"""Fixture coverage for platform-independent static segment finalization."""

import subprocess
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts/finalize-static-export.mjs"


class FinalizeExport(unittest.TestCase):
    def setUp(self):
        parent = ROOT / ".temp_files"
        parent.mkdir(exist_ok=True)
        temporary = tempfile.TemporaryDirectory(prefix="export-fixture-", dir=parent)
        self.addCleanup(temporary.cleanup)
        self.output = Path(temporary.name)
        self.source = self.output / "docs/quickstart/__next.docs/$d$slug/__PAGE__.txt"
        self.source.parent.mkdir(parents=True)
        self.source.write_bytes(b"sample RSC payload\n")
        self.target = self.output / "docs/quickstart/__next.docs.$d$slug.__PAGE__.txt"

    def run_finalizer(self):
        return subprocess.run(
            ["node", str(SCRIPT), str(self.output)],
            capture_output=True, text=True, timeout=15, cwd=ROOT,
        )

    def test_windows_shaped_nested_payload_becomes_the_browser_url(self):
        result = self.run_finalizer()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(self.target.read_bytes(), self.source.read_bytes())
        self.assertTrue(self.source.is_file())

    def test_finalizing_twice_preserves_payloads(self):
        self.assertEqual(self.run_finalizer().returncode, 0)
        result = self.run_finalizer()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("added 0", result.stdout)
        self.assertEqual(self.target.read_bytes(), self.source.read_bytes())

    def test_conflicting_existing_output_is_not_overwritten(self):
        self.target.write_bytes(b"different existing payload")
        result = self.run_finalizer()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Refusing to overwrite", result.stderr)
        self.assertEqual(self.target.read_bytes(), b"different existing payload")

    def test_native_flat_export_is_unchanged(self):
        self.source.unlink()
        self.target.write_bytes(b"native flat export")
        result = self.run_finalizer()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("added 0", result.stdout)
        self.assertEqual(self.target.read_bytes(), b"native flat export")


if __name__ == "__main__":
    unittest.main(verbosity=2)
