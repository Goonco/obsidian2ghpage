import fs from "fs";
import path from "path";
import generateFileTree from "./file-tree.ts";
import type { FileSystemNode } from "./file-tree.ts";

import { OBSIDIAN_DIR, OBSIDIAN2GHPAGE_DIR } from "../path.ts";

import dotenv from "dotenv";
dotenv.config();

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function walk(fsNode: FileSystemNode, pathAcc: string) {
  if (fsNode.type === "file") {
    const { name, path: filePath } = fsNode;
    const newContent = modifyContent(fs.readFileSync(filePath, "utf-8"));
    fs.writeFileSync(path.join(pathAcc, `${name}.md`), newContent);
  }

  if (fsNode.type === "directory") {
    const { name, children } = fsNode;
    const walkingDir = path.join(pathAcc, name);
    ensureDir(walkingDir);
    children?.forEach((node) => walk(node, walkingDir));
  }
}

function modifyContent(content: string): string {
  return content;
}

function main() {
  const fileTree = generateFileTree(
    process.env.NEXT_PUBLIC_ROOT_DIR_NAME!,
    OBSIDIAN_DIR
  );
  if (fileTree) {
    walk(fileTree, OBSIDIAN2GHPAGE_DIR);
    fs.writeFileSync(
      path.join(OBSIDIAN2GHPAGE_DIR, "file-tree.json"),
      JSON.stringify(fileTree, null, 2)
    );
  }
}

main();
