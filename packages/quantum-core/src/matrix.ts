import { C, type Complex } from './complex.js';

export interface Matrix {
  readonly rows: number;
  readonly cols: number;
  readonly data: Complex[][];
  mulVec(v: Complex[]): Complex[];
  mulMat(m: Matrix): Matrix;
  dagger(): Matrix;
  isUnitary(eps?: number): boolean;
  toArray(): Complex[][];
}

function createMatrix(rows: number, cols: number, data: Complex[][]): Matrix {
  return {
    rows,
    cols,
    data,
    mulVec(v: Complex[]) {
      const result: Complex[] = [];
      for (let i = 0; i < rows; i++) {
        let sum = C.zero();
        for (let j = 0; j < cols; j++) {
          sum = C.add(sum, C.mul(data[i][j], v[j]));
        }
        result.push(sum);
      }
      return result;
    },
    mulMat(m: Matrix) {
      const r: Complex[][] = Array.from({ length: rows }, () =>
        Array.from({ length: m.cols }, () => C.zero())
      );
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < m.cols; j++) {
          let sum = C.zero();
          for (let k = 0; k < cols; k++) {
            sum = C.add(sum, C.mul(data[i][k], m.data[k][j]));
          }
          r[i][j] = sum;
        }
      }
      return createMatrix(rows, m.cols, r);
    },
    dagger() {
      const r: Complex[][] = Array.from({ length: cols }, (_, j) =>
        Array.from({ length: rows }, (_, i) => C.conj(data[i][j]))
      );
      return createMatrix(cols, rows, r);
    },
    isUnitary(eps = 1e-8) {
      const uu = this.mulMat(this.dagger());
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const expected = i === j ? C.one() : C.zero();
          if (!C.eq(uu.data[i][j], expected, eps)) return false;
        }
      }
      return true;
    },
    toArray() {
      return data.map((row) => row.map((c) => ({ ...c })));
    },
  };
}

export const Matrix2 = (data: Complex[][]) => createMatrix(2, 2, data);
export const Matrix4 = (data: Complex[][]) => createMatrix(4, 4, data);
export const Matrix8 = (data: Complex[][]) => createMatrix(8, 8, data);

export function identity(n: number): Matrix {
  const data: Complex[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? C.one() : C.zero()))
  );
  return createMatrix(n, n, data);
}

/** Kronecker product of two vectors. */
export function kronVec(a: Complex[], b: Complex[]): Complex[] {
  const result: Complex[] = [];
  for (const ai of a) {
    for (const bi of b) {
      result.push(C.mul(ai, bi));
    }
  }
  return result;
}

/** Kronecker product of two matrices. */
export function kronMat(a: Matrix, b: Matrix): Matrix {
  const rows = a.rows * b.rows;
  const cols = a.cols * b.cols;
  const data: Complex[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => C.zero())
  );
  for (let i = 0; i < a.rows; i++) {
    for (let j = 0; j < a.cols; j++) {
      for (let k = 0; k < b.rows; k++) {
        for (let l = 0; l < b.cols; l++) {
          data[i * b.rows + k][j * b.cols + l] = C.mul(a.data[i][j], b.data[k][l]);
        }
      }
    }
  }
  return createMatrix(rows, cols, data);
}

/** Apply single-qubit gate U to qubit `target` in n-qubit system. */
export function applySingleQubitGate(
  state: Complex[],
  n: number,
  target: number,
  gate: Matrix
): Complex[] {
  const dim = 1 << n;
  const result = Array.from({ length: dim }, () => C.zero());
  for (let idx = 0; idx < dim; idx++) {
    const bit = (idx >> (n - 1 - target)) & 1;
    const other = idx & ~(1 << (n - 1 - target));
    for (let b = 0; b < 2; b++) {
      const newIdx = other | (b << (n - 1 - target));
      result[newIdx] = C.add(result[newIdx], C.mul(gate.data[b][bit], state[idx]));
    }
  }
  return result;
}

/** Apply two-qubit gate to qubits (control, target) with control as lower index. */
export function applyTwoQubitGate(
  state: Complex[],
  n: number,
  control: number,
  target: number,
  gate: Matrix
): Complex[] {
  if (control === target) throw new Error('Control and target must differ');
  const dim = 1 << n;
  const result = Array.from({ length: dim }, () => C.zero());
  for (let idx = 0; idx < dim; idx++) {
    const cBit = (idx >> (n - 1 - control)) & 1;
    const tBit = (idx >> (n - 1 - target)) & 1;
    const subIdx = cBit * 2 + tBit;
    const maskC = 1 << (n - 1 - control);
    const maskT = 1 << (n - 1 - target);
    const base = idx & ~maskC & ~maskT;
    for (let c = 0; c < 2; c++) {
      for (let t = 0; t < 2; t++) {
        const newIdx = base | (c << (n - 1 - control)) | (t << (n - 1 - target));
        const gIdx = c * 2 + t;
        result[newIdx] = C.add(result[newIdx], C.mul(gate.data[gIdx][subIdx], state[idx]));
      }
    }
  }
  return result;
}

export function parseComplex(s: string): Complex {
  const trimmed = s.trim().replace(/\s/g, '');
  if (!trimmed) return C.zero();
  if (/^[+-]?\d*\.?\d+$/.test(trimmed)) return { re: parseFloat(trimmed), im: 0 };
  const polar = trimmed.match(/^([+-]?\d*\.?\d+)\*?e\^\(?(i[^)]+)\)?$/i);
  if (polar) {
    const r = parseFloat(polar[1]);
    const phi = evalTrig(polar[2].replace(/^i/, ''));
    return C.fromPolar(r, phi);
  }
  const match = trimmed.match(/^([+-]?(?:\d*\.?\d+)?)([+-](?:\d*\.?\d+)?i)?$/);
  if (match) {
    const re = match[1] === '' || match[1] === '+' || match[1] === '-' 
      ? (match[1] === '-' ? -1 : 1) * (match[2] ? 0 : 1)
      : parseFloat(match[1]);
    let im = 0;
    if (match[2]) {
      const imPart = match[2].slice(0, -1);
      im = imPart === '+' || imPart === '' ? 1 : imPart === '-' ? -1 : parseFloat(imPart);
    }
    return { re, im };
  }
  throw new Error(`Cannot parse complex: ${s}`);
}

function evalTrig(expr: string): number {
  const normalized = expr.replace(/pi/gi, 'Math.PI');
  if (/^Math\.PI\/\d+$/.test(normalized) || /^Math\.PI$/.test(normalized)) {
    return Function(`"use strict"; return (${normalized})`)() as number;
  }
  return parseFloat(expr) || 0;
}
