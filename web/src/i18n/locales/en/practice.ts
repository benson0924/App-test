import type { TranslationTree } from '@/i18n/types';

export const practice: TranslationTree = {
  "ui": {
    "title": "Practice Hub",
    "intro": "Randomized problems with hints, step-by-step reveals, and full solutions. Answers verified with quantum-core where applicable.",
    "mixed": "Mixed",
    "score": "Score:",
    "newRandomSet": "New random set",
    "shuffleNewSet": "Shuffle new set",
    "questionOf": "Question {{current}} of {{total}}",
    "verified": "✓ verified",
    "check": "⚠ check",
    "hint": "Hint",
    "hideHint": "Hide hint",
    "revealStep": "Reveal step {{n}}",
    "step": "Step {{n}}",
    "correct": "Correct!",
    "incorrect": "Incorrect.",
    "fullSolution": "Full solution",
    "finish": "Finish",
    "next": "Next"
  },
  "categories": {
    "classical": "Classical",
    "oneQubit": "One Qubit",
    "linearAlgebra": "Linear Algebra",
    "multiQubit": "Multi-qubit",
    "protocols": "Protocols",
    "algorithms": "Algorithms"
  },
  "problems": {
    "cl-xor": {
      "question": "What is {{a}} XOR {{b}}?",
      "hint": "XOR is 1 when inputs differ.",
      "step1": "XOR returns 1 if exactly one input is 1.",
      "step2": "Inputs: a={{a}}, b={{b}}.",
      "solution": "{{a}} ⊕ {{b}} = {{xor}}."
    },
    "cl-bin": {
      "question": "Convert binary {{bits}} to decimal.",
      "hint": "Sum powers of two where the bit is 1.",
      "step1": "Read bits from right to left as 2⁰, 2¹, 2², …",
      "step2": "Evaluate {{bits}} in base 2.",
      "solution": "{{bits}}₂ = {{dec}}₁₀."
    },
    "cl-dec": {
      "question": "Convert decimal {{x}} to 4-bit binary.",
      "hint": "Repeatedly divide by 2 and read remainders bottom-up.",
      "step1": "Divide {{x}} by 2 repeatedly to get remainders.",
      "step2": "Pad to 4 bits.",
      "solution": "{{x}}₁₀ = {{bin}}₂."
    },
    "cl-add": {
      "question": "Binary add: {{a}} + {{b}} = ?",
      "hint": "Use ripple-carry: XOR for sum bit, AND for carry.",
      "step1": "Add bit-by-bit from right with carry.",
      "step2": "Result",
      "solution": "{{a}} + {{b}} = {{sum}} (binary)."
    },
    "1q-prob": {
      "question": "If |ψ⟩ = {{alpha}}|0⟩ + {{beta}}|1⟩ (normalized), what is P(0)?",
      "hint": "Born rule: probability is squared magnitude of amplitude.",
      "step1": "Identify α from the state.",
      "step2": "Compute |α|².",
      "solution": "P(0) = |α|² = {{p0}}."
    },
    "1q-gate": {
      "question": "Which state does {{gate}} map |0⟩ to?",
      "hint": "Apply the gate matrix to |0⟩.",
      "step1": "Write {{gate}}|0⟩.",
      "step2": "Use the standard matrix for the gate.",
      "solution": "{{gate}}|0⟩ → {{target}}."
    },
    "1q-bloch": {
      "question": "A qubit on the Bloch sphere has θ = {{deg}}°. What is z = cos θ?",
      "hint": "Bloch vector: (x, y, z) with z = cos θ.",
      "step1": "Use z = cos θ on the Bloch sphere.",
      "step2": "Evaluate.",
      "solution": "z = cos({{theta}}) ≈ {{z}}."
    },
    "1q-hh": {
      "question": "What does H² do to any single-qubit state?",
      "hint": "H is its own inverse up to global phase; H² = I.",
      "step1": "Recall H² = I.",
      "step2": "So applying H twice returns the original state.",
      "solution": "H² = I, so H is an involution."
    },
    "la-unitary": {
      "question": "Which condition defines a unitary matrix U?",
      "hint": "Unitary preserves inner products.",
      "step1": "Unitary operators preserve norm.",
      "step2": "Matrix condition",
      "solution": "U†U = I (equivalently UU† = I)."
    },
    "la-hermitian": {
      "question": "Pauli Z is Hermitian. What is its eigenvalue on |1⟩?",
      "hint": "Z = diag(1, −1).",
      "step1": "Write Z in the computational basis.",
      "step2": "Apply to |1⟩.",
      "solution": "Eigenvalue −1 on |1⟩."
    },
    "la-tensor": {
      "question": "What is the dimension of the Hilbert space for n qubits?",
      "hint": "Each qubit adds a factor of 2.",
      "step1": "Tensor product of n copies of ℂ².",
      "step2": "Dimension",
      "solution": "2ⁿ-dimensional complex vector space."
    },
    "la-inner": {
      "question": "Are |0⟩ and |1⟩ orthogonal?",
      "hint": "Compute ⟨0|1⟩.",
      "step1": "Inner product of basis states.",
      "step2": "⟨0|1⟩ = 0",
      "solution": "Yes — computational basis is orthonormal."
    },
    "mq-bell": {
      "question": "Is |Φ⁺⟩ = (|00⟩ + |11⟩)/√2 a product state?",
      "hint": "Check if amplitudes factor as c₀₀·c₁₁ = c₀₁·c₁₀.",
      "step1": "Product state criterion for 2 qubits.",
      "step2": "Bell state fails factorization — it is entangled.",
      "solution": "No — |Φ⁺⟩ is entangled."
    },
    "mq-cnot": {
      "question": "What does CNOT|10⟩ produce?",
      "hint": "Control is first qubit (1); target flips when control is 1.",
      "step1": "Control = 1, target = 0.",
      "step2": "Flip target → |11⟩.",
      "solution": "CNOT|10⟩ = |11⟩."
    },
    "mq-swap": {
      "question": "How many CNOT gates in the standard SWAP decomposition?",
      "hint": "SWAP = CNOT · (CNOT with middle qubit) · CNOT pattern.",
      "step1": "Standard circuit: CNOT₁₂ · CNOT₂₁ · CNOT₁₂.",
      "step2": "Three CNOTs suffice.",
      "solution": "3 CNOT gates."
    },
    "mq-phi": {
      "question": "Measuring both qubits of |Φ⁺⟩ in Z basis: P(00)?",
      "hint": "Only |00⟩ and |11⟩ have nonzero amplitude, equal weight.",
      "step1": "Amplitudes: (|00⟩ + |11⟩)/√2.",
      "step2": "P(00) = |1/√2|² = 1/2.",
      "solution": "P(00) = 1/2."
    },
    "pr-bb84": {
      "question": "BB84 requires an authenticated classical channel?",
      "hint": "Basis sifting and eavesdropper detection use classical communication.",
      "step1": "Quantum states carry key material.",
      "step2": "Classical post-processing compares bases and estimates error rate.",
      "solution": "Yes — authenticated classical channel is required."
    },
    "pr-chsh": {
      "question": "Classical (LHV) bound on CHSH parameter S?",
      "hint": "Tsirelson bound is 2√2 quantum; classical is 2.",
      "step1": "CHSH: S = E(a,b) + E(a,b′) + E(a′,b) − E(a′,b′).",
      "step2": "Classical |S| ≤ 2.",
      "solution": "|S| ≤ 2 classically."
    },
    "pr-tele": {
      "question": "Quantum teleportation transmits the quantum state using only classical bits (2) plus shared entanglement?",
      "hint": "No faster-than-light; 2 classical bits + 1 ebit.",
      "step1": "Alice measures in Bell basis → 2 classical bits.",
      "step2": "Bob applies correction based on bits.",
      "solution": "Yes — 2 classical bits + 1 shared Bell pair."
    },
    "pr-sd": {
      "question": "Superdense coding sends how many classical bits using 1 qubit + 1 ebit?",
      "hint": "Encode 00, 01, 10, 11 via four Pauli operations on shared Bell state.",
      "step1": "Alice encodes 2 bits via Pauli on her half of Bell pair.",
      "step2": "Bob performs Bell measurement → 2 bits recovered.",
      "solution": "2 classical bits."
    },
    "alg-grover": {
      "question": "Grover search over N = 2^{{n}} items: query complexity?",
      "hint": "Quadratic speedup over classical O(N).",
      "step1": "Grover iterate amplifies marked state amplitude.",
      "step2": "~π/4 · √N iterations.",
      "solution": "O(√N) oracle queries."
    },
    "alg-dj": {
      "question": "Deutsch–Jozsa: queries to distinguish constant vs balanced (n-bit)?",
      "hint": "Quantum algorithm needs exactly one oracle query.",
      "step1": "Prepare uniform superposition, apply oracle, measure.",
      "step2": "Single query suffices.",
      "solution": "1 query (quantum) vs 2ⁿ⁻¹ + 1 worst-case classically."
    },
    "alg-shor": {
      "question": "Shor's algorithm factors N by finding what property of a^x mod N?",
      "hint": "Order r where a^r ≡ 1 (mod N).",
      "step1": "Choose random a coprime to N.",
      "step2": "Find period r of f(x) = a^x mod N.",
      "solution": "Period (order) r of modular exponentiation."
    },
    "alg-deutsch": {
      "question": "Deutsch algorithm (1 bit): maximum classical queries to determine if f is constant?",
      "hint": "Worst case: query f(0), still ambiguous, need f(1).",
      "step1": "Classically, one query leaves two consistent functions.",
      "step2": "Second query is required in worst case.",
      "solution": "2 queries classically vs 1 quantum."
    }
  },
  "choices": {
    "yes": "Yes",
    "no": "No",
    "period": "Period",
    "minimum": "Minimum",
    "maximum": "Maximum",
    "parityOnly": "Parity only",
    "identity": "Identity (returns the state)",
    "bitFlip": "Bit flip",
    "phaseFlip": "Phase flip",
    "projectZero": "Projects to |0⟩",
    "unitary": "U†U = I",
    "hermitian": "U = U†",
    "detZero": "det(U) = 0",
    "real": "U is real",
    "dim2n": "2ⁿ",
    "dimN2": "n²",
    "dim2nLinear": "2n",
    "dimFactorial": "n!",
    "cnotCount1": "1",
    "cnotCount2": "2",
    "cnotCount3": "3",
    "cnotCount4": "4",
    "sdBits1": "1",
    "sdBits2": "2",
    "sdBits3": "3",
    "sdBits4": "4",
    "query1": "1",
    "queryN": "n",
    "query2n": "2ⁿ⁻¹ + 1",
    "query2nFull": "2ⁿ",
    "deutschClassical2": "2",
    "deutschClassical3": "3",
    "deutschClassical4": "4",
    "chsh2": "≤ 2",
    "chsh2sqrt2": "≤ 2√2",
    "chsh4": "≤ 4",
    "chsh1": "≤ 1",
    "groverSqrt": "O(√N)",
    "groverLog": "O(log N)",
    "groverN": "O(N)",
    "groverN2": "O(N²)",
    "ket0": "|0⟩",
    "ket1": "|1⟩",
    "ketPlus": "|+⟩",
    "ketMinus1": "−|1⟩",
    "prob05": "0.5",
    "prob025": "0.25",
    "prob1": "1",
    "prob0": "0"
  }
};
