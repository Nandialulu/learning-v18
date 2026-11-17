import { readFileSync, writeFileSync } from "fs";

const mdPath = "C:/Users/User/Downloads/Mandakh/Mandakh/A/Fundamental of Finance/Claude outputs/Эдийн засаг - 465 flashcards.md";
const outPath = new URL("../src/data/flashcards/economics.json", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

const SLUGS = [
  "demand-and-supply",
  "market-structures",
  "aggregate-output-prices-growth",
  "business-cycles",
  "monetary-fiscal-policy",
  "international-trade",
  "exchange-rates",
];

const md = readFileSync(mdPath, "utf-8");

const chunks = md
  .split(/^# /m)
  .slice(1)
  .filter((chunk) => /\*\*\d+\.\s*Асуулт:\*\*/.test(chunk));

if (chunks.length !== SLUGS.length) {
  console.error(`Expected ${SLUGS.length} topics, found ${chunks.length}`);
  process.exit(1);
}

const questionRegex = /\*\*\d+\.\s*Асуулт:\*\*\s*(.+?)(?=\s*\*\*Хариулт:\*\*)/gs;
const answerRegex = /\*\*Хариулт:\*\*\s*(.+?)(?=\s*\*\*\d+\.\s*Асуулт:|$)/gs;

const topics = chunks.map((chunk, i) => {
  const lines = chunk.split(/\r?\n/);
  const rawTitle = lines[0].trim();
  const title = rawTitle.replace(/\s*[(（][^)）]*[)）]\s*$/, "").trim();
  const body = lines.slice(1).join("\n");

  const questions = [];
  let qm;
  while ((qm = questionRegex.exec(body)) !== null) {
    questions.push(qm[1].trim().replace(/\r?\n/g, " "));
  }
  const answers = [];
  let am;
  while ((am = answerRegex.exec(body)) !== null) {
    answers.push(am[1].trim().replace(/\r?\n/g, " "));
  }

  if (questions.length !== answers.length) {
    console.error(`[${SLUGS[i]}] Mismatch: ${questions.length} Q vs ${answers.length} A`);
    process.exit(1);
  }

  return {
    id: SLUGS[i],
    title,
    cards: questions.map((question, j) => ({
      id: j + 1,
      question,
      answer: answers[j] ?? "",
    })),
  };
});

const total = topics.reduce((sum, t) => sum + t.cards.length, 0);
topics.forEach((t) => console.log(`${t.id}: ${t.cards.length} cards — ${t.title}`));
console.log(`Total: ${total}`);

writeFileSync(outPath, JSON.stringify({ topics }, null, 2) + "\n", "utf-8");
console.log(`Wrote ${outPath}`);
