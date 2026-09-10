import { useMemo } from 'react';
import { useLocale } from '@/context/LocaleContext';

/** Static learn nav paths — titles come from navigation.learnNav.* */
export const LEARN_NAV_ITEMS = [
  { key: 'classical', path: '/learn/classical' },
  { key: 'oneQubit', path: '/learn/one-qubit' },
  { key: 'linearAlgebra', path: '/learn/linear-algebra' },
  { key: 'multipleQubits', path: '/learn/multiple-qubits' },
  { key: 'circuits', path: '/learn/circuits' },
  { key: 'errorCorrection', path: '/learn/error-correction' },
  { key: 'entanglement', path: '/learn/entanglement' },
  { key: 'protocols', path: '/learn/protocols' },
  { key: 'algorithms', path: '/learn/algorithms' },
  { key: 'qft', path: '/learn/qft' },
  { key: 'phaseEstimation', path: '/learn/phase-estimation' },
  { key: 'shor', path: '/learn/shor' },
  { key: 'modern', path: '/learn/modern' },
] as const;

/** Static lab ids — titles from navigation.labs.*, chapters from navigation.labChapters.* */
export const LAB_ITEMS = [
  { id: 'binary-states', chapterKey: 'classical' },
  { id: 'logic-gates', chapterKey: 'classical' },
  { id: 'binary-adder', chapterKey: 'classical' },
  { id: 'complex-plane', chapterKey: 'oneQubit' },
  { id: 'qubit-state', chapterKey: 'oneQubit' },
  { id: 'measurement', chapterKey: 'oneQubit' },
  { id: 'bloch-sphere', chapterKey: 'oneQubit' },
  { id: 'gate-explorer', chapterKey: 'oneQubit' },
  { id: 'unitary-checker', chapterKey: 'linearAlgebra' },
  { id: 'tensor-product', chapterKey: 'multipleQubits' },
  { id: 'bell-states', chapterKey: 'multipleQubits' },
  { id: 'entanglement', chapterKey: 'multipleQubits' },
  { id: 'error-correction', chapterKey: 'qec' },
  { id: 'chsh', chapterKey: 'protocols' },
  { id: 'superdense', chapterKey: 'protocols' },
  { id: 'teleportation', chapterKey: 'protocols' },
  { id: 'bb84', chapterKey: 'protocols' },
  { id: 'deutsch', chapterKey: 'algorithms' },
  { id: 'deutsch-jozsa', chapterKey: 'algorithms' },
  { id: 'bernstein-vazirani', chapterKey: 'algorithms' },
  { id: 'simon', chapterKey: 'algorithms' },
  { id: 'grover', chapterKey: 'algorithms' },
  { id: 'qft', chapterKey: 'algorithms' },
  { id: 'phase-estimation', chapterKey: 'algorithms' },
  { id: 'period-finding', chapterKey: 'shor' },
  { id: 'shor', chapterKey: 'shor' },
] as const;

export const LAB_CHAPTER_ORDER = [
  'classical',
  'oneQubit',
  'linearAlgebra',
  'multipleQubits',
  'qec',
  'protocols',
  'algorithms',
  'shor',
] as const;

const GLOSSARY_KEYS = [
  'amplitude', 'ancilla', 'basis', 'bit', 'blochSphere', 'bqp', 'circuitDepth', 'cnot',
  'decoherence', 'entanglement', 'gate', 'globalPhase', 'hadamardGate', 'hilbertSpace',
  'ket', 'measurement', 'oracle', 'phase', 'qubit', 'superposition', 'tensorProduct', 'unitary',
] as const;

const MISCONCEPTION_KEYS = ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'] as const;

export function useLocalizedLearnNav() {
  const { t } = useLocale();
  return useMemo(
    () =>
      LEARN_NAV_ITEMS.map(({ key, path }) => ({
        path,
        title: t(`navigation.learnNav.${key}`),
      })),
    [t]
  );
}

export function useLocalizedLabs() {
  const { t } = useLocale();
  return useMemo(
    () =>
      LAB_ITEMS.map(({ id, chapterKey }) => ({
        id,
        title: t(`navigation.labs.${id}`),
        chapter: t(`navigation.labChapters.${chapterKey}`),
      })),
    [t]
  );
}

export function useLocalizedGlossary() {
  const { t } = useLocale();
  return useMemo(
    () =>
      GLOSSARY_KEYS.map((key) => ({
        term: t(`navigation.glossary.${key}.term`),
        definition: t(`navigation.glossary.${key}.definition`),
      })),
    [t]
  );
}

export function useLocalizedMisconceptions() {
  const { t } = useLocale();
  return useMemo(
    () =>
      MISCONCEPTION_KEYS.map((key) => ({
        myth: t(`navigation.misconceptions.${key}.myth`),
        correction: t(`navigation.misconceptions.${key}.correction`),
      })),
    [t]
  );
}
