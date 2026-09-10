/** Complex number utilities for quantum computing simulations. */

export interface Complex {
  re: number;
  im: number;
}

export const C = {
  zero: (): Complex => ({ re: 0, im: 0 }),
  one: (): Complex => ({ re: 1, im: 0 }),
  i: (): Complex => ({ re: 0, im: 1 }),

  fromPolar(r: number, phi: number): Complex {
    return { re: r * Math.cos(phi), im: r * Math.sin(phi) };
  },

  add(a: Complex, b: Complex): Complex {
    return { re: a.re + b.re, im: a.im + b.im };
  },

  sub(a: Complex, b: Complex): Complex {
    return { re: a.re - b.re, im: a.im - b.im };
  },

  mul(a: Complex, b: Complex): Complex {
    return {
      re: a.re * b.re - a.im * b.im,
      im: a.re * b.im + a.im * b.re,
    };
  },

  scale(s: number, a: Complex): Complex {
    return { re: s * a.re, im: s * a.im };
  },

  conj(a: Complex): Complex {
    return { re: a.re, im: -a.im };
  },

  mag(a: Complex): number {
    return Math.sqrt(a.re * a.re + a.im * a.im);
  },

  mag2(a: Complex): number {
    return a.re * a.re + a.im * a.im;
  },

  phase(a: Complex): number {
    return Math.atan2(a.im, a.re);
  },

  exp(iPhi: number): Complex {
    return { re: Math.cos(iPhi), im: Math.sin(iPhi) };
  },

  div(a: Complex, b: Complex): Complex {
    const denom = b.re * b.re + b.im * b.im;
    return {
      re: (a.re * b.re + a.im * b.im) / denom,
      im: (a.im * b.re - a.re * b.im) / denom,
    };
  },

  eq(a: Complex, b: Complex, eps = 1e-10): boolean {
    return Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
  },

  toString(a: Complex, digits = 4): string {
    const fmt = (x: number) => {
      const r = Math.round(x * 10 ** digits) / 10 ** digits;
      return Object.is(r, -0) ? '0' : String(r);
    };
    if (Math.abs(a.im) < 1e-12) return fmt(a.re);
    if (Math.abs(a.re) < 1e-12) return `${fmt(a.im)}i`;
    const sign = a.im >= 0 ? '+' : '-';
    return `${fmt(a.re)}${sign}${fmt(Math.abs(a.im))}i`;
  },
};
