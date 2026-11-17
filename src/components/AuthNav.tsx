"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useAuth } from "@/lib/auth/AuthContext";

export default function AuthNav() {
  const t = useTranslations("auth");
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();

  const next = `?next=${encodeURIComponent(pathname)}`;

  if (loading) {
    return <div className="h-10 w-24 animate-pulse rounded-full bg-muted" aria-hidden />;
  }

  if (user) {
    const name =
      [user.lastName, user.firstName].filter(Boolean).join(" ") ||
      user.email ||
      user.username ||
      "";
    return (
      <div className="flex items-center gap-3">
        <span className="hidden max-w-[180px] truncate text-sm font-medium text-muted-foreground lg:block">
          {name}
        </span>
        <button
          type="button"
          onClick={() => logout()}
          className="inline-flex h-10 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          {t("logout")}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/login${next}`}
        className="hidden text-sm font-semibold text-foreground transition-colors hover:text-primary sm:inline-flex"
      >
        {t("login")}
      </Link>
      <Link
        href={`/register${next}`}
        className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        {t("register")}
      </Link>
    </div>
  );
}
