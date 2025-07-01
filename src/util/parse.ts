import fs from "fs";
import path from "path";
import {
  DirectoryNode,
  FileNode,
  FileSystemNode,
} from "@/scripts/file-tree.type";
import { OBSIDIAN2GHPAGE_DIR } from "@/path";

import remarkParse from "remark-parse";
import { unified } from "unified";
import { toString as mdnodeToString } from "mdast-util-to-string";
import GithubSlugger from "github-slugger";

export function parseFileTree() {
  const fileTree = fetchFileTree();
  return walk(fileTree, []).map((fnArr) => {
    return {
      slug: fnArr,
    };
  });
}

function walk(fsNode: FileSystemNode, pathAcc: string[]): string[][] {
  const slug =
    fsNode.name === ""
      ? []
      : pathAcc.concat(
          fsNode.type === "file" ? fsNode.frontmatter.title : fsNode.name
        );

  if (fsNode.type === "file") return [slug];
  if (fsNode.type === "directory" && fsNode.children) {
    return fsNode.children.reduce((acc: string[][], node) => {
      const childSlug = walk(node, slug);
      if (childSlug.length > 0) acc.push(...childSlug);
      return acc;
    }, []);
  }

  return [];
}

function follow(node: DirectoryNode, segments: string[]): FileNode[] {
  if (segments.length === 0)
    return node.children.filter((n) => n.type === "file");

  const next = node.children
    .filter((n) => n.type === "directory")
    .find((n) => n.name === segments[0]);

  if (!next) throw new Error();
  segments.shift();
  return follow(next, segments);
}

export function fetchMDs(path: string): FileNode[] {
  const segments = path.replace("root", "").split("/");

  // ToDo..
  return follow(
    {
      type: "directory",
      name: "adhoc",
      children: [fetchFileTree()],
    },
    segments
  );
}

export function fetchFileTree() {
  return JSON.parse(
    fs.readFileSync(path.join(OBSIDIAN2GHPAGE_DIR, "file-tree.json"), "utf-8")
  ) as FileSystemNode;
}

export type Heading = {
  depth: number;
  value: string;
  id: string;
};

export function parseHeader(fileName: string): Heading[] {
  const content = fs.readFileSync(
    path.join(OBSIDIAN2GHPAGE_DIR, fileName),
    "utf-8"
  );
  const slugger = new GithubSlugger();

  return unified()
    .use(remarkParse)
    .parse(content)
    .children.flatMap((node) => {
      if (node.type !== "heading") return [];
      const text = mdnodeToString(node);
      return [
        {
          depth: node.depth,
          value: text,
          id: slugger.slug(text),
        },
      ];
    });
}
