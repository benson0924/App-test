/** Classical computing utilities for Part I. */

export type Bit = 0 | 1;

export const LogicGates = {
  NOT: (a: Bit): Bit => (a === 0 ? 1 : 0),
  AND: (a: Bit, b: Bit): Bit => (a && b ? 1 : 0) as Bit,
  OR: (a: Bit, b: Bit): Bit => (a || b ? 1 : 0) as Bit,
  XOR: (a: Bit, b: Bit): Bit => (a !== b ? 1 : 0) as Bit,
  NAND: (a: Bit, b: Bit): Bit => LogicGates.NOT(LogicGates.AND(a, b)),
  NOR: (a: Bit, b: Bit): Bit => LogicGates.NOT(LogicGates.OR(a, b)),
};

export function binaryToDecimal(bits: string): number {
  return parseInt(bits.replace(/\s/g, ''), 2);
}

export function decimalToBinary(n: number, width?: number): string {
  const s = Math.max(0, Math.floor(n)).toString(2);
  return width ? s.padStart(width, '0') : s;
}

export function allBitStrings(n: number): string[] {
  return Array.from({ length: 1 << n }, (_, i) => i.toString(2).padStart(n, '0'));
}

export function halfAdder(a: Bit, b: Bit): { sum: Bit; carry: Bit } {
  return { sum: LogicGates.XOR(a, b), carry: LogicGates.AND(a, b) };
}

export function fullAdder(a: Bit, b: Bit, cin: Bit): { sum: Bit; carry: Bit } {
  const s1 = LogicGates.XOR(a, b);
  const sum = LogicGates.XOR(s1, cin);
  const carry = LogicGates.OR(
    LogicGates.AND(a, b),
    LogicGates.AND(cin, s1)
  );
  return { sum, carry };
}

export function rippleCarryAdd(a: string, b: string): { sum: string; carries: Bit[] } {
  const len = Math.max(a.length, b.length);
  const aP = a.padStart(len, '0');
  const bP = b.padStart(len, '0');
  const carries: Bit[] = [];
  let cin: Bit = 0;
  const sumBits: Bit[] = [];
  for (let i = len - 1; i >= 0; i--) {
    const ai = parseInt(aP[i]) as Bit;
    const bi = parseInt(bP[i]) as Bit;
    const { sum, carry } = fullAdder(ai, bi, cin);
    sumBits.unshift(sum);
    carries.unshift(carry);
    cin = carry;
  }
  return { sum: sumBits.join(''), carries };
}

export function toffoliClassical(a: Bit, b: Bit, c: Bit): [Bit, Bit, Bit] {
  return [a, b, (c ^ LogicGates.AND(a, b)) as Bit];
}

export function majorityVote(bits: Bit[]): Bit {
  const ones = bits.filter((b) => b === 1).length;
  return (ones > bits.length / 2 ? 1 : 0) as Bit;
}

export function parity(bits: Bit[]): Bit {
  return bits.reduce((p, b) => (p ^ b) as Bit, 0 as Bit);
}

export type ComplexityFn = (n: number) => number;

export const Complexity: Record<string, ComplexityFn> = {
  'O(1)': () => 1,
  'O(log n)': (n) => Math.log2(Math.max(n, 2)),
  'O(n)': (n) => n,
  'O(n log n)': (n) => n * Math.log2(Math.max(n, 2)),
  'O(n²)': (n) => n * n,
  'O(2ⁿ)': (n) => Math.pow(2, Math.min(n, 20)),
};

export function simplifyBoolean(expr: string, values: Record<string, Bit>): Bit {
  const e = expr.toUpperCase().replace(/\s/g, '');
  const evalExpr = (s: string): Bit => {
    if (s === '0') return 0;
    if (s === '1') return 1;
    if (s in values) return values[s];
    if (s.startsWith('NOT(') && s.endsWith(')')) {
      return LogicGates.NOT(evalExpr(s.slice(4, -1)));
    }
    for (const op of ['AND', 'OR', 'XOR'] as const) {
      const idx = s.indexOf(op);
      if (idx > 0) {
        const left = s.slice(0, idx);
        const right = s.slice(idx + op.length);
        const l = evalExpr(left);
        const r = evalExpr(right);
        if (op === 'AND') return LogicGates.AND(l, r);
        if (op === 'OR') return LogicGates.OR(l, r);
        return LogicGates.XOR(l, r);
      }
    }
    if (s.length === 1) return values[s] ?? 0;
    return 0;
  };
  return evalExpr(e);
}

export function deMorgan(andOr: 'AND' | 'OR'): { left: string; right: string } {
  if (andOr === 'AND') {
    return { left: 'NOT(A AND B)', right: 'NOT(A) OR NOT(B)' };
  }
  return { left: 'NOT(A OR B)', right: 'NOT(A) AND NOT(B)' };
}
