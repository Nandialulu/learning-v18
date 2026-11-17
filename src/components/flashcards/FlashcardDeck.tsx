"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type Flashcard = {
  id: number;
  question: string;
  answer: string;
};

export default function FlashcardDeck({
  subject,
  cards,
}: {
  subject: string;
  cards: Flashcard[];
}) {
  const t = useTranslations("flashcards");
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const current = cards[index];
  const total = cards.length;

  const go = useCallback(
    (delta: number) => {
      setFlipped(false);
      setDirection(delta);
      setIndex((i) => {
        const next = i + delta;
        if (next < 0) return total - 1;
        if (next >= total) return 0;
        return next;
      });
    },
    [total]
  );

  if (!current) return null;

  const variants = {
    enter: (dir: number) =>
      reduced
        ? { x: 0, opacity: 1, rotateY: 0 }
        : { x: dir > 0 ? 60 : -60, opacity: 0, rotateY: 0 },
    center: { x: 0, opacity: 1, rotateY: 0 },
    exit: (dir: number) =>
      reduced
        ? { x: 0, opacity: 1, rotateY: 0 }
        : { x: dir < 0 ? 60 : -60, opacity: 0, rotateY: 0 },
  };

  return (
    <div className="w-full px-6 py-16 lg:px-[60px] lg:py-24">
      <div className="mx-auto max-w-[800px]">
        <FadeIn>
          <h1 className="text-center text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {t("title", { subject })}
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-4 max-w-[640px] text-center text-lg text-muted-foreground">
            {t("subtitle", { current: index + 1, total })}
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-12">
          <div className="relative h-[420px] w-full" style={{ perspective: "1000px" }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={() => setFlipped((f) => !f)}
                className="absolute inset-0 cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  animate={{
                    rotateY: flipped ? 180 : 0,
                  }}
                  transition={{ duration: reduced ? 0 : 0.35 }}
                  className="relative h-full w-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-primary p-8 text-center text-primary-foreground shadow-xl"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="mb-6 text-xs font-bold tracking-wider uppercase opacity-80">
                      {t("question")}
                    </span>
                    <p className="text-xl font-semibold leading-relaxed md:text-2xl">
                      {current.question}
                    </p>
                    <span className="absolute bottom-6 left-0 right-0 text-center text-sm opacity-70">
                      {t("tapToFlip")}
                    </span>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-card p-8 text-center text-card-foreground shadow-xl"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <span className="mb-6 text-xs font-bold tracking-wider uppercase text-muted-foreground">
                      {t("answer")}
                    </span>
                    <p className="text-lg leading-relaxed md:text-xl">
                      {current.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} className="mt-10">
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => go(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-card-foreground transition-colors hover:bg-muted"
              aria-label={t("previous")}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => setFlipped((f) => !f)}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-secondary px-6 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
            >
              <RotateCw size={18} />
              {flipped ? t("hideAnswer") : t("showAnswer")}
            </button>

            <button
              onClick={() => go(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-card-foreground transition-colors hover:bg-muted"
              aria-label={t("next")}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
