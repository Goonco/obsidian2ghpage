import { parseHeader } from "@/src/util/parse";

import { ArticleHeader, OverviewBox, OverviewBoxBaseline } from "./_components";

export default async function PostLayout({
  params,
  children,
}: {
  params: Promise<{ slug: string[] }>;
  children: React.ReactNode;
}) {
  const { slug } = await params;
  const headerList = parseHeader(`${decodeURI(slug.join("/"))}.md`);

  return (
    <div className="my-4 space-y-10 ">
      <ArticleHeader />
      <OverviewBoxBaseline>
        <hr className="text-gray-200" />
        <article id="postBox" className="prose">
          {children}
        </article>
        <aside className="absolute top-0 h-full left-full">
          <OverviewBox headerList={headerList} />
        </aside>
      </OverviewBoxBaseline>
    </div>
  );
}
