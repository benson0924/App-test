import type { TranslationTree } from '@/i18n/types';

export const entanglement: TranslationTree = {
  meta: {
    title: 'Chapter 7: Entanglement & Bell Correlations',
    intro:
      'When two qubits are entangled, their joint state cannot be factored into individual descriptions. Measurements on separated particles show correlations that Einstein, Podolsky, and Rosen found puzzling — yet the predictions match experiment. This chapter introduces the EPR question, the four Bell states, the difference between correlation and causation, and reduced states via the partial trace.',
  },
  sections: {
    '7.1': {
      title: '7.1 EPR & local hidden variables',
      paragraphs: [
        'In 1935, Einstein, Podolsky, and Rosen argued that if quantum mechanics is complete, measuring one particle of an entangled pair seems to instantaneously fix the other\'s properties — uncomfortable with relativity. Their thought experiment used entangled position/momentum; modern presentations use spin or polarization qubits.',
        'A local hidden variable (LHV) model assumes each particle carries pre-set values determined at creation, and measurements merely reveal them without faster-than-light influence. Bell and others showed that certain correlation inequalities (CHSH) cap what any LHV model can produce — quantum mechanics exceeds that cap.',
        'We do not need metaphysics to use entanglement: it is a resource for protocols (teleportation, superdense coding, error correction). The EPR debate sharpened the question — are correlations classical-like with hidden instructions, or genuinely quantum? Experiments favor quantum mechanics, while no-signaling ensures relativity is respected.',
      ],
      checkpoints: [
        {
          question: 'Can entanglement alone send a message faster than light?',
          answer: 'no',
          hint: "Marginal outcomes at Bob do not depend on Alice's setting.",
        },
      ],
      examples: [
        {
          title: 'EPR-style correlation sketch',
          steps: [
            { label: 'Alice and Bob share |Ψ⁻⟩.' },
            { label: 'Both measure Z: always opposite bits (01 or 10).' },
            { label: 'LHV story: each particle had a hidden z ∈ {+1,−1} fixed at source.' },
            { label: 'Bell/CHSH: some angle choices force LHV correlations ≤ 2; quantum hits 2√2.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'What EPR did not claim',
          paragraphs: [
            'EPR questioned completeness of quantum theory, not its empirical success. They did not propose a practical faster-than-light phone. Modern quantum information treats entanglement as correlation without controllable communication — verified by no-signaling theorems.',
          ],
        },
      ],
      practice: [
        {
          question: 'In one sentence, what question do local hidden variables try to answer about Bell correlations?',
          answer:
            'Whether pre-shared classical random variables at the source can reproduce all quantum correlation statistics without nonlocal influence.',
        },
      ],
      labLink: 'Bell/CHSH Experiment lab',
    },
    '7.2': {
      title: '7.2 The four Bell states',
      paragraphs: [
        'The Bell basis is a complete orthonormal set of maximally entangled two-qubit states. Any two-qubit pure state can be expressed in this basis, but the four Bell states are the building blocks for entanglement swapping, superdense coding, and many algorithms.',
        '|Φ⁺⟩ is prepared by H then CNOT on |00⟩. Applying Z on one qubit turns |Φ⁺⟩ into |Φ⁻⟩; X on one qubit gives |Ψ⁺⟩; both gives |Ψ⁻⟩. They are mutually orthogonal — numerically |⟨Φ⁺|Ψ⁻⟩|² = 0 (zero overlap confirms orthogonality).',
      ],
      checkpoints: [
        {
          question: 'Is |Φ⁺⟩ a product state?',
          answer: 'no',
          hint: 'Try writing α|0⟩+β|1⟩ on each qubit separately.',
        },
      ],
      examples: [
        {
          title: 'Create |Φ⁺⟩ and relate to |Φ⁻⟩',
          steps: [
            { label: 'H₀ on |00⟩.' },
            { label: 'CNOT₀₁ → |Φ⁺⟩.' },
            { label: 'Apply Z on qubit 1.' },
            { label: 'Apply X on qubit 1 instead.' },
          ],
        },
      ],
      expandables: [],
      practice: [
        {
          question: 'How many Bell states span the subspace of states with equal amplitude on |00⟩ and |11⟩ only?',
          answer:
            'Two: |Φ⁺⟩ and |Φ⁻⟩ differ by relative sign between |00⟩ and |11⟩. The |Ψ±⟩ pair spans the odd-parity subspace (|01⟩ and |10⟩) instead.',
        },
      ],
      labLink: 'Bell State Generator',
    },
    '7.3': {
      title: '7.3 Correlation vs causation',
      paragraphs: [
        'Strong correlations between distant measurements do not mean one event caused the other in the classical sense. With entanglement, neither outcome exists as a definite classical value before measurement in the standard quantum formalism — yet joint statistics are rigidly correlated when bases match.',
        "If Alice measures before Bob or Bob before Alice, the predicted joint distribution is the same (for the same observables). Relativistic quantum field theory formalizes this with no-signaling: Alice cannot encode a message in her choice of measurement basis because Bob's marginal statistics are unchanged.",
      ],
      checkpoints: [
        {
          question: 'Can Alice send a message by choosing her measurement angle alone?',
          answer: 'no',
        },
      ],
      examples: [
        {
          title: '|Φ⁺⟩ in Z basis',
          steps: [
            { label: 'Joint state has only |00⟩ and |11⟩.' },
            { label: 'Alice measures Z → 0 or 1 with 50% each.' },
            { label: 'Given A=0, Bob\'s qubit is |0⟩; given A=1, Bob\'s is |1⟩.' },
            { label: 'Bob\'s marginal alone is still 50/50 — correlation without controllable signal.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Common misconception',
          paragraphs: [
            '"Spooky action at a distance" sounds like causation, but you cannot use entanglement to transmit classical bits without a classical channel. Correlation is necessary for teleportation, but the classical 2-bit message carries the usable information.',
          ],
        },
      ],
      practice: [
        {
          question:
            "Alice and Bob share |Φ⁺⟩. Alice measures Z and gets 0. What is Bob's state before he measures, and does Alice's choice of X vs Z basis change Bob's marginal if Bob always measures Z?",
          answer:
            "Conditional on Alice's 0, Bob is in |0⟩ (collapses joint state). If Alice measures in X instead, Bob's Z marginal remains 50/50 — Alice's basis choice changes correlations, not Bob's Z-only marginal statistics before he measures.",
        },
      ],
    },
    '7.4': {
      title: '7.4 Reduced states & partial trace',
      paragraphs: [
        'Describing one subsystem of an entangled pair requires tracing out the other. For pure joint state |ψ⟩_AB, the reduced density matrix on A is ρ_A = Tr_B(|ψ⟩⟨ψ|). If ρ_A is not a pure state projector, subsystem A is entangled with B — even though A alone may look completely random when measured.',
        'For |Φ⁺⟩, ρ_A = I/2 — maximally mixed. Alice\'s Z outcomes are 50/50, yet the joint state is pure. This is the hallmark of entanglement: ignorance locally, information globally. For a product state |00⟩, ρ_A = |0⟩⟨0| — pure and uncorrelated.',
      ],
      checkpoints: [
        {
          question: 'For |Φ⁺⟩, is the reduced state on one qubit pure or mixed?',
          answer: 'mixed',
          hint: 'Tr(ρ_A²) = 1/2.',
        },
      ],
      examples: [
        {
          title: 'Partial trace of |Φ⁺⟩',
          steps: [
            { label: 'Amplitudes c₀₀ = c₁₁ = 1/√2.' },
            { label: 'ρ_A = Tr_B: sum over B index of |ψ⟩⟨ψ| blocks.' },
            { label: 'Purity Tr(ρ_A²) = 1/2 < 1 → mixed reduced state.' },
            { label: 'Entanglement entropy S(ρ_A) = ln 2 for this maximally entangled pair.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Schmidt decomposition preview',
          paragraphs: [
            'Any bipartite pure state |ψ⟩ = Σᵢ λᵢ|i_A⟩|i_B⟩ with λᵢ ≥ 0. Schmidt rank 1 iff product; rank > 1 iff entangled. The λᵢ² are eigenvalues of ρ_A and ρ_B — same spectrum. See Multiple Qubits chapter for more.',
          ],
        },
      ],
      practice: [
        {
          question: 'Compute ρ_A for |00⟩ and compare purity to |Φ⁺⟩.',
          answer:
            '|00⟩ is product: ρ_A = |0⟩⟨0|, purity 1. |Φ⁺⟩ gives ρ_A = I/2, purity 1/2. Entanglement shows up as mixed marginals despite a pure joint state.',
        },
      ],
      labLink: 'Entanglement Measurement lab',
    },
  },
  widgets: {
    bellStatesExplorer: {
      title: 'The four Bell states',
      productQuestion: 'Product state?',
      productYes: 'Yes',
      productNo: 'No',
      entangledNote: ' — all four Bell states are entangled.',
      jointProbabilities: 'Joint probabilities:',
    },
    partialTrace: {
      title: 'Reduced state on qubit A (partial trace)',
      phiPlus: '|Φ⁺⟩ (entangled)',
      product: '|00⟩ (product)',
      description:
        'Tr_B(|ψ⟩⟨ψ|) describes qubit A alone. Entangled states yield mixed reduced states even when the joint state is pure.',
      rhoLabel: 'ρ_A = [ {{matrix}} ] (computational basis)',
      purity: 'Purity Tr(ρ_A²) ≈ {{value}} —',
      pureCase: 'pure (product case)',
      mixedCase: 'mixed (maximally mixed ≈ 0.5 for Bell)',
    },
    correlationDemo: {
      title: 'Correlation vs causation',
      zBasis: 'Z basis (computational)',
      xBasis: 'X basis (Hadamard)',
      zNote: 'Measure both in Z: outcomes always match (00 or 11) — perfect correlation.',
      xNote: 'Measure both in X: outcomes anti-correlate for |Φ⁺⟩ in matched angles — still non-classical.',
      footer:
        "Correlation does not imply Alice's measurement caused Bob's outcome — no signaling. Shared entanglement plus local measurements explain the statistics; CHSH (later) quantifies when correlations exceed any local hidden-variable story.",
    },
    practice: {
      label: 'Practice problem.',
      revealSolution: 'Reveal solution',
    },
    labLink: 'Open full lab: {{title}} →',
  },
  nav: {
    prev: '← Error Correction',
    next: 'Next: Quantum Protocols →',
  },
};
