export interface NavItem {
  title: string;
  path: string;
  children?: NavItem[];
}

export const learnNav: NavItem[] = [
  { title: 'Classical Computing', path: '/learn/classical' },
  { title: 'One Qubit', path: '/learn/one-qubit' },
  { title: 'Linear Algebra', path: '/learn/linear-algebra' },
  { title: 'Multiple Qubits', path: '/learn/multiple-qubits' },
  { title: 'Quantum Circuits', path: '/learn/circuits' },
  { title: 'Error Correction', path: '/learn/error-correction' },
  { title: 'Entanglement', path: '/learn/entanglement' },
  { title: 'Quantum Protocols', path: '/learn/protocols' },
  { title: 'Quantum Algorithms', path: '/learn/algorithms' },
  { title: 'Quantum Fourier Transform', path: '/learn/qft' },
  { title: 'Phase Estimation', path: '/learn/phase-estimation' },
  { title: "Shor's Algorithm", path: '/learn/shor' },
  { title: 'Modern Topics (2026)', path: '/learn/modern' },
];

export interface LabDef {
  id: string;
  title: string;
  chapter: string;
}

export const labs: LabDef[] = [
  { id: 'binary-states', title: 'Binary State Explorer', chapter: 'Classical' },
  { id: 'logic-gates', title: 'Logic Gate Simulator', chapter: 'Classical' },
  { id: 'binary-adder', title: 'Binary Adder', chapter: 'Classical' },
  { id: 'complex-plane', title: 'Complex Number Explorer', chapter: 'One Qubit' },
  { id: 'qubit-state', title: 'Single-Qubit State Explorer', chapter: 'One Qubit' },
  { id: 'measurement', title: 'Measurement Simulator', chapter: 'One Qubit' },
  { id: 'bloch-sphere', title: '3D Bloch Sphere', chapter: 'One Qubit' },
  { id: 'gate-explorer', title: 'Quantum Gate Explorer', chapter: 'One Qubit' },
  { id: 'unitary-checker', title: 'Matrix & Unitary Checker', chapter: 'Linear Algebra' },
  { id: 'tensor-product', title: 'Tensor Product Calculator', chapter: 'Multiple Qubits' },
  { id: 'bell-states', title: 'Bell State Generator', chapter: 'Multiple Qubits' },
  { id: 'entanglement', title: 'Entanglement Measurement', chapter: 'Multiple Qubits' },
  { id: 'error-correction', title: 'Error Correction Simulator', chapter: 'QEC' },
  { id: 'chsh', title: 'Bell/CHSH Experiment', chapter: 'Protocols' },
  { id: 'superdense', title: 'Superdense Coding', chapter: 'Protocols' },
  { id: 'teleportation', title: 'Quantum Teleportation', chapter: 'Protocols' },
  { id: 'bb84', title: 'BB84 Simulator', chapter: 'Protocols' },
  { id: 'deutsch', title: 'Deutsch Algorithm', chapter: 'Algorithms' },
  { id: 'deutsch-jozsa', title: 'Deutsch–Jozsa', chapter: 'Algorithms' },
  { id: 'bernstein-vazirani', title: 'Bernstein–Vazirani', chapter: 'Algorithms' },
  { id: 'simon', title: "Simon's Algorithm", chapter: 'Algorithms' },
  { id: 'grover', title: 'Grover Search', chapter: 'Algorithms' },
  { id: 'qft', title: 'QFT Visualizer', chapter: 'Algorithms' },
  { id: 'phase-estimation', title: 'Phase Estimation', chapter: 'Algorithms' },
  { id: 'period-finding', title: 'Period Explorer', chapter: 'Shor' },
  { id: 'shor', title: "Shor's Algorithm Demo", chapter: 'Shor' },
];

export const glossary: { term: string; definition: string }[] = [
  { term: 'Amplitude', definition: 'A complex coefficient associated with a quantum basis state.' },
  { term: 'Ancilla', definition: 'An additional qubit used temporarily during a computation.' },
  { term: 'Basis', definition: 'A set of orthonormal vectors used to represent a state.' },
  { term: 'Bit', definition: 'Classical two-state information unit.' },
  { term: 'Bloch sphere', definition: 'Geometric representation of pure single-qubit states.' },
  { term: 'BQP', definition: 'Complexity class of decision problems efficiently solvable by a bounded-error quantum computer.' },
  { term: 'Circuit depth', definition: 'Number of sequential layers of operations required by a circuit.' },
  { term: 'CNOT', definition: 'Controlled-X gate.' },
  { term: 'Decoherence', definition: 'Loss of quantum coherence through interaction with the environment.' },
  { term: 'Entanglement', definition: 'Quantum correlation that cannot be expressed as a product of individual subsystem states.' },
  { term: 'Gate', definition: 'Operation applied to classical bits or quantum states.' },
  { term: 'Global phase', definition: 'An overall complex phase that does not change observable predictions.' },
  { term: 'Hadamard gate', definition: 'Single-qubit gate that transforms between Z and X bases.' },
  { term: 'Hilbert space', definition: 'Complex vector space in which quantum states are represented.' },
  { term: 'Ket', definition: 'Dirac notation |ψ⟩ for a state vector.' },
  { term: 'Measurement', definition: 'Process producing classical outcomes according to quantum probabilities.' },
  { term: 'Oracle', definition: 'Black-box operation representing a function queried by an algorithm.' },
  { term: 'Phase', definition: 'Angular component of a complex amplitude.' },
  { term: 'Qubit', definition: 'Fundamental two-level quantum information unit.' },
  { term: 'Superposition', definition: 'Linear combination of basis states.' },
  { term: 'Tensor product', definition: 'Mathematical operation for combining quantum systems.' },
  { term: 'Unitary', definition: 'Norm-preserving reversible linear operation.' },
];

export const misconceptions: { myth: string; correction: string }[] = [
  { myth: 'A qubit stores an infinite amount of readable classical information.', correction: 'Although a pure qubit requires continuous amplitudes to describe mathematically, a single measurement does not reveal those amplitudes.' },
  { myth: 'Superposition means we can inspect every possible answer simultaneously.', correction: 'Quantum algorithms manipulate amplitudes so interference increases probabilities of useful outputs.' },
  { myth: 'Measurement merely reveals which value the qubit secretly had.', correction: 'That classical interpretation does not generally reproduce quantum measurement statistics.' },
  { myth: 'Entanglement sends messages faster than light.', correction: 'Entanglement creates correlations, but usable communication still obeys the no-signaling principle.' },
  { myth: 'Quantum teleportation moves matter.', correction: 'It transfers a quantum state using shared entanglement and classical communication.' },
  { myth: 'Quantum computers will replace classical computers.', correction: 'Quantum processors are specialized systems that generally operate together with classical computers.' },
  { myth: 'Grover search instantly searches every database entry.', correction: 'Grover provides a quadratic query advantage: O(N) → O(√N).' },
  { myth: "Shor's algorithm means every encryption system becomes useless.", correction: 'Shor targets mathematical structures underlying systems such as RSA; other cryptographic approaches use different assumptions.' },
];
