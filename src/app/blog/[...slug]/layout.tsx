export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-4 space-y-10 ">
      <ArticleHeader />
      <OverviewBoxBaseline>
        <hr className="text-gray-200" />
        <article className="prose">{children}</article>
        <aside className="absolute top-0 h-full left-full">
          <OverviewBox />
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

function OverviewBox() {
  return (
    <div className="sticky space-y-1 ml-12 pl-4 pt-1 top-40 border-l border-gray-200">
      <p className="text-sm font-bold">Overveiw</p>
      <div className="whitespace-nowrap text-xs">
        <p className="text-violet-700">Heading 1</p>
        <p className="ml-3">Heading 1</p>
        <p className="ml-6">Heading 2</p>
        <p className="ml-9">Heading 3</p>
        <p className="ml-12">Heading 4</p>
        <p className="ml-15">Heading 5</p>
        <p className="ml-18">Heading 6</p>
      </div>
    </div>
  );
}
