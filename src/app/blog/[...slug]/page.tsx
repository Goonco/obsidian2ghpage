import { getAllMDFilePaths } from "@/src/util/parse";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(
    `@/blog/${decodeURI(slug.join("/"))}.md`
  );

  return <Post />;
}

export function generateStaticParams() {
  return getAllMDFilePaths();
}

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = false;
