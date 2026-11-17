import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getStaticApolloClient } from "@/lib/apollo/static-client";
import {
  CP_PAGES,
  type CpPagesData,
  type Page,
} from "@/graphql/cms/queries/page";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const client = getStaticApolloClient();
  const results = await Promise.all(
    routing.locales.map(async (locale) => {
      const { data } = await client.query<CpPagesData>({
        query: CP_PAGES,
        variables: { language: locale },
      });
      return (data?.cpPages ?? [])
        .filter((p): p is Page & { slug: string } => !!p.slug)
        .map((p) => ({
          locale,
          slug: p.slug,
        }));
    })
  );
  return results.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const client = getStaticApolloClient();
  const { data } = await client.query<CpPagesData>({
    query: CP_PAGES,
    variables: { language: locale },
  });
  const page = (data?.cpPages ?? []).find(
    (p): p is Page & { slug: string } => p.slug === slug
  );
  if (!page) return {};
  return {
    title: `${page.name} | Learning`,
    description: page.description ?? undefined,
  };
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const client = getStaticApolloClient();
  const { data } = await client.query<CpPagesData>({
    query: CP_PAGES,
    variables: { language: locale },
  });
  const page = (data?.cpPages ?? []).find(
    (p): p is Page & { slug: string } => p.slug === slug
  );

  if (!page) notFound();

  return (
    <article className="w-full px-6 py-16 lg:px-[60px] lg:py-24">
      <div className="mx-auto max-w-[800px]">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          {page.name}
        </h1>
        {page.description && (
          <p className="mt-4 text-lg text-muted-foreground">{page.description}</p>
        )}
        {page.content && (
          <div
            className="prose prose-lg mt-8 max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        )}
      </div>
    </article>
  );
}
