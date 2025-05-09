import { LucideSearch, LucideSun } from "lucide-react";
import Image from "next/image";

import Logo from "@/public/logo.svg";

export function Header() {
  return (
    <header className="py-10 flex flex-row justify-between">
      <h1 className="flex flex-row gap-2 items-center">
        <div className="relative w-12 h-12">
          <Image src={Logo} alt="blog logo" fill />
        </div>
        <div className="text-2xl font-semibold">Obsidian2GHPage</div>
      </h1>
      <nav className="flex flex-row gap-6 items-center">
        <NavButton>Blog</NavButton>
        <NavButton>Projects</NavButton>
        <NavButton>About</NavButton>
        <NavButton>
          <LucideSearch />
        </NavButton>
        <NavButton>
          <LucideSun />
        </NavButton>
      </nav>
    </header>
  );
}

function NavButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="font-medium hover:text-[#6C31E3] cursor-pointer">
      {children}
    </button>
  );
}
