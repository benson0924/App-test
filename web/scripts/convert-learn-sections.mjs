#!/usr/bin/env node
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

for (const [file, chapterKey] of Object.entries(CHAPTER_MAP)) {
  const path = join(learnDir, file);
  let src = readFileSync(path, 'utf8');

  if (!src.includes("from '@/components/LocalizedContent'")) {
    src = `import { useChapterMeta, LearnSection } from '@/components/LocalizedContent';\n` + src;
  }

  // Replace Section opening tags with LearnSection (strip title attribute)
  src = src.replace(
    /<Section\s+id="([^"]+)"\s+title="[^"]*"/g,
    `<LearnSection chapter="${chapterKey}" sectionId="$1"`
  );
  src = src.replace(/<\/Section>/g, '</LearnSection>');

  // Remove unused Section import if no longer used
  if (!src.includes('<Section ') && !src.includes('<Section>')) {
    src = src.replace(/import Section from '@\/components\/Section';\n/, '');
  }

  writeFileSync(path, src);
  console.log('Converted sections:', file);
}
