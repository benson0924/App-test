import { useState, useCallback, useMemo } from 'react';
import Katex from '@/components/Math';
import Expandable from '@/components/Expandable';
import { useLocale } from '@/context/LocaleContext';
import { usePracticeT, usePracticeUi, usePracticeCategory } from '@/i18n/practiceHelpers';
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

type CategoryKey =
  | 'classical'
  | 'oneQubit'
  | 'linearAlgebra'
  | 'multiQubit'
  | 'protocols'
  | 'algorithms';

type Pt = (problemId: string, key: string, params?: Record<string, string | number>) => string;
type Pc = (key: string) => string;

interface Step {
  text: string;
  latex?: string;
}

interface Problem {
  id: string;
  category: CategoryKey;
  question: string;
  latex?: string;
  choices: string[];
  correct: number;
  hint: string;
  steps: Step[];
  solution: string;
  verify?: () => boolean;
}

const CATEGORY_KEYS: CategoryKey[] = [
  'classical',
  'oneQubit',
  'linearAlgebra',
  'multiQubit',
  'protocols',
  'algorithms',
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

function classicalTemplates(pt: Pt, _pc: Pc): Problem[] {
  const a = pick([0, 1]) as 0 | 1;
  const b = pick([0, 1]) as 0 | 1;
  const xor = LogicGates.XOR(a, b);
  const p1: Problem = {
    id: 'cl-xor',
    category: 'classical',
    question: pt('cl-xor', 'question', { a, b }),
    choices: ['0', '1'],
    correct: xor,
    hint: pt('cl-xor', 'hint'),
    steps: [
      { text: pt('cl-xor', 'step1') },
      { text: pt('cl-xor', 'step2', { a, b }), latex: `${a} \\oplus ${b} = ${xor}` },
    ],
    solution: pt('cl-xor', 'solution', { a, b, xor }),
    verify: () => LogicGates.XOR(a, b) === xor,
  };

  const bits = pick(['1011', '1100', '0110', '1001']);
  const dec = binaryToDecimal(bits);
  const p2: Problem = {
    id: 'cl-bin',
    category: 'classical',
    question: pt('cl-bin', 'question', { bits }),
    choices: shuffle([dec, dec + 1, dec - 1, dec + 2].filter((n) => n >= 0).map(String)).slice(0, 4),
    correct: 0,
    hint: pt('cl-bin', 'hint'),
    steps: [
      { text: pt('cl-bin', 'step1') },
      { text: pt('cl-bin', 'step2', { bits }), latex: `${bits}_2 = ${dec}_{10}` },
    ],
    solution: pt('cl-bin', 'solution', { bits, dec }),
    verify: () => binaryToDecimal(bits) === dec,
  };
  const sh2 = shuffleChoices(p2.choices, 0);
  p2.choices = sh2.choices;
  p2.correct = sh2.correct;

  const x = pick([3, 5, 7, 9]);
  const bin = decimalToBinary(x, 4);
  const p3: Problem = {
    id: 'cl-dec',
    category: 'classical',
    question: pt('cl-dec', 'question', { x }),
    choices: shuffle([bin, decimalToBinary(x + 1, 4), decimalToBinary(x - 1, 4), decimalToBinary(x + 2, 4)]),
    correct: 0,
    hint: pt('cl-dec', 'hint'),
    steps: [
      { text: pt('cl-dec', 'step1', { x }) },
      { text: pt('cl-dec', 'step2'), latex: `${x}_{10} = ${bin}_2` },
    ],
    solution: pt('cl-dec', 'solution', { x, bin }),
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
    category: 'classical',
    question: pt('cl-add', 'question', { a: addA, b: addB }),
    choices: shuffle([sum, decimalToBinary(binaryToDecimal(addA) + binaryToDecimal(addB) + 1, sum.length), sum.slice(1).padStart(sum.length, '0'), '000']).filter((v, i, a) => a.indexOf(v) === i).slice(0, 4),
    correct: 0,
    hint: pt('cl-add', 'hint'),
    steps: [
      { text: pt('cl-add', 'step1') },
      { text: pt('cl-add', 'step2'), latex: `${addA}_2 + ${addB}_2 = ${sum}_2` },
    ],
    solution: pt('cl-add', 'solution', { a: addA, b: addB, sum }),
    verify: () => rippleCarryAdd(addA, addB).sum === sum,
  };
  const sh4 = shuffleChoices(p4.choices, 0);
  p4.choices = sh4.choices;
  p4.correct = sh4.correct;

  return [p1, p2, p3, p4];
}

function oneQubitTemplates(pt: Pt, pc: Pc): Problem[] {
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
    category: 'oneQubit',
    question: pt('1q-prob', 'question', { alpha: alpha.toFixed(2), beta: beta.toFixed(2) }),
    latex: `P(0) = |\\alpha|^2`,
    choices: shuffle([p0, p1, 0.25, 0.75].map((v) => v.toFixed(2))),
    correct: 0,
    hint: pt('1q-prob', 'hint'),
    steps: [
      { text: pt('1q-prob', 'step1') },
      { text: pt('1q-prob', 'step2'), latex: `P(0) = ${alpha.toFixed(2)}^2 = ${p0.toFixed(2)}` },
    ],
    solution: pt('1q-prob', 'solution', { p0: p0.toFixed(2) }),
    verify: () => Math.abs(p0 - alpha * alpha) < 1e-6,
  };
  const sh1 = shuffleChoices(p1q.choices, 0);
  p1q.choices = sh1.choices;
  p1q.correct = sh1.correct;

  const gate = pick(['X', 'Z', 'H'] as const);
  const gateAction: Record<string, string> = { X: pc('ket1'), Z: pc('ketMinus1'), H: pc('ketPlus') };
  const p2: Problem = {
    id: '1q-gate',
    category: 'oneQubit',
    question: pt('1q-gate', 'question', { gate }),
    choices: shuffle([pc('ket0'), pc('ket1'), pc('ketPlus'), pc('ketMinus1')]),
    correct: 0,
    hint: pt('1q-gate', 'hint'),
    steps: [
      { text: pt('1q-gate', 'step1', { gate }) },
      { text: pt('1q-gate', 'step2') },
    ],
    solution: pt('1q-gate', 'solution', { gate, target: gateAction[gate] }),
    verify: () => true,
  };
  p2.correct = p2.choices.indexOf(gateAction[gate]);

  const theta = pick([Math.PI / 2, Math.PI, Math.PI / 4]);
  const phi = pick([0, Math.PI / 2, Math.PI]);
  const bloch = blochCoordinates(fromBloch(theta, phi));
  const p3: Problem = {
    id: '1q-bloch',
    category: 'oneQubit',
    question: pt('1q-bloch', 'question', { deg: (theta * 180 / Math.PI).toFixed(0) }),
    latex: `z = \\cos\\theta`,
    choices: shuffle([bloch.z, -bloch.z, bloch.x, bloch.y].map((v) => v.toFixed(2))),
    correct: 0,
    hint: pt('1q-bloch', 'hint'),
    steps: [
      { text: pt('1q-bloch', 'step1') },
      { text: pt('1q-bloch', 'step2'), latex: `z = \\cos(${theta.toFixed(2)}) = ${bloch.z.toFixed(2)}` },
    ],
    solution: pt('1q-bloch', 'solution', { theta: theta.toFixed(2), z: bloch.z.toFixed(2) }),
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
    category: 'oneQubit',
    question: pt('1q-hh', 'question'),
    choices: [pc('identity'), pc('bitFlip'), pc('phaseFlip'), pc('projectZero')],
    correct: 0,
    hint: pt('1q-hh', 'hint'),
    steps: [
      { text: pt('1q-hh', 'step1') },
      { text: pt('1q-hh', 'step2') },
    ],
    solution: pt('1q-hh', 'solution'),
    verify: () => fidelity(plus, hxNorm) > 0.99,
  };

  return [p1q, p2, p3, p4];
}

function linearAlgebraTemplates(pt: Pt, pc: Pc): Problem[] {
  const p1: Problem = {
    id: 'la-unitary',
    category: 'linearAlgebra',
    question: pt('la-unitary', 'question'),
    choices: shuffle([pc('unitary'), pc('hermitian'), pc('detZero'), pc('real')]),
    correct: 0,
    hint: pt('la-unitary', 'hint'),
    steps: [
      { text: pt('la-unitary', 'step1') },
      { text: pt('la-unitary', 'step2'), latex: 'U^\\dagger U = I' },
    ],
    solution: pt('la-unitary', 'solution'),
    verify: () => Gates.H.isUnitary(),
  };
  p1.correct = p1.choices.indexOf(pc('unitary'));

  const p2: Problem = {
    id: 'la-hermitian',
    category: 'linearAlgebra',
    question: pt('la-hermitian', 'question'),
    latex: 'Z|1\\rangle = \\lambda|1\\rangle',
    choices: ['+1', '−1', 'i', '0'],
    correct: 1,
    hint: pt('la-hermitian', 'hint'),
    steps: [
      { text: pt('la-hermitian', 'step1') },
      { text: pt('la-hermitian', 'step2'), latex: 'Z|1\\rangle = -|1\\rangle' },
    ],
    solution: pt('la-hermitian', 'solution'),
    verify: () => {
      const z1 = Gates.Z.mulVec([C.zero(), C.one()]);
      return C.eq(z1[1], C.scale(-1, C.one()));
    },
  };

  const p3: Problem = {
    id: 'la-tensor',
    category: 'linearAlgebra',
    question: pt('la-tensor', 'question'),
    choices: shuffle([pc('dim2n'), pc('dimN2'), pc('dim2nLinear'), pc('dimFactorial')]),
    correct: 0,
    hint: pt('la-tensor', 'hint'),
    steps: [
      { text: pt('la-tensor', 'step1') },
      { text: pt('la-tensor', 'step2'), latex: '\\dim = 2^n' },
    ],
    solution: pt('la-tensor', 'solution'),
    verify: () => true,
  };
  p3.correct = p3.choices.indexOf(pc('dim2n'));

  const p4: Problem = {
    id: 'la-inner',
    category: 'linearAlgebra',
    question: pt('la-inner', 'question'),
    choices: [pc('yes'), pc('no')],
    correct: 0,
    hint: pt('la-inner', 'hint'),
    steps: [
      { text: pt('la-inner', 'step1') },
      { text: pt('la-inner', 'step2'), latex: '\\langle 0|1\\rangle = 0' },
    ],
    solution: pt('la-inner', 'solution'),
    verify: () => true,
  };

  return [p1, p2, p3, p4];
}

function multiQubitTemplates(pt: Pt, pc: Pc): Problem[] {
  const bell = BellStates.phiPlus();
  const p1: Problem = {
    id: 'mq-bell',
    category: 'multiQubit',
    question: pt('mq-bell', 'question'),
    choices: [pc('yes'), pc('no')],
    correct: 1,
    hint: pt('mq-bell', 'hint'),
    steps: [
      { text: pt('mq-bell', 'step1') },
      { text: pt('mq-bell', 'step2') },
    ],
    solution: pt('mq-bell', 'solution'),
    verify: () => !isProductState(bell),
  };

  const p2: Problem = {
    id: 'mq-cnot',
    category: 'multiQubit',
    question: pt('mq-cnot', 'question'),
    latex: '\\text{CNOT}|a,b\\rangle = |a, b\\oplus a\\rangle',
    choices: shuffle(['|10⟩', '|11⟩', '|00⟩', '|01⟩']),
    correct: 0,
    hint: pt('mq-cnot', 'hint'),
    steps: [
      { text: pt('mq-cnot', 'step1') },
      { text: pt('mq-cnot', 'step2'), latex: '\\text{CNOT}|10\\rangle = |11\\rangle' },
    ],
    solution: pt('mq-cnot', 'solution'),
    verify: () => true,
  };
  p2.correct = p2.choices.indexOf('|11⟩');

  const p3: Problem = {
    id: 'mq-swap',
    category: 'multiQubit',
    question: pt('mq-swap', 'question'),
    choices: [pc('cnotCount1'), pc('cnotCount2'), pc('cnotCount3'), pc('cnotCount4')],
    correct: 2,
    hint: pt('mq-swap', 'hint'),
    steps: [
      { text: pt('mq-swap', 'step1') },
      { text: pt('mq-swap', 'step2') },
    ],
    solution: pt('mq-swap', 'solution'),
    verify: () => true,
  };

  const p4: Problem = {
    id: 'mq-phi',
    category: 'multiQubit',
    question: pt('mq-phi', 'question'),
    choices: shuffle([pc('prob05'), pc('prob025'), pc('prob1'), pc('prob0')]),
    correct: 0,
    hint: pt('mq-phi', 'hint'),
    steps: [
      { text: pt('mq-phi', 'step1') },
      { text: pt('mq-phi', 'step2'), latex: 'P(00) = \\frac{1}{2}' },
    ],
    solution: pt('mq-phi', 'solution'),
    verify: () => Math.abs(C.mag2(bell.amplitudes[0]) - 0.5) < 1e-6,
  };
  const sh4 = shuffleChoices(p4.choices, 0);
  p4.choices = sh4.choices;
  p4.correct = sh4.correct;

  return [p1, p2, p3, p4];
}

function protocolTemplates(pt: Pt, pc: Pc): Problem[] {
  const p1: Problem = {
    id: 'pr-bb84',
    category: 'protocols',
    question: pt('pr-bb84', 'question'),
    choices: [pc('yes'), pc('no')],
    correct: 0,
    hint: pt('pr-bb84', 'hint'),
    steps: [
      { text: pt('pr-bb84', 'step1') },
      { text: pt('pr-bb84', 'step2') },
    ],
    solution: pt('pr-bb84', 'solution'),
    verify: () => true,
  };

  const p2: Problem = {
    id: 'pr-chsh',
    category: 'protocols',
    question: pt('pr-chsh', 'question'),
    choices: shuffle([pc('chsh2'), pc('chsh2sqrt2'), pc('chsh4'), pc('chsh1')]),
    correct: 0,
    hint: pt('pr-chsh', 'hint'),
    steps: [
      { text: pt('pr-chsh', 'step1') },
      { text: pt('pr-chsh', 'step2'), latex: '|S| \\leq 2' },
    ],
    solution: pt('pr-chsh', 'solution'),
    verify: () => true,
  };
  p2.correct = p2.choices.indexOf(pc('chsh2'));

  const p3: Problem = {
    id: 'pr-tele',
    category: 'protocols',
    question: pt('pr-tele', 'question'),
    choices: [pc('yes'), pc('no')],
    correct: 0,
    hint: pt('pr-tele', 'hint'),
    steps: [
      { text: pt('pr-tele', 'step1') },
      { text: pt('pr-tele', 'step2') },
    ],
    solution: pt('pr-tele', 'solution'),
    verify: () => true,
  };

  const p4: Problem = {
    id: 'pr-sd',
    category: 'protocols',
    question: pt('pr-sd', 'question'),
    choices: [pc('sdBits1'), pc('sdBits2'), pc('sdBits3'), pc('sdBits4')],
    correct: 1,
    hint: pt('pr-sd', 'hint'),
    steps: [
      { text: pt('pr-sd', 'step1') },
      { text: pt('pr-sd', 'step2') },
    ],
    solution: pt('pr-sd', 'solution'),
    verify: () => true,
  };

  return [p1, p2, p3, p4];
}

function algorithmTemplates(pt: Pt, pc: Pc): Problem[] {
  const n = pick([4, 6, 8, 10]);
  const p1: Problem = {
    id: 'alg-grover',
    category: 'algorithms',
    question: pt('alg-grover', 'question', { n }),
    latex: 'O(\\sqrt{N})',
    choices: shuffle([pc('groverSqrt'), pc('groverLog'), pc('groverN'), pc('groverN2')]),
    correct: 0,
    hint: pt('alg-grover', 'hint'),
    steps: [
      { text: pt('alg-grover', 'step1') },
      { text: pt('alg-grover', 'step2'), latex: `O(\\sqrt{2^{${n}}}) = O(2^{${n / 2}})` },
    ],
    solution: pt('alg-grover', 'solution'),
    verify: () => true,
  };
  p1.correct = p1.choices.indexOf(pc('groverSqrt'));

  const p2: Problem = {
    id: 'alg-dj',
    category: 'algorithms',
    question: pt('alg-dj', 'question'),
    choices: shuffle([pc('query1'), pc('queryN'), pc('query2n'), pc('query2nFull')]),
    correct: 0,
    hint: pt('alg-dj', 'hint'),
    steps: [
      { text: pt('alg-dj', 'step1') },
      { text: pt('alg-dj', 'step2'), latex: '1 \\text{ query}' },
    ],
    solution: pt('alg-dj', 'solution'),
    verify: () => true,
  };
  p2.correct = p2.choices.indexOf(pc('query1'));

  const p3: Problem = {
    id: 'alg-shor',
    category: 'algorithms',
    question: pt('alg-shor', 'question'),
    choices: shuffle([pc('period'), pc('minimum'), pc('maximum'), pc('parityOnly')]),
    correct: 0,
    hint: pt('alg-shor', 'hint'),
    steps: [
      { text: pt('alg-shor', 'step1') },
      { text: pt('alg-shor', 'step2'), latex: 'a^r \\equiv 1 \\pmod{N}' },
    ],
    solution: pt('alg-shor', 'solution'),
    verify: () => true,
  };
  p3.correct = p3.choices.indexOf(pc('period'));

  const p4: Problem = {
    id: 'alg-deutsch',
    category: 'algorithms',
    question: pt('alg-deutsch', 'question'),
    choices: [pc('query1'), pc('deutschClassical2'), pc('deutschClassical3'), pc('deutschClassical4')],
    correct: 1,
    hint: pt('alg-deutsch', 'hint'),
    steps: [
      { text: pt('alg-deutsch', 'step1') },
      { text: pt('alg-deutsch', 'step2') },
    ],
    solution: pt('alg-deutsch', 'solution'),
    verify: () => true,
  };

  return [p1, p2, p3, p4];
}

const GENERATORS: Record<CategoryKey, (pt: Pt, pc: Pc) => Problem[]> = {
  classical: classicalTemplates,
  oneQubit: oneQubitTemplates,
  linearAlgebra: linearAlgebraTemplates,
  multiQubit: multiQubitTemplates,
  protocols: protocolTemplates,
  algorithms: algorithmTemplates,
};

function generateFromCategory(cat: CategoryKey, pt: Pt, pc: Pc): Problem {
  const templates = GENERATORS[cat](pt, pc);
  const problem = pick(templates);
  if (problem.verify && !problem.verify()) {
    return generateFromCategory(cat, pt, pc);
  }
  return { ...problem, id: `${problem.id}-${Date.now()}` };
}

function generateMixedSet(count: number, pt: Pt, pc: Pc): Problem[] {
  const problems: Problem[] = [];
  const cats = shuffle([...CATEGORY_KEYS]);
  for (let i = 0; i < count; i++) {
    problems.push(generateFromCategory(cats[i % cats.length], pt, pc));
  }
  return problems;
}

export default function PracticeIndex() {
  const { t } = useLocale();
  const pt = usePracticeT();
  const ui = usePracticeUi();
  const categoryLabel = usePracticeCategory();
  const pc = useCallback((key: string) => t(`practice.choices.${key}`), [t]);

  const [category, setCategory] = useState<CategoryKey | 'Mixed'>('Mixed');
  const [set, setSet] = useState(() => generateMixedSet(5, pt, pc));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [stepVisible, setStepVisible] = useState(0);

  const problem = set[idx];

  const newSet = useCallback((cat: CategoryKey | 'Mixed' = category) => {
    const problems =
      cat === 'Mixed'
        ? generateMixedSet(5, pt, pc)
        : Array.from({ length: 5 }, () => generateFromCategory(cat, pt, pc));
    setSet(problems);
    setIdx(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setShowHint(false);
    setStepVisible(0);
  }, [category, pt, pc]);

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
        <h1>{ui('title')}</h1>
        <p className="card">
          {ui('score')} <strong>{score}</strong> / {set.length}
        </p>
        <button className="btn btn-primary" onClick={() => newSet()}>{ui('newRandomSet')}</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{ui('title')}</h1>
      <p>{ui('intro')}</p>

      <div className="btn-group" style={{ flexWrap: 'wrap', marginBottom: '1rem' }}>
        <button
          className={`btn ${category === 'Mixed' ? 'btn-primary' : ''}`}
          onClick={() => { setCategory('Mixed'); newSet('Mixed'); }}
        >
          {ui('mixed')}
        </button>
        {CATEGORY_KEYS.map((cat) => (
          <button
            key={cat}
            className={`btn ${category === cat ? 'btn-primary' : ''}`}
            onClick={() => { setCategory(cat); newSet(cat); }}
          >
            {categoryLabel(cat)}
          </button>
        ))}
      </div>

      <p>
        {ui('questionOf', { current: idx + 1, total: set.length })} · <span className="tag">{categoryLabel(problem.category)}</span>
        {verified !== null && (
          <span className="tag" style={{ marginLeft: '0.5rem', borderColor: verified ? 'var(--success)' : 'var(--danger)' }}>
            {verified ? ui('verified') : ui('check')}
          </span>
        )}
      </p>

      <div className="card">
        <p>{problem.question}</p>
        {problem.latex && <Katex display>{problem.latex}</Katex>}

        <div className="btn-group" style={{ marginBottom: '1rem' }}>
          <button className="btn" onClick={() => setShowHint(!showHint)}>
            {showHint ? ui('hideHint') : ui('hint')}
          </button>
          {stepVisible < problem.steps.length && (
            <button className="btn" onClick={() => setStepVisible((v) => v + 1)}>
              {ui('revealStep', { n: stepVisible + 1 })}
            </button>
          )}
        </div>

        {showHint && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
            <strong>{ui('hint')}:</strong> {problem.hint}
          </p>
        )}

        {problem.steps.slice(0, stepVisible).map((step, i) => (
          <div key={i} style={{ marginBottom: '0.75rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--accent)' }}>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>{ui('step', { n: i + 1 })}</p>
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
              {selected === problem.correct ? ui('correct') : ui('incorrect')}
            </p>
            <Expandable title={ui('fullSolution')}>
              <p>{problem.solution}</p>
              {problem.steps.map((step, i) => (
                <div key={i}>
                  <p><strong>{ui('step', { n: i + 1 })}:</strong> {step.text}</p>
                  {step.latex && <Katex display>{step.latex}</Katex>}
                </div>
              ))}
            </Expandable>
            <button className="btn btn-primary" onClick={next} style={{ marginTop: '1rem' }}>
              {idx + 1 >= set.length ? ui('finish') : ui('next')}
            </button>
          </>
        )}
      </div>

      <button className="btn" onClick={() => newSet()}>{ui('shuffleNewSet')}</button>
    </div>
  );
}
