"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("hero");
  const reduced = useReducedMotion();

  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden px-6 py-20 text-center lg:px-[60px] lg:py-32">
      <FadeIn delay={0}>
        <span className="mb-6 inline-block rounded-full bg-accent px-4 py-2 text-xs font-bold tracking-wider text-accent-foreground">
          {t("tagline")}
        </span>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h1 className="max-w-[900px] whitespace-pre-line text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-[80px]">
          {t("title")}
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="mt-6 max-w-[640px] text-lg leading-relaxed text-muted-foreground">
          {t("subtitle")}
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <motion.div
            whileHover={reduced ? {} : { scale: 1.02 }}
            whileTap={reduced ? {} : { scale: 0.98 }}
          >
            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-md transition-shadow hover:shadow-lg"
            >
              {t("ctaStart")}
            </Link>
          </motion.div>
          <motion.div
            whileHover={reduced ? {} : { scale: 1.02 }}
            whileTap={reduced ? {} : { scale: 0.98 }}
          >
            <Link
              href="/portfolio"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-8 text-sm font-semibold text-card-foreground transition-colors hover:bg-muted"
            >
              {t("ctaBrowse")}
            </Link>
          </motion.div>
        </div>
      </FadeIn>

      <FadeIn delay={0.4} className="mt-12">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <Link href="/flashcards/finance-basics" className="group block">
            <div className="flex h-36 w-56 flex-col justify-center rounded-2xl bg-primary p-6 text-left text-primary-foreground shadow-lg transition-transform group-hover:scale-[1.02]">
              <span className="text-xs font-bold tracking-wider">FLASHCARD</span>
              <p className="mt-2 text-sm leading-relaxed">
                What is the powerhouse of the cell?
              </p>
              <span className="mt-3 inline-flex items-center text-xs font-semibold opacity-90">
                {t("flashcardsLink")}
                <ArrowRight size={14} className="ml-1" />
              </span>
            </div>
          </Link>
          <div className="flex h-36 w-56 flex-col justify-center rounded-2xl bg-secondary p-6 text-left text-secondary-foreground shadow-lg">
            <span className="text-xs font-bold tracking-wider">QUIZ</span>
            <p className="mt-2 text-sm leading-relaxed">
              Mitochondria is the correct answer.
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
