import fs from "fs";
import path from "path";
import { FileSystemNode } from "@/scripts/file-tree";
import { DEST_DIR } from "@/scripts/dump-mdx";

import remarkParse from "remark-parse";
import { unified } from "unified";
import { toString as mdnodeToString } from "mdast-util-to-string";

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
    fs.readFileSync(path.join(DEST_DIR, "file-tree.json"), "utf-8")
  ) as FileSystemNode;
}

export type Heading = {
  depth: number;
  value: string;
};

export function parseHeader(fileName: string): Heading[] {
  const content = fs.readFileSync(path.join(DEST_DIR, fileName), "utf-8");
  return unified()
    .use(remarkParse)
    .parse(content)
    .children.filter((el) => el.type === "heading")
    .map((el) => {
      return { depth: el.depth, value: mdnodeToString(el) };
    });
}
