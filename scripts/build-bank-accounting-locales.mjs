import { readFileSync, writeFileSync } from "fs";

const JOBS = [
  {
    locale: "ja",
    mdPath: "C:/Users/User/Downloads/Mandakh/Mandakh/A/Fundamental of Finance/Claude outputs/Банкны НББ flashcards - Japanese.md",
    qLabel: "問題",
    aLabel: "答え",
  },
  {
    locale: "ko",
    mdPath: "C:/Users/User/Downloads/Mandakh/Mandakh/A/Fundamental of Finance/Claude outputs/Банкны НББ flashcards - Korean.md",
    qLabel: "질문",
    aLabel: "답변",
  },
  {
    locale: "en",
    mdPath: "C:/Users/User/Downloads/Mandakh/Mandakh/A/Fundamental of Finance/Claude outputs/Банкны НББ flashcards - English.md",
    qLabel: "Question",
    aLabel: "Answer",
  },
];

const projectRoot = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

for (const job of JOBS) {
  const md = readFileSync(job.mdPath, "utf-8");

  const questionRegex = new RegExp(`\\*\\*\\d+\\.\\s*${job.qLabel}:\\*\\*\\s*(.+?)(?=\\s*\\*\\*${job.aLabel}:\\*\\*)`, "gs");
  const answerRegex = new RegExp(`\\*\\*${job.aLabel}:\\*\\*\\s*(.+?)(?=\\s*\\*\\*\\d+\\.\\s*${job.qLabel}:|$)`, "gs");

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

  if (questions.length !== 80 || answers.length !== 80) {
    console.error(`[${job.locale}] Mismatch: ${questions.length} questions vs ${answers.length} answers (expected 80)`);
    process.exit(1);
  }

  const cards = questions.map((question, i) => ({
    id: i + 1,
    question,
    answer: answers[i] ?? "",
  }));

  const jsonPath = `${projectRoot}/src/data/flashcards/bank-accounting-${job.locale}.json`;
  writeFileSync(jsonPath, JSON.stringify(cards, null, 2) + "\n", "utf-8");
  console.log(`[${job.locale}] Wrote ${cards.length} cards to ${jsonPath}`);
}
