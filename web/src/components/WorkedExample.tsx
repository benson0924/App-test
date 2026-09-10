import { useState } from 'react';
import Math from './Math';

interface Step {
  label: string;
  latex?: string;
}

interface WorkedExampleProps {
  title: string;
  steps: Step[];
}

export default function WorkedExample({ title, steps }: WorkedExampleProps) {
  const [visible, setVisible] = useState(0);

  return (
    <div className="card">
      <p><strong>Worked Example:</strong> {title}</p>
      {steps.slice(0, visible + 1).map((step, i) => (
        <div key={i} style={{ marginTop: '0.75rem' }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Step {i + 1}</p>
          <p>{step.label}</p>
          {step.latex && <Math display>{step.latex}</Math>}
        </div>
      ))}
      {visible < steps.length - 1 && (
        <button className="btn" style={{ marginTop: '0.75rem' }} onClick={() => setVisible((v) => v + 1)}>
          Show next step
        </button>
      )}
    </div>
  );
}
