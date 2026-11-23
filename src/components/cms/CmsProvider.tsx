"use client";

import { createContext, useContext } from "react";
import { useLocale } from "next-intl";
import { useQuery } from "@apollo/client/react";
import { CP_PAGES, type CpPagesData, type Page } from "@/graphql/cms/queries/page";
import { CP_MENUS, type CpMenusData, type MenuItem } from "@/graphql/cms/queries/menu";
import { publishedPages } from "@/lib/cms";

export type CmsSnapshot = { pages: Page[]; menus: MenuItem[] };
const CmsContext = createContext<CmsSnapshot>({ pages: [], menus: [] });

export function CmsProvider({ initial, children }: { initial: CmsSnapshot; children: React.ReactNode }) {
  const language = useLocale();
  const pages = useQuery<CpPagesData>(CP_PAGES, { variables: { language }, fetchPolicy: "cache-and-network", ssr: false });
  const menus = useQuery<CpMenusData>(CP_MENUS, { variables: { language }, fetchPolicy: "cache-and-network", ssr: false });
  return (
    <CmsContext.Provider value={{
      pages: publishedPages(pages.data?.cpPages ?? initial.pages),
      menus: menus.data?.cpMenus ?? initial.menus,
    }}>
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() { return useContext(CmsContext); }
export function useCmsPage(slug: string) { return useCms().pages.find((page) => page.slug === slug); }
