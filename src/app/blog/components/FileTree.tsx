import { DirectoryNode, FileNode } from "@/scripts/file-tree";

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
