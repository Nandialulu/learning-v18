import { readFile } from "fs/promises";
import { join } from "path";

export type SubjectCounts = {
  flashcards: number;
  quizzes: number;
};

export async function getSubjectCounts(
  locale: string,
  subjects: string[]
): Promise<Record<string, SubjectCounts>> {
  const result: Record<string, SubjectCounts> = {};
  const base = join(process.cwd(), "src", "data");

  for (const slug of subjects) {
    let flashcards = 0;
    for (const file of [`${slug}-${locale}.json`, `${slug}.json`]) {
      try {
        const raw = await readFile(join(base, "flashcards", file), "utf-8");
        const data = JSON.parse(raw);
        if (Array.isArray(data)) {
          flashcards = data.length;
          break;
        }
        if (data && Array.isArray(data.topics)) {
          flashcards = data.topics.reduce(
            (sum: number, t: { cards?: unknown[] }) =>
              sum + (Array.isArray(t.cards) ? t.cards.length : 0),
            0
          );
          break;
        }
      } catch {
        // file missing or invalid — try next fallback
      }
    }

    let quizzes = 0;
    for (const file of [`${slug}-${locale}.json`, `${slug}.json`]) {
      try {
        const raw = await readFile(join(base, "quizzes", file), "utf-8");
        const data = JSON.parse(raw);
        if (Array.isArray(data)) {
          quizzes = data.length;
          break;
        }
        if (data && Array.isArray(data.topics)) {
          quizzes = data.topics.reduce(
            (sum: number, t: { questions?: unknown[] }) =>
              sum + (Array.isArray(t.questions) ? t.questions.length : 0),
            0
          );
          break;
        }
      } catch {
        // file missing or invalid — try next fallback
      }
    }

    result[slug] = { flashcards, quizzes };
  }

  return result;
}
