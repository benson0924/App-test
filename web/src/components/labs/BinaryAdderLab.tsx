import { useState, useMemo } from 'react';
import { useLabT, useLabSharedT } from '@/i18n/hooks';
import { rippleCarryAdd } from 'quantum-core';

function sanitizeBinary(s: string, maxLen: number): string {
  const cleaned = s.replace(/[^01]/g, '').slice(0, maxLen);
  return cleaned || '0';
}

export default function BinaryAdderLab() {
  const labT = useLabT('binary-adder');
  const sharedT = useLabSharedT();
  const [width, setWidth] = useState(4);
  const [a, setA] = useState('0101');
  const [b, setB] = useState('0011');

  const aClean = sanitizeBinary(a, width);
  const bClean = sanitizeBinary(b, width);

  const result = useMemo(() => rippleCarryAdd(aClean, bClean), [aClean, bClean]);

  const len = Math.max(aClean.length, bClean.length);
  const aPadded = aClean.padStart(len, '0');
  const bPadded = bClean.padStart(len, '0');
  const sumPadded = result.sum.padStart(len, '0');

  return (
    <div className="lab-panel">
      <h3>{labT('title')}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        Enter two binary numbers and watch how carry bits propagate from least to most significant bit.
      </p>

      <label htmlFor="width-slider">Bit width: {width}</label>
      <input
        id="width-slider"
        type="range"
        min={2}
        max={8}
        value={width}
        onChange={(e) => {
          const w = Number(e.target.value);
          setWidth(w);
          setA((prev) => sanitizeBinary(prev, w));
          setB((prev) => sanitizeBinary(prev, w));
        }}
      />

      <div className="grid-2" style={{ marginTop: '1rem' }}>
        <div>
          <label htmlFor="input-a">A</label>
          <input
            id="input-a"
            type="text"
            value={a}
            onChange={(e) => setA(sanitizeBinary(e.target.value, width))}
            className="mono"
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label htmlFor="input-b">B</label>
          <input
            id="input-b"
            type="text"
            value={b}
            onChange={(e) => setB(sanitizeBinary(e.target.value, width))}
            className="mono"
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <table className="data-table" style={{ marginTop: '1.5rem' }}>
        <thead>
          <tr>
            <th>Position</th>
            {Array.from({ length: len }, (_, i) => (
              <th key={i}>2<sup>{len - 1 - i}</sup></th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>A</strong></td>
            {aPadded.split('').map((bit, i) => (
              <td key={`a-${i}`} className="mono">{bit}</td>
            ))}
          </tr>
          <tr>
            <td><strong>B</strong></td>
            {bPadded.split('').map((bit, i) => (
              <td key={`b-${i}`} className="mono">{bit}</td>
            ))}
          </tr>
          <tr>
            <td><strong>Carry out</strong></td>
            {result.carries.map((c, i) => (
              <td
                key={`c-${i}`}
                className="mono"
                style={{ background: c === 1 ? 'var(--accent-muted)' : undefined }}
              >
                {c}
              </td>
            ))}
          </tr>
          <tr>
            <td><strong>Sum</strong></td>
            {sumPadded.split('').map((bit, i) => (
              <td key={`s-${i}`} className="mono"><strong>{bit}</strong></td>
            ))}
          </tr>
        </tbody>
      </table>

      <div className="card" style={{ marginTop: '1rem' }}>
        <p style={{ margin: 0 }}>
          <strong>{aPadded}<sub>2</sub> + {bPadded}<sub>2</sub> = {sumPadded}<sub>2</sub></strong>
          {' '}(decimal: {parseInt(aPadded, 2)} + {parseInt(bPadded, 2)} = {parseInt(sumPadded, 2)})
        </p>
      </div>
    </div>
  );
}
