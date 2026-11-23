import sanitizeHtml from "sanitize-html";
import type { Page } from "@/graphql/cms/queries/page";
import type { MenuItem } from "@/graphql/cms/queries/menu";

export function publishedPages(pages: Page[]) {
  return pages.filter((page) => page.status === "published");
}

export function safeCmsHref(url?: string) {
  const value = url?.trim() ?? "";
  if (/^\/(?!\/)/.test(value) && !/[\\\s]/.test(value)) {
    return value === "/home" ? "/" : value;
  }
  if (/^(https?:\/\/|mailto:|tel:|#)/i.test(value)) return value;
  return null;
}

export function cmsMenuItems(items: MenuItem[], kind: string) {
  return items
    .filter((item) => item.kind === kind && !item.parentId && item.label && safeCmsHref(item.url))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function cmsBody(page: Page, locale: string) {
  // This tenant's existing translations store rich text in description.
  const translatedDescription = locale !== "mn" && /<\/?[a-z][\s\S]*>/i.test(page.description ?? "");
  return sanitizeHtml(translatedDescription ? page.description ?? "" : page.content || page.description || "", {
    allowedTags: ["p", "br", "h2", "h3", "h4", "strong", "em", "b", "i", "u", "s", "ul", "ol", "li", "blockquote", "a", "code", "pre", "hr"],
    allowedAttributes: { a: ["href", "title"] },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attributes) => {
        const href = safeCmsHref(attributes.href);
        if (!href) return { tagName, attribs: {} };
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
        const localized = href.startsWith("/") && !/^\/(mn|en|ko|ja)(\/|$)/.test(href)
          ? `/${locale}${href === "/" ? "" : href}` : href;
        return { tagName, attribs: { ...attributes, href: localized.startsWith("/") ? `${basePath}${localized}` : localized } };
      },
    },
  });
}
