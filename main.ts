// autocorrect-fail-20261124 — Funniest Autocorrect Fail (make.fun one-liner)
// Writes exactly one line to entry.txt in MAKEFUN_OUTPUT_DIR (default /output).
// The line: a text to my wife, ruined by one word, delivered to the worst audience.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Texted my wife I'd pick up the kids after work — autocorrect changed it to 'I'll pick up the kinks' and sent it to the school group chat.";

// Gate: exactly one line, 1-199 chars, no trailing newline.
// The scorer requires UTF-8 text of 1-199 chars, not only whitespace,
// so we also reject an all-whitespace line and any embedded newline.
if (LINE.length < 1 || LINE.length > 199) {
  throw new Error(`entry length ${LINE.length} out of range 1-199`);
}
if (LINE.includes("\n") || LINE.trim() !== LINE || LINE.trim().length === 0) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
