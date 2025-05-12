"use client";

import useHeaderObserver from "@/src/hook/useHeaderObserver";
import { Heading } from "@/src/util/parse";
import clsx from "clsx";

const marginVariants: Record<string, string> = {
  "1": "ml-[8px]",
  "2": "ml-[16px]",
  "3": "ml-[24px]",
  "4": "ml-[32px]",
  "5": "ml-[40px]",
  "6": "ml-[48px]",
};

export function OverviewBox({ headerList }: { headerList: Heading[] }) {
  const activeIdSet = useHeaderObserver("h1, h2, h3, h4, h5, h6");

  return (
    <div className="sticky space-y-1 ml-12 pl-4 pt-1 top-40 border-l border-gray-200">
      <p className="text-sm font-bold">Overveiw</p>
      <div className="whitespace-nowrap text-xs">
        {headerList.map((header: Heading) => (
          <p
            key={header.id}
            className={clsx(
              `${marginVariants[header.depth]} transition`,
              activeIdSet.has(header.id) && "text-violet-400"
            )}
          >
            <a href={`#${header.id}`}>{header.value}</a>
          </p>
        ))}
      </div>
    </div>
  );
}

export function OverviewBoxBaseline({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="relative space-y-10">{children}</div>;
}
