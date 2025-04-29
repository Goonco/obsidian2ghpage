import { fetchFileTree } from "@/src/util/parse";
import { DirectoryNode, FileNode } from "@/scripts/file-tree";

export default function Home() {
  const fileTree = fetchFileTree();

  if (fileTree.type === "directory")
    return <Directory directoryNode={fileTree} />;
  else return <File fileNode={fileTree} />;
}

export function Directory({ directoryNode }: { directoryNode: DirectoryNode }) {
  return (
    <div>
      <h2 className="text-2xl">{directoryNode.name}</h2>
      {directoryNode.children?.map((child) => {
        if (child.type === "directory") {
          return <Directory key={child.name} directoryNode={child} />;
        } else {
          return <File key={child.path} fileNode={child} />;
        }
      })}
    </div>
  );
}

export function File({ fileNode }: { fileNode: FileNode }) {
  return <div className="text-sm">{fileNode.name}</div>;
}
