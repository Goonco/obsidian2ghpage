import { fetchFileTree } from "@/src/util/parse";
import { Directory, File } from "@/src/app/blog/components/FileTree";

export default function Home() {
  const fileTree = fetchFileTree();

  if (fileTree.type === "directory")
    return <Directory directoryNode={fileTree} path="blog" />;
  else return <File fileNode={fileTree} path="blog" />;
}
