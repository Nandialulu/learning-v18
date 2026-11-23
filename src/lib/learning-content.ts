import sanitizeHtml from "sanitize-html";
import { decode } from "he";
import type { Post } from "@/graphql/cms/queries/post";
import type { Flashcard } from "@/components/flashcards/FlashcardDeck";
import type { Topic } from "@/components/flashcards/TopicDeck";
import type { QuizQuestion } from "@/components/quiz/QuizDeck";
import type { QuizTopic } from "@/components/quiz/TopicQuizDeck";

export type LearningKind = "flashcards" | "quizzes";
export type LearningData = { cards: Flashcard[]; questions: QuizQuestion[]; topics: Topic[]; quizTopics: QuizTopic[] };
export const emptyLearningData = (): LearningData => ({ cards: [], questions: [], topics: [], quizTopics: [] });

export function learningText(value: string) {
  // Keep formulas, line breaks, and entity-encoded inequality signs as plain text.
  return decode(sanitizeHtml(value.replace(/<br\s*\/?\s*>/gi, "\n").replace(/<\/(p|div|li|h[1-6])>/gi, "\n"), {
    allowedTags: [], allowedAttributes: {},
  })).trim();
}

export function learningFields(post: Post): Record<string, unknown> {
  const data: unknown = post.customFieldsData;
  if (Array.isArray(data)) return Object.fromEntries(data.filter(item => item && typeof item.field === "string").map(item => [item.field.replace(/^learning-/, ""), item.value]));
  return data && typeof data === "object" ? data as Record<string, unknown> : {};
}

export function parseLearningPosts(posts: Post[], kind: LearningKind): LearningData {
  const result = emptyLearningData();
  const rows = posts.filter(post => post.status === "published").map(post => ({ post, fields: learningFields(post) }));
  const number = (value: unknown) => Number.isFinite(Number(value)) ? Number(value) : 0;
  rows.sort((a, b) => number(a.fields["topic-order"]) - number(b.fields["topic-order"]) || number(a.fields.order) - number(b.fields.order) || a.post._id.localeCompare(b.post._id));
  const hasTopics = rows.some(({ fields }) => !!fields["topic-id"]);
  for (const [index, { post, fields }] of rows.entries()) {
    const question = post.title?.trim();
    if (!question) throw new Error(`CMS question missing: ${post._id}`);
    const topicId = String(fields["topic-id"] || "general");
    const topicTitle = String(fields["topic-title"] || fields.subject || "General");
    if (kind === "flashcards") {
      const answer = learningText(post.content ?? "");
      if (!answer) throw new Error(`CMS answer missing: ${post._id}`);
      const card = { id: index + 1, question, answer };
      if (!hasTopics) result.cards.push(card);
      else {
        let topic = result.topics.find(item => item.id === topicId);
        if (!topic) { topic = { id: topicId, title: topicTitle, cards: [] }; result.topics.push(topic); }
        topic.cards.push(card);
      }
    } else {
      const type = fields["question-type"];
      if (type !== "true-false" && type !== "multiple-choice" && type !== "fill-in") throw new Error(`CMS question type invalid: ${post._id}`);
      let correct = String(fields.correct ?? "").trim();
      let prompt = question;
      // 41 original Mongolian fill-in rows encode the answer in **bold** instead
      // of the answer field. Preserve those rows as usable fill-in questions.
      if (type === "fill-in" && !correct) {
        const marked = [...question.matchAll(/\*\*([^*]+)\*\*/g)];
        if (marked.length === 1) {
          correct = marked[0][1].trim();
          prompt = question.replace(marked[0][0], "____");
        }
      }
      const options = "abcdefgh".split("").flatMap(label => {
        const text = fields[`option-${label}`];
        return typeof text === "string" && text.trim() ? [{ label, text }] : [];
      });
      if (!correct || (type !== "fill-in" && (options.length < 2 || !options.some(option => option.label === correct)))) throw new Error(`CMS correct answer invalid: ${post._id}`);
      const item: QuizQuestion = { id: index + 1, question: prompt, type, correct, explanation: learningText(post.content ?? ""), ...(fields.section ? { section: String(fields.section) } : {}), ...(options.length ? { options } : {}) };
      if (!hasTopics) result.questions.push(item);
      else {
        let topic = result.quizTopics.find(item => item.id === topicId);
        if (!topic) { topic = { id: topicId, title: topicTitle, questions: [] }; result.quizTopics.push(topic); }
        topic.questions.push(item);
      }
    }
  }
  return result;
}

export function learningCount(data: LearningData, kind: LearningKind) {
  return kind === "flashcards"
    ? data.cards.length + data.topics.reduce((sum, topic) => sum + topic.cards.length, 0)
    : data.questions.length + data.quizTopics.reduce((sum, topic) => sum + topic.questions.length, 0);
}
