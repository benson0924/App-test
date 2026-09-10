import { useState } from 'react';

interface CheckpointProps {
  question: string;
  answer: string;
  hint?: string;
}

export default function Checkpoint({ question, answer, hint }: CheckpointProps) {
  const [showHint, setShowHint] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [checked, setChecked] = useState<boolean | null>(null);

  const check = () => {
    const normalized = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
    setChecked(normalized(userAnswer) === normalized(answer) || normalized(answer).includes(normalized(userAnswer)));
  };

  return (
    <div className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
      <p><strong>Concept Check</strong></p>
      <p>{question}</p>
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => { setUserAnswer(e.target.value); setChecked(null); }}
        placeholder="Your answer..."
        style={{ width: '100%', marginBottom: '0.5rem' }}
      />
      <div className="btn-group">
        {hint && <button className="btn" onClick={() => setShowHint(!showHint)}>Hint</button>}
        <button className="btn btn-primary" onClick={check}>Check</button>
        <button className="btn" onClick={() => setRevealed(!revealed)}>{revealed ? 'Hide' : 'Reveal'} Answer</button>
      </div>
      {showHint && hint && <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{hint}</p>}
      {checked !== null && (
        <p className={checked ? 'correct' : 'incorrect'}>
          {checked ? 'Correct!' : 'Not quite — review the explanation or reveal the answer.'}
        </p>
      )}
      {revealed && <p><strong>Answer:</strong> {answer}</p>}
    </div>
  );
}
