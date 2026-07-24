import { execFile } from "node:child_process";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

const execFileAsync = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const release = JSON.parse(await readFile(path.join(root, "release.json"), "utf8"));
const solutionsRoot = path.join(root, "solutions");
const solutionNames = (await readdir(solutionsRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map(({ name }) => name)
  .sort();

const packages = [];
for (const name of solutionNames) {
  const packagePath = path.join(solutionsRoot, name, "seedspec");
  let manifest;
  try {
    manifest = parseYaml(await readFile(path.join(packagePath, "seedspec.yaml"), "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") continue;
    throw error;
  }
  if (manifest.protocol_version !== release.protocol_family) {
    throw new Error(`${name} protocol_version must be ${release.protocol_family}`);
  }
  if (manifest.version !== release.release_version) {
    throw new Error(`${name} first-party package version must be ${release.release_version}`);
  }
  packages.push({ name, packagePath });
}

if (packages.length === 0) throw new Error("No reference SeedSpec packages found");

async function exists(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

const siblingCli = path.resolve(root, "../seedspec/packages/cli/bin/seedspec.js");
const localCli = process.env.SEEDSPEC_CLI_BIN
  ?? (await exists(siblingCli) ? siblingCli : null);
for (const item of packages) {
  if (localCli) {
    await execFileAsync(process.execPath, [path.resolve(localCli), "validate", item.packagePath]);
  } else {
    await execFileAsync("npx", [
      "--yes",
      release.cli,
      "validate",
      item.packagePath
    ]);
  }
  console.log(`Validated ${item.name}`);
}
console.log(
  `${packages.length} reference packages align with SeedSpec ${release.release_version}`
);
