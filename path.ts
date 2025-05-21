import path from "path";

import dotenv from "dotenv";
dotenv.config();

export const OBSIDIAN_DIR = path.resolve(process.env.NEXT_PUBLIC_OBSIDIAN_DIR!);
export const OBSIDIAN2GHPAGE_DIR = path.resolve(
  process.env.NEXT_PUBLIC_OBSIDAN2GHPAGE!
);
export const MDX_IGNORE_FILE = path.resolve(OBSIDIAN_DIR, ".mdxignore");
