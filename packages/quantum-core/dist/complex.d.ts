/** Complex number utilities for quantum computing simulations. */
export interface Complex {
    re: number;
    im: number;
}
export declare const C: {
    zero: () => Complex;
    one: () => Complex;
    i: () => Complex;
    fromPolar(r: number, phi: number): Complex;
    add(a: Complex, b: Complex): Complex;
    sub(a: Complex, b: Complex): Complex;
    mul(a: Complex, b: Complex): Complex;
    scale(s: number, a: Complex): Complex;
    conj(a: Complex): Complex;
    mag(a: Complex): number;
    mag2(a: Complex): number;
    phase(a: Complex): number;
    exp(iPhi: number): Complex;
    div(a: Complex, b: Complex): Complex;
    eq(a: Complex, b: Complex, eps?: number): boolean;
    toString(a: Complex, digits?: number): string;
};
