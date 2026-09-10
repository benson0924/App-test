import type { TranslationTree } from '@/i18n/types';

export const multipleQubits: TranslationTree = {
  meta: {
    tag: 'Chapter 4',
    title: 'Multiple Qubits',
    intro:
      'Real quantum computers manipulate registers of many qubits. This chapter explains how individual qubit spaces combine via tensor products, why entanglement defies classical intuition, which multi-qubit gates we use in circuits, and why some operations — like cloning an unknown state — are fundamentally forbidden.',
  },
  sections: {
    '4.1': {
      title: '4.1 Tensor Products and Hilbert Space Dimension',
      paragraphs: [
        'When two quantum systems with Hilbert spaces ℋ_A (dimension d_A) and ℋ_B (dimension d_B) are treated as a single composite system, the joint space is the tensor product ℋ_A ⊗ ℋ_B, with dimension d_A · d_B.',
        'For qubits, each single-qubit space has dimension 2. An n-qubit register therefore lives in a 2^n-dimensional complex Hilbert space. Five qubits need 32 amplitudes; twenty qubits need over one million. This exponential growth is why classical simulation of general quantum circuits becomes impractical, and why quantum computers can (for some problems) offer computational advantages.',
      ],
      checkpoints: [
        {
          question: 'How many complex amplitudes describe a 4-qubit pure state?',
          answer: '16',
          hint: 'Use 2^n with n = 4.',
        },
      ],
      examples: [
        {
          title: 'Count amplitudes for 3 qubits',
          steps: [
            { label: 'Each qubit doubles the dimension.' },
            { label: 'Evaluate 2³.' },
            { label: 'The basis is {|000⟩, |001⟩, …, |111⟩} — eight orthonormal kets.' },
          ],
        },
      ],
      expandables: [],
      labLink: 'Tensor Product Lab',
    },
    '4.2': {
      title: '4.2 Kronecker Product',
      paragraphs: [
        'The Kronecker product (tensor product on vectors) builds composite kets from single-qubit kets. If |a⟩ = (a₀, a₁)ᵀ and |b⟩ = (b₀, b₁)ᵀ, then',
        'Basis ordering matters: we use big-endian bit strings where the leftmost qubit is index 0. Thus |10⟩ means qubit 0 is |1⟩, qubit 1 is |0⟩. The Kronecker product of matrices works analogously and describes applying independent gates on different qubits simultaneously: U ⊗ V.',
      ],
      checkpoints: [
        {
          question: 'Is |+⟩⊗|0⟩ the same as |0⟩⊗|+⟩?',
          answer: 'no',
          hint: 'Tensor product is ordered — swapping qubits gives a different state unless you also SWAP.',
        },
      ],
      examples: [
        {
          title: 'Compute |+⟩ ⊗ |0⟩ by hand',
          steps: [
            { label: 'Write single-qubit vectors.' },
            { label: 'Apply Kronecker product rule.' },
            { label: 'Simplify — only |00⟩ and |10⟩ survive.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Kronecker product of matrices',
          paragraphs: [
            'Applying H ⊗ I to |00⟩ puts qubit 0 in superposition while leaving qubit 1 unchanged — the first step of every Bell-state preparation circuit.',
          ],
        },
      ],
    },
    '4.3': {
      title: '4.3 Entanglement',
      paragraphs: [
        'Not every two-qubit state is a product |a⟩ ⊗ |b⟩. States that cannot be factored are called entangled. The Bell state |Φ⁺⟩ = (1/√2)(|00⟩ + |11⟩) is the canonical example: measuring one qubit instantly determines the other, no matter how far apart the qubits are.',
        'Entanglement produces correlations stronger than any classical shared randomness. If Alice and Bob each hold one qubit of |Φ⁺⟩, each sees 0 or 1 with 50% probability individually — but their outcomes are always equal. This is not "hidden instructions" sent at creation time in a classical sense; quantum mechanics predicts violations of Bell inequalities, confirmed experimentally.',
      ],
      checkpoints: [
        {
          question: 'Can entanglement be used to send information faster than light?',
          answer: 'no',
          hint: 'Individual measurement outcomes are random; correlation appears only when results are compared later.',
        },
      ],
      examples: [
        {
          title: 'Measurement correlations of |Φ⁺⟩',
          steps: [
            { label: 'Expand the state in the computational basis.' },
            { label: 'Measuring both qubits: only |00⟩ or |11⟩ appear, each with 50%.' },
            { label: 'Given outcome 0 on qubit 0, qubit 1 is certainly 0 — perfect correlation.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'No faster-than-light signaling',
          paragraphs: [
            'Although entangled measurements are correlated, neither party can control their local outcome to encode a message. The no-signaling theorem guarantees that reduced density matrices of each subsystem are unchanged by the distant measurement choice. Entanglement is a resource for protocols (teleportation, superdense coding, QKD) that still respect causality.',
          ],
        },
        {
          title: 'Partial measurement collapses the joint state',
          paragraphs: [
            'Measuring qubit 0 of |Φ⁺⟩ yields |0⟩ on qubit 0 with probability ½, leaving the pair in |00⟩; or |1⟩ with probability ½, leaving |11⟩. The unmeasured qubit is now in a definite state correlated with the outcome — but this correlation cannot be detected until the parties compare results using a classical channel.',
          ],
        },
      ],
      labLinks: ['Entanglement Measurement Lab', 'Bell State Generator'],
    },
    '4.4': {
      title: '4.4 Multi-Qubit Gates',
      paragraphs: [
        'Single-qubit gates act as U ⊗ I or I ⊗ U on two-qubit systems. To create entanglement we need multi-qubit gates that cannot be decomposed into independent single-qubit operations. The workhorse is CNOT (controlled-NOT): flip the target qubit iff the control is |1⟩.',
        'SWAP exchanges two qubits — useful for routing on hardware with limited connectivity. The Toffoli (CCNOT) gate flips a target when both controls are |1⟩; it is universal for classical reversible computation and appears in quantum arithmetic circuits.',
      ],
      checkpoints: [
        {
          question: 'What does SWAP|01⟩ equal?',
          answer: '|10⟩',
        },
      ],
      examples: [
        {
          title: 'CNOT truth table on computational basis',
          steps: [
            { label: 'CNOT leaves |00⟩ and |01⟩ unchanged (control is 0).' },
            { label: 'When control is 1, target toggles.' },
            { label: 'Applied to (|00⟩+|10⟩)/√2 after H on qubit 0, produces |Φ⁺⟩.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Gate ordering matters',
          paragraphs: [
            'Quantum circuits are ordered left-to-right (or time top-to-bottom). [H ⊗ I, CNOT] creates a Bell state, but CNOT before H on qubit 0 does not. Non-commuting gates must be applied in the correct sequence — the circuit diagram is the program.',
          ],
        },
      ],
      labLink: 'Quantum Circuit Builder',
    },
    '4.5': {
      title: '4.5 No-Cloning Theorem',
      paragraphs: [
        'Classical bits can be copied freely — the COPY gate duplicates information. Quantum mechanics forbids an analogous operation: there is no unitary U that clones an arbitrary unknown qubit |ψ⟩ onto an ancilla initialized to |0⟩:',
        'The theorem, proved by Wootters and Zurek (1982) and independently by Dieks, is a direct consequence of linearity. If a cloner worked on |0⟩ and |1⟩, it would have to work on their superposition — but then it would produce a state that is not the product of two copies of the input.',
      ],
      checkpoints: [
        {
          question: 'Can you clone a qubit if you know it is exactly |0⟩ or |1⟩ (classical information)?',
          answer: 'yes',
          hint: 'Known orthogonal states can be copied — the theorem applies to unknown arbitrary states.',
        },
      ],
      examples: [
        {
          title: 'Proof sketch by contradiction',
          steps: [
            { label: 'Suppose a cloner U exists with U|0⟩|0⟩ = |0⟩|0⟩ and U|1⟩|0⟩ = |1⟩|1⟩.' },
            { label: 'Apply U to |+⟩|0⟩ = (|0⟩|0⟩ + |1⟩|0⟩)/√2.' },
            { label: 'If cloning worked, we would also get |+⟩|+⟩ = (|00⟩+|01⟩+|10⟩+|11⟩)/2.' },
            { label: 'These are different states — contradiction. No universal cloner exists.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Implications for quantum information',
          paragraphs: [
            'Quantum error correction cannot simply repeat qubits — it needs entanglement and syndrome measurement.',
            'Eavesdropping in QKD disturbs the state — copying would break security differently.',
            'Teleportation transfers a state without cloning — the original is destroyed.',
          ],
        },
      ],
    },
    '4.6': {
      title: '4.6 Universal Gate Set {H, T, CNOT}',
      paragraphs: [
        'A gate set is universal if any n-qubit unitary can be approximated to arbitrary precision using circuits composed only of those gates. The set {H, T, CNOT} is universal for single-qubit rotations plus entangling operations — sufficient to run any quantum algorithm.',
        'The Hadamard H creates superposition; the T gate T|0⟩ = |0⟩, T|1⟩ = e^{iπ/4}|1⟩ adds a π/4 phase on |1⟩. Together with rotations generated by H and T (via Solovay–Kitaev compilation), they approximate any single-qubit unitary. CNOT entangles qubits, enabling multi-qubit unitaries.',
      ],
      checkpoints: [
        {
          question: 'Is {H, CNOT} alone sufficient to approximate an arbitrary T rotation on a qubit?',
          answer: 'no',
          hint: 'H and CNOT generate only Clifford operations; T adds non-Clifford phases.',
        },
      ],
      examples: [
        {
          title: 'Why Clifford + T is a standard fault-tolerant set',
          steps: [
            { label: 'Clifford gates (H, S, CNOT) are efficiently simulable classically (Gottesman–Knill) but not universal.' },
            { label: 'Adding T makes the set universal — any unitary can be approximated.' },
            { label: 'T gates are expensive in fault-tolerant architectures (magic state distillation).' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Other universal sets',
          paragraphs: [
            'Alternative universal sets include {H, S, CNOT, T}, {Toffoli, H}, and continuous-parameter sets like all single-qubit rotations plus CNOT. Hardware-native gates (Rx, Rz, CZ) are compiled down to a fault-tolerant set for error-corrected computation.',
          ],
        },
      ],
      labLink: 'Gate Explorer',
    },
  },
  widgets: {
    dimensionExplorer: {
      label: 'Number of qubits (n): {{n}}',
      hilbertSpace: 'An {{n}}-qubit register lives in a Hilbert space of dimension 2^{{n}} = {{dim}}.',
      stateVectorNote:
        'State vector length: {{dim}} complex amplitudes. Memory for dense simulation grows as O(2^n) — the central challenge of classical simulation of quantum systems.',
      tooManyLabels: '{{dim}} basis kets — too many to display. Try n ≤ 5 to see all labels.',
    },
    kroneckerProduct: {
      intro:
        'Building |+⟩ ⊗ |0⟩ via the Kronecker product of amplitude vectors (computed with kronVec / tensorProduct).',
      basisKet: 'Basis ket',
      amplitude: 'Amplitude',
      productNote:
        'Only |00⟩ and |10⟩ have non-zero amplitude (both = 1/√2). This is a product state: the first qubit is |+⟩, the second is |0⟩ — no entanglement.',
      kronMatch: ' ✓ kronVec matches tensorProduct.',
    },
    entanglementChecker: {
      label: 'Select a two-qubit state',
      phiPlus: '|Φ⁺⟩ Bell',
      product: '|0⟩⊗|+⟩',
      psiPlus: '|Ψ⁺⟩ Bell',
      ket: 'Ket',
      probSquared: '|Amplitude|²',
      productState: '✓ Product state — can be written as |a⟩⊗|b⟩ for some single-qubit states.',
      entangled: '✗ Entangled — cannot factor into independent qubit states.',
    },
    bellPairCircuit: {
      title: 'Bell pair circuit: H — CNOT',
      step: 'Step {{n}}:',
      reset: 'Reset',
      nextGate: 'Next gate',
      steps: {
        init: 'Initialize |00⟩',
        hadamard: 'Apply H on qubit 0 (left)',
        cnot: 'Apply CNOT (control q0, target q1)',
      },
      tableKet: '|xy⟩',
      tableAmplitude: 'Amplitude',
    },
    multiQubitGate: {
      cnotDesc:
        'CNOT: flips target (q1) when control (q0) is |1⟩. Maps |10⟩ → |11⟩ and |11⟩ → |10⟩; leaves |00⟩ and |01⟩ unchanged.',
      swapDesc: 'SWAP exchanges the two qubits: |01⟩ ↔ |10⟩.',
      toffoliDesc: 'Toffoli (CCNOT): flips target (q2) when both controls (q0, q1) are |1⟩.',
      inputLabel: 'Input basis state |{{input}}⟩',
      result: '{{gate}}|{{input}}⟩ = |{{output}}⟩',
    },
    universalGateSet: {
      intro:
        'Common single-qubit gates in the same family: S = T² (π/2 phase), Z = S² (π phase). Clifford gates (H, S, CNOT) are not universal alone — they need T (or another non-Clifford gate) for universality.',
      bellNote:
        'Bell state |Φ⁺⟩ from {H, CNOT} alone — T is needed for arbitrary phase precision in general algorithms (e.g. Shor, precise phase estimation).',
    },
    labLink: 'Open full lab: {{title}} →',
  },
  nav: {
    prev: '← Linear Algebra',
    next: 'Next: Quantum Circuits →',
  },
};
