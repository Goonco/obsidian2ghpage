import Image from "next/image";
import MD_NOT_FOUND from "@/public/md_not_found.png";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ directory: string }>;
}) {
  const directory = decodeURI((await searchParams).directory);

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
