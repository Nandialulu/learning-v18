import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getCmsSnapshot } from "@/lib/cms-server";
import CmsIntro from "@/components/cms/CmsIntro";
import { routing } from "@/i18n/routing";

const reserved = new Set(["services", "portfolio", "contact", "flashcards", "quiz"]);

export async function generateStaticParams() {
  const results = await Promise.all(routing.locales.map(async (locale) => {
    const { pages } = await getCmsSnapshot(locale);
    return pages.filter((page) => page.slug && !reserved.has(page.slug)).map((page) => ({ locale, slug: page.slug! }));
  }));
  return results.flat();
}

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const { pages } = await getCmsSnapshot(locale);
  const page = pages.find((page) => page.slug === slug);
  return page ? { title: page.name + " | Learning" } : {};
}

export default async function CmsPage({ params }: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const { pages } = await getCmsSnapshot(locale);
  if (!pages.some((page) => page.slug === slug)) notFound();
  return (
    <article className="w-full px-6 py-16 lg:px-[60px] lg:py-24">
      <div className="mx-auto max-w-[800px]"><CmsIntro slug={slug} /></div>
    </article>
  );
}
