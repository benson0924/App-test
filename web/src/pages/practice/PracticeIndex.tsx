import { useState, useCallback } from 'react';
import Katex from '../../components/Math';

interface Problem {
  id: string;
  topic: string;
  question: string;
  latex?: string;
  choices: string[];
  correct: number;
  explanation: string;
}

const BANK: Problem[] = [
  {
    id: 'p1', topic: 'One qubit',
    question: 'If |ψ⟩ = (|0⟩ + |1⟩)/√2, what is P(0)?',
    choices: ['0', '0.25', '0.5', '1'],
    correct: 2,
    explanation: '|1/√2|² = 1/2.',
  },
  {
    id: 'p2', topic: 'Gates',
    question: 'Which gate maps |0⟩ → |1⟩?',
    choices: ['H', 'Z', 'X', 'S'],
    correct: 2,
    explanation: 'Pauli X is the bit flip.',
  },
  {
    id: 'p3', topic: 'Entanglement',
    question: '|Φ⁺⟩ is a product state?',
    choices: ['Yes', 'No'],
    correct: 1,
    explanation: 'Bell states cannot be written as |a⟩⊗|b⟩.',
  },
  {
    id: 'p4', topic: 'Algorithms',
    question: 'Grover gives what query speedup for N items?',
    latex: 'O(\\sqrt{N})',
    choices: ['O(log N)', 'O(√N)', 'O(N)', 'O(N²)'],
    correct: 1,
    explanation: 'Quadratic speedup over classical O(N).',
  },
  {
    id: 'p5', topic: 'QEC',
    question: '3-qubit bit-flip code corrects how many X errors?',
    choices: ['0', '1', '2', '3'],
    correct: 1,
    explanation: 'Single bit-flip on any of the three physical qubits.',
  },
  {
    id: 'p6', topic: 'Protocols',
    question: 'BB84 requires public classical channel?',
    choices: ['Yes', 'No'],
    correct: 0,
    explanation: 'Basis comparison and sifting use authenticated classical communication.',
  },
  {
    id: 'p7', topic: 'CHSH',
    question: 'Classical CHSH bound on S?',
    choices: ['≤ 1', '≤ 2', '≤ 2√2', '≤ 4'],
    correct: 1,
    explanation: '|S| ≤ 2 for local hidden-variable models.',
  },
  {
    id: 'p8', topic: 'Shor',
    question: 'Shor factors by finding what of a^x mod N?',
    choices: ['Minimum', 'Maximum', 'Period', 'GCD only'],
    correct: 2,
    explanation: 'Order r enables gcd(a^{r/2}±1, N).',
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PracticeIndex() {
  const [set, setSet] = useState(() => shuffle(BANK).slice(0, 5));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const problem = set[idx];

  const newSet = useCallback(() => {
    setSet(shuffle(BANK).slice(0, 5));
    setIdx(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  }, []);

  const submit = (choice: number) => {
    if (selected !== null) return;
    setSelected(choice);
    if (choice === problem.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= set.length) setDone(true);
    else { setIdx((i) => i + 1); setSelected(null); }
  };

  if (done) {
    return (
      <div>
        <h1>Practice</h1>
        <p className="card">Score: <strong>{score}</strong> / {set.length}</p>
        <button className="btn btn-primary" onClick={newSet}>New random set</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Practice</h1>
      <p>Randomized problems · Question {idx + 1} of {set.length} · <span className="tag">{problem.topic}</span></p>
      <div className="card">
        <p>{problem.question}</p>
        {problem.latex && <Katex display>{problem.latex}</Katex>}
        <div className="btn-group" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          {problem.choices.map((c, i) => (
            <button
              key={i}
              className={`btn ${selected === i ? (i === problem.correct ? 'btn-primary' : '') : ''}`}
              style={{
                borderColor: selected !== null ? (i === problem.correct ? 'var(--success)' : selected === i ? 'var(--danger)' : undefined) : undefined,
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
              {selected === problem.correct ? 'Correct!' : 'Incorrect.'} {problem.explanation}
            </p>
            <button className="btn btn-primary" onClick={next}>
              {idx + 1 >= set.length ? 'Finish' : 'Next'}
            </button>
          </>
        )}
      </div>
      <button className="btn" onClick={newSet}>Shuffle new set</button>
    </div>
  );
}
