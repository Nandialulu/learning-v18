import { readFileSync, writeFileSync } from "fs";

const mdPath = "C:/Users/User/Downloads/Mandakh/Mandakh/A/Fundamental of Finance/Claude outputs/CFA Эдийн засаг - 211 тестийн асуулт (Reading 12-18).md";
const flashcardsPath = new URL("../src/data/flashcards/economics.json", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const outPath = new URL("../src/data/quizzes/economics.json", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

const LABELS = { А: "a", Б: "b", В: "c", Г: "d" };

const flashcards = JSON.parse(readFileSync(flashcardsPath, "utf-8"));
const SLUGS = flashcards.topics.map((t) => t.id);
const TITLES = flashcards.topics.map((t) => t.title);

const md = readFileSync(mdPath, "utf-8");

const chunks = md
  .split(/^# /m)
  .slice(1)
  .filter((chunk) => /\*\*\d+\.\s*Асуулт:\*\*/.test(chunk));

if (chunks.length !== SLUGS.length) {
  console.error(`Expected ${SLUGS.length} topics, found ${chunks.length}`);
  process.exit(1);
}

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

const topics = chunks.map((chunk, i) => {
  const blocks = chunk.split(/\*\*\d+\.\s*Асуулт:\*\*/).slice(1);
  const questions = blocks.map((block, j) => {
    const optionRegex = /^([АБВГ])\)\s+(.+)$/gm;
    const options = [];
    let om;
    while ((om = optionRegex.exec(block)) !== null) {
      options.push({ label: LABELS[om[1]], text: om[2].trim() });
    }

    const firstOptionIdx = block.search(/^([АБВГ])\)/m);
    const rawQuestion = firstOptionIdx >= 0 ? block.slice(0, firstOptionIdx) : block;
    const question = cleanText(rawQuestion);

    const answerMatch = block.match(/\*\*Зөв хариулт:\*\*\s*([АБВГ])(?:\s*[—–-]\s*([\s\S]+))?$/);
    if (!answerMatch) {
      console.error(`[${SLUGS[i]}] Q${j + 1}: no answer found`);
      process.exit(1);
    }
    const correct = LABELS[answerMatch[1]];
    const explanation = answerMatch[2] ? cleanText(answerMatch[2]) : undefined;

    if (options.length < 2 || !options.some((o) => o.label === correct)) {
      console.error(`[${SLUGS[i]}] Q${j + 1}: bad options or correct label`);
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

  return { id: SLUGS[i], title: TITLES[i], questions };
});

const total = topics.reduce((sum, t) => sum + t.questions.length, 0);
topics.forEach((t) => console.log(`${t.id}: ${t.questions.length} questions`));
console.log(`Total: ${total}`);

writeFileSync(outPath, JSON.stringify({ topics }, null, 2) + "\n", "utf-8");
console.log(`Wrote ${outPath}`);
