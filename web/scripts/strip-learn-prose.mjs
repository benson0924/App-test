#!/usr/bin/env node
/** Remove hardcoded <p> blocks inside LearnSection (prose comes from locale). Keeps Katex, widgets, Link. */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const learnDir = join(__dirname, '../src/pages/learn');

const files = readdirSync(learnDir).filter((f) => f.endsWith('.tsx') && f !== 'LearnIndex.tsx');

for (const file of files) {
  const path = join(learnDir, file);
  let src = readFileSync(path, 'utf8');
  const before = src;

  // Remove standalone paragraph blocks (8+ space indent typical in LearnSection children)
  src = src.replace(/\n[ \t]*<p(?:\s[^>]*)?>[\s\S]*?<\/p>\s*/g, '\n');

  // Remove article-level intro paragraph if useChapterMeta provides intro
  if (src.includes('useChapterMeta')) {
    src = src.replace(
      /\n[ \t]*<p style=\{\{ color: 'var\(--text-muted\)' \}\}>\{intro\}<\/p>\s*/,
      '\n'
    );
  }

  if (src !== before) {
    writeFileSync(path, src);
    console.log('Stripped prose:', file);
  }
}
