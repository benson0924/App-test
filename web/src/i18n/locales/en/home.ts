import type { TranslationTree } from '@/i18n/types';

export const home: TranslationTree = {
  tag: '2026 Edition · Runs entirely in your browser — no installation required',
  title: 'Introduction to Quantum Computing — 2026',
  subtitle: 'From Classical Bits to Quantum Algorithms',
  description:
    'A self-contained, interactive textbook that builds quantum computing from the ground up. All {{labCount}} labs, the circuit builder, practice problems, and chapters run directly in your browser.',
  buttons: {
    startLearning: 'Start Learning',
    openPlayground: 'Open Playground ({{labCount}} Labs)',
    circuitBuilder: 'Circuit Builder',
    practice: 'Practice',
  },
  featuredLabs: {
    title: 'Interactive Labs — Operate directly in the browser',
    description:
      'Click any lab to start an interactive simulation (Bloch sphere, quantum gates, Grover, Shor, BB84, and more). {{labCount}} labs + circuit builder in total.',
    browseAll: 'Browse all {{labCount}} labs →',
    items: {
      'bloch-sphere': '3D Bloch Sphere',
      'circuit-builder': 'Circuit Builder',
      teleportation: 'Quantum Teleportation',
      grover: "Grover's Search",
      bb84: 'BB84 Protocol',
      shor: "Shor's Algorithm",
      'gate-explorer': 'Gate Explorer',
      'logic-gates': 'Logic Gates',
    },
  },
  allLabs: {
    title: 'All Interactive Labs',
    circuitBuilder: {
      tag: 'Circuits',
      title: 'Quantum Circuit Builder',
    },
  },
  learningPath: {
    title: 'Learning Path',
    description:
      'The curriculum follows a deliberate arc: classical foundations first, then the mathematics and physics of single- and multi-qubit systems, and finally quantum protocols and algorithms. Each chapter includes concept checks, worked examples, and links to interactive labs.',
    phases: {
      foundation: {
        name: 'Foundation',
        chapters: 'Classical Computing → Linear Algebra → One Qubit',
      },
      multiQubit: {
        name: 'Multi-Qubit World',
        chapters: 'Multiple Qubits → Quantum Circuits → Entanglement',
      },
      algorithms: {
        name: 'Algorithms & Beyond',
        chapters: 'Protocols → Algorithms → QFT → Shor → Modern Topics',
      },
    },
    browseAll: 'Browse all {{chapterCount}} chapters →',
  },
  learnCard: {
    title: 'Learn',
    description:
      'Structured chapters with intuitive explanations, mathematical formalism, worked examples, and concept checkpoints.',
    cta: 'Chapter 1: Classical Computing',
  },
  referenceCard: {
    title: 'Reference',
    description:
      'Gate cheat sheets, formula collections, complexity classes, glossary, and misconceptions.',
    cta: 'Gate Reference',
  },
  allChapters: {
    title: 'All Chapters',
  },
  researchCutoff: {
    label: 'Research cutoff:',
    text: 'September 2026. All simulations run in-browser — no download required.',
  },
  chapters: {
    classical: 'Classical Computing',
    oneQubit: 'One Qubit',
    linearAlgebra: 'Linear Algebra',
    multipleQubits: 'Multiple Qubits',
    circuits: 'Quantum Circuits',
    errorCorrection: 'Error Correction',
    entanglement: 'Entanglement',
    protocols: 'Quantum Protocols',
    algorithms: 'Quantum Algorithms',
    qft: 'Quantum Fourier Transform',
    phaseEstimation: 'Phase Estimation',
    shor: "Shor's Algorithm",
    modern: 'Modern Topics (2026)',
  },
  labChapters: {
    Classical: 'Classical',
    'One Qubit': 'One Qubit',
    'Linear Algebra': 'Linear Algebra',
    'Multiple Qubits': 'Multiple Qubits',
    QEC: 'QEC',
    Protocols: 'Protocols',
    Algorithms: 'Algorithms',
    Shor: 'Shor',
  },
  labs: {
    'binary-states': 'Binary State Explorer',
    'logic-gates': 'Logic Gate Simulator',
    'binary-adder': 'Binary Adder',
    'complex-plane': 'Complex Number Explorer',
    'qubit-state': 'Single-Qubit State Explorer',
    measurement: 'Measurement Simulator',
    'bloch-sphere': '3D Bloch Sphere',
    'gate-explorer': 'Quantum Gate Explorer',
    'unitary-checker': 'Matrix & Unitary Checker',
    'tensor-product': 'Tensor Product Calculator',
    'bell-states': 'Bell State Generator',
    entanglement: 'Entanglement Measurement',
    'error-correction': 'Error Correction Simulator',
    chsh: 'Bell/CHSH Experiment',
    superdense: 'Superdense Coding',
    teleportation: 'Quantum Teleportation',
    bb84: 'BB84 Simulator',
    deutsch: 'Deutsch Algorithm',
    'deutsch-jozsa': 'Deutsch–Jozsa',
    'bernstein-vazirani': 'Bernstein–Vazirani',
    simon: "Simon's Algorithm",
    grover: 'Grover Search',
    qft: 'QFT Visualizer',
    'phase-estimation': 'Phase Estimation',
    'period-finding': 'Period Explorer',
    shor: "Shor's Algorithm Demo",
  },
};
