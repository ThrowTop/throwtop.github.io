import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const source = resolve("backup.ps1");
const targets = [resolve("dist", "backup"), resolve("backup")];

for (const target of targets) {
  await mkdir(dirname(target), { recursive: true });
  await copyFile(source, target);
}

console.log("Released backup.ps1 as backup and dist/backup");
