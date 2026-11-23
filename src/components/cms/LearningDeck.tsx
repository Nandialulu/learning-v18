"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getApolloClient } from "@/lib/apollo/client";
import { fetchLearningPosts } from "@/lib/learning-api";
import { learningCount, parseLearningPosts, type LearningKind, type LearningData } from "@/lib/learning-content";
import FlashcardDeck from "@/components/flashcards/FlashcardDeck";
import TopicDeck from "@/components/flashcards/TopicDeck";
import QuizDeck from "@/components/quiz/QuizDeck";
import TopicQuizDeck from "@/components/quiz/TopicQuizDeck";

export default function LearningDeck({ kind, subject, subjectName, initial }: {
  kind: LearningKind; subject: string; subjectName: string; initial: LearningData;
}) {
  const locale = useLocale();
  const t = useTranslations("learningCms");
  const [state, setState] = useState({ data: initial, revision: 0 });
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let cancelled = false;
    fetchLearningPosts(getApolloClient(), kind, subject, locale).then(posts => {
      const data = parseLearningPosts(posts, kind);
      if (!cancelled) {
        setFailed(false);
        setState(previous => JSON.stringify(previous.data) === JSON.stringify(data) ? previous : { data, revision: previous.revision + 1 });
      }
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, [kind, subject, locale, attempt]);
  const { data, revision } = state;
  const count = learningCount(data, kind);
  return (
    <div data-learning-source="erxes" data-learning-kind={kind}>
      {failed && <div role="status" className="mx-auto max-w-[1000px] px-6 pt-6 text-sm text-muted-foreground">
        {t("offline")} <button type="button" className="font-semibold text-primary underline" onClick={() => setAttempt(value => value + 1)}>{t("retry")}</button>
      </div>}
      {!count ? <section className="mx-auto max-w-[1000px] px-6 py-16 text-center"><h1 className="text-4xl font-bold">{subjectName}</h1><p className="mt-6 text-muted-foreground">{t("empty")}</p></section>
        : kind === "flashcards"
          ? data.topics.length ? <TopicDeck key={revision} subject={subjectName} topics={data.topics} /> : <FlashcardDeck key={revision} subject={subjectName} cards={data.cards} />
          : data.quizTopics.length ? <TopicQuizDeck key={revision} subject={subjectName} topics={data.quizTopics} /> : <QuizDeck key={revision} subject={subjectName} questions={data.questions} shuffle={subject !== "finance-basics"} />}
    </div>
  );
}
