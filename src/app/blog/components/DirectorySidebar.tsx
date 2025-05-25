"use client";

import { FileSystemNode } from "@/scripts/file-tree";
import { createContext } from "react";
import useDirectorySelection from "@/src/hook/useDirectorySelection";
import { DirectoryNode } from "@/scripts/file-tree";
import { LucideChevronDown } from "lucide-react";
import { useState, useContext } from "react";
import clsx from "clsx";

export function DirectorySidebar({ fileTree }: { fileTree: FileSystemNode }) {
  const { selectedDir, selectDir } = useDirectorySelection();

  return (
    <DirectoryContext.Provider value={{ selectedDir, selectDir }}>
      <div className="w-[250px] border-r border-gray-200 pr-2">
        {fileTree.type === "directory" ? (
          <Directory directoryNode={fileTree} level={0} prevPath="" />
        ) : (
          <h1>Error : No File Tree</h1>
        )}
      </div>
    </DirectoryContext.Provider>
  );
}

const marginVariants: Record<string, string> = {
  "0": "ml-[0px]",
  "1": "ml-[10px]",
  "2": "ml-[20px]",
  "3": "ml-[30px]",
  "4": "ml-[40px]",
  "5": "ml-[50px]",
  "6": "ml-[60px]",
};

export function Directory({
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
    <div className={`font-(family-name:--font-inter) ${marginVariants[level]}`}>
      <div className="gap-1 flex flex-row items-center justify-between">
        <p
          onClick={() => selectDir(currentPath)}
          className={clsx(
            "text-sm hover:bg-gray-100 p-1 rounded-md cursor-pointer flex-1",
            selectedDir === currentPath && "text-violet-700 bg-gray-100"
          )}
        >
          {directoryNode.name}
        </p>

        {hasSubDirectory ? (
          <div
            onClick={() => setOpen((p) => !p)}
            className="cursor-pointer hover:bg-gray-100 p-1 rounded-md"
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
          <LucideChevronDown size={16} className="invisible" />
        )}
      </div>

      {open &&
        directoryNode.children?.map((child) => {
          if (child.type === "directory") {
            return (
              <Directory
                key={child.name}
                directoryNode={child}
                level={level + 1}
                prevPath={currentPath + "/"}
              />
            );
          }
        })}
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
