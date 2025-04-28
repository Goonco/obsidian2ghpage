import fs from "fs";

export function getAllMDFilePaths() {
  const files = fs.readdirSync(`./blog`, {
    recursive: true,
    encoding: "utf-8",
  });
  const mdFiles = files
    .filter((fn) => fn.endsWith(".mdx"))
    .map((fn) => {
      fn = fn.replace(/\.mdx$/, "");
      return fn.split("/");
    });

  return mdFiles.map((fnArr) => {
    return {
      slug: fnArr,
    };
  });
}
