import { constants } from "node:fs";
import { copyFile, readdir, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

// Next 16.4's exporter receives Windows separators when collecting segments,
// but its browser router requests dot-separated names on every platform.
// Keep the original files and add the missing protocol filenames. On Linux,
// Next already exports flat names, so this step is a no-op.
const root = resolve(process.argv[2] ?? "out");
let copied = 0;

async function flattenSegments(directory, destination, prefix) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = join(directory, entry.name);
    const filename = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) {
      await flattenSegments(source, destination, filename);
    } else if (entry.isFile() && entry.name.endsWith(".txt")) {
      const target = join(destination, filename);
      try {
        await copyFile(source, target, constants.COPYFILE_EXCL);
        copied += 1;
      } catch (error) {
        if (error.code !== "EEXIST") throw error;
        const [original, existing] = await Promise.all([readFile(source), readFile(target)]);
        if (!original.equals(existing)) {
          throw new Error(`Refusing to overwrite different segment payload: ${target}`);
        }
      }
    }
  }
}

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "_next") continue;
    const path = join(directory, entry.name);
    if (entry.name.startsWith("__next.")) {
      await flattenSegments(path, dirname(path), entry.name);
    } else {
      await visit(path);
    }
  }
}

await visit(root);
console.log(`Static export ready: added ${copied} compatible segment payload(s).`);
