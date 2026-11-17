import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const src = "C:/Users/User/Downloads/Санхүүгийн үндэс - quiz.md";
const out = "C:/Users/User/Downloads/opencode/erxes-skills-main/erxes-skills-main/content-plugin/headless/core/web/output/learning/src/data/quizzes/finance-basics.json";

const md = readFileSync(src, "utf-8");
const lines = md.split(/\r?\n/);

const questions = [];
let section = "";
let current = null;
let qId = 0;

function finalizeQuestion() {
  if (!current) return;
  const blockLines = current.lines;

  // Find options: lines that look like option lines
  const optionLines = [];
  const nonOptionLines = [];
  for (const line of blockLines) {
    // an option line starts with 4 spaces and an option label a-d.
    if (/^\s+[a-d]\.\s/.test(line.replace(/\*\*/g, ""))) {
      optionLines.push(line);
    } else {
      nonOptionLines.push(line);
    }
  }

  if (optionLines.length > 0) {
    // parse options
    const options = [];
    let correct = null;
    const allText = optionLines.join(" ");
    const regex = /(\*\*)?([a-d])\.\s*/g;
    let m;
    const parts = [];
    while ((m = regex.exec(allText)) !== null) {
      parts.push({ index: m.index, bold: !!m[1], label: m[2], end: regex.lastIndex });
    }
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      const start = p.end;
      const end = i + 1 < parts.length ? parts[i + 1].index : allText.length;
      let text = allText.slice(start, end).replace(/\*\*/g, "").trim();
      // remove trailing label of next option if any bleed
      text = text.replace(/\s+[a-d]\.$/, "").trim();
      options.push({ label: p.label, text });
      if (p.bold) correct = p.label;
    }
    current.type = options.length === 2 ? "true-false" : "multiple-choice";
    current.options = options;
    current.correct = correct;
  } else {
    // fill-in: find last bold value
    const full = blockLines.join("\n");
    const match = full.match(/\*\*(.+?)\*\*/);
    if (match) {
      current.type = "fill-in";
      current.correct = match[1].trim();
    } else {
      current.type = "fill-in";
      current.correct = "";
    }
  }

  current.question = current.question.replace(/^\s*\*\*\d+\.\*\*\s*/, "").trim();
  questions.push({
    id: current.id,
    section: current.section,
    type: current.type,
    question: current.question,
    ...(current.options ? { options: current.options } : {}),
    correct: current.correct,
  });
  current = null;
}

for (const rawLine of lines) {
  const line = rawLine.replace(/\u00A0/g, " ");
  if (/^##\s+[IV]+\s+ХЭСЭГ/.test(line)) {
    finalizeQuestion();
    section = line.replace(/^##\s+/, "").trim();
    continue;
  }
  const qMatch = line.match(/^(\s*)\*\*(\d+)\.\*\*\s*(.*)$/);
  if (qMatch) {
    finalizeQuestion();
    qId++;
    current = { id: qId, section, question: line, lines: [] };
    continue;
  }
  if (current) {
    current.lines.push(line);
  }
}
finalizeQuestion();

writeFileSync(out, JSON.stringify(questions, null, 2) + "\n");
console.log(`Wrote ${questions.length} questions to ${out}`);

// Print summary
const counts = {};
for (const q of questions) {
  counts[q.type] = (counts[q.type] || 0) + 1;
}
console.log(counts);
