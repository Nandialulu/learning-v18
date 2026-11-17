"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

const LABELS: Record<string, string> = {
  mn: "MN",
  en: "EN",
  ko: "KO",
  ja: "JA",
};

export function LanguageSwitcher({ locales }: { locales: string[] }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card px-2 py-1">
      {locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          className={`rounded-full px-2 py-1 text-xs font-medium transition-colors ${
            l === locale
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {LABELS[l] ?? l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
