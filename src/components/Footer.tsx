"use client";

import { useTranslations } from "next-intl";
import CmsNav from "@/components/cms/CmsNav";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const tf = useTranslations("footer");

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-[60px]">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-foreground">
          LEARNING
        </Link>
        <p className="hidden text-sm text-muted-foreground sm:block">{tf("rights")}</p>
        <nav className="hidden items-center gap-6 md:flex">
          <CmsNav kind="footer" className="text-sm text-muted-foreground transition-colors hover:text-foreground" />
        </nav>
      </div>
    </footer>
  );
}
