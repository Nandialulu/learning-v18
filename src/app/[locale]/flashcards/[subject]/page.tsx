import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

import { SUBJECTS, ALL_SUBJECTS } from "@/lib/learning-subjects";
import { getLearningData } from "@/lib/learning-server";
import LearningDeck from "@/components/cms/LearningDeck";

export async function generateStaticParams() {
  const params: { locale: string; subject: string }[] = [];
  for (const locale of routing.locales) {
    for (const subject of ALL_SUBJECTS) {
      params.push({ locale, subject });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; subject: string }>;
}): Promise<Metadata> {
  const { locale, subject } = await params;
  const name = SUBJECTS[locale]?.[subject] ?? subject;
  return {
    title: `${name} — Flashcards | Learning`,
  };
}

export default async function FlashcardsPage({
  params,
}: {
  params: Promise<{ locale: string; subject: string }>;
}) {
  const { locale, subject } = await params;
  setRequestLocale(locale);

  if (!SUBJECTS[locale]?.[subject]) notFound();

  const initial = await getLearningData("flashcards", subject, locale);
  return <LearningDeck key={locale + subject} kind="flashcards" subject={subject} subjectName={SUBJECTS[locale][subject]} initial={initial} />;
}
