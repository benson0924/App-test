#!/usr/bin/env node
/** Wires learn chapter pages with useChapterMeta and LearnSection imports/headers. */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const learnDir = join(__dirname, '../src/pages/learn');

const CHAPTER_MAP = {
  'ClassicalComputing.tsx': 'classical',
  'OneQubit.tsx': 'oneQubit',
  'LinearAlgebra.tsx': 'linearAlgebra',
  'MultipleQubits.tsx': 'multipleQubits',
  'QuantumCircuits.tsx': 'quantumCircuits',
  'ErrorCorrection.tsx': 'errorCorrection',
  'Entanglement.tsx': 'entanglement',
  'Protocols.tsx': 'protocols',
  'Algorithms.tsx': 'algorithms',
  'QFT.tsx': 'qft',
  'PhaseEstimation.tsx': 'phaseEstimation',
  'Shor.tsx': 'shor',
  'ModernTopics.tsx': 'modern',
};

const IMPORT_BLOCK = `import { useChapterMeta, LearnSection } from '@/components/LocalizedContent';
import { useT } from '@/context/LocaleContext';
`;

for (const [file, chapterKey] of Object.entries(CHAPTER_MAP)) {
  const path = join(learnDir, file);
  let src = readFileSync(path, 'utf8');
  if (src.includes('useChapterMeta')) {
    console.log('Skip (already wired):', file);
    continue;
  }

  if (!src.includes("from '@/components/LocalizedContent'")) {
    const firstImport = src.indexOf('import ');
    src = src.slice(0, firstImport) + IMPORT_BLOCK + src.slice(firstImport);
  }

  // Inject meta hook at start of default export
  src = src.replace(
    /export default function (\w+)\(\) \{\n/,
    `export default function $1() {\n  const { tag, title, intro } = useChapterMeta('${chapterKey}');\n  const t = useT();\n`
  );

  // Replace common hardcoded headers
  src = src.replace(/<span className="tag">Chapter \d+<\/span>\s*/g, '<span className="tag">{tag}</span>\n      ');
  src = src.replace(/<span className="tag">Ch\. \d+<\/span>\s*/g, '<span className="tag">{tag}</span>\n      ');
  src = src.replace(/<h1>[^<]+<\/h1>/, '<h1>{title}</h1>');
  src = src.replace(
    /<p style=\{\{ color: 'var\(--text-muted\)' \}\}>[\s\S]*?<\/p>\s*(?=<Section|<LearnSection)/,
    '<p style={{ color: \'var(--text-muted)\' }}>{intro}</p>\n\n      '
  );
  src = src.replace(
    /<p>\s*The Quantum Fourier Transform[\s\S]*?<\/p>\s*(?=<Section)/,
    '<p>{intro}</p>\n\n      '
  );

  writeFileSync(path, src);
  console.log('Wired header:', file);
}
