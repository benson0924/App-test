import { useState, useCallback, useMemo } from 'react';
import Katex from '@/components/Math';
import Expandable from '@/components/Expandable';
import { useT } from '@/context/LocaleContext';
import {
  C,
  Gates,
  LogicGates,
  binaryToDecimal,
  decimalToBinary,
  rippleCarryAdd,
  singleQubitState,
  normalize,
  singleQubitMeasurementProbabilities,
  isProductState,
  BellStates,
  fidelity,
  blochCoordinates,
  fromBloch,
} from 'quantum-core';

type Category =
  | 'Classical'
  | 'One Qubit'
  | 'Linear Algebra'
  | 'Multi-qubit'
  | 'Protocols'
  | 'Algorithms';

interface Step {
  text: string;
  latex?: string;
}

interface Problem {
  id: string;
  category: Category;
  question: string;
  latex?: string;
  choices: string[];
  correct: number;
  hint: string;
  steps: Step[];
  solution: string;
  verify?: () => boolean;
}

const CATEGORIES: Category[] = [
  'Classical',
  'One Qubit',
  'Linear Algebra',
  'Multi-qubit',
  'Protocols',
  'Algorithms',
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleChoices(choices: string[], correct: number): { choices: string[]; correct: number } {
  const indexed = choices.map((c, i) => ({ c, isCorrect: i === correct }));
  const shuffled = shuffle(indexed);
  return {
    choices: shuffled.map((x) => x.c),
    correct: shuffled.findIndex((x) => x.isCorrect),
  };
}

// --- Problem templates (≥3 per category) ---

function classicalTemplates(): Problem[] {
  const a = pick([0, 1]) as 0 | 1;
  const b = pick([0, 1]) as 0 | 1;
  const xor = LogicGates.XOR(a, b);
  const p1: Problem = {
    id: 'cl-xor',
    category: 'Classical',
    question: `What is ${a} XOR ${b}?`,
    choices: ['0', '1'],
    correct: xor,
    hint: 'XOR is 1 when inputs differ.',
    steps: [
      { text: 'XOR returns 1 if exactly one input is 1.' },
      { text: `Inputs: a=${a}, b=${b}.`, latex: `${a} \\oplus ${b} = ${xor}` },
    ],
    solution: `${a} ⊕ ${b} = ${xor}.`,
    verify: () => LogicGates.XOR(a, b) === xor,
  };

  const bits = pick(['1011', '1100', '0110', '1001']);
  const dec = binaryToDecimal(bits);
  const p2: Problem = {
    id: 'cl-bin',
    category: 'Classical',
    question: `Convert binary ${bits} to decimal.`,
    choices: shuffle([dec, dec + 1, dec - 1, dec + 2].filter((n) => n >= 0).map(String)).slice(0, 4),
    correct: 0,
    hint: 'Sum powers of two where the bit is 1.',
    steps: [
      { text: 'Read bits from right to left as 2⁰, 2¹, 2², …' },
      { text: `Evaluate ${bits} in base 2.`, latex: `${bits}_2 = ${dec}_{10}` },
    ],
    solution: `${bits}₂ = ${dec}₁₀.`,
    verify: () => binaryToDecimal(bits) === dec,
  };
  const sh2 = shuffleChoices(p2.choices, 0);
  p2.choices = sh2.choices;
  p2.correct = sh2.correct;

  const x = pick([3, 5, 7, 9]);
  const bin = decimalToBinary(x, 4);
  const p3: Problem = {
    id: 'cl-dec',
    category: 'Classical',
    question: `Convert decimal ${x} to 4-bit binary.`,
    choices: shuffle([bin, decimalToBinary(x + 1, 4), decimalToBinary(x - 1, 4), decimalToBinary(x + 2, 4)]),
    correct: 0,
    hint: 'Repeatedly divide by 2 and read remainders bottom-up.',
    steps: [
      { text: `Divide ${x} by 2 repeatedly to get remainders.` },
      { text: 'Pad to 4 bits.', latex: `${x}_{10} = ${bin}_2` },
    ],
    solution: `${x}₁₀ = ${bin}₂.`,
    verify: () => decimalToBinary(x, 4) === bin,
  };
  const sh3 = shuffleChoices(p3.choices, 0);
  p3.choices = sh3.choices;
  p3.correct = sh3.correct;

  const addA = pick(['101', '110', '011']);
  const addB = pick(['011', '101', '110']);
  const { sum } = rippleCarryAdd(addA, addB);
  const p4: Problem = {
    id: 'cl-add',
    category: 'Classical',
    question: `Binary add: ${addA} + ${addB} = ?`,
    choices: shuffle([sum, decimalToBinary(binaryToDecimal(addA) + binaryToDecimal(addB) + 1, sum.length), sum.slice(1).padStart(sum.length, '0'), '000']).filter((v, i, a) => a.indexOf(v) === i).slice(0, 4),
    correct: 0,
    hint: 'Use ripple-carry: XOR for sum bit, AND for carry.',
    steps: [
      { text: 'Add bit-by-bit from right with carry.' },
      { text: 'Result', latex: `${addA}_2 + ${addB}_2 = ${sum}_2` },
    ],
    solution: `${addA} + ${addB} = ${sum} (binary).`,
    verify: () => rippleCarryAdd(addA, addB).sum === sum,
  };
  const sh4 = shuffleChoices(p4.choices, 0);
  p4.choices = sh4.choices;
  p4.correct = sh4.correct;

  return [p1, p2, p3, p4];
}

function oneQubitTemplates(): Problem[] {
  const alpha = pick([0.6, 0.8, 1 / Math.sqrt(2), 0.5]);
  const beta = Math.sqrt(1 - alpha * alpha);
  const probs = singleQubitMeasurementProbabilities(
    C.scale(alpha, C.one()),
    C.scale(beta, C.one()),
    'Z'
  );
  const p0 = probs['0'];
  const p1 = probs['1'];
  const p1q: Problem = {
    id: '1q-prob',
    category: 'One Qubit',
    question: `If |ψ⟩ = ${alpha.toFixed(2)}|0⟩ + ${beta.toFixed(2)}|1⟩ (normalized), what is P(0)?`,
    latex: `P(0) = |\\alpha|^2`,
    choices: shuffle([p0, p1, 0.25, 0.75].map((v) => v.toFixed(2))),
    correct: 0,
    hint: 'Born rule: probability is squared magnitude of amplitude.',
    steps: [
      { text: 'Identify α from the state.' },
      { text: 'Compute |α|².', latex: `P(0) = ${alpha.toFixed(2)}^2 = ${p0.toFixed(2)}` },
    ],
    solution: `P(0) = |α|² = ${p0.toFixed(2)}.`,
    verify: () => Math.abs(p0 - alpha * alpha) < 1e-6,
  };
  const sh1 = shuffleChoices(p1q.choices, 0);
  p1q.choices = sh1.choices;
  p1q.correct = sh1.correct;

  const gate = pick(['X', 'Z', 'H'] as const);
  const gateAction: Record<string, string> = { X: '|1⟩', Z: '−|1⟩', H: '|+⟩' };
  const p2: Problem = {
    id: '1q-gate',
    category: 'One Qubit',
    question: `Which state does ${gate} map |0⟩ to?`,
    choices: shuffle(['|0⟩', '|1⟩', '|+⟩', '−|1⟩']),
    correct: 0,
    hint: 'Apply the gate matrix to |0⟩.',
    steps: [
      { text: `Write ${gate}|0⟩.` },
      { text: 'Use the standard matrix for the gate.' },
    ],
    solution: `${gate}|0⟩ → ${gateAction[gate]}.`,
    verify: () => true,
  };
  p2.correct = p2.choices.indexOf(gateAction[gate]);

  const theta = pick([Math.PI / 2, Math.PI, Math.PI / 4]);
  const phi = pick([0, Math.PI / 2, Math.PI]);
  const bloch = blochCoordinates(fromBloch(theta, phi));
  const p3: Problem = {
    id: '1q-bloch',
    category: 'One Qubit',
    question: `A qubit on the Bloch sphere has θ = ${(theta * 180 / Math.PI).toFixed(0)}°. What is z = cos θ?`,
    latex: `z = \\cos\\theta`,
    choices: shuffle([bloch.z, -bloch.z, bloch.x, bloch.y].map((v) => v.toFixed(2))),
    correct: 0,
    hint: 'Bloch vector: (x, y, z) with z = cos θ.',
    steps: [
      { text: 'Use z = cos θ on the Bloch sphere.' },
      { text: 'Evaluate.', latex: `z = \\cos(${theta.toFixed(2)}) = ${bloch.z.toFixed(2)}` },
    ],
    solution: `z = cos(${theta.toFixed(2)}) ≈ ${bloch.z.toFixed(2)}.`,
    verify: () => Math.abs(bloch.z - Math.cos(theta)) < 1e-6,
  };
  const sh3 = shuffleChoices(p3.choices, 0);
  p3.choices = sh3.choices;
  p3.correct = sh3.correct;

  const plus = normalize(singleQubitState(C.scale(1 / Math.sqrt(2), C.one()), C.scale(1 / Math.sqrt(2), C.one())));
  const hx = Gates.H.mulVec(plus.amplitudes);
  const hxNorm = normalize(singleQubitState(hx[0], hx[1]));
  const p4: Problem = {
    id: '1q-hh',
    category: 'One Qubit',
    question: 'What does H² do to any single-qubit state?',
    choices: ['Identity (returns the state)', 'Bit flip', 'Phase flip', 'Projects to |0⟩'],
    correct: 0,
    hint: 'H is its own inverse up to global phase; H² = I.',
    steps: [
      { text: 'Recall H² = I.' },
      { text: 'So applying H twice returns the original state.' },
    ],
    solution: 'H² = I, so H is an involution.',
    verify: () => fidelity(plus, hxNorm) > 0.99,
  };

  return [p1q, p2, p3, p4];
}

function linearAlgebraTemplates(): Problem[] {
  const p1: Problem = {
    id: 'la-unitary',
    category: 'Linear Algebra',
    question: 'Which condition defines a unitary matrix U?',
    choices: shuffle(['U†U = I', 'U = U†', 'det(U) = 0', 'U is real']),
    correct: 0,
    hint: 'Unitary preserves inner products.',
    steps: [
      { text: 'Unitary operators preserve norm.' },
      { text: 'Matrix condition', latex: 'U^\\dagger U = I' },
    ],
    solution: 'U†U = I (equivalently UU† = I).',
    verify: () => Gates.H.isUnitary(),
  };
  p1.correct = p1.choices.indexOf('U†U = I');

  const p2: Problem = {
    id: 'la-hermitian',
    category: 'Linear Algebra',
    question: 'Pauli Z is Hermitian. What is its eigenvalue on |1⟩?',
    latex: 'Z|1\\rangle = \\lambda|1\\rangle',
    choices: ['+1', '−1', 'i', '0'],
    correct: 1,
    hint: 'Z = diag(1, −1).',
    steps: [
      { text: 'Write Z in the computational basis.' },
      { text: 'Apply to |1⟩.', latex: 'Z|1\\rangle = -|1\\rangle' },
    ],
    solution: 'Eigenvalue −1 on |1⟩.',
    verify: () => {
      const z1 = Gates.Z.mulVec([C.zero(), C.one()]);
      return C.eq(z1[1], C.scale(-1, C.one()));
    },
  };

  const p3: Problem = {
    id: 'la-tensor',
    category: 'Linear Algebra',
    question: 'What is the dimension of the Hilbert space for n qubits?',
    choices: shuffle(['2ⁿ', 'n²', '2n', 'n!']),
    correct: 0,
    hint: 'Each qubit adds a factor of 2.',
    steps: [
      { text: 'Tensor product of n copies of ℂ².' },
      { text: 'Dimension', latex: '\\dim = 2^n' },
    ],
    solution: '2ⁿ-dimensional complex vector space.',
    verify: () => true,
  };
  p3.correct = p3.choices.indexOf('2ⁿ');

  const p4: Problem = {
    id: 'la-inner',
    category: 'Linear Algebra',
    question: 'Are |0⟩ and |1⟩ orthogonal?',
    choices: ['Yes', 'No'],
    correct: 0,
    hint: 'Compute ⟨0|1⟩.',
    steps: [
      { text: 'Inner product of basis states.' },
      { text: '⟨0|1⟩ = 0', latex: '\\langle 0|1\\rangle = 0' },
    ],
    solution: 'Yes — computational basis is orthonormal.',
    verify: () => true,
  };

  return [p1, p2, p3, p4];
}

function multiQubitTemplates(): Problem[] {
  const bell = BellStates.phiPlus();
  const p1: Problem = {
    id: 'mq-bell',
    category: 'Multi-qubit',
    question: 'Is |Φ⁺⟩ = (|00⟩ + |11⟩)/√2 a product state?',
    choices: ['Yes', 'No'],
    correct: 1,
    hint: 'Check if amplitudes factor as c₀₀·c₁₁ = c₀₁·c₁₀.',
    steps: [
      { text: 'Product state criterion for 2 qubits.' },
      { text: 'Bell state fails factorization — it is entangled.' },
    ],
    solution: 'No — |Φ⁺⟩ is entangled.',
    verify: () => !isProductState(bell),
  };

  const p2: Problem = {
    id: 'mq-cnot',
    category: 'Multi-qubit',
    question: 'What does CNOT|10⟩ produce?',
    latex: '\\text{CNOT}|a,b\\rangle = |a, b\\oplus a\\rangle',
    choices: shuffle(['|10⟩', '|11⟩', '|00⟩', '|01⟩']),
    correct: 0,
    hint: 'Control is first qubit (1); target flips when control is 1.',
    steps: [
      { text: 'Control = 1, target = 0.' },
      { text: 'Flip target → |11⟩.', latex: '\\text{CNOT}|10\\rangle = |11\\rangle' },
    ],
    solution: 'CNOT|10⟩ = |11⟩.',
    verify: () => true,
  };
  p2.correct = p2.choices.indexOf('|11⟩');

  const p3: Problem = {
    id: 'mq-swap',
    category: 'Multi-qubit',
    question: 'How many CNOT gates in the standard SWAP decomposition?',
    choices: ['1', '2', '3', '4'],
    correct: 2,
    hint: 'SWAP = CNOT · (CNOT with middle qubit) · CNOT pattern.',
    steps: [
      { text: 'Standard circuit: CNOT₁₂ · CNOT₂₁ · CNOT₁₂.' },
      { text: 'Three CNOTs suffice.' },
    ],
    solution: '3 CNOT gates.',
    verify: () => true,
  };

  const p4: Problem = {
    id: 'mq-phi',
    category: 'Multi-qubit',
    question: 'Measuring both qubits of |Φ⁺⟩ in Z basis: P(00)?',
    choices: shuffle(['0.5', '0.25', '1', '0']),
    correct: 0,
    hint: 'Only |00⟩ and |11⟩ have nonzero amplitude, equal weight.',
    steps: [
      { text: 'Amplitudes: (|00⟩ + |11⟩)/√2.' },
      { text: 'P(00) = |1/√2|² = 1/2.', latex: 'P(00) = \\frac{1}{2}' },
    ],
    solution: 'P(00) = 1/2.',
    verify: () => Math.abs(C.mag2(bell.amplitudes[0]) - 0.5) < 1e-6,
  };
  const sh4 = shuffleChoices(p4.choices, 0);
  p4.choices = sh4.choices;
  p4.correct = sh4.correct;

  return [p1, p2, p3, p4];
}

function protocolTemplates(): Problem[] {
  const p1: Problem = {
    id: 'pr-bb84',
    category: 'Protocols',
    question: 'BB84 requires an authenticated classical channel?',
    choices: ['Yes', 'No'],
    correct: 0,
    hint: 'Basis sifting and eavesdropper detection use classical communication.',
    steps: [
      { text: 'Quantum states carry key material.' },
      { text: 'Classical post-processing compares bases and estimates error rate.' },
    ],
    solution: 'Yes — authenticated classical channel is required.',
    verify: () => true,
  };

  const p2: Problem = {
    id: 'pr-chsh',
    category: 'Protocols',
    question: 'Classical (LHV) bound on CHSH parameter S?',
    choices: shuffle(['≤ 2', '≤ 2√2', '≤ 4', '≤ 1']),
    correct: 0,
    hint: 'Tsirelson bound is 2√2 quantum; classical is 2.',
    steps: [
      { text: 'CHSH: S = E(a,b) + E(a,b′) + E(a′,b) − E(a′,b′).' },
      { text: 'Classical |S| ≤ 2.', latex: '|S| \\leq 2' },
    ],
    solution: '|S| ≤ 2 classically.',
    verify: () => true,
  };
  p2.correct = p2.choices.indexOf('≤ 2');

  const p3: Problem = {
    id: 'pr-tele',
    category: 'Protocols',
    question: 'Quantum teleportation transmits the quantum state using only classical bits (2) plus shared entanglement?',
    choices: ['Yes', 'No'],
    correct: 0,
    hint: 'No faster-than-light; 2 classical bits + 1 ebit.',
    steps: [
      { text: 'Alice measures in Bell basis → 2 classical bits.' },
      { text: 'Bob applies correction based on bits.' },
    ],
    solution: 'Yes — 2 classical bits + 1 shared Bell pair.',
    verify: () => true,
  };

  const p4: Problem = {
    id: 'pr-sd',
    category: 'Protocols',
    question: 'Superdense coding sends how many classical bits using 1 qubit + 1 ebit?',
    choices: ['1', '2', '3', '4'],
    correct: 1,
    hint: 'Encode 00, 01, 10, 11 via four Pauli operations on shared Bell state.',
    steps: [
      { text: 'Alice encodes 2 bits via Pauli on her half of Bell pair.' },
      { text: 'Bob performs Bell measurement → 2 bits recovered.' },
    ],
    solution: '2 classical bits.',
    verify: () => true,
  };

  return [p1, p2, p3, p4];
}

function algorithmTemplates(): Problem[] {
  const n = pick([4, 6, 8, 10]);
  const p1: Problem = {
    id: 'alg-grover',
    category: 'Algorithms',
    question: `Grover search over N = 2^${n} items: query complexity?`,
    latex: 'O(\\sqrt{N})',
    choices: shuffle(['O(√N)', 'O(log N)', 'O(N)', 'O(N²)']),
    correct: 0,
    hint: 'Quadratic speedup over classical O(N).',
    steps: [
      { text: 'Grover iterate amplifies marked state amplitude.' },
      { text: '~π/4 · √N iterations.', latex: `O(\\sqrt{2^{${n}}}) = O(2^{${n / 2}})` },
    ],
    solution: 'O(√N) oracle queries.',
    verify: () => true,
  };
  p1.correct = p1.choices.indexOf('O(√N)');

  const p2: Problem = {
    id: 'alg-dj',
    category: 'Algorithms',
    question: 'Deutsch–Jozsa: queries to distinguish constant vs balanced (n-bit)?',
    choices: shuffle(['1', 'n', '2ⁿ⁻¹ + 1', '2ⁿ']),
    correct: 0,
    hint: 'Quantum algorithm needs exactly one oracle query.',
    steps: [
      { text: 'Prepare uniform superposition, apply oracle, measure.' },
      { text: 'Single query suffices.', latex: '1 \\text{ query}' },
    ],
    solution: '1 query (quantum) vs 2ⁿ⁻¹ + 1 worst-case classically.',
    verify: () => true,
  };
  p2.correct = p2.choices.indexOf('1');

  const p3: Problem = {
    id: 'alg-shor',
    category: 'Algorithms',
    question: "Shor's algorithm factors N by finding what property of a^x mod N?",
    choices: shuffle(['Period', 'Minimum', 'Maximum', 'Parity only']),
    correct: 0,
    hint: 'Order r where a^r ≡ 1 (mod N).',
    steps: [
      { text: 'Choose random a coprime to N.' },
      { text: 'Find period r of f(x) = a^x mod N.', latex: 'a^r \\equiv 1 \\pmod{N}' },
    ],
    solution: 'Period (order) r of modular exponentiation.',
    verify: () => true,
  };
  p3.correct = p3.choices.indexOf('Period');

  const p4: Problem = {
    id: 'alg-deutsch',
    category: 'Algorithms',
    question: 'Deutsch algorithm (1 bit): maximum classical queries to determine if f is constant?',
    choices: ['1', '2', '3', '4'],
    correct: 1,
    hint: 'Worst case: query f(0), still ambiguous, need f(1).',
    steps: [
      { text: 'Classically, one query leaves two consistent functions.' },
      { text: 'Second query is required in worst case.' },
    ],
    solution: '2 queries classically vs 1 quantum.',
    verify: () => true,
  };

  return [p1, p2, p3, p4];
}

const GENERATORS: Record<Category, () => Problem[]> = {
  Classical: classicalTemplates,
  'One Qubit': oneQubitTemplates,
  'Linear Algebra': linearAlgebraTemplates,
  'Multi-qubit': multiQubitTemplates,
  Protocols: protocolTemplates,
  Algorithms: algorithmTemplates,
};

function generateFromCategory(cat: Category): Problem {
  const templates = GENERATORS[cat]();
  const problem = pick(templates);
  if (problem.verify && !problem.verify()) {
    return generateFromCategory(cat);
  }
  return { ...problem, id: `${problem.id}-${Date.now()}` };
}

function generateMixedSet(count: number): Problem[] {
  const problems: Problem[] = [];
  const cats = shuffle([...CATEGORIES]);
  for (let i = 0; i < count; i++) {
    problems.push(generateFromCategory(cats[i % cats.length]));
  }
  return problems;
}

export default function PracticeIndex() {
  const t = useT();
  const [category, setCategory] = useState<Category | 'Mixed'>('Mixed');
  const [set, setSet] = useState(() => generateMixedSet(5));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [stepVisible, setStepVisible] = useState(0);

  const problem = set[idx];

  const newSet = useCallback((cat: Category | 'Mixed' = category) => {
    const problems =
      cat === 'Mixed'
        ? generateMixedSet(5)
        : Array.from({ length: 5 }, () => generateFromCategory(cat));
    setSet(problems);
    setIdx(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setShowHint(false);
    setStepVisible(0);
  }, [category]);

  const submit = (choice: number) => {
    if (selected !== null) return;
    setSelected(choice);
    if (choice === problem.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= set.length) setDone(true);
    else {
      setIdx((i) => i + 1);
      setSelected(null);
      setShowHint(false);
      setStepVisible(0);
    }
  };

  const verified = useMemo(() => {
    if (!problem.verify) return null;
    try {
      return problem.verify();
    } catch {
      return false;
    }
  }, [problem]);

  if (done) {
    return (
      <div>
        <h1>{t('practice.ui.title')}</h1>
        <p className="card">
          {t('practice.ui.score')} <strong>{score}</strong> / {set.length}
        </p>
        <button className="btn btn-primary" onClick={() => newSet()}>{t('practice.ui.newRandomSet')}</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{t('practice.ui.title')}</h1>
      <p>{t('practice.ui.intro')}</p>

      <div className="btn-group" style={{ flexWrap: 'wrap', marginBottom: '1rem' }}>
        <button
          className={`btn ${category === 'Mixed' ? 'btn-primary' : ''}`}
          onClick={() => { setCategory('Mixed'); newSet('Mixed'); }}
        >
          {t('practice.ui.mixed')}
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`btn ${category === cat ? 'btn-primary' : ''}`}
            onClick={() => { setCategory(cat); newSet(cat); }}
          >
            {cat}
          </button>
        ))}
      </div>

      <p>
        {t('practice.ui.questionOf', { current: idx + 1, total: set.length })} · <span className="tag">{problem.category}</span>
        {verified !== null && (
          <span className="tag" style={{ marginLeft: '0.5rem', borderColor: verified ? 'var(--success)' : 'var(--danger)' }}>
            {verified ? t('practice.ui.verified') : t('practice.ui.check')}
          </span>
        )}
      </p>

      <div className="card">
        <p>{problem.question}</p>
        {problem.latex && <Katex display>{problem.latex}</Katex>}

        <div className="btn-group" style={{ marginBottom: '1rem' }}>
          <button className="btn" onClick={() => setShowHint(!showHint)}>
            {showHint ? t('practice.ui.hideHint') : t('practice.ui.hint')}
          </button>
          {stepVisible < problem.steps.length && (
            <button className="btn" onClick={() => setStepVisible((v) => v + 1)}>
              {t('practice.ui.revealStep', { n: stepVisible + 1 })}
            </button>
          )}
        </div>

        {showHint && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
            <strong>Hint:</strong> {problem.hint}
          </p>
        )}

        {problem.steps.slice(0, stepVisible).map((step, i) => (
          <div key={i} style={{ marginBottom: '0.75rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--accent)' }}>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>{t('practice.ui.step', { n: i + 1 })}</p>
            <p>{step.text}</p>
            {step.latex && <Katex display>{step.latex}</Katex>}
          </div>
        ))}

        <div className="btn-group" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          {problem.choices.map((c, i) => (
            <button
              key={i}
              className={`btn ${selected === i ? (i === problem.correct ? 'btn-primary' : '') : ''}`}
              style={{
                borderColor:
                  selected !== null
                    ? i === problem.correct
                      ? 'var(--success)'
                      : selected === i
                        ? 'var(--danger)'
                        : undefined
                    : undefined,
              }}
              onClick={() => submit(i)}
            >
              {c}
            </button>
          ))}
        </div>

        {selected !== null && (
          <>
            <p className={selected === problem.correct ? 'correct' : 'incorrect'}>
              {selected === problem.correct ? t('practice.ui.correct') : t('practice.ui.incorrect')}
            </p>
            <Expandable title={t('practice.ui.fullSolution')}>
              <p>{problem.solution}</p>
              {problem.steps.map((step, i) => (
                <div key={i}>
                  <p><strong>{t('practice.ui.step', { n: i + 1 })}:</strong> {step.text}</p>
                  {step.latex && <Katex display>{step.latex}</Katex>}
                </div>
              ))}
            </Expandable>
            <button className="btn btn-primary" onClick={next} style={{ marginTop: '1rem' }}>
              {idx + 1 >= set.length ? t('practice.ui.finish') : t('practice.ui.next')}
            </button>
          </>
        )}
      </div>

      <button className="btn" onClick={() => newSet()}>Shuffle new set</button>
    </div>
  );
}
