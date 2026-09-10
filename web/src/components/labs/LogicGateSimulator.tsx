import { useState, useMemo } from 'react';
import { useLabT, useLabSharedT } from '@/i18n/hooks';
import { LogicGates, type Bit } from 'quantum-core';

type GateName = 'NOT' | 'AND' | 'OR' | 'XOR' | 'NAND' | 'NOR';

const GATES: GateName[] = ['NOT', 'AND', 'OR', 'XOR', 'NAND', 'NOR'];
const UNARY: GateName[] = ['NOT'];

function evalGate(gate: GateName, a: Bit, b: Bit): Bit {
  switch (gate) {
    case 'NOT': return LogicGates.NOT(a);
    case 'AND': return LogicGates.AND(a, b);
    case 'OR': return LogicGates.OR(a, b);
    case 'XOR': return LogicGates.XOR(a, b);
    case 'NAND': return LogicGates.NAND(a, b);
    case 'NOR': return LogicGates.NOR(a, b);
  }
}

export default function LogicGateSimulator() {
  const labT = useLabT('logic-gates');
  const sharedT = useLabSharedT();
  const [gate, setGate] = useState<GateName>('AND');
  const [selectedA, setSelectedA] = useState<Bit>(0);
  const [selectedB, setSelectedB] = useState<Bit>(0);

  const isUnary = UNARY.includes(gate);

  const rows = useMemo(() => {
    if (isUnary) {
      return ([0, 1] as Bit[]).map((a) => ({
        a,
        b: null as Bit | null,
        out: evalGate(gate, a, 0),
      }));
    }
    const result: { a: Bit; b: Bit; out: Bit }[] = [];
    for (const a of [0, 1] as Bit[]) {
      for (const b of [0, 1] as Bit[]) {
        result.push({ a, b, out: evalGate(gate, a, b) });
      }
    }
    return result;
  }, [gate, isUnary]);

  const highlightedOut = evalGate(gate, selectedA, selectedB);

  return (
    <div className="lab-panel">
      <h3>{labT('title')}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        Select a gate, then click a row in the truth table to set inputs and see the output.
      </p>

      <div className="btn-group">
        {GATES.map((g) => (
          <button
            key={g}
            className={`btn ${gate === g ? 'btn-primary' : ''}`}
            onClick={() => setGate(g)}
          >
            {g}
          </button>
        ))}
      </div>

      <table className="data-table" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>A</th>
            {!isUnary && <th>B</th>}
            <th>{gate}(…)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const selected = row.a === selectedA && (isUnary || row.b === selectedB);
            return (
              <tr
                key={isUnary ? String(row.a) : `${row.a}-${row.b}`}
                onClick={() => {
                  setSelectedA(row.a);
                  if (!isUnary && row.b !== null) setSelectedB(row.b);
                }}
                style={{
                  cursor: 'pointer',
                  background: selected ? 'var(--accent-muted)' : undefined,
                }}
              >
                <td>{row.a}</td>
                {!isUnary && <td>{row.b}</td>}
                <td><strong>{row.out}</strong></td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="card" style={{ marginTop: '1rem' }}>
        <p style={{ margin: 0 }}>
          {isUnary ? (
            <>
              <strong>{gate}({selectedA}) = {highlightedOut}</strong>
            </>
          ) : (
            <>
              <strong>{gate}({selectedA}, {selectedB}) = {highlightedOut}</strong>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
