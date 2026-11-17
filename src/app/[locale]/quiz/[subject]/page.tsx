import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import QuizDeck, { type QuizQuestion } from "@/components/quiz/QuizDeck";
import TopicQuizDeck, { type QuizTopic } from "@/components/quiz/TopicQuizDeck";
import { routing } from "@/i18n/routing";

const SUBJECTS: Record<string, Record<string, string>> = {
  mn: {
    "finance-basics": "Санхүүгийн үндэс",
    economics: "Эдийн засаг",
    "finance-management": "Санхүүгийн удирдлага",
    "investment-management": "Хөрөнгө оруулалтын удирдлага",
    "corporate-finance": "Корпорацийн санхүү",
    "bank-management": "Банкны менежмент",
  },
  en: {
    "finance-basics": "Fundamentals of Finance",
    economics: "Economics",
    "finance-management": "Financial Management",
    "investment-management": "Investment Management",
    "corporate-finance": "Corporate Finance",
    "bank-management": "Bank Management",
  },
  ja: {
    "finance-basics": "財務基礎",
    economics: "経済学",
    "finance-management": "財務管理",
    "investment-management": "投資管理",
    "corporate-finance": "企業財務",
    "bank-management": "銀行管理",
  },
  ko: {
    "finance-basics": "재무 기초",
    economics: "경제학",
    "finance-management": "재무 관리",
    "investment-management": "투자 관리",
    "corporate-finance": "기업 재무",
    "bank-management": "은행 경영",
  },
};

const ALL_SUBJECTS = [
  "finance-basics",
  "economics",
  "finance-management",
  "investment-management",
  "corporate-finance",
  "bank-management",
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
    title: `${name} — Quiz | Learning`,
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ locale: string; subject: string }>;
}) {
  const { locale, subject } = await params;
  setRequestLocale(locale);

  if (!SUBJECTS[locale]?.[subject]) notFound();

  let data: QuizQuestion[] | { topics: QuizTopic[] } | null = null;
  try {
    data = (await import(`@/data/quizzes/${subject}-${locale}.json`)).default;
  } catch {
    try {
      data = (await import(`@/data/quizzes/${subject}.json`)).default;
    } catch {
      notFound();
    }
  }

  const subjectName = SUBJECTS[locale][subject];

  if (data && !Array.isArray(data) && Array.isArray(data.topics) && data.topics.length) {
    return <TopicQuizDeck subject={subjectName} topics={data.topics} />;
  }

  const questions = Array.isArray(data) ? data : [];
  if (!questions.length) notFound();

  return (
    <QuizDeck
      subject={subjectName}
      questions={questions}
      shuffle={subject !== "finance-basics"}
    />
  );
}
