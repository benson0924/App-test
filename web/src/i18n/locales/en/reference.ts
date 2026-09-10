import type { TranslationTree } from '@/i18n/types';

export const reference: TranslationTree = {
  "index": {
    "title": "Reference",
    "gates": {
      "title": "Gate Reference",
      "desc": "Single- and multi-qubit gate matrices."
    },
    "formulas": {
      "title": "Formula Sheet",
      "desc": "Key equations across chapters."
    },
    "complexity": {
      "title": "Complexity",
      "desc": "Classical vs quantum query/time bounds."
    },
    "glossary": {
      "title": "Glossary",
      "desc": "Terminology from navigation data."
    },
    "misconceptions": {
      "title": "Misconceptions",
      "desc": "Common myths and corrections."
    }
  },
  "gates": {
    "title": "Gate Reference",
    "intro": "Complete gate tables with symbols, matrices (from quantum-core), actions, Bloch-sphere interpretation, and inverses.",
    "singleQubit": "Single-qubit gates",
    "twoQubit": "Two-qubit gates",
    "threeQubit": "Three-qubit gates",
    "commonIdentities": "Common identities",
    "pauliRelations": "Pauli group relations",
    "universalSets": "Universal gate sets",
    "colSymbol": "Symbol",
    "colMatrix": "Matrix",
    "colAction": "Action",
    "colBloch": "Bloch",
    "colInverse": "Inverse",
    "universalEstablished1": "Established: {H, S, T, CNOT} is a common universal set for fault-tolerant computation (T gate requires magic-state distillation in FT architectures).",
    "universalEstablished2": "Established: {Rx, Ry, Rz, CNOT} is universal for approximate compilation on NISQ devices.",
    "I": {
      "name": "Identity",
      "action": "I|0⟩ = |0⟩, I|1⟩ = |1⟩ — no change",
      "bloch": "Identity rotation: no movement on Bloch sphere",
      "inverse": "I† = I"
    },
    "X": {
      "name": "Pauli X (NOT)",
      "action": "Bit flip: X|0⟩ = |1⟩, X|1⟩ = |0⟩",
      "bloch": "Rotation by π about x-axis: |0⟩ ↔ |1⟩",
      "inverse": "X† = X (X² = I)"
    },
    "Y": {
      "name": "Pauli Y",
      "action": "Y|0⟩ = i|1⟩, Y|1⟩ = −i|0⟩",
      "bloch": "Rotation by π about y-axis",
      "inverse": "Y† = Y (Y² = I)"
    },
    "Z": {
      "name": "Pauli Z",
      "action": "Phase flip: Z|0⟩ = |0⟩, Z|1⟩ = −|1⟩",
      "bloch": "Rotation by π about z-axis",
      "inverse": "Z† = Z (Z² = I)"
    },
    "H": {
      "name": "Hadamard",
      "action": "H|0⟩ = |+⟩, H|1⟩ = |−⟩",
      "bloch": "π rotation about (x+z)/√2 axis; maps z ↔ x",
      "inverse": "H† = H (H² = I)"
    },
    "S": {
      "name": "Phase (S gate)",
      "action": "S|0⟩ = |0⟩, S|1⟩ = i|1⟩",
      "bloch": "Rotation by π/2 about z-axis",
      "inverse": "S† = S³ = ZS (S² = Z)"
    },
    "T": {
      "name": "π/8 gate",
      "action": "T|0⟩ = |0⟩, T|1⟩ = e^{iπ/4}|1⟩",
      "bloch": "Rotation by π/4 about z-axis",
      "inverse": "T† = T⁷ (T² = S, T⁴ = Z)"
    },
    "Rx": {
      "name": "Rotation about x",
      "action": "R_x(θ)|0⟩ = cos(θ/2)|0⟩ − i sin(θ/2)|1⟩",
      "bloch": "Rotation by θ about x-axis",
      "inverse": "R_x(θ)† = R_x(−θ)"
    },
    "Ry": {
      "name": "Rotation about y",
      "action": "R_y(θ)|0⟩ = cos(θ/2)|0⟩ + sin(θ/2)|1⟩",
      "bloch": "Rotation by θ about y-axis",
      "inverse": "R_y(θ)† = R_y(−θ)"
    },
    "Rz": {
      "name": "Rotation about z",
      "action": "R_z(θ)|0⟩ = e^{−iθ/2}|0⟩, R_z(θ)|1⟩ = e^{iθ/2}|1⟩",
      "bloch": "Rotation by θ about z-axis (global phase on |0⟩)",
      "inverse": "R_z(θ)† = R_z(−θ)"
    },
    "CNOT": {
      "name": "Controlled-NOT",
      "action": "CNOT|a,b⟩ = |a, b⊕a⟩ — flips target if control is 1",
      "bloch": "Entangling; not a single-qubit Bloch rotation",
      "inverse": "CNOT† = CNOT (CNOT² = I on target)"
    },
    "CZ": {
      "name": "Controlled-Z",
      "action": "CZ|11⟩ = −|11⟩; others unchanged — adds π phase when both 1",
      "bloch": "Entangling phase gate; CZ = (I⊗H) CNOT (I⊗H)",
      "inverse": "CZ† = CZ (CZ² = I)"
    },
    "SWAP": {
      "name": "Swap",
      "action": "SWAP|a,b⟩ = |b,a⟩",
      "bloch": "Exchanges qubit states; 3 CNOT decomposition",
      "inverse": "SWAP† = SWAP (SWAP² = I)"
    },
    "Toffoli": {
      "name": "CCNOT (Toffoli)",
      "action": "Flips target iff both controls are |1⟩",
      "bloch": "Universal classical logic; reversible AND",
      "inverse": "Toffoli† = Toffoli (self-inverse)"
    }
  },
  "formulas": {
    "title": "Formula Sheet",
    "intro": "Quick reference aligned with textbook notation. Research cutoff: September 2026.",
    "singleQubit": "Single-qubit states",
    "measurement": "Measurement",
    "linearAlgebra": "Linear algebra",
    "multiQubit": "Multi-qubit & tensor products",
    "bell": "Bell states",
    "singleGates": "Single-qubit gates",
    "multiGates": "Multi-qubit gates",
    "entanglementChsh": "Entanglement & CHSH",
    "qft": "Quantum Fourier Transform",
    "grover": "Grover's algorithm",
    "shor": "Shor's algorithm",
    "phaseEst": "Phase estimation",
    "errorCorrection": "Error correction",
    "noise": "Noise & decoherence",
    "complexity": "Complexity classes",
    "classical": "Classical computing (Part I)"
  },
  "complexity": {
    "title": "Complexity Reference",
    "intro": "Query and time complexity comparisons for foundational quantum algorithms. Constants hidden; fault-tolerant model assumed unless noted.",
    "tableTitle": "Algorithm comparison table",
    "colAlgorithm": "Algorithm",
    "colProblem": "Problem",
    "colClassical": "Classical",
    "colQuantum": "Quantum",
    "colNotes": "Notes",
    "bqpTitle": "BQP definition",
    "bqpIntro": "BQP (Bounded-error Quantum Polynomial time) is the class of decision problems solvable by a uniform family of quantum circuits in polynomial time with error probability at most 1/3.",
    "bqpContainments": "Known containments: every classical polynomial-time algorithm is a quantum algorithm (ignore classical as subset), and quantum simulation does not exceed PSPACE.",
    "cautionTitle": "Caution: BQP and NP",
    "cautionIntro": "It is unknown whether NP ⊆ BQP. Quantum computers are not known to solve all NP-complete problems efficiently. Shor's algorithm applies to period finding / factoring, not generic NP search.",
    "cautionGrover": "Grover gives only quadratic speedup for unstructured search — not exponential.",
    "cautionPromise": "Deutsch–Jozsa and Bernstein–Vazirani separations are for promise problems with structured oracles.",
    "cautionSampling": "Random circuit sampling demonstrates quantum behavior hard to simulate classically for specific tasks — not universal NP speedup.",
    "queryVsTime": "Query complexity vs time complexity",
    "queryVsTimeBody": "Query complexity counts oracle calls (Deutsch, Grover). Time complexity includes circuit size for implementing oracles and arithmetic (Shor). A small query count can hide large classical preprocessing or expensive oracles.",
    "faultTolerance": "Fault tolerance requirement",
    "faultToleranceBody": "Shor's factoring and large-scale phase estimation require fault-tolerant logical qubits with error rates below threshold. NISQ devices without correction cannot run cryptographically relevant Shor instances — complexity statements assume the ideal fault-tolerant model.",
    "checkpointQ": "Does Grover's algorithm prove BQP contains NP?",
    "checkpointHint": "Grover is quadratic, not exponential; NP vs BQP is open.",
    "rows": {
      "deutsch": {
        "algorithm": "Deutsch",
        "problem": "Is f:{0,1}→{0,1} constant or balanced?",
        "classical": "2 queries (worst case)",
        "quantum": "1 query",
        "notes": "First separation; balanced = outputs differ on at least one input"
      },
      "deutschJozsa": {
        "algorithm": "Deutsch–Jozsa",
        "problem": "Constant vs balanced f:{0,1}ⁿ→{0,1}",
        "classical": "2ⁿ⁻¹ + 1 queries (worst)",
        "quantum": "1 query",
        "notes": "Exponential query separation; not practical (promise problem)"
      },
      "bernsteinVazirani": {
        "algorithm": "Bernstein–Vazirani",
        "problem": "Find hidden string s where f(x) = s·x mod 2",
        "classical": "n queries",
        "quantum": "1 query",
        "notes": "Linear query separation; generalizes Deutsch–Jozsa"
      },
      "grover": {
        "algorithm": "Grover",
        "problem": "Unstructured search over N items",
        "classical": "O(N) queries",
        "quantum": "O(√N) queries",
        "notes": "Quadratic speedup; optimal for unstructured search"
      },
      "shor": {
        "algorithm": "Shor",
        "problem": "Factor N-bit integer",
        "classical": "Subexp (GNFS); no known poly-time",
        "quantum": "Poly(n) time (fault-tolerant model)",
        "notes": "Requires QFT + phase estimation; not NISQ-feasible at crypt scale"
      },
      "simon": {
        "algorithm": "Simon",
        "problem": "Find hidden period of f with f(x)=f(x⊕s)",
        "classical": "O(2ⁿ/²) queries",
        "quantum": "O(n) queries",
        "notes": "Exponential separation; precursor to Shor"
      },
      "stateSimulation": {
        "algorithm": "State simulation",
        "problem": "Simulate n-qubit generic circuit",
        "classical": "O(2ⁿ) memory/time",
        "quantum": "Physical — not efficient to output full 2ⁿ vector",
        "notes": "Clifford circuits simulate in O(n²) classically (Gottesman–Knill)"
      }
    }
  }
};
