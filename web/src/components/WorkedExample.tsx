import { useState } from 'react';
import Katex from './Math';
import { useT } from '@/context/LocaleContext';

interface Step {
  label: string;
  latex?: string;
}

interface WorkedExampleProps {
  title: string;
  steps: Step[];
}

export default function WorkedExample({ title, steps }: WorkedExampleProps) {
  const t = useT();
  const [visible, setVisible] = useState(0);

  return (
    <div className="card">
      <p><strong>{t('common.workedExample.title')}</strong> {title}</p>
      {steps.slice(0, visible + 1).map((step, i) => (
        <div key={i} style={{ marginTop: '0.75rem' }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>{t('common.workedExample.step')} {i + 1}</p>
          <p>{step.label}</p>
          {step.latex && <Katex display>{step.latex}</Katex>}
        </div>
      ))}
      {visible < steps.length - 1 && (
        <button className="btn" style={{ marginTop: '0.75rem' }} onClick={() => setVisible((v) => v + 1)}>
          {t('common.workedExample.showNextStep')}
        </button>
      )}
    </div>
  );
}
