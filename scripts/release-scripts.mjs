import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const source = resolve("backup.ps1");
const target = resolve("dist", "backup");

await mkdir(dirname(target), { recursive: true });
await copyFile(source, target);

console.log("Released backup.ps1 as dist/backup");
