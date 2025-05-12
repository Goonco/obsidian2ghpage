import { LucideSearch, LucideSun } from "lucide-react";
import Image from "next/image";

import Logo from "@/public/logo.svg";

export function Header() {
  return (
    <header className="py-10 flex flex-row justify-between">
      <a href="/" className="flex flex-row gap-2 items-center">
        <div className="relative w-12 h-12">
          <Image src={Logo} alt="blog logo" fill />
        </div>
        <div className="text-2xl font-semibold">Obsidian2GHPage</div>
      </a>
      <nav className="flex flex-row gap-6 items-center">
        <NavButton>
          <a href="/blog">Blog</a>
        </NavButton>
        <NavButton tooltip>Projects</NavButton>
        <NavButton tooltip>About</NavButton>
        <NavButton tooltip>
          <LucideSearch />
        </NavButton>
        <NavButton tooltip>
          <LucideSun />
        </NavButton>
      </nav>
    </header>
  );
}

function NavButton({
  tooltip = false,
  children,
}: {
  tooltip?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`${
        tooltip && "tooltip"
      } font-medium hover:text-[#6C31E3] cursor-pointer`}
    >
      {children}
    </button>
  );
}
