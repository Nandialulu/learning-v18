import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const files = [
  { src: "C:/Users/User/Downloads/Financial Management Flashcards (EN).md", out: "C:/Users/User/Downloads/opencode/erxes-skills-main/erxes-skills-main/content-plugin/headless/core/web/output/learning/src/data/flashcards/finance-management-en.json", q: "Question", a: "Answer" },
  { src: "C:/Users/User/Downloads/財務管理フラッシュカード (JA).md", out: "C:/Users/User/Downloads/opencode/erxes-skills-main/erxes-skills-main/content-plugin/headless/core/web/output/learning/src/data/flashcards/finance-management-ja.json", q: "質問", a: "回答" },
  { src: "C:/Users/User/Downloads/재무관리 플래시카드 (KO).md", out: "C:/Users/User/Downloads/opencode/erxes-skills-main/erxes-skills-main/content-plugin/headless/core/web/output/learning/src/data/flashcards/finance-management-ko.json", q: "질문", a: "답변" },
];

for (const { src, out, q, a } of files) {
  const md = readFileSync(src, "utf-8");
  const questionRegex = new RegExp(String.raw`\*\*\d+\.\s*${q}:\*\*\s*(.+?)(?=\s*\*\*${a}:\*\*)`, "gs");
  const answerRegex = new RegExp(String.raw`\*\*${a}:\*\*\s*(.+?)(?=\s*\*\*\d+\.\s*${q}:|^## |$)`, "gms");

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

  const cards = [];
  for (let i = 0; i < questions.length; i++) {
    cards.push({ id: i + 1, question: questions[i], answer: answers[i] ?? "" });
  }

  writeFileSync(out, JSON.stringify(cards, null, 2) + "\n");
  console.log(`${out}: ${cards.length} cards (questions=${questions.length}, answers=${answers.length})`);
}
