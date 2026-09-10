/** Classical computing utilities for Part I. */
export type Bit = 0 | 1;
export declare const LogicGates: {
    NOT: (a: Bit) => Bit;
    AND: (a: Bit, b: Bit) => Bit;
    OR: (a: Bit, b: Bit) => Bit;
    XOR: (a: Bit, b: Bit) => Bit;
    NAND: (a: Bit, b: Bit) => Bit;
    NOR: (a: Bit, b: Bit) => Bit;
};
export declare function binaryToDecimal(bits: string): number;
export declare function decimalToBinary(n: number, width?: number): string;
export declare function allBitStrings(n: number): string[];
export declare function halfAdder(a: Bit, b: Bit): {
    sum: Bit;
    carry: Bit;
};
export declare function fullAdder(a: Bit, b: Bit, cin: Bit): {
    sum: Bit;
    carry: Bit;
};
export declare function rippleCarryAdd(a: string, b: string): {
    sum: string;
    carries: Bit[];
};
export declare function toffoliClassical(a: Bit, b: Bit, c: Bit): [Bit, Bit, Bit];
export declare function majorityVote(bits: Bit[]): Bit;
export declare function parity(bits: Bit[]): Bit;
export type ComplexityFn = (n: number) => number;
export declare const Complexity: Record<string, ComplexityFn>;
export declare function simplifyBoolean(expr: string, values: Record<string, Bit>): Bit;
export declare function deMorgan(andOr: 'AND' | 'OR'): {
    left: string;
    right: string;
};
