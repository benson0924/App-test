import { useState } from 'react';
import { useT } from '@/context/LocaleContext';

interface CheckpointProps {
  question: string;
  answer: string;
  hint?: string;
}

export default function Checkpoint({ question, answer, hint }: CheckpointProps) {
  const t = useT();
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
      <p><strong>{t('common.checkpoint.title')}</strong></p>
      <p>{question}</p>
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => { setUserAnswer(e.target.value); setChecked(null); }}
        placeholder={t('common.checkpoint.placeholder')}
        style={{ width: '100%', marginBottom: '0.5rem' }}
      />
      <div className="btn-group">
        {hint && <button className="btn" onClick={() => setShowHint(!showHint)}>{t('common.checkpoint.hint')}</button>}
        <button className="btn btn-primary" onClick={check}>{t('common.checkpoint.check')}</button>
        <button className="btn" onClick={() => setRevealed(!revealed)}>
          {revealed ? t('common.checkpoint.hide') : t('common.checkpoint.reveal')}
        </button>
      </div>
      {showHint && hint && <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{hint}</p>}
      {checked !== null && (
        <p className={checked ? 'correct' : 'incorrect'}>
          {checked ? t('common.checkpoint.correct') : t('common.checkpoint.incorrect')}
        </p>
      )}
      {revealed && <p><strong>{t('common.checkpoint.answer')}</strong> {answer}</p>}
    </div>
  );
}
