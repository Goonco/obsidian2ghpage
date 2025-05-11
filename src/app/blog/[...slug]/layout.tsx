import { Heading, parseHeader } from "@/src/util/parse";

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
        <article className="prose">{children}</article>
        <aside className="absolute top-0 h-full left-full">
          <OverviewBox headerList={headerList} />
        </aside>
      </OverviewBoxBaseline>
    </div>
  );
}

function OverviewBoxBaseline({ children }: { children: React.ReactNode }) {
  return <div className="relative space-y-10">{children}</div>;
}

function ArticleHeader() {
  return (
    <section className="space-y-4">
      <div className="flex flex-row items-baseline gap-4">
        <h2 className="text-5xl font-extrabold">Markdown Cheatsheet</h2>
        <p className="text-sm font-medium">
          <span className="font-thin text-xs">written by&nbsp;</span> Goonco
        </p>
      </div>
      <p className="text-gray-600 font-thin text-sm">
        Saturday, August 5, 2023
      </p>
    </section>
  );
}

function OverviewBox({ headerList }: { headerList: Heading[] }) {
  return (
    <div className="sticky space-y-1 ml-12 pl-4 pt-1 top-40 border-l border-gray-200">
      <p className="text-sm font-bold">Overveiw</p>
      <div className="whitespace-nowrap text-xs">
        {headerList.map((header) => (
          <p className={`ml-${3 * header.depth}`}>{header.value}</p>
        ))}
      </div>
    </div>
  );
}
