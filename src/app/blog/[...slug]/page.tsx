import { getAllMDFilePaths } from "@/src/util/parse";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`@/blog/${slug.join("/")}.mdx`);

  return <Post />;
}

export function generateStaticParams() {
  // console.log(getAllMDFilePaths());
  return getAllMDFilePaths();
}

export const dynamicParams = false;
