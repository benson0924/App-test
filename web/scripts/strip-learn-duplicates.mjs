#!/usr/bin/env node
/** Remove duplicate Checkpoint/WorkedExample/Expandable from learn chapters (rendered by LocalizedSectionBody). */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const learnDir = join(__dirname, '../src/pages/learn');

const files = readdirSync(learnDir).filter((f) => f.endsWith('.tsx') && f !== 'LearnIndex.tsx');

for (const file of files) {
  const path = join(learnDir, file);
  let src = readFileSync(path, 'utf8');
  let changed = false;

  // Remove self-closing and block JSX for Checkpoint, WorkedExample, Expandable
  const blockRe = /[\t ]*<(Checkpoint|WorkedExample|Expandable)[\s\S]*?<\/\1>\n?/g;
  const newSrc = src.replace(blockRe, '');
  if (newSrc !== src) {
    src = newSrc;
    changed = true;
  }

  if (changed) {
    // Drop unused imports
    for (const comp of ['Checkpoint', 'WorkedExample', 'Expandable']) {
      if (!src.includes(`<${comp}`)) {
        src = src.replace(new RegExp(`import ${comp} from '@\\/components\\/${comp === 'WorkedExample' ? 'WorkedExample' : comp}';\\n`), '');
      }
    }
    writeFileSync(path, src);
    console.log('Stripped duplicates:', file);
  }
}
