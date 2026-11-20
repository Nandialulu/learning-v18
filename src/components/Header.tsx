"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import MobileMenu from "@/components/MobileMenu";

const NAV_ITEMS = ["home", "features", "subjects", "contact"];
const NAV_PATHS: Record<string, string> = {
  home: "/",
  features: "/services",
  subjects: "/portfolio",
  contact: "/contact",
};

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-transparent bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-[60px]">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-foreground">
          LEARNING
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((key) => (
            <Link
              key={key}
              href={NAV_PATHS[key]}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher locales={["mn", "en", "ko", "ja"]} />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
