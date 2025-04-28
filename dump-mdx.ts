import path from "path";
import fs from "fs";
import ignore from "ignore";

const SRC_DIR = path.resolve("./obsidian");
const DEST_DIR = path.resolve("./blog");
const IGNORE_FILE = path.resolve(SRC_DIR, ".mdxignore");

const ign = ignore().add(fs.readFileSync(IGNORE_FILE, "utf-8").toString());

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function isTargetMd(entry: fs.Dirent, absSrcPath: string): boolean {
  return (
    entry.isFile() &&
    entry.name.endsWith(".md") &&
    !ign.ignores(path.relative(absSrcPath, path.join(absSrcPath, entry.name)))
  );
}

function walk(absSrcPath: string, absDestPath: string) {
  const entries = fs.readdirSync(absSrcPath, { withFileTypes: true });

  const hasPosts = entries.some((entry) => isTargetMd(entry, absSrcPath));
  if (hasPosts) ensureDir(absDestPath);

  for (const entry of entries) {
    const srcPath = path.join(absSrcPath, entry.name);
    const destPath = path.join(
      absDestPath,
      entry.name.replace(/\.md$/, ".mdx")
    );

    debugger;
    if (
      entry.isDirectory() &&
      !ign.ignores(path.relative(absSrcPath, srcPath) + "/")
    )
      walk(srcPath, destPath);
    if (isTargetMd(entry, srcPath)) convertMdToMdx(srcPath, destPath);
  }
}

function convertMdToMdx(srcPath: string, destPath: string) {
  const content = fs.readFileSync(srcPath, "utf-8");
  const converted = modifyContent(content);
  fs.writeFileSync(destPath, converted);
}

function modifyContent(content: string): string {
  return content;
}

function main() {
  debugger;
  walk(SRC_DIR, DEST_DIR);
}

main();
