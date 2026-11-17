"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import FlashcardDeck, { type Flashcard } from "@/components/flashcards/FlashcardDeck";

export type Topic = {
  id: string;
  title: string;
  cards: Flashcard[];
};

const COLORS = [
  "bg-indigo-100",
  "bg-rose-100",
  "bg-emerald-100",
  "bg-amber-100",
  "bg-violet-100",
  "bg-sky-100",
  "bg-lime-100",
];
const DOTS = [
  "bg-primary",
  "bg-secondary",
  "bg-accent",
  "bg-warning",
  "bg-violet-500",
  "bg-success",
  "bg-sky-500",
];

export default function TopicDeck({
  subject,
  topics,
}: {
  subject: string;
  topics: Topic[];
}) {
  const t = useTranslations("flashcards");
  const ts = useTranslations("subjects");
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get("topic");
    if (topic && topics.some((tp) => tp.id === topic)) setActiveId(topic);
  }, [topics]);

  const active = topics.find((tp) => tp.id === activeId) ?? null;

  if (active) {
    return (
      <div className="w-full px-6 py-16 lg:px-[60px] lg:py-24">
        <div className="mx-auto max-w-[1000px]">
          <button
            type="button"
            onClick={() => setActiveId(null)}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            {t("backToTopics")}
          </button>
          <FlashcardDeck
            key={active.id}
            subject={`${subject} — ${active.title}`}
            cards={active.cards}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-16 lg:px-[60px] lg:py-24">
      <div className="mx-auto max-w-[1000px]">
        <FadeIn>
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {subject}
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-4 max-w-[560px] text-center text-lg text-muted-foreground">
            {t("chooseTopic")}
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => (
            <FadeIn key={topic.id} delay={0.1 + index * 0.06}>
              <button
                type="button"
                onClick={() => setActiveId(topic.id)}
                className={`flex h-40 w-full flex-col justify-between rounded-2xl ${COLORS[index % COLORS.length]} p-6 text-left transition-shadow hover:shadow-md`}
              >
                <div>
                  <div className={`mb-3 h-8 w-8 rounded-full ${DOTS[index % DOTS.length]}`} />
                  <span className="block text-sm font-bold uppercase tracking-wide text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-1 text-lg font-bold leading-snug text-foreground">
                    {topic.title}
                  </h2>
                </div>
                <span className="text-sm text-muted-foreground">
                  {ts("flashcardsCount", { count: topic.cards.length })}
                </span>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
