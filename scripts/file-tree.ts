import fs from "fs";
import ignore from "ignore";
import path from "path";

import { OBSIDIAN_DIR, MDX_IGNORE_FILE } from "../path.ts";

const ign = ignore().add(fs.readFileSync(MDX_IGNORE_FILE, "utf-8").toString());

export type FileNode = {
  type: "file";
  path: string;
  name: string;
};

export type DirectoryNode = {
  type: "directory";
  name: string;
  children: FileSystemNode[] | null;
};

export type FileSystemNode = FileNode | DirectoryNode;

export default function generateFileTree(
  dirName: string,
  absPath: string
): FileSystemNode | null {
  const currentDirectory: FileSystemNode = {
    type: "directory",
    name: dirName,
    children: [],
  };

  fs.readdirSync(absPath, { withFileTypes: true }).forEach((entry) => {
    const currentPath = path.join(absPath, entry.name);

    if (
      entry.isDirectory() &&
      !ign.ignores(path.relative(OBSIDIAN_DIR, currentPath))
    ) {
      const childDir = generateFileTree(entry.name, `${absPath}/${entry.name}`);
      if (childDir) currentDirectory.children!.push(childDir);
    }

    if (
      entry.isFile() &&
      entry.name.endsWith(".md") &&
      !ign.ignores(path.relative(OBSIDIAN_DIR, currentPath))
    )
      currentDirectory.children!.push({
        type: "file",
        path: currentPath,
        name: entry.name.replace(/\.md$/, ""),
      });
  });

  return currentDirectory.children!.length > 0 ? currentDirectory : null;
}
