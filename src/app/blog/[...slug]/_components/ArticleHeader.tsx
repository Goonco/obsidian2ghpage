export function ArticleHeader() {
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
