"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";

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
  const ta = useTranslations("auth");
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const next = `?next=${encodeURIComponent(pathname)}`;

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
            <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-border text-sm font-semibold text-foreground"
                >
                  {ta("logout")}
                </button>
              ) : (
                <>
                  <Link
                    href={`/login${next}`}
                    onClick={() => setOpen(false)}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-border text-sm font-semibold text-foreground"
                  >
                    {ta("login")}
                  </Link>
                  <Link
                    href={`/register${next}`}
                    onClick={() => setOpen(false)}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                  >
                    {ta("register")}
                  </Link>
                </>
              )}
            </div>
          </div>
      )}
    </div>
  );
}
