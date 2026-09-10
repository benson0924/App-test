import { useMemo, useCallback } from 'react';
import { useLocale } from '@/context/LocaleContext';
import {
  chapters,
  getChapterByPath,
  type ConceptLink,
  type ChapterCurriculum,
  type SectionCurriculum,
} from '@/data/curriculum';

export const PATH_TO_CHAPTER_KEY: Record<string, string> = {
  '/learn/classical': 'classical',
  '/learn/one-qubit': 'oneQubit',
  '/learn/linear-algebra': 'linearAlgebra',
  '/learn/multiple-qubits': 'multipleQubits',
  '/learn/circuits': 'circuits',
  '/learn/error-correction': 'errorCorrection',
  '/learn/entanglement': 'entanglement',
  '/learn/protocols': 'protocols',
  '/learn/algorithms': 'algorithms',
  '/learn/qft': 'qft',
  '/learn/phase-estimation': 'phaseEstimation',
  '/learn/shor': 'shor',
  '/learn/modern': 'modern',
};

/** Fallback map from English concept titles in curriculum.ts to curriculum.concepts.* keys */
const CONCEPT_TITLE_KEYS: Record<string, string> = {
  'Classical Computing': 'classicalComputing',
  'One Qubit': 'oneQubit',
  'Linear Algebra': 'linearAlgebra',
  'Multiple Qubits': 'multipleQubits',
  'Quantum Circuits': 'quantumCircuits',
  'Error Correction': 'errorCorrection',
  'Entanglement': 'entanglement',
  'Quantum Protocols': 'quantumProtocols',
  'Quantum Algorithms': 'quantumAlgorithms',
  'Quantum Fourier Transform': 'qft',
  'QFT': 'qft',
  'Phase Estimation': 'phaseEstimation',
  "Shor's Algorithm": 'shorsAlgorithm',
  'Modern Topics (2026)': 'modernTopics',
  'Modern Topics': 'modernTopics',
  Reference: 'reference',
  'Binary Numbers': 'binaryNumbers',
  'Binary State Explorer': 'binaryStateExplorer',
  'States and Information': 'statesAndInformation',
  'Logic Gates': 'logicGates',
  'Logic Gate Simulator': 'logicGateSimulator',
  'Boolean Algebra': 'booleanAlgebra',
  Adders: 'adders',
  'Binary Adder': 'binaryAdder',
  'Reversible Computation': 'reversibleComputation',
  'One-Qubit Gates': 'oneQubitGates',
  'Classical Error Correction': 'classicalErrorCorrection',
  'Quantum Error Correction': 'quantumErrorCorrection',
  'Computational Complexity': 'computationalComplexity',
  'Complexity Reference': 'complexityReference',
  'Turing Machines': 'turingMachines',
  'What Is a Qubit?': 'whatIsAQubit',
  'Complex Amplitudes': 'complexAmplitudes',
  'Complex Plane': 'complexPlane',
  'Qubit State Explorer': 'qubitStateExplorer',
  'Single-Qubit State Explorer': 'singleQubitStateExplorer',
  Measurement: 'measurement',
  'Measurement Simulator': 'measurementSimulator',
  'Other Bases': 'otherBases',
  'Other Measurement Bases': 'otherBases',
  'Global and Relative Phase': 'globalAndRelativePhase',
  'Bloch Sphere': 'blochSphere',
  '3D Bloch Sphere': 'threeDBlochSphere',
  'Unitary Matrices': 'unitaryMatrices',
  'Gate Explorer': 'gateExplorer',
  'Quantum Gate Explorer': 'quantumGateExplorer',
  'Matrix & Unitary Checker': 'matrixUnitaryChecker',
  'Unitary Checker': 'unitaryChecker',
  Kets: 'kets',
  Bras: 'bras',
  'Inner Products': 'innerProducts',
  'Projection and Measurement': 'projectionAndMeasurement',
  'Outer Products': 'outerProducts',
  'Tensor Products': 'tensorProducts',
  'Tensor Product Lab': 'tensorProductLab',
  'Tensor Product Calculator': 'tensorProductCalculator',
  'Kronecker Product': 'kroneckerProduct',
  'Bell Correlations': 'bellCorrelations',
  'Bell States': 'bellStates',
  'Bell State Generator': 'bellStateGenerator',
  'Entanglement Lab': 'entanglementLab',
  'Multi-Qubit Gates': 'multiQubitGates',
  'Circuit Model': 'circuitModel',
  'No-Cloning Theorem': 'noCloningTheorem',
  'Universal Gate Set': 'universalGateSet',
  'Circuit Builder': 'circuitBuilder',
  'Noise and Decoherence': 'noiseAndDecoherence',
  'Bit-Flip Code': 'bitFlipCode',
  'Three-Qubit Bit-Flip Code': 'threeQubitBitFlipCode',
  'Error Correction Simulator': 'errorCorrectionSimulator',
  'Phase-Flip Code': 'phaseFlipCode',
  'Shor Code': 'shorCode',
  'Shor Nine-Qubit Code': 'shorNineQubitCode',
  'Surface Codes': 'surfaceCodes',
  'EPR and Hidden Variables': 'eprAndHiddenVariables',
  'EPR and LHV': 'eprAndLhv',
  EPR: 'epr',
  'CHSH Inequality': 'chshInequality',
  CHSH: 'chsh',
  'CHSH Lab': 'chshLab',
  'Bell/CHSH Experiment': 'bellChshExperiment',
  'Correlation vs Causation': 'correlationVsCausation',
  'Partial Trace': 'partialTrace',
  'Superdense Coding': 'superdenseCoding',
  'Superdense Lab': 'superdenseLab',
  Teleportation: 'teleportation',
  'Teleportation Lab': 'teleportationLab',
  'Teleportation Simulator': 'teleportationLab',
  'Quantum Teleportation': 'quantumTeleportation',
  CNOT: 'cnot',
  'BB84 QKD': 'bb84Qkd',
  'BB84 Lab': 'bb84Lab',
  'BB84 Simulator': 'bb84Simulator',
  BB84: 'bb84',
  'Oracle Model': 'oracleModel',
  Deutsch: 'deutsch',
  'Deutsch Lab': 'deutschLab',
  'Deutsch Algorithm': 'deutschAlgorithm',
  'Deutsch–Jozsa': 'deutschJozsa',
  'Deutsch–Jozsa Lab': 'deutschJozsaLab',
  'Bernstein–Vazirani': 'bernsteinVazirani',
  'BV Lab': 'bvLab',
  "Simon's Algorithm": 'simonsAlgorithm',
  'Simon Lab': 'simonLab',
  "Grover's Search": 'groversSearch',
  'Grover Lab': 'groverLab',
  'Grover Search': 'groverSearch',
  Superposition: 'superposition',
  'Complexity Comparison': 'complexityComparison',
  Definition: 'definition',
  'QFT Visualizer': 'qftVisualizer',
  'Measurement Warning': 'measurementWarning',
  'Circuit Decomposition': 'circuitDecomposition',
  'Inverse QFT': 'inverseQft',
  'Period Finding Link': 'periodFindingLink',
  'Problem Statement': 'problemStatement',
  'Phase Estimation Lab': 'phaseEstimationLab',
  'Phase Estimation Simulator': 'phaseEstimationSimulator',
  'QPE Circuit': 'qpeCircuit',
  'Binary Fraction Readout': 'binaryFractionReadout',
  'Binary Readout': 'binaryReadout',
  'Worked Example φ=1/3': 'workedExamplePhi',
  'Precision vs Qubits': 'precisionVsQubits',
  'Role in Shor': 'roleInShor',
  'Period Finding Reduction': 'periodFindingReduction',
  'Period Explorer': 'periodExplorer',
  'From Period to Factors': 'fromPeriodToFactors',
  'Factoring 15 Demo': 'factoring15Demo',
  'Factoring 15': 'factoring15',
  'Shor Demo': 'shorDemo',
  'Cryptographic Impact': 'cryptographicImpact',
  'Post-Quantum Crypto': 'postQuantumCrypto',
  'Hardware Platforms': 'hardwarePlatforms',
  'Fault Tolerance': 'faultTolerance',
  'Noise Channels': 'noiseChannels',
  Noise: 'noise',
  'Error Mitigation': 'errorMitigation',
  'Simulation Limits': 'simulationLimits',
  'Resource Estimation': 'resourceEstimation',
  'Quantum Networking': 'quantumNetworking',
  'Post-Quantum Cryptography': 'postQuantumCryptography',
  'Software Ecosystem': 'softwareEcosystem',
  Threshold: 'threshold',
  'Fault Tolerance Status': 'faultToleranceStatus',
  'Quantum Advantage Benchmarks': 'quantumAdvantageBenchmarks',
  'Gate Reference': 'gateReference',
  'Gate Set': 'gateSet',
  'Gate Set & Universality': 'gateSet',
  'Depth & Cost': 'depthAndCost',
  'Circuit Depth': 'depthAndCost',
  'Period Finding': 'periodFinding',
};

function resolveLinkTitle(link: ConceptLink, t: (key: string) => string): string {
  const chapterKey = PATH_TO_CHAPTER_KEY[link.path];
  if (chapterKey && link.anchor) {
    const sectionTitle = t(`curriculum.${chapterKey}.sections.${link.anchor}`);
    if (sectionTitle !== `curriculum.${chapterKey}.sections.${link.anchor}`) return sectionTitle;
  }
  if (chapterKey && !link.anchor) {
    const title = t(`curriculum.${chapterKey}.title`);
    if (title !== `curriculum.${chapterKey}.title`) return title;
  }
  const playgroundMatch = link.path.match(/^\/playground\/([^/]+)$/);
  if (playgroundMatch) {
    const labId = playgroundMatch[1];
    const labTitle = t(`curriculum.labs.${labId}`);
    if (labTitle !== `curriculum.labs.${labId}`) return labTitle;
  }
  if (link.path === '/reference/complexity') {
    return t('curriculum.concepts.complexityReference');
  }
  if (link.path === '/reference/gates') {
    return t('curriculum.concepts.gateReference');
  }
  if (link.path === '/reference') {
    return t('curriculum.concepts.reference');
  }
  const conceptKey = CONCEPT_TITLE_KEYS[link.title];
  if (conceptKey) {
    const title = t(`curriculum.concepts.${conceptKey}`);
    if (title !== `curriculum.concepts.${conceptKey}`) return title;
  }
  return link.title;
}

export function useLocalizedCurriculum() {
  const { t } = useLocale();

  const getChapterTitle = useCallback(
    (path: string) => {
      const key = PATH_TO_CHAPTER_KEY[path];
      return key ? t(`curriculum.${key}.title`) : path;
    },
    [t]
  );

  const getSectionTitle = useCallback(
    (chapterPath: string, sectionId: string) => {
      const key = PATH_TO_CHAPTER_KEY[chapterPath];
      if (!key) return sectionId;
      const title = t(`curriculum.${key}.sections.${sectionId}`);
      return title !== `curriculum.${key}.sections.${sectionId}` ? title : sectionId;
    },
    [t]
  );

  const localizeLink = useCallback(
    (link: ConceptLink): ConceptLink => ({
      ...link,
      title: resolveLinkTitle(link, t),
    }),
    [t]
  );

  const localizeSection = useCallback(
    (section: SectionCurriculum, chapterPath: string): SectionCurriculum => ({
      ...section,
      title: getSectionTitle(chapterPath, section.id),
      prerequisites: section.prerequisites.map(localizeLink),
      nextConcepts: section.nextConcepts.map(localizeLink),
      labs: section.labs?.map((lab) => ({
        ...lab,
        title: t(`curriculum.labs.${lab.id}`) !== `curriculum.labs.${lab.id}`
          ? t(`curriculum.labs.${lab.id}`)
          : lab.title,
      })),
    }),
    [getSectionTitle, localizeLink, t]
  );

  const localizeChapter = useCallback(
    (chapter: ChapterCurriculum): ChapterCurriculum => ({
      ...chapter,
      title: getChapterTitle(chapter.path),
      sections: chapter.sections.map((s) => localizeSection(s, chapter.path)),
      prevChapter: chapter.prevChapter ? localizeLink(chapter.prevChapter) : undefined,
      nextChapter: chapter.nextChapter ? localizeLink(chapter.nextChapter) : undefined,
    }),
    [getChapterTitle, localizeLink, localizeSection]
  );

  const localizedChapters = useMemo(
    () => chapters.map(localizeChapter),
    [localizeChapter]
  );

  const searchIndex = useMemo(
    () =>
      localizedChapters.flatMap((ch) => [
        { title: ch.title, path: ch.path, type: 'chapter' as const },
        ...ch.sections.map((s) => ({
          title: `${ch.title}: ${s.title}`,
          path: `${ch.path}#${s.id}`,
          type: 'section' as const,
        })),
      ]),
    [localizedChapters]
  );

  const getLocalizedChapterByPath = useCallback(
    (path: string) => {
      const chapter = getChapterByPath(path);
      return chapter ? localizeChapter(chapter) : undefined;
    },
    [localizeChapter]
  );

  return {
    getChapterTitle,
    getSectionTitle,
    localizeLink,
    localizedChapters,
    searchIndex,
    getLocalizedChapterByPath,
  };
}
