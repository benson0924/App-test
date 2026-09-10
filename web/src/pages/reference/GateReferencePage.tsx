import { Gates } from 'quantum-core';
import Katex from '@/components/Math';
import Expandable from '@/components/Expandable';

interface GateInfo {
  symbol: string;
  name: string;
  matrix?: string;
  action: string;
  bloch: string;
  inverse: string;
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
  {
    symbol: 'I',
    name: 'Identity',
    matrix: '\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}',
    action: 'I|0⟩ = |0⟩, I|1⟩ = |1⟩ — no change',
    bloch: 'Identity rotation: no movement on Bloch sphere',
    inverse: 'I† = I',
  },
  {
    symbol: 'X',
    name: 'Pauli X (NOT)',
    matrix: '\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}',
    action: 'Bit flip: X|0⟩ = |1⟩, X|1⟩ = |0⟩',
    bloch: 'Rotation by π about x-axis: |0⟩ ↔ |1⟩',
    inverse: 'X† = X (X² = I)',
  },
  {
    symbol: 'Y',
    name: 'Pauli Y',
    matrix: '\\begin{bmatrix}0&-i\\\\i&0\\end{bmatrix}',
    action: 'Y|0⟩ = i|1⟩, Y|1⟩ = −i|0⟩',
    bloch: 'Rotation by π about y-axis',
    inverse: 'Y† = Y (Y² = I)',
  },
  {
    symbol: 'Z',
    name: 'Pauli Z',
    matrix: '\\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}',
    action: 'Phase flip: Z|0⟩ = |0⟩, Z|1⟩ = −|1⟩',
    bloch: 'Rotation by π about z-axis',
    inverse: 'Z† = Z (Z² = I)',
  },
  {
    symbol: 'H',
    name: 'Hadamard',
    matrix: '\\frac{1}{\\sqrt{2}}\\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}',
    action: 'H|0⟩ = |+⟩, H|1⟩ = |−⟩',
    bloch: 'π rotation about (x+z)/√2 axis; maps z ↔ x',
    inverse: 'H† = H (H² = I)',
  },
  {
    symbol: 'S',
    name: 'Phase (S gate)',
    matrix: '\\begin{bmatrix}1&0\\\\0&i\\end{bmatrix}',
    action: 'S|0⟩ = |0⟩, S|1⟩ = i|1⟩',
    bloch: 'Rotation by π/2 about z-axis',
    inverse: 'S† = S³ = ZS (S² = Z)',
  },
  {
    symbol: 'T',
    name: 'π/8 gate',
    matrix: '\\begin{bmatrix}1&0\\\\0&e^{i\\pi/4}\\end{bmatrix}',
    action: 'T|0⟩ = |0⟩, T|1⟩ = e^{iπ/4}|1⟩',
    bloch: 'Rotation by π/4 about z-axis',
    inverse: 'T† = T⁷ (T² = S, T⁴ = Z)',
  },
  {
    symbol: 'R_x(θ)',
    name: 'Rotation about x',
    matrix: 'e^{-i\\theta X/2}',
    action: 'R_x(θ)|0⟩ = cos(θ/2)|0⟩ − i sin(θ/2)|1⟩',
    bloch: 'Rotation by θ about x-axis',
    inverse: 'R_x(θ)† = R_x(−θ)',
    param: Math.PI / 2,
  },
  {
    symbol: 'R_y(θ)',
    name: 'Rotation about y',
    matrix: 'e^{-i\\theta Y/2}',
    action: 'R_y(θ)|0⟩ = cos(θ/2)|0⟩ + sin(θ/2)|1⟩',
    bloch: 'Rotation by θ about y-axis',
    inverse: 'R_y(θ)† = R_y(−θ)',
    param: Math.PI / 2,
  },
  {
    symbol: 'R_z(θ)',
    name: 'Rotation about z',
    matrix: 'e^{-i\\theta Z/2}',
    action: 'R_z(θ)|0⟩ = e^{−iθ/2}|0⟩, R_z(θ)|1⟩ = e^{iθ/2}|1⟩',
    bloch: 'Rotation by θ about z-axis (global phase on |0⟩)',
    inverse: 'R_z(θ)† = R_z(−θ)',
    param: Math.PI / 2,
  },
];

const TWO_QUBIT: GateInfo[] = [
  {
    symbol: 'CNOT',
    name: 'Controlled-NOT',
    matrix: '\\begin{bmatrix}1&0&0&0\\\\0&1&0&0\\\\0&0&0&1\\\\0&0&1&0\\end{bmatrix}',
    action: 'CNOT|a,b⟩ = |a, b⊕a⟩ — flips target if control is 1',
    bloch: 'Entangling; not a single-qubit Bloch rotation',
    inverse: 'CNOT† = CNOT (CNOT² = I on target)',
  },
  {
    symbol: 'CZ',
    name: 'Controlled-Z',
    matrix: '\\text{diag}(1,1,1,-1)',
    action: 'CZ|11⟩ = −|11⟩; others unchanged — adds π phase when both 1',
    bloch: 'Entangling phase gate; CZ = (I⊗H) CNOT (I⊗H)',
    inverse: 'CZ† = CZ (CZ² = I)',
  },
  {
    symbol: 'SWAP',
    name: 'Swap',
    matrix: '\\text{permute } |01\\rangle \\leftrightarrow |10\\rangle',
    action: 'SWAP|a,b⟩ = |b,a⟩',
    bloch: 'Exchanges qubit states; 3 CNOT decomposition',
    inverse: 'SWAP† = SWAP (SWAP² = I)',
  },
];

const THREE_QUBIT: GateInfo[] = [
  {
    symbol: 'Toffoli',
    name: 'CCNOT (Toffoli)',
    matrix: '8\\times 8 \\text{ identity except } |111\\rangle \\leftrightarrow |110\\rangle',
    action: 'Flips target iff both controls are |1⟩',
    bloch: 'Universal classical logic; reversible AND',
    inverse: 'Toffoli† = Toffoli (self-inverse)',
  },
];

function GateTable({ gates }: { gates: GateInfo[] }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Matrix</th>
          <th>Action</th>
          <th>Bloch</th>
          <th>Inverse</th>
        </tr>
      </thead>
      <tbody>
        {gates.map((g) => {
          const key = g.symbol.replace(/\(.*\)/, '').replace('R_x', 'Rx').replace('R_y', 'Ry').replace('R_z', 'Rz');
          const gateKey = key.startsWith('R') ? key.split('(')[0] : key;
          const m = getMatrix(gateKey === 'Toffoli' ? 'Toffoli' : gateKey, g.param);
          return (
            <tr key={g.symbol}>
              <td><strong>{g.symbol}</strong><br /><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{g.name}</span></td>
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
              <td>{g.action}</td>
              <td style={{ fontSize: '0.875rem' }}>{g.bloch}</td>
              <td style={{ fontSize: '0.875rem' }}>{g.inverse}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function GateReferencePage() {
  return (
    <article>
      <h1>Gate Reference</h1>
      <p>
        Complete gate tables with symbols, matrices (from <code>quantum-core</code>),
        actions, Bloch-sphere interpretation, and inverses.
      </p>

      <h2>Single-qubit gates</h2>
      <GateTable gates={SINGLE_GATES} />

      <h2>Two-qubit gates</h2>
      <GateTable gates={TWO_QUBIT} />

      <h2>Three-qubit gates</h2>
      <GateTable gates={THREE_QUBIT} />

      <h2>Common identities</h2>
      <div className="card">
        <Katex display>{`HXH = Z, \\quad HZH = X, \\quad H^2 = I`}</Katex>
        <Katex display>{`T^2 = S, \\quad S^2 = Z, \\quad T^4 = Z`}</Katex>
        <Katex display>{`\\text{CNOT}|a,b\\rangle = |a, b \\oplus a\\rangle`}</Katex>
        <Katex display>{`\\text{SWAP} = \\text{CNOT}_{12}\\,\\text{CNOT}_{21}\\,\\text{CNOT}_{12}`}</Katex>
        <Katex display>{`\\text{CZ} = (I \\otimes H)\\,\\text{CNOT}\\,(I \\otimes H)`}</Katex>
        <Katex display>{`R_x(\\theta) = e^{-i\\theta X/2}, \\quad R_y(\\theta) = e^{-i\\theta Y/2}, \\quad R_z(\\theta) = e^{-i\\theta Z/2}`}</Katex>
      </div>

      <Expandable title="Pauli group relations">
        <Katex display>{`XY = iZ, \\quad YZ = iX, \\quad ZX = iY`}</Katex>
        <Katex display>{`X^2 = Y^2 = Z^2 = I, \\quad \\{X,Y\\} = \\{Y,Z\\} = \\{Z,X\\} = 0`}</Katex>
      </Expandable>

      <Expandable title="Universal gate sets">
        <p>
          <strong>Established:</strong> {`{H, S, T, CNOT}`} is a common universal set for fault-tolerant
          computation (T gate requires magic-state distillation in FT architectures).
        </p>
        <p>
          <strong>Established:</strong> {`{Rx, Ry, Rz, CNOT}`} is universal for approximate compilation on NISQ devices.
        </p>
      </Expandable>
    </article>
  );
}
