/** Classical computing utilities for Part I. */
export const LogicGates = {
    NOT: (a) => (a === 0 ? 1 : 0),
    AND: (a, b) => (a && b ? 1 : 0),
    OR: (a, b) => (a || b ? 1 : 0),
    XOR: (a, b) => (a !== b ? 1 : 0),
    NAND: (a, b) => LogicGates.NOT(LogicGates.AND(a, b)),
    NOR: (a, b) => LogicGates.NOT(LogicGates.OR(a, b)),
};
export function binaryToDecimal(bits) {
    return parseInt(bits.replace(/\s/g, ''), 2);
}
export function decimalToBinary(n, width) {
    const s = Math.max(0, Math.floor(n)).toString(2);
    return width ? s.padStart(width, '0') : s;
}
export function allBitStrings(n) {
    return Array.from({ length: 1 << n }, (_, i) => i.toString(2).padStart(n, '0'));
}
export function halfAdder(a, b) {
    return { sum: LogicGates.XOR(a, b), carry: LogicGates.AND(a, b) };
}
export function fullAdder(a, b, cin) {
    const s1 = LogicGates.XOR(a, b);
    const sum = LogicGates.XOR(s1, cin);
    const carry = LogicGates.OR(LogicGates.AND(a, b), LogicGates.AND(cin, s1));
    return { sum, carry };
}
export function rippleCarryAdd(a, b) {
    const len = Math.max(a.length, b.length);
    const aP = a.padStart(len, '0');
    const bP = b.padStart(len, '0');
    const carries = [];
    let cin = 0;
    const sumBits = [];
    for (let i = len - 1; i >= 0; i--) {
        const ai = parseInt(aP[i]);
        const bi = parseInt(bP[i]);
        const { sum, carry } = fullAdder(ai, bi, cin);
        sumBits.unshift(sum);
        carries.unshift(carry);
        cin = carry;
    }
    return { sum: sumBits.join(''), carries };
}
export function toffoliClassical(a, b, c) {
    return [a, b, (c ^ LogicGates.AND(a, b))];
}
export function majorityVote(bits) {
    const ones = bits.filter((b) => b === 1).length;
    return (ones > bits.length / 2 ? 1 : 0);
}
export function parity(bits) {
    return bits.reduce((p, b) => (p ^ b), 0);
}
export const Complexity = {
    'O(1)': () => 1,
    'O(log n)': (n) => Math.log2(Math.max(n, 2)),
    'O(n)': (n) => n,
    'O(n log n)': (n) => n * Math.log2(Math.max(n, 2)),
    'O(n²)': (n) => n * n,
    'O(2ⁿ)': (n) => Math.pow(2, Math.min(n, 20)),
};
export function simplifyBoolean(expr, values) {
    const e = expr.toUpperCase().replace(/\s/g, '');
    const evalExpr = (s) => {
        if (s === '0')
            return 0;
        if (s === '1')
            return 1;
        if (s in values)
            return values[s];
        if (s.startsWith('NOT(') && s.endsWith(')')) {
            return LogicGates.NOT(evalExpr(s.slice(4, -1)));
        }
        for (const op of ['AND', 'OR', 'XOR']) {
            const idx = s.indexOf(op);
            if (idx > 0) {
                const left = s.slice(0, idx);
                const right = s.slice(idx + op.length);
                const l = evalExpr(left);
                const r = evalExpr(right);
                if (op === 'AND')
                    return LogicGates.AND(l, r);
                if (op === 'OR')
                    return LogicGates.OR(l, r);
                return LogicGates.XOR(l, r);
            }
        }
        if (s.length === 1)
            return values[s] ?? 0;
        return 0;
    };
    return evalExpr(e);
}
export function deMorgan(andOr) {
    if (andOr === 'AND') {
        return { left: 'NOT(A AND B)', right: 'NOT(A) OR NOT(B)' };
    }
    return { left: 'NOT(A OR B)', right: 'NOT(A) AND NOT(B)' };
}
