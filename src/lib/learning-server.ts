import { cache } from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getStaticApolloClient } from "@/lib/apollo/static-client";
import { fetchLearningPosts } from "./learning-api";
import { emptyLearningData, parseLearningPosts, type LearningKind, type LearningData } from "./learning-content";

export const getLearningData = cache(async (kind: LearningKind, subject: string, locale: string): Promise<LearningData> => {
  try {
    return parseLearningPosts(await fetchLearningPosts(getStaticApolloClient(), kind, subject, locale), kind);
  } catch (error) {
    console.warn(`CMS learning fallback: ${kind}/${subject}/${locale}`, error instanceof Error ? error.message : "API unavailable");
    for (const file of [`${subject}-${locale}.json`, `${subject}.json`]) {
      try {
        const local = JSON.parse(await readFile(join(process.cwd(), "src/data", kind, file), "utf8"));
        const result = emptyLearningData();
        if (kind === "flashcards") { if (Array.isArray(local)) result.cards = local; else result.topics = local.topics ?? []; }
        else { if (Array.isArray(local)) result.questions = local; else result.quizTopics = local.topics ?? []; }
        return result;
      } catch { /* Try the original-language backup. */ }
    }
    return emptyLearningData();
  }
});
