"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type QuizQuestion = {
  id: number;
  section?: string;
  type: "true-false" | "multiple-choice" | "fill-in";
  question: string;
  options?: { label: string; text: string }[];
  correct: string;
  explanation?: string;
};

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function QuizDeck({
  subject,
  questions,
  shuffle = true,
}: {
  subject: string;
  questions: QuizQuestion[];
  shuffle?: boolean;
}) {
  const t = useTranslations("quiz");
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);

  const shuffledQuestions = useMemo(() => {
    if (!shuffle) return questions;
    const withShuffledOptions = questions.map((q) => ({
      ...q,
      options: q.options ? shuffleArray(q.options) : undefined,
    }));
    return shuffleArray(withShuffledOptions);
  }, [questions, shuffleKey, shuffle]);

  const total = shuffledQuestions.length;
  const current = shuffledQuestions[index];

  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[,.]/g, "")
      .trim();

  const isCorrect = useCallback(() => {
    if (!current) return false;
    if (current.type === "fill-in") {
      return normalize(input) === normalize(current.correct);
    }
    return selected === current.correct;
  }, [current, input, selected]);

  const handleCheck = () => {
    if (checked) return;
    const ok = isCorrect();
    if (ok) setScore((s) => s + 1);
    setChecked(true);
  };

  const handleNext = () => {
    setSelected("");
    setInput("");
    setChecked(false);
    if (index + 1 >= total) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setSelected("");
    setInput("");
    setChecked(false);
    setScore(0);
    setFinished(false);
    if (shuffle) {
      setShuffleKey((k) => k + 1);
    }
  };

  if (!current) return null;

  if (finished) {
    return (
      <div className="w-full px-6 py-16 lg:px-[60px] lg:py-24">
        <div className="mx-auto max-w-[720px] text-center">
          <FadeIn>
            <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t("title", { subject })}
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg text-muted-foreground">
              {t("score", { score, total })}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <button
              onClick={handleRestart}
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <RefreshCw size={18} />
              {t("tryAgain")}
            </button>
          </FadeIn>
        </div>
      </div>
    );
  }

  const correct = isCorrect();

  return (
    <div className="w-full px-6 py-16 lg:px-[60px] lg:py-24">
      <div className="mx-auto max-w-[720px]">
        <FadeIn>
          <h1 className="text-center text-3xl font-extrabold text-foreground md:text-4xl">
            {t("title", { subject })}
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-2 text-center text-muted-foreground">
            {t("subtitle", { current: index + 1, total })}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.3} className="mt-10">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={reduced ? {} : { opacity: 0, y: 12 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                exit={reduced ? {} : { opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <p className="whitespace-pre-line text-lg font-medium leading-relaxed text-card-foreground md:text-xl">
                  {current.question}
                </p>

                {current.type === "fill-in" ? (
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={checked}
                    placeholder={t("placeholder")}
                    className="mt-6 w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none ring-primary focus:ring-2 disabled:opacity-60"
                  />
                ) : (
                  <div className="mt-6 grid gap-3">
                    {current.options?.map((opt) => {
                      const isSelected = selected === opt.label;
                      const isCorrectAnswer = current.correct === opt.label;
                      const showCorrect = checked && isCorrectAnswer;
                      const showWrong = checked && isSelected && !isCorrectAnswer;
                      return (
                        <button
                          key={opt.label}
                          disabled={checked}
                          onClick={() => setSelected(opt.label)}
                          className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                            showCorrect
                              ? "border-success bg-success/10 text-success-foreground"
                          : showWrong
                          ? "border-destructive bg-destructive/10 text-destructive"
                          : isSelected
                          ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-background hover:bg-muted"
                          } disabled:cursor-not-allowed`}
                        >
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                            {opt.label}
                          </span>
                          <span className="text-base">{opt.text}</span>
                          {showCorrect && <CheckCircle size={18} className="ml-auto shrink-0" />}
                          {showWrong && <XCircle size={18} className="ml-auto shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {checked && (
                  <div
                    className={`mt-6 flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold ${
                      correct
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {correct ? <CheckCircle size={18} /> : <XCircle size={18} />}
                    {correct ? t("correct") : t("incorrect", { answer: current.correct })}
                  </div>
                )}

                {checked && current.explanation && (
                  <div className="mt-3 rounded-2xl bg-muted px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                    {current.explanation}
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  {checked ? (
                    <button
                      onClick={handleNext}
                      className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      {index + 1 === total ? t("finish") : t("next")}
                      <ChevronRight size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={handleCheck}
                      disabled={
                        current.type === "fill-in" ? !input.trim() : !selected
                      }
                      className="inline-flex h-12 items-center gap-2 rounded-full bg-secondary px-6 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90 disabled:opacity-50"
                    >
                      {t("check")}
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
