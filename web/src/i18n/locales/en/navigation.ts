import type { TranslationTree } from '@/i18n/types';

export const navigation: TranslationTree = {
  learnNav: {
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
    classical: 'Classical',
    oneQubit: 'One Qubit',
    linearAlgebra: 'Linear Algebra',
    multipleQubits: 'Multiple Qubits',
    qec: 'QEC',
    protocols: 'Protocols',
    algorithms: 'Algorithms',
    shor: 'Shor',
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
  glossary: {
    amplitude: {
      term: 'Amplitude',
      definition: 'A complex coefficient associated with a quantum basis state.',
    },
    ancilla: {
      term: 'Ancilla',
      definition: 'An additional qubit used temporarily during a computation.',
    },
    basis: {
      term: 'Basis',
      definition: 'A set of orthonormal vectors used to represent a state.',
    },
    bit: {
      term: 'Bit',
      definition: 'Classical two-state information unit.',
    },
    blochSphere: {
      term: 'Bloch sphere',
      definition: 'Geometric representation of pure single-qubit states.',
    },
    bqp: {
      term: 'BQP',
      definition: 'Complexity class of decision problems efficiently solvable by a bounded-error quantum computer.',
    },
    circuitDepth: {
      term: 'Circuit depth',
      definition: 'Number of sequential layers of operations required by a circuit.',
    },
    cnot: {
      term: 'CNOT',
      definition: 'Controlled-X gate.',
    },
    decoherence: {
      term: 'Decoherence',
      definition: 'Loss of quantum coherence through interaction with the environment.',
    },
    entanglement: {
      term: 'Entanglement',
      definition: 'Quantum correlation that cannot be expressed as a product of individual subsystem states.',
    },
    gate: {
      term: 'Gate',
      definition: 'Operation applied to classical bits or quantum states.',
    },
    globalPhase: {
      term: 'Global phase',
      definition: 'An overall complex phase that does not change observable predictions.',
    },
    hadamardGate: {
      term: 'Hadamard gate',
      definition: 'Single-qubit gate that transforms between Z and X bases.',
    },
    hilbertSpace: {
      term: 'Hilbert space',
      definition: 'Complex vector space in which quantum states are represented.',
    },
    ket: {
      term: 'Ket',
      definition: 'Dirac notation |ψ⟩ for a state vector.',
    },
    measurement: {
      term: 'Measurement',
      definition: 'Process producing classical outcomes according to quantum probabilities.',
    },
    oracle: {
      term: 'Oracle',
      definition: 'Black-box operation representing a function queried by an algorithm.',
    },
    phase: {
      term: 'Phase',
      definition: 'Angular component of a complex amplitude.',
    },
    qubit: {
      term: 'Qubit',
      definition: 'Fundamental two-level quantum information unit.',
    },
    superposition: {
      term: 'Superposition',
      definition: 'Linear combination of basis states.',
    },
    tensorProduct: {
      term: 'Tensor product',
      definition: 'Mathematical operation for combining quantum systems.',
    },
    unitary: {
      term: 'Unitary',
      definition: 'Norm-preserving reversible linear operation.',
    },
  },
  misconceptions: {
    q0: {
      myth: 'A qubit stores an infinite amount of readable classical information.',
      correction: 'Although a pure qubit requires continuous amplitudes to describe mathematically, a single measurement does not reveal those amplitudes.',
    },
    q1: {
      myth: 'Superposition means we can inspect every possible answer simultaneously.',
      correction: 'Quantum algorithms manipulate amplitudes so interference increases probabilities of useful outputs.',
    },
    q2: {
      myth: 'Measurement merely reveals which value the qubit secretly had.',
      correction: 'That classical interpretation does not generally reproduce quantum measurement statistics.',
    },
    q3: {
      myth: 'Entanglement sends messages faster than light.',
      correction: 'Entanglement creates correlations, but usable communication still obeys the no-signaling principle.',
    },
    q4: {
      myth: 'Quantum teleportation moves matter.',
      correction: 'It transfers a quantum state using shared entanglement and classical communication.',
    },
    q5: {
      myth: 'Quantum computers will replace classical computers.',
      correction: 'Quantum processors are specialized systems that generally operate together with classical computers.',
    },
    q6: {
      myth: 'Grover search instantly searches every database entry.',
      correction: 'Grover provides a quadratic query advantage: O(N) → O(√N).',
    },
    q7: {
      myth: "Shor's algorithm means every encryption system becomes useless.",
      correction: 'Shor targets mathematical structures underlying systems such as RSA; other cryptographic approaches use different assumptions.',
    },
  },
};
