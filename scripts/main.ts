import fs from "fs";
import ignore from "ignore";
import path from "path";

import { OBSIDIAN_DIR, MDX_IGNORE_FILE, OBSIDIAN2GHPAGE_DIR } from "../path.ts";
import type { DirectoryNode, FileNode, Frontmatter } from "./file-tree.type.ts";
import matter from "gray-matter";

// ------------------------------------------ Entry Point

const ign = ignore().add(fs.readFileSync(MDX_IGNORE_FILE, "utf-8").toString());
walkFileTree();

function walkFileTree() {
  const fileTree = walkDir("", OBSIDIAN_DIR, OBSIDIAN2GHPAGE_DIR);
  createFile(
    path.join(OBSIDIAN2GHPAGE_DIR, "file-tree.json"),
    JSON.stringify(fileTree, null, 2)
  );
}

/**
 * Traverse the obsidian directory and generate the blog directory
 *
 * @param name - current directory name
 * @param srcPath - obsidian directory path
 * @param destPath - blog directory path
 */
function walkDir(
  name: string,
  srcPath: string,
  destPath: string
): DirectoryNode | null {
  if (shouldIgnore(srcPath)) return null;

  const curDirNode = createDirNode(name);

  fs.readdirSync(srcPath, { withFileTypes: true }).forEach((entry) => {
    const nextSrcPath = path.join(srcPath, entry.name);
    const nextDestPath = path.join(destPath, entry.name);

    if (entry.isDirectory()) {
      const childDir = walkDir(entry.name, nextSrcPath, nextDestPath);
      if (childDir) curDirNode.children.push(childDir);
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      const file = walkFile(entry.name, nextSrcPath, nextDestPath);
      if (file) curDirNode.children.push(file);
    }
  });

  if (curDirNode.children.length === 0) return null;
  return curDirNode;
}

function walkFile(
  name: string,
  srcPath: string,
  destPath: string
): FileNode | null {
  if (shouldIgnore(srcPath)) return null;

  const { data: originFrontMatter, content } = matter(
    fs.readFileSync(srcPath, "utf-8")
  );

  const frontmatter: Frontmatter = {
    ...createDefaultFrontmatter(name, srcPath),
    ...originFrontMatter,
  };

  createFile(destPath, matter.stringify(content, frontmatter));

  return createFileNode(name, frontmatter);
}

// ------------------------------------------ Helper Functions

function createDir(path: string) {
  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
}

function createFile(filePath: string, content: string) {
  createDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
}

function createDirNode(name: string): DirectoryNode {
  return {
    type: "directory",
    name,
    children: [],
  };
}

function createFileNode(name: string, frontmatter: Frontmatter): FileNode {
  return {
    type: "file",
    name,
    frontmatter,
  };
}

function createDefaultFrontmatter(name: string, path: string): Frontmatter {
  const DEFAULT_DESCRIPTION = [
    "No description provided — but trust us, it’s worth the read.",
    "This post has no description yet. Dive in to discover more.",
    "An article without a summary — but sometimes the code speaks for itself.",
  ];

  return {
    title: name.replace(/\.md$/, ""),
    descritpion:
      DEFAULT_DESCRIPTION[
        Math.floor(Math.random() * DEFAULT_DESCRIPTION.length)
      ],
    modified: fs.statSync(path).mtime.toLocaleDateString("sv-SE"), // "sv-SE" (스웨덴어)는 YYYY-MM-DD 형식으로 출력되는 유명한 트릭입니다. - ChatGPT
  };
}

function shouldIgnore(filePath: string) {
  const relPath = path.relative(OBSIDIAN_DIR, filePath);
  return relPath !== "" && ign.ignores(relPath);
}
