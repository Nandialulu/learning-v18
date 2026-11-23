"use client";

import CmsNav from "@/components/cms/CmsNav";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-transparent bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-[60px]">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-foreground">
          LEARNING
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <CmsNav kind="header" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" />
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher locales={["mn", "en", "ko", "ja"]} />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
