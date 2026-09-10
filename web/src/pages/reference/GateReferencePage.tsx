import { Gates } from 'quantum-core';
import Katex from '@/components/Math';
import Expandable from '@/components/Expandable';
import { useT } from '@/context/LocaleContext';

interface GateInfo {
  id: string;
  symbol: string;
  matrix?: string;
  param?: number;
}

function fmt(c: { re: number; im: number }) {
  if (Math.abs(c.im) < 1e-10) return c.re.toFixed(2);
  const sign = c.im >= 0 ? '+' : '';
  return `${c.re.toFixed(2)}${sign}${c.im.toFixed(2)}i`;
}

function getMatrix(name: string, param?: number): { re: number; im: number }[][] | null {
  const g = (Gates as Record<string, unknown>)[name];
  if (typeof g === 'function') {
    const m = (g as (p: number) => { toArray: () => { re: number; im: number }[][] })(param ?? Math.PI / 2);
    return m.toArray();
  }
  if (g && typeof g === 'object' && 'toArray' in g) {
    return (g as { toArray: () => { re: number; im: number }[][] }).toArray();
  }
  return null;
}

const SINGLE_GATES: GateInfo[] = [
  { id: 'I', symbol: 'I', matrix: '\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}' },
  { id: 'X', symbol: 'X', matrix: '\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}' },
  { id: 'Y', symbol: 'Y', matrix: '\\begin{bmatrix}0&-i\\\\i&0\\end{bmatrix}' },
  { id: 'Z', symbol: 'Z', matrix: '\\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}' },
  { id: 'H', symbol: 'H', matrix: '\\frac{1}{\\sqrt{2}}\\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}' },
  { id: 'S', symbol: 'S', matrix: '\\begin{bmatrix}1&0\\\\0&i\\end{bmatrix}' },
  { id: 'T', symbol: 'T', matrix: '\\begin{bmatrix}1&0\\\\0&e^{i\\pi/4}\\end{bmatrix}' },
  { id: 'Rx', symbol: 'R_x(θ)', matrix: 'e^{-i\\theta X/2}', param: Math.PI / 2 },
  { id: 'Ry', symbol: 'R_y(θ)', matrix: 'e^{-i\\theta Y/2}', param: Math.PI / 2 },
  { id: 'Rz', symbol: 'R_z(θ)', matrix: 'e^{-i\\theta Z/2}', param: Math.PI / 2 },
];

const TWO_QUBIT: GateInfo[] = [
  { id: 'CNOT', symbol: 'CNOT', matrix: '\\begin{bmatrix}1&0&0&0\\\\0&1&0&0\\\\0&0&0&1\\\\0&0&1&0\\end{bmatrix}' },
  { id: 'CZ', symbol: 'CZ', matrix: '\\text{diag}(1,1,1,-1)' },
  { id: 'SWAP', symbol: 'SWAP', matrix: '\\text{permute } |01\\rangle \\leftrightarrow |10\\rangle' },
];

const THREE_QUBIT: GateInfo[] = [
  { id: 'Toffoli', symbol: 'Toffoli', matrix: '8\\times 8 \\text{ identity except } |111\\rangle \\leftrightarrow |110\\rangle' },
];

function GateTable({ gates }: { gates: GateInfo[] }) {
  const t = useT();
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>{t('reference.gates.colSymbol')}</th>
          <th>{t('reference.gates.colMatrix')}</th>
          <th>{t('reference.gates.colAction')}</th>
          <th>{t('reference.gates.colBloch')}</th>
          <th>{t('reference.gates.colInverse')}</th>
        </tr>
      </thead>
      <tbody>
        {gates.map((g) => {
          const m = getMatrix(g.id === 'Toffoli' ? 'Toffoli' : g.id, g.param);
          return (
            <tr key={g.symbol}>
              <td><strong>{g.symbol}</strong><br /><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t(`reference.gates.${g.id}.name`)}</span></td>
              <td>
                {m ? (
                  <table className="data-table" style={{ margin: 0 }}>
                    <tbody>
                      {m.map((row, i) => (
                        <tr key={i}>{row.map((c, j) => <td key={j} className="mono" style={{ padding: '0.2rem 0.4rem' }}>{fmt(c)}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <Katex>{g.matrix ?? g.symbol}</Katex>
                )}
              </td>
              <td>{t(`reference.gates.${g.id}.action`)}</td>
              <td style={{ fontSize: '0.875rem' }}>{t(`reference.gates.${g.id}.bloch`)}</td>
              <td style={{ fontSize: '0.875rem' }}>{t(`reference.gates.${g.id}.inverse`)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function GateReferencePage() {
  const t = useT();
  return (
    <article>
      <h1>{t('reference.gates.title')}</h1>
      <p>{t('reference.gates.intro')}</p>

      <h2>{t('reference.gates.singleQubit')}</h2>
      <GateTable gates={SINGLE_GATES} />

      <h2>{t('reference.gates.twoQubit')}</h2>
      <GateTable gates={TWO_QUBIT} />

      <h2>{t('reference.gates.threeQubit')}</h2>
      <GateTable gates={THREE_QUBIT} />

      <h2>{t('reference.gates.commonIdentities')}</h2>
      <div className="card">
        <Katex display>{`HXH = Z, \\quad HZH = X, \\quad H^2 = I`}</Katex>
        <Katex display>{`T^2 = S, \\quad S^2 = Z, \\quad T^4 = Z`}</Katex>
        <Katex display>{`\\text{CNOT}|a,b\\rangle = |a, b \\oplus a\\rangle`}</Katex>
        <Katex display>{`\\text{SWAP} = \\text{CNOT}_{12}\\,\\text{CNOT}_{21}\\,\\text{CNOT}_{12}`}</Katex>
        <Katex display>{`\\text{CZ} = (I \\otimes H)\\,\\text{CNOT}\\,(I \\otimes H)`}</Katex>
        <Katex display>{`R_x(\\theta) = e^{-i\\theta X/2}, \\quad R_y(\\theta) = e^{-i\\theta Y/2}, \\quad R_z(\\theta) = e^{-i\\theta Z/2}`}</Katex>
      </div>

      <Expandable title={t('reference.gates.pauliRelations')}>
        <Katex display>{`XY = iZ, \\quad YZ = iX, \\quad ZX = iY`}</Katex>
        <Katex display>{`X^2 = Y^2 = Z^2 = I, \\quad \\{X,Y\\} = \\{Y,Z\\} = \\{Z,X\\} = 0`}</Katex>
      </Expandable>

      <Expandable title={t('reference.gates.universalSets')}>
        <p>{t('reference.gates.universalEstablished1')}</p>
        <p>{t('reference.gates.universalEstablished2')}</p>
      </Expandable>
    </article>
  );
}
