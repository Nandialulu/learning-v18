"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Layers, Zap, TrendingUp, ArrowRight } from "lucide-react";

const ICONS = [Layers, Zap, TrendingUp];
const COLORS = [
  "bg-primary text-primary-foreground",
  "bg-secondary text-secondary-foreground",
  "bg-accent text-accent-foreground",
];
const KEYS = ["flashcards", "quiz", "progress"];

export default function FeaturesSection() {
  const t = useTranslations("features");
  const reduced = useReducedMotion();

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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {KEYS.map((key, index) => {
            const Icon = ICONS[index];
            const isFlashcards = key === "flashcards";
            const card = (
              <motion.div
                whileHover={reduced ? {} : { y: -4, scale: 1.01 }}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 text-left shadow-sm transition-shadow hover:shadow-md"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${COLORS[index]}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-card-foreground">
                  {t(`${key}Title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`${key}Desc`)}
                </p>
                {isFlashcards && (
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                    {t("flashcardsLink")}
                    <ArrowRight size={16} className="ml-1" />
                  </span>
                )}
              </motion.div>
            );

            return (
              <FadeIn key={key} delay={0.1 + index * 0.1}>
                {isFlashcards ? (
                  <Link href="/flashcards/finance-basics" className="block h-full">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
