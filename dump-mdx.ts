import path from "path";
import fs from "fs";

const SRC_DIR = path.resolve("./obsidian");
const DEST_DIR = path.resolve("./blog");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function convertMdToMdx(content: string): string {
  // ToDo
  return content;
}

function walk(currentSrcDir: string, currentOutDir: string) {
  const entries = fs.readdirSync(currentSrcDir, { withFileTypes: true });
  const hasPosts = entries.some(
    (entry) => entry.isFile() && entry.name.endsWith(".md")
  );
  if (hasPosts) ensureDir(currentOutDir);

  for (const entry of entries) {
    const srcPath = path.join(currentSrcDir, entry.name);
    const destPath = path.join(
      currentOutDir,
      entry.name.replace(/\.md$/, ".mdx")
    );

    if (entry.isDirectory()) walk(srcPath, destPath);

    if (entry.isFile() && entry.name.endsWith(".md")) {
      const content = fs.readFileSync(srcPath, "utf-8");
      const converted = convertMdToMdx(content);
      fs.writeFileSync(destPath, converted);
    }
  }
}

function main() {
  walk(SRC_DIR, DEST_DIR);
}

main();
