"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLearningCounts } from "@/hooks/useLearningCounts";
import type { SubjectCounts } from "@/lib/content-counts";

const SUBJECTS = [
  { key: "financeBasics", slug: "finance-basics" },
  { key: "economics", slug: "economics" },
  { key: "financeManagement", slug: "finance-management" },
  { key: "investmentManagement", slug: "investment-management" },
  { key: "bankManagement", slug: "bank-management" },
  { key: "bankAccounting", slug: "bank-accounting" },
];
const COLORS = ["bg-indigo-100", "bg-rose-100", "bg-emerald-100", "bg-amber-100", "bg-violet-100", "bg-sky-100"];
const DOTS = ["bg-primary", "bg-secondary", "bg-accent", "bg-warning", "bg-violet-500", "bg-success"];

export default function SubjectsSection({
  counts,
}: {
  counts: Record<string, SubjectCounts>;
}) {
  const t = useTranslations("subjects");
  const reduced = useReducedMotion();
  const liveCounts = useLearningCounts(counts);

  return (
    <section className="w-full px-6 py-20 lg:px-[60px] lg:py-24">
      <div className="mx-auto max-w-[1000px] text-center">
        <FadeIn>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[44px]">
            {t("title")}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </FadeIn>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SUBJECTS.map((subject, index) => {
            const cnt = liveCounts[subject.slug] ?? { flashcards: 0, quizzes: 0 };
            const meta = `${t("flashcardsCount", { count: cnt.flashcards })} · ${t("quizzesCount", { count: cnt.quizzes })}`;
            return (
              <FadeIn key={subject.key} delay={0.1 + index * 0.1}>
                <motion.div
                  whileHover={reduced ? {} : { y: -4, scale: 1.01 }}
                  className={`flex h-full flex-col justify-between rounded-2xl ${COLORS[index]} p-6 text-left transition-shadow hover:shadow-md`}
                >
                  <div>
                    <div className={`mb-4 h-10 w-10 rounded-full ${DOTS[index]}`} />
                    <h3 className="text-xl font-bold text-foreground">{t(subject.key)}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{meta}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
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
    </section>
  );
}
