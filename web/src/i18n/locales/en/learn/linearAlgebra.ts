import type { TranslationTree } from '@/i18n/types';

export const linearAlgebra: TranslationTree = {
  meta: {
    tag: 'Chapter 3',
    title: 'Linear Algebra for Quantum Computing',
    intro:
      'Quantum mechanics is linear algebra over complex numbers. This chapter develops the Dirac notation — kets, bras, inner products, projectors, and unitary operators — that we use to describe states, measurements, and reversible gates throughout the rest of the textbook.',
  },
  sections: {
    '3.1': {
      title: '3.1 Kets — Vector Representation',
      paragraphs: [
        'A quantum pure state is represented by a column vector in a complex Hilbert space. Dirac\'s ket notation writes this vector as |ψ⟩, read "psi ket." For one qubit the space is ℂ², spanned by the computational basis kets |0⟩ and |1⟩.',
        'In column-vector form, |0⟩ = (1, 0)ᵀ and |1⟩ = (0, 1)ᵀ. Any single-qubit state is a linear combination |ψ⟩ = α|0⟩ + β|1⟩ with complex coefficients stored as a two-component column:',
        'The ket is not merely a notational convenience — it signals that we are treating the object as a vector that will be acted on by matrices (operators) from the left. When we extend to multiple qubits, kets live in larger tensor-product spaces, but the column-vector picture remains the same.',
        'We often label basis kets by bit strings: |0⟩ and |1⟩ for one qubit, later |00⟩, |01⟩, … for two. The symbol inside the ket is a shorthand for which standard basis direction the vector points — not a classical value stored inside the quantum system.',
      ],
      checkpoints: [
        {
          question: 'How many complex amplitudes specify a single-qubit pure state?',
          answer: '2',
          hint: 'Count the basis states |0⟩ and |1⟩.',
        },
      ],
      examples: [
        {
          title: 'Express |+⟩ in column form',
          steps: [
            { label: 'The |+⟩ state is an equal superposition of |0⟩ and |1⟩.' },
            { label: 'Substitute the basis column vectors and add component-wise.' },
            { label: 'Result: a normalized column vector with equal real entries.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Global phase is unphysical',
          paragraphs: [
            'Multiplying a ket by any non-zero complex scalar e^{iγ} changes the vector but not any observable probability. States |ψ⟩ and e^{iγ}|ψ⟩ are physically equivalent. We usually fix the global phase by requiring the first non-zero amplitude to be real and positive, or by imposing the normalization constraint below.',
          ],
        },
      ],
    },
    '3.2': {
      title: '3.2 Bras — Conjugate Transpose',
      paragraphs: [
        'Every ket |ψ⟩ has a dual bra ⟨ψ|, obtained by taking the conjugate transpose (Hermitian adjoint) of the column vector. If |ψ⟩ = (α, β)ᵀ, then ⟨ψ| = (α*, β*) — a row vector with complex conjugated entries.',
        'The dagger notation (·)† denotes conjugate transpose for vectors and matrices. For kets, ⟨ψ| = |ψ⟩†. This pairing is what makes Dirac\'s braket ⟨φ|ψ⟩ a natural inner product: a row times a column yielding a complex scalar.',
      ],
      checkpoints: [
        {
          question: 'What is the bra ⟨0| in row-vector form?',
          answer: '(1, 0)',
          hint: 'Take the conjugate transpose of |0⟩ = (1, 0)ᵀ.',
        },
      ],
      examples: [
        {
          title: 'Find ⟨ψ| for |ψ⟩ = (1, i)ᵀ',
          steps: [
            { label: 'Write the ket as a column.' },
            { label: 'Take complex conjugate of each entry.' },
            { label: 'Form the row vector (conjugate transpose).' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Why conjugate?',
          paragraphs: [
            'Complex conjugation ensures the inner product ⟨ψ|ψ⟩ is a non-negative real number — the squared norm of the state. Without conjugation, ψᵀψ could be complex, which would not serve as a probability weight.',
          ],
        },
        {
          title: 'Matrix–vector multiplication preview',
          paragraphs: [
            'A gate matrix U maps kets to kets: |ψ\'⟩ = U|ψ⟩. In components, ψ\'ᵢ = Σⱼ Uᵢⱼ ψⱼ. The bra transforms contravariantly: ⟨ψ\'| = ⟨ψ|U†. Keeping track of whether the adjoint acts on the left or right prevents many sign errors in derivations.',
          ],
        },
      ],
    },
    '3.3': {
      title: '3.3 Inner Products, Norm, and Orthogonality',
      paragraphs: [
        'The inner product (or scalar product) of two kets |φ⟩ and |ψ⟩ is the complex number ⟨φ|ψ⟩, computed by summing products of conjugated components:',
        'The norm of a state is ‖ψ‖ = √(⟨ψ|ψ⟩). A valid quantum state must be normalized: ⟨ψ|ψ⟩ = 1. Two states are orthogonal when ⟨φ|ψ⟩ = 0 — they share no overlap and are perfectly distinguishable in a single-shot measurement in a basis containing both.',
        'The computational basis {|0⟩, |1⟩} is orthonormal: each vector has unit norm and any two distinct basis kets are orthogonal. This is the default measurement basis for qubits throughout the textbook.',
      ],
      checkpoints: [
        {
          question: 'Are |+⟩ and |−⟩ orthogonal?',
          answer: 'yes',
          hint: 'Compute ⟨+|−⟩; |−⟩ = (|0⟩ − |1⟩)/√2.',
        },
      ],
      examples: [
        {
          title: 'Inner product of |0⟩ and |+⟩',
          steps: [
            { label: 'Write both kets in column form.' },
            { label: 'Form ⟨0|+⟩ = 1*·(1/√2) + 0*·(1/√2).' },
            { label: 'The overlap is non-zero — |0⟩ and |+⟩ are not orthogonal.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Properties of the inner product',
          paragraphs: [
            'Conjugate symmetry and linearity in the second argument make the inner product a sesquilinear form — the standard geometry of complex Hilbert spaces.',
          ],
        },
      ],
    },
    '3.4': {
      title: '3.4 Projection and Measurement',
      paragraphs: [
        'When we measure a qubit in the computational basis, outcome m ∈ {0,1} occurs with probability given by the Born rule:',
        'The amplitude ⟨m|ψ⟩ is the overlap between the state and the measurement outcome ket. Squaring its magnitude gives a real probability between 0 and 1. After obtaining outcome m, the state collapses to |m⟩ (up to normalization, which is already 1 for basis states).',
        'The projector onto outcome m is the outer product P_m = |m⟩⟨m|, a 2×2 matrix that picks out the component of |ψ⟩ along |m⟩. The probability can also be written P(m) = ⟨ψ|P_m|ψ⟩.',
        'Projectors are Hermitian (P_m = P_m†) and idempotent (P_m² = P_m). Applying a projector once has the same effect as applying it twice — once we know the outcome, repeating the measurement yields the same result with certainty.',
      ],
      checkpoints: [
        {
          question: 'For |ψ⟩ = |+⟩, what is P(0) when measuring in the computational basis?',
          answer: '1/2',
          hint: '⟨0|+⟩ = 1/√2; square the magnitude.',
        },
      ],
      examples: [
        {
          title: 'Measure |ψ⟩ = (3/5)|0⟩ + (4/5)|1⟩ in the Z basis',
          steps: [
            { label: 'Compute ⟨0|ψ⟩ = 3/5.' },
            { label: 'Probability of outcome 0.' },
            { label: 'By normalization, P(1) = 1 − P(0) = 16/25 = 0.64.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'General projective measurement',
          paragraphs: [
            'For an orthonormal basis {|m⟩}, the projectors P_m = |m⟩⟨m| satisfy Σ_m P_m = I and P_m P_{m\'} = δ_{mm\'} P_m. Measuring in the X basis uses projectors onto |+⟩ and |−⟩ instead of |0⟩ and |1⟩.',
          ],
        },
      ],
      labLink: 'Measurement Lab',
    },
    '3.5': {
      title: '3.5 Outer Products and Completeness',
      paragraphs: [
        'The outer product of a ket |ψ⟩ and a bra ⟨φ| forms a matrix: |ψ⟩⟨φ|. For single-qubit kets this is a 2×2 complex matrix. When φ = ψ, the outer product is a rank-one projector onto the subspace spanned by |ψ⟩.',
        'A crucial identity: summing outer products over an orthonormal basis reconstructs the identity operator. For the computational basis,',
        'This completeness relation (also called resolution of the identity) underlies the Born rule: inserting I = Σⱼ |j⟩⟨j| into ⟨ψ|ψ⟩ decomposes unity into a sum of probabilities |⟨j|ψ⟩|².',
      ],
      checkpoints: [
        {
          question: 'What is the rank of the projector |0⟩⟨0|?',
          answer: '1',
          hint: 'It projects onto a one-dimensional subspace.',
        },
      ],
      examples: [
        {
          title: 'Verify completeness for one qubit',
          steps: [
            { label: 'Write each projector explicitly.' },
            { label: 'Add the matrices entry-wise.' },
            { label: 'The sum is the 2×2 identity I.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Spectral decomposition preview',
          paragraphs: [
            'Hermitian operators (observables) decompose as A = Σₖ λₖ |k⟩⟨k| with real eigenvalues λₖ. Unitary operators have eigenvalues on the unit circle. The outer-product framework unifies measurement projectors and gate spectral theory.',
          ],
        },
      ],
      labLink: 'Tensor Product Lab',
    },
    '3.6': {
      title: '3.6 Unitary Matrices',
      paragraphs: [
        'Quantum gates are represented by unitary matrices. A matrix U is unitary if its conjugate transpose equals its inverse:',
        'Unitary evolution is reversible: given |ψ\'⟩ = U|ψ⟩, we can recover |ψ⟩ = U†|ψ\'⟩. This reversibility is essential — unlike classical AND gates, quantum gates do not discard information (until measurement).',
        'Normalization is preserved: for any unitary U and state |ψ⟩,',
      ],
      checkpoints: [
        {
          question: 'If U is unitary, what is det(U) in general?',
          answer: 'e^(iθ)',
          hint: 'Determinant of a unitary lies on the unit circle in the complex plane.',
        },
      ],
      examples: [
        {
          title: 'Prove H is unitary',
          steps: [
            { label: 'Write the Hadamard matrix.' },
            { label: 'Compute H† (conjugate transpose).' },
            { label: 'Multiply H†H — the (1,1) entry is ½(1+1) = 1; off-diagonals cancel.' },
            { label: 'H is unitary, so it maps valid states to valid states.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Full proof: unitaries preserve inner products',
          paragraphs: [
            'For unitary U and any kets |φ⟩, |ψ⟩:',
            'Unitary maps are isometries of Hilbert space — they preserve lengths and angles. Orthonormal bases map to orthonormal bases. This is why composing gates (multiplying unitaries) always yields another valid gate.',
          ],
        },
      ],
      labLink: 'Unitary Checker',
    },
  },
  widgets: {
    innerProduct: {
      intro:
        'Enter two 2-vectors (complex components). The calculator computes ⟨a|b⟩ = a₀* b₀ + a₁* b₁ using quantum-core.',
      preset00: '|0⟩ · |+⟩',
      preset01: '|0⟩ · |1⟩',
      preset02: '|+⟩ · |−⟩',
      vectorA: '|a⟩ components',
      vectorB: '|b⟩ components',
      reA0: 'Re a₀',
      imA0: 'Im a₀',
      reA1: 'Re a₁',
      imA1: 'Im a₁',
      reB0: 'Re b₀',
      imB0: 'Im b₀',
      reB1: 'Re b₁',
      imB1: 'Im b₁',
      invalidEntry: 'Invalid complex entry',
      normA: '|a| = {{value}}',
      normB: '|b| = {{value}}',
      rawInner: '⟨a|b⟩ (raw) = {{value}}',
      normalizedInner: '⟨â|b̂⟩ (normalized) = {{value}}',
      overlapSquared: '|⟨a|b⟩|² = {{value}}%',
      orthogonal: ' — orthogonal (inner product ≈ 0)',
    },
    unitary: {
      label: 'Single-qubit gate U',
      matrixU: 'Matrix U',
      productUdU: 'Product U†U',
      isUnitary: '✓ U†U = I — this gate preserves vector norms.',
      notUnitary: '✗ Not unitary — not a valid quantum gate.',
    },
    projection: {
      intro:
        'Set amplitudes α, β (real for simplicity). The demo computes P(0) = |⟨0|ψ⟩|² and P(1) = |⟨1|ψ⟩|².',
      alpha: 'α (real)',
      beta: 'β (real)',
      p0: 'P(0)',
      p1: 'P(1)',
      completeness: 'P(0) + P(1) = {{sum}}% (completeness relation).',
    },
    labLink: 'Open full lab: {{title}} →',
  },
  nav: {
    allChapters: '← All Chapters',
    next: 'Next: Multiple Qubits →',
  },
};
