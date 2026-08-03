import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const ignoredDirectories = new Set([".git", "node_modules"]);
const ignoredFileSuffixes = [".tsbuildinfo"];
const thirdPartySourcePrefixes = [
  path.join(
    "solutions",
    "college-football-dashboard-andromeda",
    "seedspec",
    "reference",
    "aicanvas-andromeda-v1"
  ),
  path.join(
    "solutions",
    "college-football-dashboard-andromeda",
    "realization",
    "controlled-ab",
    "app",
    ".seedspec",
    "components",
    "org.seedspec.examples.college-football-dashboard-andromeda",
    "reference",
    "aicanvas-andromeda-v1"
  ),
  path.join(
    "solutions",
    "college-football-dashboard-andromeda",
    "realization",
    "controlled-ab",
    "app",
    "app",
    "components",
    "andromeda"
  )
];
const disallowedTerms = [
  ["blue", "print"].join(""),
  ["apps", "for", "dad"].join("")
];
const violations = [];

async function scanDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;

    const absolutePath = path.join(directory, entry.name);
    const relativePath = path.relative(repositoryRoot, absolutePath);
    const normalizedPath = relativePath.toLowerCase();
    const isPreservedThirdPartySource = thirdPartySourcePrefixes.some(
      (prefix) => relativePath === prefix || relativePath.startsWith(`${prefix}${path.sep}`)
    );

    if (!isPreservedThirdPartySource) {
      for (const term of disallowedTerms) {
        if (normalizedPath.includes(term)) {
          violations.push(`${relativePath}: disallowed term in path`);
        }
      }
    }

    if (entry.isDirectory()) {
      await scanDirectory(absolutePath);
      continue;
    }

    if (!entry.isFile()) continue;

    if (ignoredFileSuffixes.some((suffix) => entry.name.endsWith(suffix))) continue;

    if (isPreservedThirdPartySource) continue;

    const contents = (await readFile(absolutePath)).toString("utf8").toLowerCase();
    for (const term of disallowedTerms) {
      if (contents.includes(term)) {
        violations.push(`${relativePath}: disallowed term in contents`);
      }
    }
  }
}

await scanDirectory(repositoryRoot);

if (violations.length > 0) {
  process.stderr.write(`${violations.sort().join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write("Naming guard passed\n");
}
