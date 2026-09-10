import { useState } from 'react';
import { useLabT, useLabSharedT } from '@/i18n/hooks';
import { Gates } from 'quantum-core';

const GATE_LIST = ['I', 'X', 'Y', 'Z', 'H', 'S', 'T'] as const;

export default function UnitaryCheckerLab() {
  const labT = useLabT('unitary-checker');
  const sharedT = useLabSharedT();
  const [selected, setSelected] = useState<string>('H');
  const gate = Gates[selected as keyof typeof Gates];
  const matrix = typeof gate === 'function' ? null : gate;
  const isUnitary = matrix?.isUnitary() ?? false;

  return (
    <div className="lab-panel">
      <h3>{labT('title')}</h3>
      <p>Select a single-qubit gate to inspect its matrix and verify unitarity (U†U = I).</p>
      <div className="btn-group">
        {GATE_LIST.map((g) => (
          <button key={g} className={`btn ${selected === g ? 'btn-primary' : ''}`} onClick={() => setSelected(g)}>
            {g}
          </button>
        ))}
      </div>
      {matrix && (
        <>
          <table className="data-table">
            <tbody>
              {matrix.toArray().map((row, i) => (
                <tr key={i}>
                  {row.map((c, j) => (
                    <td key={j} className="mono">
                      {c.im === 0 ? c.re.toFixed(3) : `${c.re.toFixed(2)}${c.im >= 0 ? '+' : ''}${c.im.toFixed(2)}i`}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className={isUnitary ? 'correct' : 'incorrect'}>
            {isUnitary ? '✓ This matrix is unitary.' : '✗ Not unitary (unexpected for standard gates).'}
          </p>
        </>
      )}
    </div>
  );
}
