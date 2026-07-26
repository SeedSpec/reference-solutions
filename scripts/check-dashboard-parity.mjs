import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "solutions");
const variants = [
  path.join(root, "college-football-dashboard-plain", "seedspec"),
  path.join(root, "college-football-dashboard-andromeda", "seedspec"),
  path.join(root, "college-football-dashboard-linked", "seedspec")
];
const sharedPaths = [
  "definition",
  "acceptance",
  "capabilities",
  "configuration",
  path.join("guidance", "context7")
];

async function filesUnder(directory, prefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const relative = path.join(prefix, entry.name);
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await filesUnder(absolute, relative));
    } else if (entry.isFile()) {
      files.push(relative);
    } else {
      throw new Error(`Unexpected non-file entry in dashboard comparison: ${absolute}`);
    }
  }

  return files;
}

for (const sharedPath of sharedPaths) {
  const roots = variants.map((variant) => path.join(variant, sharedPath));
  const fileSets = await Promise.all(roots.map((directory) => filesUnder(directory)));
  const baselineFiles = fileSets[0];

  for (const files of fileSets.slice(1)) {
    if (JSON.stringify(baselineFiles) !== JSON.stringify(files)) {
      throw new Error(`Dashboard comparison file sets differ under ${sharedPath}`);
    }
  }

  for (const relative of baselineFiles) {
    const contents = await Promise.all(
      roots.map((directory) => readFile(path.join(directory, relative)))
    );
    for (const bytes of contents.slice(1)) {
      if (!contents[0].equals(bytes)) {
        throw new Error(`Dashboard comparison bytes differ: ${path.join(sharedPath, relative)}`);
      }
    }
  }
}

console.log(
  "College-football dashboard shared intent and Context7 guidance are byte-identical across plain, linked, and bundled variants"
);
