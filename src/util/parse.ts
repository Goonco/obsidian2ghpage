import fs from "fs";
import path from "path";
import { FileSystemNode } from "@/scripts/file-tree";
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
  const slug = fsNode.name === "" ? [] : pathAcc.concat(fsNode.name);

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
