import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import FlashcardDeck, { type Flashcard } from "@/components/flashcards/FlashcardDeck";
import TopicDeck, { type Topic } from "@/components/flashcards/TopicDeck";
import { routing } from "@/i18n/routing";

const SUBJECTS: Record<string, Record<string, string>> = {
  mn: {
    "finance-basics": "Санхүүгийн үндэс",
    economics: "Эдийн засаг",
    "finance-management": "Санхүүгийн удирдлага",
    "investment-management": "Хөрөнгө оруулалтын удирдлага",
    "corporate-finance": "Корпорацийн санхүү",
    "bank-management": "Банкны менежмент",
    "bank-accounting": "Банкны НББ",
  },
  en: {
    "finance-basics": "Fundamentals of Finance",
    economics: "Economics",
    "finance-management": "Financial Management",
    "investment-management": "Investment Management",
    "corporate-finance": "Corporate Finance",
    "bank-management": "Bank Management",
    "bank-accounting": "Bank Accounting",
  },
  ja: {
    "finance-basics": "財務基礎",
    economics: "経済学",
    "finance-management": "財務管理",
    "investment-management": "投資管理",
    "corporate-finance": "企業財務",
    "bank-management": "銀行管理",
    "bank-accounting": "銀行会計",
  },
  ko: {
    "finance-basics": "재무 기초",
    economics: "경제학",
    "finance-management": "재무 관리",
    "investment-management": "투자 관리",
    "corporate-finance": "기업 재무",
    "bank-management": "은행 경영",
    "bank-accounting": "은행 회계",
  },
};

const ALL_SUBJECTS = [
  "finance-basics",
  "economics",
  "finance-management",
  "investment-management",
  "corporate-finance",
  "bank-management",
  "bank-accounting",
];

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

  let data: Flashcard[] | { topics: Topic[] } | null = null;
  try {
    data = (await import(`@/data/flashcards/${subject}-${locale}.json`)).default;
  } catch {
    try {
      data = (await import(`@/data/flashcards/${subject}.json`)).default;
    } catch {
      notFound();
    }
  }

  const subjectName = SUBJECTS[locale][subject];

  if (data && !Array.isArray(data) && Array.isArray(data.topics) && data.topics.length) {
    return <TopicDeck subject={subjectName} topics={data.topics} />;
  }

  const cards = Array.isArray(data) ? data : [];
  if (!cards.length) notFound();

  return <FlashcardDeck subject={subjectName} cards={cards} />;
}
