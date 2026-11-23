"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { getApolloClient } from "@/lib/apollo/client";
import { fetchLearningCount } from "@/lib/learning-api";
import type { SubjectCounts } from "@/lib/content-counts";

export function useLearningCounts(initial: Record<string, SubjectCounts>) {
  const locale = useLocale();
  const [live, setLive] = useState<{ locale: string; counts: Record<string, SubjectCounts> } | null>(null);
  const subjects = Object.keys(initial).sort().join(",");
  useEffect(() => {
    let cancelled = false;
    const client = getApolloClient();
    for (const subject of subjects.split(",").filter(Boolean)) {
      Promise.all([fetchLearningCount(client, "flashcards", subject, locale), fetchLearningCount(client, "quizzes", subject, locale)])
        .then(([flashcards, quizzes]) => {
          if (!cancelled) setLive(previous => ({ locale, counts: { ...(previous?.locale === locale ? previous.counts : {}), [subject]: { flashcards, quizzes } } }));
        }).catch(() => { /* Retain the build-time count if CMS is unavailable. */ });
    }
    return () => { cancelled = true; };
  }, [locale, subjects]);
  return { ...initial, ...(live?.locale === locale ? live.counts : {}) };
}
