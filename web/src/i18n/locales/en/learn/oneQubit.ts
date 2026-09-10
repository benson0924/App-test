import type { TranslationTree } from '@/i18n/types';

export const oneQubit: TranslationTree = {
  meta: {
    title: 'Chapter 2: The Qubit',
    intro:
      'A qubit is the fundamental unit of quantum information. Unlike a classical bit, it is described by complex amplitudes that can interfere. This chapter develops the language of superposition, measurement, alternative bases, phase, the Bloch sphere, and elementary gates — everything you need before combining qubits into larger systems.',
  },
  misconception: {
    myth: 'A qubit is simply both 0 and 1 at the same time.',
    correction:
      'A qubit is a normalized vector in ℂ². Measurement returns one classical outcome with probabilities |α|² and |β|². The amplitudes encode phase information that affects interference and non-Z measurements.',
  },
  sections: {
    'what-is-a-qubit': {
      title: '2.1 What Is a Qubit?',
      paragraphs: [
        'A classical bit lives in the set {0, 1}. A qubit lives in a two-dimensional complex vector space with orthonormal basis |0⟩ and |1⟩. The general pure state is a superposition:',
        'Normalization ensures total measurement probability equals 1. The global phase e^{iγ}|ψ⟩ is unobservable, but the relative phase between α and β is physically meaningful in non-Z bases.',
      ],
      checkpoints: [
        {
          question: 'How many real parameters describe a pure qubit, ignoring global phase?',
          answer: '2',
          hint: 'Think Bloch sphere angles θ and φ.',
        },
      ],
      examples: [
        {
          title: 'Equal superposition |+⟩',
          steps: [
            { label: 'Choose α = β = 1/√2.' },
            { label: 'Check normalization: 1/2 + 1/2 = 1.' },
            { label: 'This state is H|0⟩ = |+⟩.' },
            { label: 'Z measurement: P(0) = P(1) = 1/2.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Why two complex numbers?',
          paragraphs: [
            'Two real numbers would not suffice: quantum mechanics requires complex Hilbert spaces so that unitary evolution can implement rotations and interference. The Born rule uses |α|², but gates combine amplitudes with complex phases before squaring.',
          ],
        },
      ],
      labLink: 'Single-Qubit State Explorer',
    },
    'complex-amplitudes': {
      title: '2.2 Complex Amplitudes',
      paragraphs: [
        "Write z = a + bi with conjugate z* = a − bi, magnitude |z| = √(a² + b²), and polar form z = re^{iφ}. Euler's identity e^{iφ} = cos φ + i sin φ connects rotation to phase.",
      ],
      checkpoints: [],
      examples: [
        {
          title: 'Amplitude (2 + i)/√13',
          steps: [
            { label: 'Identify a = 2/√13, b = 1/√13.' },
            { label: 'Magnitude squared: |z|² = 4/13 + 1/13 = 5/13... wait, check: (4+1)/13 = 5/13 for single amplitude.' },
            { label: 'For a full state, both |α|² and |β|² must sum to 1.' },
          ],
        },
      ],
      expandables: [],
      labLink: 'Complex Number Explorer',
    },
    measurement: {
      title: '2.3 Measurement',
      paragraphs: [
        'Measuring in the Z basis yields outcome 0 with probability P(0) = |α|² and outcome 1 with P(1) = |β|². After observing 0, the state collapses to |0⟩; after 1, to |1⟩. This is the Born rule for projective measurement.',
      ],
      checkpoints: [
        {
          question: 'After measuring |ψ⟩ and obtaining 1, what is the post-measurement state?',
          answer: '|1⟩',
        },
      ],
      examples: [
        {
          title: 'State ( √3/2 |0⟩ + 1/2 |1⟩ )',
          steps: [
            { label: 'Identify α = √3/2, β = 1/2.' },
            { label: 'P(0) = (√3/2)² = 3/4.' },
            { label: 'P(1) = (1/2)² = 1/4.' },
            { label: 'Check: 3/4 + 1/4 = 1.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Full projection calculation for P(0)',
          paragraphs: [
            'Similarly ⟨1|ψ⟩ = β. The projector |0⟩⟨0| gives P(0) = ⟨ψ|0⟩⟨0|ψ⟩ = |α|².',
          ],
        },
      ],
      labLink: 'Measurement Simulator',
    },
    'other-bases': {
      title: '2.4 Other Measurement Bases',
      paragraphs: [
        'The X basis uses |+⟩ = (|0⟩ + |1⟩)/√2 and |−⟩ = (|0⟩ − |1⟩)/√2. The Y basis uses |i⟩ = (|0⟩ + i|1⟩)/√2 and |−i⟩ = (|0⟩ − i|1⟩)/√2. Rewrite any state in the chosen basis and square coefficient magnitudes for probabilities.',
      ],
      checkpoints: [],
      examples: [
        {
          title: 'Measuring |−⟩ in the X basis',
          steps: [
            { label: '|−⟩ is already an X-basis eigenstate.' },
            { label: 'Therefore P(−) = 1 with certainty.' },
            { label: 'In Z basis, P(0) = P(1) = 1/2 — same as |+⟩.' },
          ],
        },
      ],
      expandables: [],
      labLink: 'Measurement Simulator (basis selector)',
    },
    'global-relative-phase': {
      title: '2.5 Global and Relative Phase',
      paragraphs: [
        'Multiplying |ψ⟩ by e^{iγ} does not change any measurement probability in any basis. Relative phase between |0⟩ and |1⟩ components does matter: |+⟩ and (|0⟩ + i|1⟩)/√2 share Z statistics but differ in X and Y statistics and on the Bloch sphere.',
      ],
      checkpoints: [
        {
          question: 'Do |+⟩ and |−⟩ have the same Z-basis probabilities?',
          answer: 'yes',
          hint: 'Both are uniform superpositions with equal magnitude.',
        },
      ],
      examples: [],
      expandables: [],
      labLink: 'Single-Qubit State Explorer',
    },
    'bloch-sphere': {
      title: '2.6 The Bloch Sphere',
      paragraphs: [
        'Every pure qubit (up to global phase) maps to a point on the unit sphere with θ ∈ [0, π] and φ ∈ [0, 2π):',
      ],
      checkpoints: [],
      examples: [
        {
          title: '|0⟩ on the Bloch sphere',
          steps: [
            { label: 'θ = 0 ⇒ cos(θ/2) = 1, sin(θ/2) = 0.' },
            { label: 'Coordinates: x = y = 0, z = 1 (north pole).' },
          ],
        },
      ],
      expandables: [],
      table: {
        headerState: 'State',
        headerBloch: 'Bloch (x, y, z)',
      },
      labLink: '3D Bloch Sphere',
    },
    'one-qubit-gates': {
      title: '2.7 One-Qubit Gates',
      paragraphs: [
        'Gates are 2×2 unitary matrices. Pauli X flips |0⟩ ↔ |1⟩; Z adds a phase to |1⟩; H creates superposition. Important identities: X² = Y² = Z² = H² = I, S² = Z, T² = S.',
      ],
      checkpoints: [
        {
          question: 'What is H|+⟩?',
          answer: '|0⟩',
          hint: 'H is its own inverse: H² = I.',
        },
      ],
      examples: [],
      expandables: [
        {
          title: 'Geometric action on the Bloch sphere',
          paragraphs: [
            'X, Y, Z are 180° rotations about their respective axes.',
            'H maps Z-axis to X-axis (and back, since H² = I).',
            'S is 90° rotation about Z; T is 45° about Z.',
          ],
        },
      ],
      labLink: 'Quantum Gate Explorer',
    },
  },
  widgets: {
    basisProbability: {
      title: 'Basis probability calculator',
      reAlpha: 'Re(α): {{value}}',
      reBeta: 'Re(β): {{value}}',
      imBeta: 'Im(β): {{value}}',
      measurementBasis: 'Measurement basis',
      outcome: 'Outcome',
      probability: 'Probability',
      stateLabel: '|ψ⟩ = {{alpha}}|0⟩ + {{beta}}|1⟩',
    },
    relativePhase: {
      title: 'Relative phase slider',
      phiLabel: 'φ (radians): {{value}}',
      stateFormula: '|ψ⟩ = (|0⟩ + e^{iφ}|1⟩)/√2',
      zBasis: 'Z basis',
      xBasis: 'X basis',
      zUnchanged: 'P(0): {{before}}% vs {{after}}% — unchanged',
      xChanges: 'P(+): {{before}}% vs {{after}}% — changes with φ',
      blochY: 'Bloch y: {{before}} → {{after}} as φ varies',
    },
  },
  practice: [
    {
      question: 'Normalize (2|0⟩ + 3i|1⟩) and find P(0) in the Z basis.',
      answer: 'Norm is √13. P(0) = 4/13.',
    },
    {
      question: 'For |ψ⟩ = (|0⟩ − |1⟩)/√2, what is P(−) in the X basis?',
      answer: 'The state is |−⟩, so P(−) = 1.',
    },
    {
      question: 'Apply X then H to |0⟩. What is the result?',
      answer: 'X|0⟩ = |1⟩, H|1⟩ = |−⟩.',
    },
    {
      question: 'What Bloch coordinates does |i⟩ have?',
      answer: '(0, 1, 0) on the equator at +Y.',
    },
  ],
  nav: {
    prev: '← Classical Computing',
    next: 'Linear Algebra →',
  },
};
