import type { TranslationTree } from '@/i18n/types';

export const classical: TranslationTree = {
  meta: {
    tag: 'Chapter 1',
    title: 'Classical Computing',
    intro:
      'Before qubits and superposition, we need a precise picture of how classical computers represent information, manipulate it with logic, and reason about computational cost. This chapter builds that foundation — and highlights concepts (reversibility, error correction, complexity) that reappear in quantum form later.',
  },
  sections: {
    'states-and-information': {
      title: '1.1 States and Information',
      paragraphs: [
        'Classical information lives in discrete, distinguishable configurations. The simplest unit is the bit, which takes one of two values: 0 or 1. Physical implementations vary (voltage levels, magnetic orientation, punch-card holes), but logically every classical register is a string of bits.',
        'An n-bit register can be in exactly one of 2^n states at any moment. There is no fractional bit and no simultaneous 0-and-1 — the register\'s content is fully specified by which bit string it holds.',
        'Try the interactive explorer above, or open the Binary State Explorer lab.',
      ],
      checkpoints: [
        {
          question: 'How many distinct states can a 7-bit classical register represent?',
          answer: '128',
          hint: 'Use 2^n with n = 7.',
        },
      ],
      examples: [
        {
          title: 'Counting 4-bit addresses',
          steps: [
            { label: 'Each bit doubles the number of distinct states. Starting from 1 bit → 2 states.' },
            { label: 'For n = 4, multiply four factors of 2.' },
            { label: 'The register can represent unsigned integers 0 through 15, or any 16 distinct symbols.' },
          ],
        },
      ],
      expandables: [],
      links: { binaryExplorer: 'Binary State Explorer' },
    },
    'binary-numbers': {
      title: '1.2 Binary Numbers',
      paragraphs: [
        'Binary strings are not just abstract states — they encode numbers. Each position carries a weight that is a power of two, read from right (least significant) to left (most significant).',
        'Conversion between binary and decimal is a routine skill. Fixed-width representations pad with leading zeros so that, for example, 5 becomes 0101 in 4 bits.',
        'Practice conversions in the Binary State Explorer lab.',
      ],
      checkpoints: [
        {
          question: 'What is 10110 in binary as a decimal number?',
          answer: '22',
          hint: 'Sum powers of two where the bit is 1: 16 + 4 + 2.',
        },
      ],
      examples: [
        {
          title: 'Convert 1101₂ to decimal',
          steps: [
            { label: 'Identify bit positions and weights (rightmost index i = 0).' },
            { label: 'Evaluate each term.' },
            { label: 'Therefore 1101₂ = 13₁₀.' },
          ],
        },
      ],
      expandables: [],
      links: { binaryExplorer: 'Binary State Explorer' },
    },
    'logic-gates': {
      title: '1.3 Logic Gates',
      paragraphs: [
        'Computation is transformation. A logic gate takes one or more bits and produces an output bit according to a fixed truth table. Gates are the building blocks of circuits: combinational networks (no memory) and sequential machines (with feedback or clocks).',
        'Common gates include NOT (inverter), AND, OR, XOR, and their negated variants NAND and NOR.',
        'Explore gate combinations in the Logic Gate Simulator lab.',
      ],
      checkpoints: [
        {
          question: 'What is the output of AND(1, 0)?',
          answer: '0',
        },
      ],
      examples: [
        {
          title: 'Build XOR from AND, OR, and NOT',
          steps: [
            { label: 'XOR is true when inputs differ — one is 0 and the other is 1.' },
            { label: 'Equivalently, XOR is OR minus the overlap (both-1 case).' },
            { label: 'A two-level circuit: compute AND and NOT terms, then OR them together.' },
          ],
        },
      ],
      expandables: [],
      links: { logicGates: 'Logic Gate Simulator' },
    },
    'boolean-algebra': {
      title: '1.4 Boolean Algebra',
      paragraphs: [
        'Boolean algebra abstracts gates into symbols with algebraic laws: commutativity, associativity, distributivity, identity elements, and complement. These laws let us simplify circuits and prove gate networks equivalent without enumerating every input.',
        'De Morgan\'s laws swap AND/OR under negation and are indispensable when translating between positive and negative logic, or when optimizing chip area.',
      ],
      checkpoints: [
        {
          question: "By De Morgan's law, what is NOT(A OR B) equivalent to?",
          answer: 'NOT(A) AND NOT(B)',
          hint: 'Negation distributes by flipping AND to OR.',
        },
      ],
      examples: [
        {
          title: 'Simplify ¬(A ∧ B) ∨ A',
          steps: [
            { label: 'Apply De Morgan to the negated AND term.' },
            { label: 'Substitute into the expression.' },
            { label: 'Use OR associativity and the identity A ∨ ¬A = 1.' },
            { label: 'The expression is a tautology — always 1 regardless of inputs.' },
          ],
        },
      ],
      expandables: [
        { title: 'Additional Boolean identities', paragraphs: [] },
      ],
    },
    adders: {
      title: '1.5 Adders',
      paragraphs: [
        'Arithmetic reduces to repeated bit operations. A half adder adds two bits producing sum and carry; a full adder also accepts an incoming carry from the previous (less significant) column. Chaining full adders yields a ripple-carry adder.',
        'Step through addition interactively in the Binary Adder lab.',
      ],
      checkpoints: [
        {
          question: 'What is the sum bit of a half adder when both inputs are 1?',
          answer: '0',
          hint: 'Sum is XOR; 1 XOR 1 = 0. (Carry is 1.)',
        },
      ],
      examples: [
        {
          title: 'Add 0110₂ + 0011₂',
          steps: [
            { label: 'Start from the rightmost column (LSB): 0 + 1 = 1, carry 0.' },
            { label: 'Next column: 1 + 1 = 0, carry 1.' },
            { label: 'Third column with carry: 1 + 0 + 1 = 0, carry 1.' },
            { label: 'MSB column: 0 + 0 + 1 = 1. Result 1001₂ = 9₁₀.' },
          ],
        },
      ],
      expandables: [],
      links: { binaryAdder: 'Binary Adder' },
    },
    'reversible-computation': {
      title: '1.6 Reversible Computation',
      paragraphs: [
        'Standard AND and OR gates are irreversible: the output does not uniquely determine the inputs (AND(0,0) and AND(0,1) both yield 0). Landauer showed that erasing information has a thermodynamic cost — motivating reversible circuits where every output bit can be traced back to inputs.',
        'Reversible classical gates are permutations on bit strings. The Toffoli (CCNOT) gate flips a target bit iff both control bits are 1, and is universal for classical reversible computation when combined with NOT. Quantum computing adopts Toffoli (and its 2-qubit cousin CNOT) as native operations.',
      ],
      checkpoints: [
        {
          question: 'When A=1, B=1, C=0, what is the target output of a Toffoli gate?',
          answer: '1',
          hint: 'Target flips when both controls are 1.',
        },
      ],
      examples: [
        {
          title: 'Why AND alone is not reversible',
          steps: [
            { label: 'Suppose an AND gate output is 0.' },
            { label: 'Both (0,0) and (0,1) and (1,0) are valid pre-images — inputs are lost.' },
            { label: 'A reversible alternative keeps inputs: map (a,b) → (a, b, a∧b) using ancilla bits.' },
          ],
        },
      ],
      expandables: [],
    },
    'classical-error-correction': {
      title: '1.7 Classical Error Correction',
      paragraphs: [
        'Physical wires and memory cells suffer bit flips from noise. Error-correcting codes add redundancy so the receiver can detect or correct errors. The simplest idea is repetition: send each bit three times and take a majority vote at decode time.',
        'More efficient codes (Hamming, Reed–Solomon) achieve better rate–distance tradeoffs. Quantum error correction generalizes these ideas to protect qubits — but the no-cloning theorem forbids naive repetition, requiring entanglement-based stabilizer codes instead.',
        'Compare classical and quantum approaches in the Error Correction Simulator lab (later chapter).',
      ],
      checkpoints: [
        {
          question: 'With a 3-bit repetition code, how many bit flips can be corrected?',
          answer: '1',
          hint: 'Two matching bits outvote the third.',
        },
      ],
      examples: [
        {
          title: 'Majority vote with one error',
          steps: [
            { label: 'Encode bit 1 as three copies: (1, 1, 1).' },
            { label: 'Suppose wire 2 flips: received (1, 0, 1).' },
            { label: 'Count ones: two out of three. Majority = 1 — error corrected.' },
          ],
        },
      ],
      expandables: [],
      links: { errorCorrection: 'Error Correction Simulator' },
    },
    complexity: {
      title: '1.8 Complexity',
      paragraphs: [
        'As problems scale, resource usage matters. Computational complexity classifies problems by how time or space grows with input size n. Polynomial growth is generally feasible; exponential growth becomes intractable quickly.',
        'The class P contains problems solvable in polynomial time on a deterministic Turing machine. NP contains problems whose solutions are verifiable in polynomial time. Whether P = NP remains open. Quantum complexity introduces BQP — problems efficiently solvable by quantum computers with bounded error.',
        'See the full complexity reference at Complexity Classes.',
      ],
      checkpoints: [
        {
          question: 'Which grows faster for large n: O(n²) or O(2ⁿ)?',
          answer: 'O(2ⁿ)',
          hint: 'Exponential eventually dominates any polynomial.',
        },
      ],
      examples: [
        {
          title: 'Compare O(n) vs O(2ⁿ) at n = 20',
          steps: [
            { label: 'Linear growth: 20 operations (up to constant factors).' },
            { label: 'Exponential: 2²⁰ ≈ 1,048,576 operations.' },
            { label: 'The exponential algorithm is ~50,000× slower at this modest input size.' },
          ],
        },
      ],
      expandables: [],
      links: { complexity: 'Complexity Classes' },
    },
    'turing-machines': {
      title: '1.9 Turing Machines',
      paragraphs: [
        'A Turing machine is an abstract model of computation: a finite control, an infinite tape divided into cells, and a read/write head that moves left or right. Despite its simplicity, the model captures everything a modern computer can compute — the Church–Turing thesis equates intuitive "algorithm" with Turing-machine computability.',
        'The transition function δ specifies, for each state and tape symbol, what to write, which direction to move, and the next state. A machine decides a language if it halts on every input, accepting members and rejecting non-members.',
      ],
      checkpoints: [
        {
          question: 'Can a Turing machine have infinitely many states?',
          answer: 'no',
          hint: 'The control is finite; only the tape is unbounded.',
        },
      ],
      examples: [
        {
          title: "TM decides strings ending in '01'",
          steps: [
            { label: 'Scan right until blank — remember the last two symbols seen.' },
            { label: 'If the last two symbols are 0 then 1, accept.' },
            { label: 'Otherwise reject. The machine uses finite memory (last two chars) despite unbounded tape.' },
          ],
        },
      ],
      expandables: [
        {
          title: 'Quantum circuits as a new model',
          paragraphs: [
            'Quantum computers are not Turing machines with randomness — they extend the model with amplitudes, unitary evolution, and projective measurement. The class BQP captures what efficient quantum algorithms compute; it sits inside PSPACE and may extend beyond P for specific structured problems.',
          ],
        },
      ],
    },
  },
  widgets: {
    bitExplorer: {
      label: 'Number of bits (n): {{n}}',
      registerStates: 'An {{n}}-bit register has 2^{{n}} = {{count}} distinct states.',
      scrollHint: 'Showing all {{count}} strings — scroll to browse. At n = 10, a register has 1,024 states.',
    },
    binaryConverter: {
      binary: 'Binary',
      decimal: 'Decimal',
      toDecimal: '→ Decimal',
      toBinary: '→ Binary',
      fixedWidth: 'Fixed width: {{width}} bits',
      unsignedInterpretation: '(unsigned interpretation)',
    },
    truthTable: {
      gate: 'Gate',
      headerA: 'A',
      headerB: 'B',
      notPlaceholder: '—',
    },
    deMorgan: {
      andMode: 'De Morgan (AND)',
      orMode: 'De Morgan (OR)',
      equal: '✓ equal',
      differ: '✗ differ',
    },
    rippleCarry: {
      aBinary: 'A (binary)',
      bBinary: 'B (binary)',
      carries: 'Carries (MSB→LSB): [{{carries}}]',
      reset: 'Reset',
      stepThrough: 'Step through addition',
      doneRestart: 'Done — restart',
      nextBit: 'Next bit (column {{col}})',
      decimalCheck: 'Decimal check: {{a}} + {{b}} = {{sum}}',
    },
    toffoli: {
      description: 'Controls A, B — target C is flipped when both controls are 1.',
      targetFlipped: '— target flipped',
      noChange: '— no change',
    },
    errorCorrection: {
      description: '3-bit repetition code: encode each bit three times; decode by majority vote.',
      dataBit: 'Data bit: {{bit}}',
      flipWire: 'Flip wire {{i}}',
      encoded: 'Encoded: [{{bits}}]',
      transmitted: 'Transmitted: [{{bits}}]',
      majorityVote: 'Majority vote →',
      correct: '(correct!)',
      error: '(error!)',
      parityNote: 'Parity of transmitted bits: {{parity}}. Classical codes trade redundancy for resilience.',
    },
    complexityGraph: {
      inputSize: 'Input size n = {{n}}',
      exponentialNote:
        'Exponential growth (O(2ⁿ)) dominates quickly — a central motivation for quantum algorithms on structured problems.',
    },
    turingSimulation: {
      title: 'Conceptual simulation: binary increment',
      description:
        'Imagine a Turing machine that reads a binary number on its tape (least significant bit at the head), adds 1, and halts. The algorithm mirrors ripple carry: flip bits from right until a 0 becomes 1 or a new leading 1 is needed.',
      step1: 'Start in "carry = 1" state at the LSB.',
      step2: 'If current cell is 0 and carry = 1: write 1, carry = 0, halt (or move left if more digits).',
      step3: 'If current cell is 1 and carry = 1: write 0, carry = 1, move left.',
      step4: 'If tape ends with carry = 1: extend with a new leading 1.',
      example: 'Example: 1011₂ + 1 → 1100₂ (flip trailing 1s until the 0, then carry propagates).',
    },
  },
  nav: {
    allChapters: '← All Chapters',
    next: 'Next: One Qubit →',
  },
};
