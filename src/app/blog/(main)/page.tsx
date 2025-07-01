import { fetchFileTree } from "@/src/util/parse";
import { DirectorySidebar, DirectoryContent } from "./_components";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ directory: string }>;
}) {
  const fileTree = fetchFileTree();
  const directory = (await searchParams).directory;

  return (
    <div className="flex flex-row">
      <div className="w-[270px] border-r border-gray-200">
        <DirectorySidebar fileTree={fileTree} />
      </div>
      <div className="flex-1">
        <DirectoryContent wait={directory} />
      </div>
    </div>
  );
}
