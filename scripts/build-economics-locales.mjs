import { readFileSync, writeFileSync } from "fs";

const DIR = "C:/Users/User/Downloads/Mandakh/Mandakh/A/Fundamental of Finance/Claude outputs";
const projectRoot = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

const SLUGS = [
  "demand-and-supply",
  "market-structures",
  "aggregate-output-prices-growth",
  "business-cycles",
  "monetary-fiscal-policy",
  "international-trade",
  "exchange-rates",
];

// Expected card counts per topic (from the Mongolian source)
const EXPECTED = [73, 75, 72, 59, 65, 58, 63];

const JOBS = [
  {
    locale: "ko",
    file: `${DIR}/경제학 - 465 flashcards (한국어).md`,
    qLabel: "질문",
    aLabel: "답변",
  },
  {
    locale: "ja",
    file: `${DIR}/経済学 - 465 flashcards (日本語).md`,
    qLabel: "問題",
    aLabel: "解答",
  },
  {
    locale: "en",
    file: `${DIR}/Economics - 465 flashcards (English).md`,
    qLabel: "Question",
    aLabel: "Answer",
  },
];

for (const job of JOBS) {
  const md = readFileSync(job.file, "utf-8");

  const chunks = md
    .split(/^# /m)
    .slice(1)
    .filter((chunk) => new RegExp(`\\*\\*\\d+\\.\\s*${job.qLabel}:\\*\\*`).test(chunk));

  if (chunks.length !== SLUGS.length) {
    console.error(`[${job.locale}] Expected ${SLUGS.length} topics, found ${chunks.length}`);
    process.exit(1);
  }

  const questionRegex = new RegExp(`\\*\\*\\d+\\.\\s*${job.qLabel}:\\*\\*\\s*(.+?)(?=\\s*\\*\\*${job.aLabel}:\\*\\*)`, "gs");
  const answerRegex = new RegExp(`\\*\\*${job.aLabel}:\\*\\*\\s*(.+?)(?=\\s*\\*\\*\\d+\\.\\s*${job.qLabel}:|$)`, "gs");

  const topics = chunks.map((chunk, i) => {
    const lines = chunk.split(/\r?\n/);
    const title = lines[0].trim().replace(/\s*[(（][^)）]*[)）]\s*$/, "").trim();
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

    if (questions.length !== answers.length || questions.length !== EXPECTED[i]) {
      console.error(
        `[${job.locale}/${SLUGS[i]}] cards=${questions.length} answers=${answers.length} expected=${EXPECTED[i]}`
      );
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
  console.log(`[${job.locale}] ${total} cards:`);
  topics.forEach((t) => console.log(`  ${t.id}: ${t.cards.length} — ${t.title}`));

  const outPath = `${projectRoot}/src/data/flashcards/economics-${job.locale}.json`;
  writeFileSync(outPath, JSON.stringify({ topics }, null, 2) + "\n", "utf-8");
  console.log(`  -> ${outPath}`);
}
