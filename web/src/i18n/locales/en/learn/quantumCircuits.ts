import type { TranslationTree } from '@/i18n/types';

export const quantumCircuits: TranslationTree = {
  meta: {
    title: 'Chapter 6: Quantum Circuits',
    intro:
      'The quantum circuit model is the standard programming picture for quantum algorithms: qubits are wires, time flows left to right (or top to bottom in some diagrams), unitary gates transform amplitudes, and measurements produce classical bits. This chapter fixes conventions, walks through the Bell preparation circuit, surveys the common gate set, and connects circuit metrics to simulation and hardware constraints.',
  },
  sections: {
    '6.1': {
      title: '6.1 Circuit model conventions',
      paragraphs: [
        "Each horizontal line is one qubit's world-line through time. A box on a line is a single-qubit gate; a vertical line connecting two wires is a two-qubit gate (control shown as a filled dot, target as ⊕ for CNOT). Gates apply in sequence: the rightmost gate in a left-to-right diagram acts last on the state vector.",
        'Controls condition an operation on another qubit being |1⟩ (for positive control). Multi-controlled gates generalize this. Measurement is drawn as a meter symbol; it projects onto computational basis outcomes and outputs classical bits. Mid-circuit measurement with classical feed-forward lets later gates depend on earlier outcomes — essential for teleportation and error correction.',
        'Classical wires (double lines) carry measurement results. In simulators like this textbook, we track the full state vector until measurement; hardware executes pulses implementing each gate subject to calibration and connectivity limits.',
      ],
      checkpoints: [
        {
          question: 'In a left-to-right diagram, which gate applies first to |ψ_in⟩?',
          answer: 'leftmost',
          hint: 'Time flows left to right; the first gate is on the left.',
        },
      ],
      examples: [
        {
          title: 'Reading gate order',
          steps: [
            { label: 'Circuit: X then H on one qubit, starting from |0⟩.' },
            { label: 'X first: |0⟩ → |1⟩.' },
            { label: 'Then H: |1⟩ → |−⟩.' },
            { label: 'Reversing order gives H|0⟩ = |+⟩ then X|+⟩ = |−⟩ — same here, but generally [H,X] ≠ 0.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Tensor product wire ordering',
          paragraphs: [
            'For n qubits, basis states are |q₀q₁…q_{n−1}⟩ with qubit 0 often the top wire. The state index in simulators is usually binary q₀q₁… written as an integer. Always check documentation for qubit index convention when porting circuits between tools.',
          ],
        },
      ],
      practice: [
        {
          question: 'You have CNOT with control qubit 1 and target qubit 0, starting from |10⟩. What is the output?',
          answer: 'Control is |1⟩, so target flips: |10⟩ → |11⟩.',
        },
      ],
      labLink: 'Open Circuit Builder',
    },
    '6.2': {
      title: '6.2 Bell circuit walkthrough',
      paragraphs: [
        'The Bell state |Φ⁺⟩ = (|00⟩ + |11⟩)/√2 is the canonical entangled pair. It is prepared from |00⟩ with one Hadamard and one CNOT — the minimal entangling circuit. Understanding each step builds intuition for how superposition on the control qubit spreads correlation to the target.',
        'After H₀, qubit 0 is in |+⟩ while qubit 1 remains |0⟩ — a product state (|+⟩⊗|0⟩). CNOT entangles: the + branch stays |00⟩, the − branch would flip target, but H only created + amplitude on |0⟩ for qubit 0 in the superposition that matters; the result is equal weight on |00⟩ and |11⟩ with zero on |01⟩ and |10⟩.',
      ],
      checkpoints: [
        {
          question: 'After H on qubit 0 only, is the 2-qubit state entangled?',
          answer: 'no',
          hint: 'Still a product |+⟩ ⊗ |0⟩.',
        },
      ],
      examples: [
        {
          title: 'Amplitudes at each step',
          steps: [
            { label: '|00⟩ has amplitude 1 on index 00.' },
            { label: 'H₀: (|00⟩ + |10⟩)/√2 — index 00 and 10 each 1/√2.' },
            { label: 'CNOT₀₁ maps |10⟩ → |11⟩.' },
            { label: 'Final state is |Φ⁺⟩.' },
          ],
        },
      ],
      expandables: [],
      practice: [
        {
          question:
            'Write the unitary matrix for the Bell preparation circuit in the {|00⟩,|01⟩,|10⟩,|11⟩} basis (conceptually) and list which amplitudes are non-zero.',
          answer:
            'U = CNOT · (H ⊗ I). Starting from |00⟩, only |00⟩ and |11⟩ have amplitude 1/√2; |01⟩ and |10⟩ are zero — maximally entangled support on the even parity subspace.',
        },
      ],
      labLink: 'Bell State Generator lab',
    },
    '6.3': {
      title: '6.3 Gate set: I, X, Y, Z, H, S, T, rotations, CNOT, CZ, SWAP, Toffoli',
      paragraphs: [
        'Pauli gates I, X, Y, Z are involutions (X bit-flip, Z phase-flip, Y = iXZ). Hadamard H creates superposition and swaps Z/X bases. Phase gates S (√Z, π/2 phase on |1⟩) and T (⁴√Z, π/4) are common in fault-tolerant constructions because T is non-Clifford — needed for universality with H and CNOT.',
        'Rotation gates Rx(θ), Ry(θ), Rz(θ) implement exp(−iθσ/2) about the corresponding axis — any single-qubit unitary is a rotation up to global phase. CNOT flips target when control is |1⟩; CZ applies −1 phase on |11⟩ only. SWAP exchanges two qubits (real hardware may implement SWAP via three CNOTs). Toffoli (CCNOT) flips target when both controls are |1⟩ — universal for classical reversible logic embedded in quantum circuits.',
      ],
      checkpoints: [
        {
          question: 'Which gate is non-Clifford and needed for universality with H and CNOT?',
          answer: 'T',
          hint: 'It adds π/4 phase on |1⟩.',
        },
      ],
      examples: [
        {
          title: 'Decompose SWAP from CNOTs',
          steps: [
            { label: 'SWAP = CNOT₀₁ · CNOT₁₀ · CNOT₀₁.' },
            { label: 'Three CNOTs exchange qubits 0 and 1 on connected linear topology.' },
            { label: 'Depth 3 if each CNOT is one layer on those wires.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Universality: {H, T, CNOT}',
          paragraphs: [
            'Any n-qubit unitary can be approximated to arbitrary precision using H, T, and CNOT (Solovay–Kitaev theorem). Clifford gates {H, S, CNOT, CZ} are efficiently simulable classically (Gottesman–Knill) — adding T makes the set computationally universal.',
          ],
        },
      ],
      practice: [
        {
          question: 'Apply S twice to |1⟩. What gate is equivalent to SS?',
          answer: 'S|1⟩ = i|1⟩; S²|1⟩ = −|1⟩ = Z|1⟩. So SS = Z (up to global phase on other basis states, S² = Z exactly).',
        },
      ],
      labLink: 'Quantum Gate Explorer',
    },
    '6.4': {
      title: '6.4 State vector & probability readout',
      paragraphs: [
        'An ideal simulator stores the state vector — 2ⁿ complex amplitudes for n qubits. After each gate, amplitudes update by matrix multiplication. Measurement does not change the vector until you sample or collapse: the Born rule gives outcome probabilities P(x) = |α_x|² for label x.',
        'For entangled states, marginal probabilities on one qubit may be 50/50 even when joint outcomes are perfectly correlated. Always distinguish full state vector readout (simulator) from histograms of many shots (hardware).',
      ],
      checkpoints: [
        {
          question: 'Ideal simulators track what primary object?',
          answer: 'statevector',
          hint: 'A list of 2^n amplitudes.',
        },
      ],
      examples: [
        {
          title: 'Readout for |Φ⁺⟩',
          steps: [
            { label: 'Non-zero amplitudes: 00 and 11 each 1/√2.' },
            { label: 'P(00) = P(11) = 1/2.' },
            { label: 'Single-qubit marginals: P(q₀=0)=P(q₀=1)=1/2 — uncorrelated individually.' },
            { label: 'Joint: never see 01 or 10 — that is the entanglement signature.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Weak vs strong measurement',
          paragraphs: [
            'Strong projective measurement collapses the state. Weak measurements extract partial information with less disturbance — used in some experiments and error-monitoring schemes. This course uses projective measurement in the Z (computational) basis unless noted.',
          ],
        },
      ],
      practice: [
        {
          question:
            'A 2-qubit state has amplitude 1/2 on |00⟩, 1/2 on |01⟩, and 0 on |10⟩, |11⟩. What is P(00) and is qubit 1 independent of qubit 0?',
          answer:
            'P(00) = (1/2)² = 1/4. Given q₀=0, only |00⟩ and |01⟩ remain — equal weight — so q₁ is not independent (knowing q₀=0 gives P(q₁=0)=P(q₁=1)=1/2 but the joint is not product).',
        },
      ],
    },
    '6.5': {
      title: '6.5 Circuit depth, gate count & OpenQASM',
      paragraphs: [
        'Circuit depth counts sequential layers of gates that cannot run in parallel on the same qubits. Gate count is the total number of operations — related to runtime and error accumulation. Width is the qubit count. NISQ devices favor shallow, wide circuits with native gate sets and limited connectivity.',
        'What grows exponentially with n is the state vector dimension 2ⁿ — simulating 50+ qubits exactly is infeasible on classical computers for generic states. Structured circuits (Clifford, low entanglement) may be tractable longer.',
      ],
      checkpoints: [
        {
          question: 'What grows exponentially with qubit count n in exact simulation?',
          answer: 'state vector dimension',
          hint: 'Hilbert space size 2^n.',
        },
      ],
      examples: [
        {
          title: 'Parallel vs serial H gates',
          steps: [
            { label: 'H on qubits 0 and 1 in parallel: depth 1, 2 gates.' },
            { label: 'H on qubit 0 then H on qubit 0 again: depth 2, 2 gates on same wire.' },
            { label: 'Bell circuit H₀ + CNOT: depth 2 (CNOT waits for H to finish on control).' },
          ],
        },
      ],
      expandables: [
        {
          title: 'OpenQASM 3 example — Bell pair',
          paragraphs: [
            'OpenQASM is a common interchange format. qreg/creg declare quantum and classical registers; gate names match hardware-native or standard libraries. Export from the Circuit Builder when available.',
          ],
        },
        {
          title: 'Hardware vs ideal simulation',
          paragraphs: [
            'Real devices add decoherence, readout errors, and limited qubit connectivity — SWAP chains inflate depth. This textbook simulates ideal unitary evolution; labs may inject noise separately. Always compare circuit depth to coherence time T₂ and gate fidelity when estimating success probability.',
          ],
        },
      ],
      practice: [
        {
          question:
            'Bell preparation uses 2 gates and depth 2. If you must insert a SWAP between qubits 0 and 1 using 3 CNOTs after the Bell circuit, what happens to depth if SWAP is implemented as 3 sequential layers?',
          answer:
            'Original depth 2. Three sequential CNOT layers add 3, giving total depth 5 (assuming SWAP gates run after Bell and each CNOT layer cannot overlap prior qubit operations on involved wires).',
        },
      ],
      labLink: 'Open Circuit Builder',
    },
  },
  widgets: {
    bellStepWalkthrough: {
      title: 'Bell pair — step mode',
      description:
        'Circuit: H on qubit 0, then CNOT with control 0 and target 1. Step through to build |Φ⁺⟩.',
      prev: '← Prev',
      next: 'Next →',
      stepLabel: 'Step {{current}}/{{total}}: {{gate}}',
      steps: {
        init: 'Initial |00⟩',
        hadamard: 'H on qubit 0',
        cnot: 'CNOT₀₁',
      },
    },
    gateSetExplorer: {
      title: 'Gate set explorer',
      theta: 'θ = {{value}} rad',
      notes: {
        toffoli: '|110⟩ → |111⟩ (target flip when both controls 1)',
        cnot: '|10⟩ → |11⟩',
        cz: 'Adds −1 phase on |11⟩',
        swap: 'SWAP exchanges qubits',
        single: '{{gate}} on |{{input}}⟩',
      },
    },
    stateReadout: {
      title: 'State vector & probability readout',
      phiPlus: '|Φ⁺⟩ (2 qubits)',
      uniform: 'Uniform (2 qubits)',
      bornRule:
        'Born rule: P(x) = |⟨x|ψ⟩|². Only {{n}}-bit strings with non-zero amplitude appear below.',
      probability: 'P(|{{label}}⟩) = {{value}}%',
    },
    circuitMetrics: {
      title: 'Depth & gate count',
      description: 'Base circuit: H₀, CNOT₀₁. Add extra H gates on qubit 1 (same qubit → increases depth).',
      extraH: 'Extra H gates on qubit 1: {{count}}',
      metrics: 'Gate count: {{gates}} · Circuit depth: {{depth}}',
      note:
        'Width = number of qubit wires ({{width}}). Depth = longest critical path of gates on overlapping qubits. State vector dimension = 2^n = {{dim}}.',
    },
    practice: {
      label: 'Practice problem.',
      revealSolution: 'Reveal solution',
    },
  },
  nav: {
    prev: '← Multiple Qubits',
    next: 'Next: Error Correction →',
  },
};
