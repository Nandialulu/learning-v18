import { readFileSync, writeFileSync } from "fs";

const DIR = "C:/Users/User/Downloads";
const projectRoot = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

const EXPECTED = [37, 19, 35, 43, 33, 23, 21];

const JOBS = [
  {
    locale: "ja",
    file: `${DIR}/CFA経済学クイズ - 211問 (日本語).md`,
    qLabel: "問題",
    aLabel: "正解",
  },
  {
    locale: "ko",
    file: `${DIR}/CFA 경제학 퀴즈 - 211문항 (한국어).md`,
    qLabel: "질문",
    aLabel: "정답",
  },
  {
    locale: "en",
    file: `${DIR}/CFA Economics Quiz - 211 questions (English).md`,
    qLabel: "Question",
    aLabel: "Correct Answer",
  },
];

function cleanText(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/^>\s?/, ""))
    .filter((line) => !/^\|[\s:|-]+\|?$/.test(line.trim()))
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("|")) {
        const cells = trimmed.replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
        return cells.join(" · ");
      }
      return trimmed;
    })
    .map((line) => line.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1"))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

for (const job of JOBS) {
  const flashcards = JSON.parse(
    readFileSync(`${projectRoot}/src/data/flashcards/economics-${job.locale}.json`, "utf-8")
  );
  const SLUGS = flashcards.topics.map((t) => t.id);
  const TITLES = flashcards.topics.map((t) => t.title);

  const md = readFileSync(job.file, "utf-8");

  const chunks = md
    .split(/^# /m)
    .slice(1)
    .filter((chunk) => new RegExp(`\\*\\*\\d+\\.\\s*${job.qLabel}:\\*\\*`).test(chunk));

  if (chunks.length !== SLUGS.length) {
    console.error(`[${job.locale}] Expected ${SLUGS.length} topics, found ${chunks.length}`);
    process.exit(1);
  }

  const questionSplit = new RegExp(`\\*\\*\\d+\\.\\s*${job.qLabel}:\\*\\*`);
  const answerRegex = new RegExp(
    `\\*\\*${job.aLabel}:\\*\\*\\s*([A-D])(?:\\s*[—–-]\\s*([\\s\\S]+))?$`
  );

  const topics = chunks.map((chunk, i) => {
    const blocks = chunk.split(questionSplit).slice(1);
    const questions = blocks.map((block, j) => {
      const answerMatch = block.match(answerRegex);
      if (!answerMatch) {
        console.error(`[${job.locale}/${SLUGS[i]}] Q${j + 1}: no answer found`);
        process.exit(1);
      }
      const answerIdx = block.search(new RegExp(`\\*\\*${job.aLabel}:\\*\\*`));
      const pre = block.slice(0, answerIdx);

      const optionRegex = /^([A-D])\)\s+(.+)$/gm;
      const options = [];
      let om;
      while ((om = optionRegex.exec(pre)) !== null) {
        options.push({ label: om[1].toLowerCase(), text: om[2].trim() });
      }

      const firstOptionIdx = pre.search(/^[A-D]\)/m);
      let qText = firstOptionIdx >= 0 ? pre.slice(0, firstOptionIdx) : pre;
      if (firstOptionIdx >= 0) {
        const trailing = pre
          .slice(firstOptionIdx)
          .split(/\r?\n/)
          .filter((line) => !/^[A-D]\)\s/.test(line.trim()) && line.trim() !== "")
          .join("\n");
        if (trailing) qText += "\n" + trailing;
      }
      const question = cleanText(qText);

      const correct = answerMatch[1].toLowerCase();
      const explanation = answerMatch[2] ? cleanText(answerMatch[2]) : undefined;

      if (options.length < 2 || !options.some((o) => o.label === correct)) {
        console.error(`[${job.locale}/${SLUGS[i]}] Q${j + 1}: bad options or correct label`);
        process.exit(1);
      }

      return {
        id: j + 1,
        type: "multiple-choice",
        question,
        options,
        correct,
        ...(explanation ? { explanation } : {}),
      };
    });

    if (questions.length !== EXPECTED[i]) {
      console.error(`[${job.locale}/${SLUGS[i]}] ${questions.length} questions, expected ${EXPECTED[i]}`);
      process.exit(1);
    }

    return { id: SLUGS[i], title: TITLES[i], questions };
  });

  const total = topics.reduce((sum, t) => sum + t.questions.length, 0);
  console.log(`[${job.locale}] ${total} questions`);
  topics.forEach((t) => console.log(`  ${t.id}: ${t.questions.length}`));

  const outPath = `${projectRoot}/src/data/quizzes/economics-${job.locale}.json`;
  writeFileSync(outPath, JSON.stringify({ topics }, null, 2) + "\n", "utf-8");
  console.log(`  -> ${outPath}`);
}
