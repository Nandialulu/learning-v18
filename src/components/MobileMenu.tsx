"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = ["home", "features", "subjects", "contact"];
const NAV_PATHS: Record<string, string> = {
  home: "/",
  features: "/services",
  subjects: "/portfolio",
  contact: "/contact",
};

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 text-foreground hover:bg-muted"
        aria-label="Toggle menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-20 z-40 border-b border-border bg-background px-6 py-4 shadow-lg">
          <nav className="flex flex-col gap-4">
            {NAV_ITEMS.map((key) => (
              <Link
                key={key}
                href={NAV_PATHS[key]}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(key)}
              </Link>
              ))}
            </nav>
          </div>
      )}
    </div>
  );
}
