import { readFileSync, writeFileSync } from "fs";

const mdPath = "C:/Users/User/Downloads/Банкны НББ - 80 flashcards_1.md";
const jsonPath = new URL("../src/data/flashcards/bank-accounting.json", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

const md = readFileSync(mdPath, "utf-8");

const questionRegex = /\*\*\d+\.\s*Асуулт:\*\*\s*(.+?)(?=\s*\*\*Хариулт:\*\*)/gs;
const answerRegex = /\*\*Хариулт:\*\*\s*(.+?)(?=\s*\*\*\d+\.\s*Асуулт:|$)/gs;

const questions = [];
let qm;
while ((qm = questionRegex.exec(md)) !== null) {
  questions.push(qm[1].trim().replace(/\r?\n/g, " "));
}

const answers = [];
let am;
while ((am = answerRegex.exec(md)) !== null) {
  answers.push(am[1].trim().replace(/\r?\n/g, " "));
}

const cards = questions.map((question, i) => ({
  id: i + 1,
  question,
  answer: answers[i] ?? "",
}));

if (questions.length !== answers.length) {
  console.error(`Mismatch: ${questions.length} questions vs ${answers.length} answers`);
  process.exit(1);
}

writeFileSync(jsonPath, JSON.stringify(cards, null, 2) + "\n", "utf-8");
console.log(`Wrote ${cards.length} cards to ${jsonPath}`);
