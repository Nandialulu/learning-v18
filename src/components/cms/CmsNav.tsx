"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useCms } from "./CmsProvider";
import { cmsMenuItems, safeCmsHref } from "@/lib/cms";

const fallback = [
  { key: "home", url: "/" }, { key: "features", url: "/services" },
  { key: "subjects", url: "/portfolio" }, { key: "contact", url: "/contact" },
];

export default function CmsNav({ kind, className, onNavigate }: {
  kind: "header" | "footer"; className: string; onNavigate?: () => void;
}) {
  const t = useTranslations("nav");
  const { menus } = useCms();
  const cmsItems = cmsMenuItems(menus, kind);
  const items = cmsItems.length ? cmsItems : fallback.map((item) => ({
    _id: item.key, label: t(item.key), url: item.url, target: "",
  }));
  return items.map((item) => {
    const href = safeCmsHref(item.url)!;
    const props = { className, onClick: onNavigate, target: item.target === "_blank" ? "_blank" : undefined, rel: item.target === "_blank" ? "noopener noreferrer" : undefined };
    return href.startsWith("/")
      ? <Link key={item._id} href={href} {...props}>{item.label}</Link>
      : <a key={item._id} href={href} {...props}>{item.label}</a>;
  });
}
