import fs from "fs";
import path from "path";
import generateFileTree, { SRC_DIR } from "./file-tree.ts";
import type { FileSystemNode } from "./file-tree.ts";

export const DEST_DIR = path.resolve("./blog");

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
  const fileTree = generateFileTree("", SRC_DIR);
  if (fileTree) {
    walk(fileTree, DEST_DIR);
    fs.writeFileSync(
      path.join(DEST_DIR, "file-tree.json"),
      JSON.stringify(fileTree, null, 2)
    );
  }
}

main();

// Helper function to log the file tree
function recursiveLog(value: any, depth = 0) {
  const indent = "  ".repeat(depth);

  if (typeof value === "object" && value !== null) {
    console.log(`${indent}{`);
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        if (typeof value[key] === "object" && value[key] !== null)
          recursiveLog(value[key], depth + 1);
        else console.log(`${indent}  ${key}: ${value[key]}`);
      }
    }
    console.log(`${indent}}`);
  }
}
