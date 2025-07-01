"use client";

import { createContext } from "react";
import useDirectorySelection from "@/src/hook/useDirectorySelection";
import { DirectoryNode, FileSystemNode } from "@/scripts/file-tree.type";
import { LucideChevronDown, LucideHome } from "lucide-react";
import { useState, useContext } from "react";
import clsx from "clsx";

export function DirectorySidebar({ fileTree }: { fileTree: FileSystemNode }) {
  const { selectedDir, selectDir } = useDirectorySelection();

  return (
    <DirectoryContext.Provider value={{ selectedDir, selectDir }}>
      <div className="w-full pr-2">
        {fileTree.type === "directory" ? (
          <Directory directoryNode={fileTree} level={0} prevPath="root" />
        ) : (
          <h1>Error : No File Tree</h1> // ToDo : Error
        )}
      </div>
    </DirectoryContext.Provider>
  );
}

// ToDo : change it to function
const marginVariants: Record<string, string> = {
  "0": "ml-[0px]",
  "1": "ml-[10px]",
  "2": "ml-[20px]",
  "3": "ml-[30px]",
  "4": "ml-[40px]",
  "5": "ml-[50px]",
  "6": "ml-[60px]",
};

function Directory({
  directoryNode,
  level,
  prevPath,
}: {
  directoryNode: DirectoryNode;
  level: number;
  prevPath: string;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const currentPath = `${prevPath}${directoryNode.name}`;
  const hasSubDirectory =
    directoryNode.children?.some((node) => node.type === "directory") ?? false;

  const { selectedDir, selectDir } = useContext(DirectoryContext);

  return (
    <div
      className={`font-(family-name:--font-inter) ${marginVariants[level]} space-y-1`}
    >
      <div className="gap-1 flex flex-row items-center justify-between">
        <p
          onClick={() => selectDir(currentPath)}
          className={clsx(
            "text-sm hover:bg-slate-100 p-1 rounded-md cursor-pointer flex-1",
            selectedDir === currentPath && "text-violet-700 bg-slate-100"
          )}
        >
          {level === 0 ? <LucideHome size={18} /> : directoryNode.name}
        </p>

        {hasSubDirectory ? (
          <div
            onClick={() => setOpen((p) => !p)}
            className="cursor-pointer hover:bg-slate-100 p-1 rounded-md"
          >
            <LucideChevronDown
              size={16}
              className={clsx(
                "transition-transform duration-300 text-black",
                open && "-scale-y-100"
              )}
            />
          </div>
        ) : (
          <div className="p-1 ">
            <LucideChevronDown size={16} className="invisible" />
          </div>
        )}
      </div>

      {open && (
        <div className="space-y-1">
          {directoryNode.children
            ?.filter((n) => n.type === "directory")
            .map((child) => (
              <Directory
                key={child.name}
                directoryNode={child}
                level={level + 1}
                prevPath={currentPath + "/"}
              />
            ))}
        </div>
      )}
    </div>
  );
}

const DIRECTORY_CONTEXT_INIT = {
  selectedDir: process.env.NEXT_PUBLIC_ROOT_DIR_NAME!,
  selectDir: (_: string) => {},
};
export const DirectoryContext = createContext<DirectoryContextType>(
  DIRECTORY_CONTEXT_INIT
);
export type DirectoryContextType = typeof DIRECTORY_CONTEXT_INIT;
