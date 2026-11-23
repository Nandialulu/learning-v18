"use client";

import { motion } from "framer-motion";
import CmsIntro from "@/components/cms/CmsIntro";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { SubjectCounts } from "@/lib/content-counts";

const SUBJECTS = [
  { key: "financeBasics", slug: "finance-basics", color: "bg-indigo-100", dot: "bg-primary" },
  { key: "economics", slug: "economics", color: "bg-rose-100", dot: "bg-secondary" },
  { key: "financeManagement", slug: "finance-management", color: "bg-emerald-100", dot: "bg-accent" },
  { key: "investmentManagement", slug: "investment-management", color: "bg-amber-100", dot: "bg-warning" },
  { key: "corporateFinance", slug: "corporate-finance", color: "bg-sky-100", dot: "bg-success" },
  { key: "bankManagement", slug: "bank-management", color: "bg-lime-100", dot: "bg-success" },
  { key: "bankAccounting", slug: "bank-accounting", color: "bg-violet-100", dot: "bg-violet-500" },
];

export default function PortfolioSubjects({
  counts,
}: {
  counts: Record<string, SubjectCounts>;
}) {
  const t = useTranslations("subjects");
  const tp = useTranslations("portfolio");
  const reduced = useReducedMotion();

  return (
    <div className="w-full px-6 py-16 lg:px-[60px] lg:py-24">
      <div className="mx-auto max-w-[1000px]">
        <CmsIntro slug="portfolio">
          <FadeIn>
            <h1 className="text-center text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {tp("pageTitle")}
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-4 max-w-[640px] text-center text-lg text-muted-foreground">
              {tp("subtitle")}
            </p>
          </FadeIn>
        </CmsIntro>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((subject, index) => {
            const cnt = counts[subject.slug] ?? { flashcards: 0, quizzes: 0 };
            const meta = `${t("flashcardsCount", { count: cnt.flashcards })} · ${t("quizzesCount", { count: cnt.quizzes })}`;
            return (
              <FadeIn key={subject.key} delay={0.1 + index * 0.08}>
                <motion.div
                  whileHover={reduced ? {} : { y: -4, scale: 1.01 }}
                  className={`flex h-64 flex-col justify-between rounded-2xl ${subject.color} p-6 transition-shadow hover:shadow-md`}
                >
                  <div>
                    <div className={`mb-4 h-12 w-12 rounded-full ${subject.dot}`} />
                    <h2 className="text-2xl font-bold text-foreground">{t(subject.key)}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{meta}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {cnt.flashcards > 0 ? (
                      <Link
                        href={`/flashcards/${subject.slug}`}
                        className="inline-flex items-center rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-white"
                      >
                        Flashcards
                      </Link>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-white/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                        {t("comingSoon")}
                      </span>
                    )}
                    {cnt.quizzes > 0 && (
                      <Link
                        href={`/quiz/${subject.slug}`}
                        className="inline-flex items-center rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-white"
                      >
                        {t("quizLink")}
                      </Link>
                    )}
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </div>
  );
}
