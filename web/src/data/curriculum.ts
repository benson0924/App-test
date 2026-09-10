/** Unified curriculum graph: chapters, sections, prerequisites, next concepts, labs. */

export interface ConceptLink {
  title: string;
  path: string;
  anchor?: string;
}

export interface SectionCurriculum {
  id: string;
  title: string;
  prerequisites: ConceptLink[];
  nextConcepts: ConceptLink[];
  labs?: { id: string; title: string }[];
}

export interface ChapterCurriculum {
  path: string;
  title: string;
  chapterNumber: number;
  sections: SectionCurriculum[];
  prevChapter?: ConceptLink;
  nextChapter?: ConceptLink;
}

const L = (path: string, title: string, anchor?: string): ConceptLink => ({ path, title, anchor });

export const chapters: ChapterCurriculum[] = [
  {
    path: '/learn/classical',
    title: 'Classical Computing',
    chapterNumber: 1,
    nextChapter: L('/learn/one-qubit', 'One Qubit'),
    sections: [
      { id: 'states-and-information', title: 'States and Information', prerequisites: [], nextConcepts: [L('/learn/classical', 'Binary Numbers', 'binary-numbers'), L('/playground/binary-states', 'Binary State Explorer')], labs: [{ id: 'binary-states', title: 'Binary State Explorer' }] },
      { id: 'binary-numbers', title: 'Binary Numbers', prerequisites: [L('/learn/classical', 'States and Information', 'states-and-information')], nextConcepts: [L('/learn/classical', 'Logic Gates', 'logic-gates')] },
      { id: 'logic-gates', title: 'Logic Gates', prerequisites: [L('/learn/classical', 'Binary Numbers', 'binary-numbers')], nextConcepts: [L('/learn/classical', 'Boolean Algebra', 'boolean-algebra'), L('/playground/logic-gates', 'Logic Gate Simulator')], labs: [{ id: 'logic-gates', title: 'Logic Gate Simulator' }] },
      { id: 'boolean-algebra', title: 'Boolean Algebra', prerequisites: [L('/learn/classical', 'Logic Gates', 'logic-gates')], nextConcepts: [L('/learn/classical', 'Adders', 'adders')] },
      { id: 'adders', title: 'Adders', prerequisites: [L('/learn/classical', 'Logic Gates', 'logic-gates')], nextConcepts: [L('/learn/classical', 'Reversible Computation', 'reversible-computation'), L('/playground/binary-adder', 'Binary Adder')], labs: [{ id: 'binary-adder', title: 'Binary Adder' }] },
      { id: 'reversible-computation', title: 'Reversible Computation', prerequisites: [L('/learn/classical', 'Adders', 'adders')], nextConcepts: [L('/learn/one-qubit', 'One-Qubit Gates', 'one-qubit-gates')] },
      { id: 'classical-error-correction', title: 'Classical Error Correction', prerequisites: [L('/learn/classical', 'Logic Gates', 'logic-gates')], nextConcepts: [L('/learn/error-correction', 'Quantum Error Correction')] },
      { id: 'complexity', title: 'Computational Complexity', prerequisites: [L('/learn/classical', 'Binary Numbers', 'binary-numbers')], nextConcepts: [L('/learn/algorithms', 'Quantum Algorithms'), L('/reference/complexity', 'Complexity Reference')] },
      { id: 'turing-machines', title: 'Turing Machines', prerequisites: [L('/learn/classical', 'Computational Complexity', 'complexity')], nextConcepts: [L('/learn/one-qubit', 'What Is a Qubit?', 'what-is-a-qubit')] },
    ],
  },
  {
    path: '/learn/one-qubit',
    title: 'One Qubit',
    chapterNumber: 2,
    prevChapter: L('/learn/classical', 'Classical Computing'),
    nextChapter: L('/learn/linear-algebra', 'Linear Algebra'),
    sections: [
      { id: 'what-is-a-qubit', title: 'What Is a Qubit?', prerequisites: [L('/learn/classical', 'States and Information', '1.1')], nextConcepts: [L('/learn/one-qubit', 'Complex Amplitudes', 'complex-amplitudes'), L('/playground/qubit-state', 'Qubit State Explorer')], labs: [{ id: 'qubit-state', title: 'Single-Qubit State Explorer' }] },
      { id: 'complex-amplitudes', title: 'Complex Amplitudes', prerequisites: [L('/learn/one-qubit', 'What Is a Qubit?', 'what-is-a-qubit')], nextConcepts: [L('/learn/one-qubit', 'Measurement', 'measurement'), L('/playground/complex-plane', 'Complex Plane')], labs: [{ id: 'complex-plane', title: 'Complex Number Explorer' }] },
      { id: 'measurement', title: 'Measurement', prerequisites: [L('/learn/one-qubit', 'Complex Amplitudes', 'complex-amplitudes')], nextConcepts: [L('/learn/one-qubit', 'Other Bases', 'other-bases'), L('/playground/measurement', 'Measurement Simulator')], labs: [{ id: 'measurement', title: 'Measurement Simulator' }] },
      { id: 'other-bases', title: 'Other Measurement Bases', prerequisites: [L('/learn/one-qubit', 'Measurement', 'measurement')], nextConcepts: [L('/learn/one-qubit', 'Global and Relative Phase', 'global-relative-phase')] },
      { id: 'global-relative-phase', title: 'Global and Relative Phase', prerequisites: [L('/learn/one-qubit', 'Other Bases', 'other-bases')], nextConcepts: [L('/learn/one-qubit', 'Bloch Sphere', 'bloch-sphere')] },
      { id: 'bloch-sphere', title: 'The Bloch Sphere', prerequisites: [L('/learn/one-qubit', 'Global and Relative Phase', 'global-relative-phase')], nextConcepts: [L('/learn/one-qubit', 'One-Qubit Gates', 'one-qubit-gates'), L('/playground/bloch-sphere', '3D Bloch Sphere')], labs: [{ id: 'bloch-sphere', title: '3D Bloch Sphere' }] },
      { id: 'one-qubit-gates', title: 'One-Qubit Gates', prerequisites: [L('/learn/one-qubit', 'Bloch Sphere', 'bloch-sphere'), L('/learn/linear-algebra', 'Unitary Matrices', '3.6')], nextConcepts: [L('/learn/multiple-qubits', 'Multiple Qubits'), L('/playground/gate-explorer', 'Gate Explorer')], labs: [{ id: 'gate-explorer', title: 'Quantum Gate Explorer' }] },
    ],
  },
  {
    path: '/learn/linear-algebra',
    title: 'Linear Algebra',
    chapterNumber: 3,
    prevChapter: L('/learn/one-qubit', 'One Qubit'),
    nextChapter: L('/learn/multiple-qubits', 'Multiple Qubits'),
    sections: [
      { id: '3.1', title: 'Kets', prerequisites: [L('/learn/one-qubit', 'What Is a Qubit?', 'what-is-a-qubit')], nextConcepts: [L('/learn/linear-algebra', 'Bras', '3.2')] },
      { id: '3.2', title: 'Bras', prerequisites: [L('/learn/linear-algebra', 'Kets', '3.1')], nextConcepts: [L('/learn/linear-algebra', 'Inner Products', '3.3')] },
      { id: '3.3', title: 'Inner Products', prerequisites: [L('/learn/linear-algebra', 'Bras', '3.2')], nextConcepts: [L('/learn/linear-algebra', 'Projection and Measurement', '3.4')] },
      { id: '3.4', title: 'Projection and Measurement', prerequisites: [L('/learn/linear-algebra', 'Inner Products', '3.3'), L('/learn/one-qubit', 'Measurement', 'measurement')], nextConcepts: [L('/learn/linear-algebra', 'Outer Products', '3.5')] },
      { id: '3.5', title: 'Outer Products', prerequisites: [L('/learn/linear-algebra', 'Projection and Measurement', '3.4')], nextConcepts: [L('/learn/linear-algebra', 'Unitary Matrices', '3.6')] },
      { id: '3.6', title: 'Unitary Matrices', prerequisites: [L('/learn/linear-algebra', 'Outer Products', '3.5')], nextConcepts: [L('/learn/multiple-qubits', 'Tensor Products', '4.1'), L('/playground/unitary-checker', 'Unitary Checker')], labs: [{ id: 'unitary-checker', title: 'Matrix & Unitary Checker' }] },
    ],
  },
  {
    path: '/learn/multiple-qubits',
    title: 'Multiple Qubits',
    chapterNumber: 4,
    prevChapter: L('/learn/linear-algebra', 'Linear Algebra'),
    nextChapter: L('/learn/circuits', 'Quantum Circuits'),
    sections: [
      { id: '4.1', title: 'Tensor Products', prerequisites: [L('/learn/linear-algebra', 'Unitary Matrices', '3.6')], nextConcepts: [L('/learn/multiple-qubits', 'Kronecker Product', '4.2'), L('/playground/tensor-product', 'Tensor Product Lab')], labs: [{ id: 'tensor-product', title: 'Tensor Product Calculator' }] },
      { id: '4.2', title: 'Kronecker Product', prerequisites: [L('/learn/multiple-qubits', 'Tensor Products', '4.1')], nextConcepts: [L('/learn/multiple-qubits', 'Entanglement', '4.3')] },
      { id: '4.3', title: 'Entanglement', prerequisites: [L('/learn/multiple-qubits', 'Kronecker Product', '4.2')], nextConcepts: [L('/learn/entanglement', 'Bell Correlations'), L('/playground/bell-states', 'Bell States')], labs: [{ id: 'bell-states', title: 'Bell State Generator' }, { id: 'entanglement', title: 'Entanglement Lab' }] },
      { id: '4.4', title: 'Multi-Qubit Gates', prerequisites: [L('/learn/one-qubit', 'One-Qubit Gates', 'one-qubit-gates')], nextConcepts: [L('/learn/circuits', 'Circuit Model')] },
      { id: '4.5', title: 'No-Cloning Theorem', prerequisites: [L('/learn/multiple-qubits', 'Entanglement', '4.3')], nextConcepts: [L('/learn/error-correction', 'Quantum Error Correction')] },
      { id: '4.6', title: 'Universal Gate Set', prerequisites: [L('/learn/multiple-qubits', 'Multi-Qubit Gates', '4.4')], nextConcepts: [L('/learn/circuits', 'Quantum Circuits'), L('/playground/circuit-builder', 'Circuit Builder')] },
    ],
  },
  {
    path: '/learn/circuits',
    title: 'Quantum Circuits',
    chapterNumber: 6,
    prevChapter: L('/learn/multiple-qubits', 'Multiple Qubits'),
    nextChapter: L('/learn/error-correction', 'Error Correction'),
    sections: [
      { id: '6.1', title: 'Circuit Model', prerequisites: [L('/learn/multiple-qubits', 'Multi-Qubit Gates', '4.4')], nextConcepts: [L('/playground/circuit-builder', 'Circuit Builder')] },
      { id: '6.2', title: 'Bell Circuit Walkthrough', prerequisites: [L('/learn/multiple-qubits', 'Entanglement', '4.3')], nextConcepts: [L('/learn/circuits', 'Gate Set', '6.3')] },
      { id: '6.3', title: 'Gate Set & Universality', prerequisites: [L('/learn/one-qubit', 'One-Qubit Gates', 'one-qubit-gates')], nextConcepts: [L('/reference/gates', 'Gate Reference')] },
      { id: '6.4', title: 'State Vector Readout', prerequisites: [L('/learn/linear-algebra', 'Kets', '3.1')], nextConcepts: [L('/learn/circuits', 'Depth & Cost', '6.5')] },
      { id: '6.5', title: 'Circuit Depth', prerequisites: [L('/learn/classical', 'Adders', '1.5')], nextConcepts: [L('/learn/error-correction', 'Noise and Decoherence', '5.1')] },
    ],
  },
  {
    path: '/learn/error-correction',
    title: 'Error Correction',
    chapterNumber: 5,
    prevChapter: L('/learn/circuits', 'Quantum Circuits'),
    nextChapter: L('/learn/entanglement', 'Entanglement'),
    sections: [
      { id: '5.1', title: 'Noise and Decoherence', prerequisites: [L('/learn/one-qubit', 'Measurement', 'measurement')], nextConcepts: [L('/learn/error-correction', 'Bit-Flip Code', '5.2')] },
      { id: '5.2', title: 'Three-Qubit Bit-Flip Code', prerequisites: [L('/learn/classical', 'Classical Error Correction', '1.7')], nextConcepts: [L('/playground/error-correction', 'Error Correction Simulator')], labs: [{ id: 'error-correction', title: 'Error Correction Simulator' }] },
      { id: '5.3', title: 'Phase-Flip Code', prerequisites: [L('/learn/error-correction', 'Bit-Flip Code', '5.2')], nextConcepts: [L('/learn/error-correction', 'Shor Code', '5.4')] },
      { id: '5.4', title: 'Shor Nine-Qubit Code', prerequisites: [L('/learn/error-correction', 'Phase-Flip Code', '5.3')], nextConcepts: [L('/learn/modern', 'Surface Codes', '12.2')] },
    ],
  },
  {
    path: '/learn/entanglement',
    title: 'Entanglement',
    chapterNumber: 7,
    prevChapter: L('/learn/error-correction', 'Error Correction'),
    nextChapter: L('/learn/protocols', 'Quantum Protocols'),
    sections: [
      { id: '7.1', title: 'EPR and Hidden Variables', prerequisites: [L('/learn/multiple-qubits', 'Entanglement', '4.3')], nextConcepts: [L('/learn/entanglement', 'Bell States', '7.2')] },
      { id: '7.2', title: 'Bell States', prerequisites: [L('/learn/multiple-qubits', 'Entanglement', '4.3')], nextConcepts: [L('/learn/protocols', 'CHSH Inequality', '7.2')] },
      { id: '7.3', title: 'Correlation vs Causation', prerequisites: [L('/learn/entanglement', 'Bell States', '7.2')], nextConcepts: [L('/learn/protocols', 'Superdense Coding', '7.3')] },
      { id: '7.4', title: 'Partial Trace', prerequisites: [L('/learn/linear-algebra', 'Inner Products', '3.3')], nextConcepts: [L('/learn/protocols', 'Teleportation', '7.4')] },
    ],
  },
  {
    path: '/learn/protocols',
    title: 'Quantum Protocols',
    chapterNumber: 7,
    prevChapter: L('/learn/entanglement', 'Entanglement'),
    nextChapter: L('/learn/algorithms', 'Quantum Algorithms'),
    sections: [
      { id: '7.1', title: 'EPR and LHV', prerequisites: [L('/learn/entanglement', 'EPR', '7.1')], nextConcepts: [L('/learn/protocols', 'CHSH', '7.2'), L('/playground/chsh', 'CHSH Lab')], labs: [{ id: 'chsh', title: 'Bell/CHSH Experiment' }] },
      { id: '7.2', title: 'CHSH Inequality', prerequisites: [L('/learn/entanglement', 'Bell States', '7.2')], nextConcepts: [L('/learn/protocols', 'Superdense Coding', '7.3')] },
      { id: '7.3', title: 'Superdense Coding', prerequisites: [L('/learn/multiple-qubits', 'Entanglement', '4.3')], nextConcepts: [L('/playground/superdense', 'Superdense Lab')], labs: [{ id: 'superdense', title: 'Superdense Coding' }] },
      { id: '7.4', title: 'Quantum Teleportation', prerequisites: [L('/learn/multiple-qubits', 'CNOT', '4.4'), L('/learn/one-qubit', 'One-Qubit Gates', 'one-qubit-gates')], nextConcepts: [L('/playground/teleportation', 'Teleportation Lab')], labs: [{ id: 'teleportation', title: 'Teleportation Simulator' }] },
      { id: '7.5', title: 'BB84 QKD', prerequisites: [L('/learn/one-qubit', 'Other Bases', 'other-bases')], nextConcepts: [L('/playground/bb84', 'BB84 Lab'), L('/learn/algorithms', 'Oracle Model', '8.1')], labs: [{ id: 'bb84', title: 'BB84 Simulator' }] },
    ],
  },
  {
    path: '/learn/algorithms',
    title: 'Quantum Algorithms',
    chapterNumber: 8,
    prevChapter: L('/learn/protocols', 'Quantum Protocols'),
    nextChapter: L('/learn/qft', 'Quantum Fourier Transform'),
    sections: [
      { id: '8.1', title: 'Oracle Model', prerequisites: [L('/learn/circuits', 'Circuit Model', '6.1')], nextConcepts: [L('/learn/algorithms', 'Deutsch', '8.2'), L('/playground/deutsch', 'Deutsch Lab')], labs: [{ id: 'deutsch', title: 'Deutsch Algorithm' }] },
      { id: '8.2', title: 'Deutsch Algorithm', prerequisites: [L('/learn/algorithms', 'Oracle Model', '8.1')], nextConcepts: [L('/playground/deutsch-jozsa', 'Deutsch–Jozsa Lab')], labs: [{ id: 'deutsch-jozsa', title: 'Deutsch–Jozsa' }] },
      { id: '8.3', title: 'Deutsch–Jozsa', prerequisites: [L('/learn/algorithms', 'Deutsch', '8.2')], nextConcepts: [L('/learn/algorithms', 'Bernstein–Vazirani', '8.4')] },
      { id: '8.4', title: 'Bernstein–Vazirani', prerequisites: [L('/learn/algorithms', 'Deutsch–Jozsa', '8.3')], nextConcepts: [L('/playground/bernstein-vazirani', 'BV Lab')], labs: [{ id: 'bernstein-vazirani', title: 'Bernstein–Vazirani' }] },
      { id: '8.5', title: "Simon's Algorithm", prerequisites: [L('/learn/linear-algebra', 'Inner Products', '3.3')], nextConcepts: [L('/playground/simon', 'Simon Lab')], labs: [{ id: 'simon', title: "Simon's Algorithm" }] },
      { id: '8.6', title: "Grover's Search", prerequisites: [L('/learn/one-qubit', 'Superposition', 'what-is-a-qubit')], nextConcepts: [L('/playground/grover', 'Grover Lab'), L('/learn/qft', 'QFT')], labs: [{ id: 'grover', title: 'Grover Search' }] },
      { id: '8.7', title: 'Complexity Comparison', prerequisites: [L('/learn/classical', 'Complexity', '1.8')], nextConcepts: [L('/reference/complexity', 'Complexity Reference')] },
    ],
  },
  {
    path: '/learn/qft',
    title: 'Quantum Fourier Transform',
    chapterNumber: 9,
    prevChapter: L('/learn/algorithms', 'Quantum Algorithms'),
    nextChapter: L('/learn/phase-estimation', 'Phase Estimation'),
    sections: [
      { id: '9.1', title: 'Definition', prerequisites: [L('/learn/linear-algebra', 'Unitary Matrices', '3.6')], nextConcepts: [L('/playground/qft', 'QFT Visualizer')], labs: [{ id: 'qft', title: 'QFT Visualizer' }] },
      { id: '9.2', title: 'Measurement Warning', prerequisites: [L('/learn/one-qubit', 'Measurement', 'measurement')], nextConcepts: [L('/learn/qft', 'Circuit Decomposition', '9.3')] },
      { id: '9.3', title: 'Circuit Decomposition', prerequisites: [L('/learn/circuits', 'Gate Set', '6.3')], nextConcepts: [L('/learn/qft', 'Inverse QFT', '9.4')] },
      { id: '9.4', title: 'Inverse QFT', prerequisites: [L('/learn/qft', 'Definition', '9.1')], nextConcepts: [L('/learn/phase-estimation', 'Phase Estimation')] },
      { id: '9.5', title: 'Period Finding Link', prerequisites: [L('/learn/algorithms', "Simon's Algorithm", '8.5')], nextConcepts: [L('/learn/shor', "Shor's Algorithm")] },
    ],
  },
  {
    path: '/learn/phase-estimation',
    title: 'Phase Estimation',
    chapterNumber: 10,
    prevChapter: L('/learn/qft', 'QFT'),
    nextChapter: L('/learn/shor', "Shor's Algorithm"),
    sections: [
      { id: '10.1', title: 'Problem Statement', prerequisites: [L('/learn/qft', 'Definition', '9.1')], nextConcepts: [L('/playground/phase-estimation', 'Phase Estimation Lab')], labs: [{ id: 'phase-estimation', title: 'Phase Estimation Simulator' }] },
      { id: '10.2', title: 'QPE Circuit', prerequisites: [L('/learn/qft', 'Circuit Decomposition', '9.3')], nextConcepts: [L('/learn/phase-estimation', 'Binary Readout', '10.3')] },
      { id: '10.3', title: 'Binary Fraction Readout', prerequisites: [L('/learn/classical', 'Binary Numbers', '1.2')], nextConcepts: [L('/learn/phase-estimation', 'Worked Example', '10.4')] },
      { id: '10.4', title: 'Worked Example φ=1/3', prerequisites: [L('/learn/phase-estimation', 'Binary Readout', '10.3')], nextConcepts: [L('/learn/shor', 'Period Finding', '11.1')] },
      { id: '10.5', title: 'Precision vs Qubits', prerequisites: [L('/learn/phase-estimation', 'QPE Circuit', '10.2')], nextConcepts: [L('/learn/shor', "Shor's Algorithm")] },
      { id: '10.6', title: 'Role in Shor', prerequisites: [L('/learn/qft', 'Period Finding Link', '9.5')], nextConcepts: [L('/learn/shor', "Shor's Algorithm")] },
    ],
  },
  {
    path: '/learn/shor',
    title: "Shor's Algorithm",
    chapterNumber: 11,
    prevChapter: L('/learn/phase-estimation', 'Phase Estimation'),
    nextChapter: L('/learn/modern', 'Modern Topics'),
    sections: [
      { id: '11.1', title: 'Period Finding Reduction', prerequisites: [L('/learn/phase-estimation', 'Phase Estimation'), L('/learn/qft', 'QFT')], nextConcepts: [L('/playground/period-finding', 'Period Explorer')], labs: [{ id: 'period-finding', title: 'Period Explorer' }, { id: 'shor', title: "Shor Demo" }] },
      { id: '11.2', title: 'From Period to Factors', prerequisites: [L('/learn/shor', 'Period Finding', '11.1')], nextConcepts: [L('/learn/shor', 'Factoring 15', '11.3')] },
      { id: '11.3', title: 'Factoring 15 Demo', prerequisites: [L('/learn/shor', 'From Period to Factors', '11.2')], nextConcepts: [L('/playground/shor', "Shor Demo")] },
      { id: '11.4', title: 'Complexity', prerequisites: [L('/learn/classical', 'Complexity', '1.8')], nextConcepts: [L('/reference/complexity', 'Complexity Reference')] },
      { id: '11.5', title: 'Cryptographic Impact', prerequisites: [L('/learn/shor', 'Factoring 15', '11.3')], nextConcepts: [L('/learn/modern', 'Post-Quantum Crypto', '12.8')] },
    ],
  },
  {
    path: '/learn/modern',
    title: 'Modern Topics (2026)',
    chapterNumber: 12,
    prevChapter: L('/learn/shor', "Shor's Algorithm"),
    nextChapter: L('/reference', 'Reference'),
    sections: [
      { id: '12.1', title: 'Hardware Platforms', prerequisites: [L('/learn/one-qubit', 'What Is a Qubit?', 'what-is-a-qubit')], nextConcepts: [L('/learn/modern', 'Surface Codes', '12.2')] },
      { id: '12.2', title: 'Surface Codes', prerequisites: [L('/learn/error-correction', 'Shor Code', '5.4')], nextConcepts: [L('/learn/modern', 'Fault Tolerance', '12.10')] },
      { id: '12.3', title: 'Noise Channels', prerequisites: [L('/learn/error-correction', 'Noise', '5.1')], nextConcepts: [L('/learn/modern', 'Error Mitigation', '12.4')] },
      { id: '12.4', title: 'Error Mitigation', prerequisites: [L('/learn/error-correction', 'Error Correction')], nextConcepts: [L('/learn/modern', 'Simulation Limits', '12.5')] },
      { id: '12.5', title: 'Simulation Limits', prerequisites: [L('/learn/multiple-qubits', 'Tensor Products', '4.1')], nextConcepts: [L('/learn/modern', 'Resource Estimation', '12.6')] },
      { id: '12.6', title: 'Resource Estimation', prerequisites: [L('/learn/shor', "Shor's Algorithm")], nextConcepts: [L('/learn/modern', 'Networking', '12.7')] },
      { id: '12.7', title: 'Quantum Networking', prerequisites: [L('/learn/protocols', 'BB84', '7.5')], nextConcepts: [L('/learn/modern', 'Post-Quantum Crypto', '12.8')] },
      { id: '12.8', title: 'Post-Quantum Cryptography', prerequisites: [L('/learn/shor', 'Cryptographic Impact', '11.5')], nextConcepts: [L('/learn/modern', 'Software Ecosystem', '12.9')] },
      { id: '12.9', title: 'Software Ecosystem', prerequisites: [L('/learn/circuits', 'Circuit Model', '6.1')], nextConcepts: [L('/playground/circuit-builder', 'Circuit Builder')] },
      { id: '12.10', title: 'Fault Tolerance Status', prerequisites: [L('/learn/error-correction', 'Threshold', '5.4')], nextConcepts: [L('/learn/modern', 'Quantum Advantage', '12.11')] },
      { id: '12.11', title: 'Quantum Advantage Benchmarks', prerequisites: [L('/learn/algorithms', 'Complexity Comparison', '8.7')], nextConcepts: [L('/reference', 'Reference')] },
    ],
  },
];

export function getChapterByPath(path: string): ChapterCurriculum | undefined {
  return chapters.find((c) => c.path === path);
}

export function getSectionMeta(chapterPath: string, sectionId: string): SectionCurriculum | undefined {
  return getChapterByPath(chapterPath)?.sections.find((s) => s.id === sectionId);
}

export function linkHref(link: ConceptLink): string {
  return link.anchor ? `${link.path}#${link.anchor}` : link.path;
}

/** Flat search index for global search. */
export const searchIndex: { title: string; path: string; type: 'chapter' | 'section' | 'lab'; snippet?: string }[] = [
  ...chapters.flatMap((ch) => [
    { title: ch.title, path: ch.path, type: 'chapter' as const },
    ...ch.sections.map((s) => ({
      title: `${ch.title}: ${s.title}`,
      path: `${ch.path}#${s.id}`,
      type: 'section' as const,
    })),
  ]),
];
