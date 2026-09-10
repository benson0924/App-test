import type { TranslationTree } from '@/i18n/types';

export const errorCorrection: TranslationTree = {
  meta: {
    title: 'Chapter 5: Quantum Error Correction',
    intro:
      'Real quantum hardware is noisy. Gates misfire, qubits decohere, and environment interactions leak information. Quantum error correction (QEC) encodes fragile logical information into redundant entangled states so that errors can be detected and reversed — without measuring the logical qubit directly. This chapter builds from noise models through the simplest codes to stabilizer language and the distinction between correction and mitigation.',
  },
  sections: {
    '5.1': {
      title: '5.1 Why quantum error correction?',
      paragraphs: [
        'Classical repetition codes copy a bit three times and take a majority vote. Quantum mechanics forbids cloning, so we cannot simply duplicate an unknown qubit state. Instead, QEC spreads one logical qubit across several physical qubits using entanglement, then measures syndrome operators that reveal error types without collapsing the encoded information.',
        'Noise on a qubit is often modeled as a short list of discrete Pauli errors plus continuous decoherence. A bit-flip applies X, swapping |0⟩ and |1⟩. A phase-flip applies Z, flipping the sign of |1⟩ while leaving probabilities unchanged. Decoherence (T₂ processes) destroys off-diagonal coherences in the density matrix, turning superpositions into classical mixtures. Gate errors mean the implemented unitary differs from the intended one — over-rotation, miscalibrated pulses, or crosstalk.',
        'A physical qubit is the two-level system you manipulate on chip — subject to all the noise above. A logical qubit is an encoded degree of freedom protected by a code; many physical qubits (and ancillas) may represent one logical qubit. The goal is to make logical error rates far smaller than physical rates, enabling long algorithms once physical noise falls below a threshold.',
      ],
      checkpoints: [
        {
          question: 'Name one discrete single-qubit Pauli error.',
          answer: 'bit flip',
          hint: 'X, Y, or Z — pick the one that swaps |0⟩ and |1⟩.',
        },
      ],
      examples: [
        {
          title: 'Bit flip on |+⟩',
          steps: [
            { label: 'Start from |+⟩ = H|0⟩.' },
            { label: 'Apply X (bit flip).' },
            { label: 'Z-basis measurement probabilities swap: P(0) and P(1) exchange roles.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Why not clone?',
          paragraphs: [
            'The no-cloning theorem states there is no unitary that copies an arbitrary unknown qubit. Repetition therefore requires preparing correlated copies through CNOT encoding — and syndrome extraction must be designed so measuring parities does not reveal the logical 0/1 content.',
          ],
        },
      ],
      practice: [
        {
          question:
            'A physical qubit has error rate p = 0.1 per time step. Why is naive repetition (copying the same classical bit three times) impossible quantum mechanically, and what replaces it?',
          answer:
            'Unknown qubits cannot be copied. We replace cloning with an entangling encode: |0⟩_L = |000⟩, |1⟩_L = |111⟩ via CNOTs from a single data qubit. Parity checks Z₀Z₁ and Z₁Z₂ detect which bit flipped without measuring the logical value.',
        },
      ],
    },
    '5.2': {
      title: '5.2 Three-qubit bit-flip code',
      paragraphs: [
        'The simplest quantum code protects against a single bit-flip (X) on any of three qubits. Logical zero and one span a two-dimensional subspace of the eight-dimensional Hilbert space of three qubits:',
        'Encoding applies CNOT from qubit 0 to qubits 1 and 2. Any single X error takes the codeword to another state that differs in Z-parity between neighbors. Measuring the stabilizers Z₀Z₁ and Z₁Z₂ (products of Pauli Z on adjacent pairs) yields a two-bit syndrome. The syndrome identifies which qubit flipped; applying X on that qubit restores the codeword.',
        'Crucially, these are commuting measurements on the code space: they do not distinguish |0⟩_L from |1⟩_L, only which error occurred. The interactive table below lets you inject an error and watch the syndrome point to the correction.',
      ],
      checkpoints: [
        {
          question: 'How many bit-flip errors can the 3-qubit bit-flip code correct?',
          answer: '1',
          hint: 'Distinct syndromes for each single-qubit X.',
        },
      ],
      examples: [
        {
          title: 'Detect and correct X on qubit 1',
          steps: [
            { label: 'Encode |1⟩_L → |111⟩ using X on qubit 0 then CNOTs.' },
            { label: 'Bit-flip on qubit 1 → |101⟩.' },
            { label: 'Z₀Z₁ eigenvalue: Z on qubits 0,1 gives (−1)(+1)(−1) = +1 → syndrome bit 1.' },
            { label: 'Z₁Z₂ eigenvalue: (+1)(−1)(+1) = −1 → syndrome bit 0.' },
            { label: 'Apply X₁ to recover |111⟩.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Encoding circuit',
          paragraphs: [
            'If the input on qubit 0 is α|0⟩ + β|1⟩, the output is α|000⟩ + β|111⟩ — a superposition of valid codewords, not a classical triple copy.',
          ],
        },
      ],
      practice: [
        {
          question:
            'You measure syndrome (1, 0) on the bit-flip code. Which correction do you apply, and why does this not reveal whether the logical qubit was |0⟩_L or |1⟩_L?',
          answer:
            'Syndrome (1, 0) indicates X on qubit 1 — apply X₁. Both |000⟩ and |111⟩ produce the same syndrome under X₁ (|100⟩ and |011⟩ respectively), so the syndrome only identifies the error, not the logical bit value.',
        },
      ],
      labLink: 'Error Correction Simulator',
    },
    '5.3': {
      title: '5.3 Phase-flip code, Shor code & stabilizers',
      paragraphs: [
        'The bit-flip code protects against X but not Z: a phase error Z|111⟩ = −|111⟩ leaves bit parities unchanged yet flips the logical sign. The phase-flip code swaps roles: logical states are uniform superpositions |0⟩_L = |+++⟩, |1⟩_L = |−−−⟩ with X-parity checks. Equivalently, conjugate the bit-flip code by H⊗³: Z errors become X errors in the rotated frame.',
        'Neither code alone handles arbitrary single-qubit Pauli errors (X, Y, or Z). Peter Shor combined both ideas into a 9-qubit code: three blocks of three qubits, each block a bit-flip code, with an outer layer of phase-flip protection across blocks. One logical qubit uses nine physical qubits plus syndrome ancillas in full implementations.',
      ],
      checkpoints: [
        {
          question: 'What gate conjugation turns the bit-flip code into the phase-flip code?',
          answer: 'hadamard',
          hint: 'Apply the same gate on every qubit before and after.',
        },
      ],
      examples: [
        {
          title: 'Shor code layout (conceptual)',
          steps: [
            { label: 'Block 1, 2, 3 each encode a bit via |0⟩→|000⟩, |1⟩→|111⟩ within the block.' },
            { label: 'Phase errors between blocks detected by X-type parity on corresponding qubits across blocks.' },
            { label: 'Any single-qubit X, Y, or Z error maps to a unique syndrome under nine stabilizer generators.' },
            { label: 'Correction applies the inverse Pauli on the affected physical qubit.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Stabilizer formalism (introduction)',
          paragraphs: [
            'A stabilizer code is the simultaneous +1 eigenspace of an abelian group of Pauli operators {S₁, …, S_{n−k}}. For the bit-flip code, S₁ = Z₀Z₁ and S₂ = Z₁Z₂ stabilize |000⟩ and |111⟩. Measuring each Sᵢ (via ancilla coupling) gives ±1 outcomes; the bit pattern is the syndrome. Logical operators are Pauli strings that commute with all stabilizers but are not in the group — e.g. X̄ = X₀X₁X₂ for the bit-flip code.',
            'Modern codes (surface code, color code) are stabilizer codes with local checks on a 2D lattice — the leading path toward fault-tolerant quantum computing.',
          ],
        },
      ],
      practice: [
        {
          question:
            'Write two stabilizers for the 3-qubit bit-flip code and explain why Z₀Z₁ anticommutes with a logical X̄ = X₀X₁X₂ applied to |1⟩_L but commutes with the code space.',
          answer:
            'Stabilizers: S₁ = Z₀Z₁, S₂ = Z₁Z₂. For |111⟩, each Z pair gives +1. A logical X̄ flips all bits; S₁ and S₂ still yield +1 on valid codewords. An error X_j anticommutes with one stabilizer, flipping its measurement outcome — that is the syndrome bit.',
        },
      ],
      labLink: 'Error Correction Simulator (Shor-style demos)',
    },
    '5.4': {
      title: '5.4 Error mitigation vs correction',
      paragraphs: [
        'Error correction actively removes the effect of errors by extracting syndrome information and applying a recovery operation, preserving the logical quantum state (in principle arbitrarily well below threshold). It requires extra qubits, real-time classical processing, and often fast feedback — the full fault-tolerance stack.',
        'Error mitigation does not recover the exact pre-error state. Instead it estimates expectation values or outputs by combining many noisy runs: zero-noise extrapolation, probabilistic error cancellation, readout correction, or Clifford data regression. Mitigation is cheaper and works on today\'s NISQ devices but does not provide an exponential suppression of logical error with code distance.',
        'Below a threshold physical error rate, concatenated or surface codes make logical errors vanish with increasing code size — enabling arbitrarily long computations in principle. Above threshold, correction fails. Mitigation remains useful either way for near-term variational algorithms where full QEC is too costly.',
      ],
      checkpoints: [
        {
          question: 'Does QEC require measuring the logical qubit value directly?',
          answer: 'no',
          hint: 'Only syndromes — parities — are measured.',
        },
        {
          question: 'Can error mitigation guarantee an arbitrarily long coherent quantum computation?',
          answer: 'no',
          hint: 'Mitigation improves estimates; it does not scale like fault-tolerant QEC.',
        },
      ],
      examples: [
        {
          title: 'Zero-noise extrapolation (sketch)',
          steps: [
            { label: 'Run the same circuit at noise strengths λ, 2λ, 3λ (stretched gates).' },
            { label: 'Measure observable ⟨O⟩ at each noise level.' },
            { label: 'Fit a curve and extrapolate to λ → 0 for an improved estimate.' },
            { label: 'This mitigates bias in ⟨O⟩ but does not fix a corrupted logical qubit mid-circuit.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Fault tolerance in one paragraph',
          paragraphs: [
            'A fault-tolerant quantum computer assumes errors can occur anywhere — including in syndrome circuits and recovery gates — yet encoded computation still succeeds if physical error rates are low enough. Threshold theorems (~10⁻³ to 10⁻² depending on architecture) motivate the race for better physical qubits and control electronics.',
          ],
        },
      ],
      practice: [
        {
          question:
            "Your device has p = 10⁻² gate errors and no full QEC. Should you use mitigation or wait for a fault-tolerant machine to run Shor's algorithm on RSA-2048?",
          answer:
            'Shor requires millions of high-fidelity gates — far beyond NISQ mitigation. Mitigation might help small variational demos; factoring RSA-2048 needs fault-tolerant QEC below threshold, not post-processing alone.',
        },
      ],
    },
  },
  widgets: {
    noiseExplorer: {
      title: 'Noise on a single qubit',
      ideal: 'Ideal |+⟩',
      bitFlip: 'Bit flip (X)',
      phaseFlip: 'Phase flip (Z)',
      decoherence: 'Decoherence',
      gateError: 'Gate error',
      descriptions: {
        ideal: '|+⟩ = (|0⟩ + |1⟩)/√2',
        bit: 'Bit-flip (X): |+⟩ → |−⟩ — superposition sign in Z basis flips.',
        phase: 'Phase-flip (Z): |+⟩ unchanged in Z probs, but relative phase becomes −1.',
        decoherence:
          'Decoherence (T₂): off-diagonal coherences vanish → classical mixture |0⟩⟨0| (shown as |0⟩).',
        gate: 'Gate over-rotation: intended H approximated by Rx(0.3) — wrong unitary.',
      },
      probabilities: 'P(|0⟩) = {{p0}}%, P(|1⟩) = {{p1}}%',
    },
    syndromeTable: {
      title: '3-qubit bit-flip code — syndrome table',
      logicalQubit: 'Logical |0⟩_L or |1⟩_L',
      logical0: '|0⟩_L → |000⟩',
      logical1: '|1⟩_L → |111⟩',
      injectError: 'Inject bit-flip error',
      noError: 'No error',
      xOnQubit: 'X on qubit {{n}}',
      headers: {
        error: 'Error',
        syndrome: 'Syndrome (Z₀Z₁, Z₁Z₂)',
        correction: 'Correction',
        active: 'Active',
      },
      errors: {
        none: 'None',
        x0: 'X on qubit 0',
        x1: 'X on qubit 1',
        x2: 'X on qubit 2',
      },
      fixes: {
        identity: 'Identity',
        x0: 'X₀',
        x1: 'X₁',
        x2: 'X₂',
      },
      measuredSyndrome: 'Measured syndrome:',
      applyCorrection: '→ apply X_{{n}}',
      fidelity: 'Post-correction fidelity with encoded state: {{value}}%',
      corruptedTitle: 'Corrupted state (non-zero amplitudes)',
      correctedTitle: 'After correction',
    },
    phaseFlipViaH: {
      title: 'Phase-flip code via H conjugation',
      description:
        'Apply H on each qubit before/after the bit-flip code: a Z error in the original basis becomes an X error in the H-rotated basis, detected by the same parity checks.',
      zErrorLocation: 'Z error location',
      noZError: 'No Z error',
      zOnQubit: 'Z on qubit {{n}}',
      rotatedNote: 'After H⊗³, the Z error appears as a bit-flip on qubit {{n}} in the rotated basis.',
      afterZError: 'State after Z error (logical |+⟩_L in phase code)',
      afterH: 'After H⊗³ (X-type error exposed)',
    },
    physicalVsLogical: {
      title: 'Physical vs logical error rates (schematic)',
      physicalRate: 'Physical error rate p = {{value}}%',
      codeDistance: 'Repetition code distance d = {{d}}',
      logicalFailure: 'Logical failure probability ≈ {{value}}% (more than ⌊d/2⌋ errors)',
      note:
        'One logical qubit is encoded across many physical qubits. QEC trades overhead for exponentially suppressed logical errors when p is below threshold.',
    },
    practice: {
      label: 'Practice problem.',
      revealSolution: 'Reveal solution',
    },
    labLink: 'Open full lab: {{title}} →',
  },
  nav: {
    prev: '← Quantum Circuits',
    next: 'Next: Entanglement →',
  },
};
