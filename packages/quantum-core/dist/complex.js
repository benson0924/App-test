/** Complex number utilities for quantum computing simulations. */
export const C = {
    zero: () => ({ re: 0, im: 0 }),
    one: () => ({ re: 1, im: 0 }),
    i: () => ({ re: 0, im: 1 }),
    fromPolar(r, phi) {
        return { re: r * Math.cos(phi), im: r * Math.sin(phi) };
    },
    add(a, b) {
        return { re: a.re + b.re, im: a.im + b.im };
    },
    sub(a, b) {
        return { re: a.re - b.re, im: a.im - b.im };
    },
    mul(a, b) {
        return {
            re: a.re * b.re - a.im * b.im,
            im: a.re * b.im + a.im * b.re,
        };
    },
    scale(s, a) {
        return { re: s * a.re, im: s * a.im };
    },
    conj(a) {
        return { re: a.re, im: -a.im };
    },
    mag(a) {
        return Math.sqrt(a.re * a.re + a.im * a.im);
    },
    mag2(a) {
        return a.re * a.re + a.im * a.im;
    },
    phase(a) {
        return Math.atan2(a.im, a.re);
    },
    exp(iPhi) {
        return { re: Math.cos(iPhi), im: Math.sin(iPhi) };
    },
    div(a, b) {
        const denom = b.re * b.re + b.im * b.im;
        return {
            re: (a.re * b.re + a.im * b.im) / denom,
            im: (a.im * b.re - a.re * b.im) / denom,
        };
    },
    eq(a, b, eps = 1e-10) {
        return Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
    },
    toString(a, digits = 4) {
        const fmt = (x) => {
            const r = Math.round(x * 10 ** digits) / 10 ** digits;
            return Object.is(r, -0) ? '0' : String(r);
        };
        if (Math.abs(a.im) < 1e-12)
            return fmt(a.re);
        if (Math.abs(a.re) < 1e-12)
            return `${fmt(a.im)}i`;
        const sign = a.im >= 0 ? '+' : '-';
        return `${fmt(a.re)}${sign}${fmt(Math.abs(a.im))}i`;
    },
};
