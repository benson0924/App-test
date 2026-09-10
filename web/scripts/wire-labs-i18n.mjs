#!/usr/bin/env node
/** Adds useLabT/useLabSharedT to lab component files. */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const labsDir = join(__dirname, '../src/components/labs');

const LAB_IDS = {
  'BinaryStateExplorer.tsx': 'binary-states',
  'LogicGateSimulator.tsx': 'logic-gates',
  'BinaryAdderLab.tsx': 'binary-adder',
  'ComplexPlaneLab.tsx': 'complex-plane',
  'QubitStateLab.tsx': 'qubit-state',
  'MeasurementLab.tsx': 'measurement',
  'BlochSphereLab.tsx': 'bloch-sphere',
  'GateExplorerLab.tsx': 'gate-explorer',
  'UnitaryCheckerLab.tsx': 'unitary-checker',
  'TensorProductLab.tsx': 'tensor-product',
  'BellStateLab.tsx': 'bell-states',
  'EntanglementLab.tsx': 'entanglement',
  'ErrorCorrectionLab.tsx': 'error-correction',
  'CHSHLab.tsx': 'chsh',
  'SuperdenseLab.tsx': 'superdense',
  'TeleportationLab.tsx': 'teleportation',
  'BB84Lab.tsx': 'bb84',
  'DeutschLab.tsx': 'deutsch',
  'DeutschJozsaLab.tsx': 'deutsch-jozsa',
  'BernsteinVaziraniLab.tsx': 'bernstein-vazirani',
  'SimonLab.tsx': 'simon',
  'GroverLab.tsx': 'grover',
  'QFTLab.tsx': 'qft',
  'PhaseEstimationLab.tsx': 'phase-estimation',
  'PeriodFindingLab.tsx': 'period-finding',
  'ShorLab.tsx': 'shor',
};

for (const [file, labId] of Object.entries(LAB_IDS)) {
  const path = join(labsDir, file);
  let src = readFileSync(path, 'utf8');
  if (src.includes('useLabT(')) continue;

  if (!src.includes("from '@/i18n/hooks'")) {
    const importLine = "import { useLabT, useLabSharedT } from '@/i18n/hooks';\n";
    const reactImport = src.match(/^import .+ from 'react';?\n/m);
    if (reactImport) {
      src = src.replace(reactImport[0], reactImport[0] + importLine);
    } else {
      src = importLine + src;
    }
  }

  src = src.replace(
    /export default function (\w+)\(\) \{/,
    `export default function $1() {\n  const labT = useLabT('${labId}');\n  const sharedT = useLabSharedT();`
  );

  // Replace h3 titles that match lab title pattern - use labT('title')
  src = src.replace(/<h3>([^<]+)<\/h3>/, '<h3>{labT(\'title\')}</h3>');

  writeFileSync(path, src);
  console.log('Updated', file);
}

// Update labUtils
const utilsPath = join(labsDir, 'labUtils.tsx');
let utils = readFileSync(utilsPath, 'utf8');
if (!utils.includes('useLabSharedT')) {
  utils = utils.replace(
    "import { C, stateLabel, type StateVector } from 'quantum-core';",
    "import { C, stateLabel, type StateVector } from 'quantum-core';\nimport { useLabSharedT } from '@/i18n/hooks';"
  );
  utils = utils.replace(
    'export function StateVectorTable({ state }: { state: StateVector }) {',
    'export function StateVectorTable({ state }: { state: StateVector }) {\n  const sharedT = useLabSharedT();'
  );
  utils = utils.replace('<th>|ψ⟩</th>', '<th>{sharedT(\'stateColumn\')}</th>');
  utils = utils.replace('<th>Amplitude</th>', '<th>{sharedT(\'amplitude\')}</th>');
  utils = utils.replace('<th>|amp|²</th>', '<th>{sharedT(\'probSquared\')}</th>');
  writeFileSync(utilsPath, utils);
  console.log('Updated labUtils.tsx');
}
