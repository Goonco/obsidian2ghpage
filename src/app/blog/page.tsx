import { fetchFileTree } from "@/src/util/parse";
import { DirectoryNode, FileNode } from "@/scripts/file-tree";

export default function Home() {
  const fileTree = fetchFileTree();

  if (fileTree.type === "directory")
    return <Directory directoryNode={fileTree} path="blog" />;
  else return <File fileNode={fileTree} path="blog" />;
}

export function Directory({
  directoryNode,
  path,
}: {
  directoryNode: DirectoryNode;
  path: string;
}) {
  return (
    <div>
      <h2 className="text-2xl">{directoryNode.name}</h2>
      {directoryNode.children?.map((child) => {
        if (child.type === "directory") {
          return (
            <Directory
              key={child.name}
              directoryNode={child}
              path={`${path}/${directoryNode.name}`}
            />
          );
        } else {
          return (
            <File
              key={child.path}
              fileNode={child}
              path={`${path}/${directoryNode.name}`}
            />
          );
        }
      })}
    </div>
  );
}

export function File({ fileNode, path }: { fileNode: FileNode; path: string }) {
  return (
    <a href={encodeURI(`${path}/${fileNode.name}`)} className="text-sm">
      {fileNode.name}
    </a>
  );
}
