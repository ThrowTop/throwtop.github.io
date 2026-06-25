import { copyFile, cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const source = resolve("backup.ps1");
const targets = [resolve("dist", "backup"), resolve("backup")];

for (const target of targets) {
  await mkdir(dirname(target), { recursive: true });
  await copyFile(source, target);
}

await rm(resolve("assets"), { recursive: true, force: true });
await cp(resolve("dist", "assets"), resolve("assets"), { recursive: true });
await copyFile(resolve("dist", "index.html"), resolve("index.html"));

console.log("Released backup.ps1, root index.html, and root assets");
