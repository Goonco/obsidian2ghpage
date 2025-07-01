import Image from "next/image";
import MD_NOT_FOUND from "@/public/md_not_found.png";
import { fetchMDs } from "@/src/util/parse";

export function DirectoryContent({ wait }: { wait: string }) {
  // ToDO Loading?
  if (!wait) return <></>;

  const directory = decodeURI(wait);
  const mds = fetchMDs(directory);

  if (mds.length === 0) return <Empty directory={directory} />;
  return (
    <div className="pl-4 space-y-4">
      {mds.map((file) => (
        <a
          key={crypto.randomUUID()}
          href={`blog/${directory}/${file.frontmatter.title}`.replace(
            "root/",
            ""
          )}
          className="p-4 cursor-pointer"
        >
          <p className="text-xs font-medium text-gray-500">
            {file.frontmatter.modified}
          </p>
          <p className="text-2xl font-bold mb-2">{file.frontmatter.title}</p>
          <p className="text-gray-500 text-sm">
            {file.frontmatter.descritpion}
          </p>
        </a>
      ))}
    </div>
  );
}

function Empty({ directory }: { directory: string }) {
  return (
    <div className="flex-1 flex justify-center items-center h-100 flex-col gap-4">
      <Image src={MD_NOT_FOUND} alt="md not found" width={100} />
      <div className="text-xs text-center font-medium space-y-1">
        <p>Oops, No markdown file found in</p>
        <p className="text-center">
          <span className="text-gray-900 px-1 w-fit rounded-md bg-gray-200">
            {directory}
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
