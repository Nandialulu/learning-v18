import { cache } from "react";
import { getStaticApolloClient } from "@/lib/apollo/static-client";
import { CP_PAGES, type CpPagesData } from "@/graphql/cms/queries/page";
import { CP_MENUS, type CpMenusData } from "@/graphql/cms/queries/menu";
import { publishedPages } from "@/lib/cms";

export const getCmsSnapshot = cache(async (language: string) => {
  const client = getStaticApolloClient();
  const [pages, menus] = await Promise.allSettled([
    client.query<CpPagesData>({ query: CP_PAGES, variables: { language } }),
    client.query<CpMenusData>({ query: CP_MENUS, variables: { language } }),
  ]);
  if (pages.status === "rejected" || menus.status === "rejected") {
    console.warn(`CMS unavailable for ${language}; using local fallback for failed queries.`);
  }
  return {
    pages: publishedPages(pages.status === "fulfilled" ? pages.value.data?.cpPages ?? [] : []),
    menus: menus.status === "fulfilled" ? menus.value.data?.cpMenus ?? [] : [],
  };
});
