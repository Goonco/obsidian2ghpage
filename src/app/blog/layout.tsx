import { fetchFileTree } from "@/src/util/parse";
import { DirectorySidebar } from "./components";

export default async function BlogPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const fileTree = fetchFileTree();

  return (
    <div className="flex flex-row">
      <DirectorySidebar fileTree={fileTree} />
      {children}
    </div>
  );
}
