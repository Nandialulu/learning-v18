import { readFileSync, writeFileSync } from "fs";

const mdPath = "C:/Users/User/Downloads/Sanhuugiin_undes_flashcards_50.md";
const jsonPath = "C:/Users/User/Downloads/opencode/erxes-skills-main/erxes-skills-main/content-plugin/headless/core/web/output/learning/src/data/flashcards/finance-basics.json";

const md = readFileSync(mdPath, "utf-8");

const existing = JSON.parse(readFileSync(jsonPath, "utf-8"));
const startId = existing.length;

const newCards = [];

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

for (let i = 0; i < questions.length; i++) {
  newCards.push({ id: startId + i + 1, question: questions[i], answer: answers[i] ?? "" });
}

const combined = [...existing, ...newCards];
writeFileSync(jsonPath, JSON.stringify(combined, null, 2) + "\n");
console.log(`Added ${newCards.length} cards. Total: ${combined.length}`);
