import type { ReactNode } from 'react';
import Katex from '@/components/Math';
import { useT } from '@/context/LocaleContext';

function FormulaBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function FormulaSheetPage() {
  const t = useT();
  return (
    <article>
      <h1>{t('reference.formulas.title')}</h1>
      <p>{t('reference.formulas.intro')}</p>

      <FormulaBlock title={t('reference.formulas.singleQubit')}>
        <Katex display>{`|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle, \\quad |\\alpha|^2 + |\\beta|^2 = 1`}</Katex>
        <Katex display>{`|\\psi\\rangle = \\cos\\frac{\\theta}{2}|0\\rangle + e^{i\\phi}\\sin\\frac{\\theta}{2}|1\\rangle \\quad \\text{(Bloch)}`}</Katex>
        <Katex display>{`\\text{Bloch: } \\vec{r} = (\\sin\\theta\\cos\\phi, \\sin\\theta\\sin\\phi, \\cos\\theta)`}</Katex>
      </FormulaBlock>

      <FormulaBlock title={t('reference.formulas.measurement')}>
        <Katex display>{`P(i) = |\\langle i|\\psi\\rangle|^2 \\quad \\text{(Born rule)}`}</Katex>
        <Katex display>{`\\langle A \\rangle = \\langle\\psi|A|\\psi\\rangle`}</Katex>
        <Katex display>{`\\text{Post-measurement: } |\\psi\\rangle \\mapsto \\frac{P_i|\\psi\\rangle}{\\|P_i|\\psi\\rangle\\|}`}</Katex>
      </FormulaBlock>

      <FormulaBlock title={t('reference.formulas.linearAlgebra')}>
        <Katex display>{`U^\\dagger U = I \\quad \\text{(unitary)}`}</Katex>
        <Katex display>{`A = A^\\dagger \\quad \\text{(Hermitian observables)}`}</Katex>
        <Katex display>{`\\langle\\phi|\\psi\\rangle = \\sum_i \\phi_i^* \\psi_i`}</Katex>
        <Katex display>{`\\|v\\| = \\sqrt{\\langle v|v\\rangle}`}</Katex>
      </FormulaBlock>

      <FormulaBlock title={t('reference.formulas.multiQubit')}>
        <Katex display>{`|\\psi\\rangle_{AB} = \\sum_{x,y} c_{xy}|x\\rangle|y\\rangle`}</Katex>
        <Katex display>{`|\\psi\\rangle = |a\\rangle \\otimes |b\\rangle \\quad \\text{(product state)}`}</Katex>
        <Katex display>{`\\dim(\\mathcal{H}^{\\otimes n}) = 2^n`}</Katex>
      </FormulaBlock>

      <FormulaBlock title={t('reference.formulas.bell')}>
        <Katex display>{`|\\Phi^+\\rangle = \\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}}`}</Katex>
        <Katex display>{`|\\Phi^-\\rangle = \\frac{|00\\rangle - |11\\rangle}{\\sqrt{2}}, \\quad |\\Psi^+\\rangle = \\frac{|01\\rangle + |10\\rangle}{\\sqrt{2}}, \\quad |\\Psi^-\\rangle = \\frac{|01\\rangle - |10\\rangle}{\\sqrt{2}}`}</Katex>
      </FormulaBlock>

      <FormulaBlock title={t('reference.formulas.singleGates')}>
        <Katex display>{`X = \\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}, \\quad Y = \\begin{bmatrix}0&-i\\\\i&0\\end{bmatrix}, \\quad Z = \\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}`}</Katex>
        <Katex display>{`H = \\frac{1}{\\sqrt{2}}\\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}, \\quad S = \\begin{bmatrix}1&0\\\\0&i\\end{bmatrix}, \\quad T = \\begin{bmatrix}1&0\\\\0&e^{i\\pi/4}\\end{bmatrix}`}</Katex>
        <Katex display>{`R_x(\\theta) = e^{-i\\theta X/2}, \\quad R_y(\\theta) = e^{-i\\theta Y/2}, \\quad R_z(\\theta) = e^{-i\\theta Z/2}`}</Katex>
        <Katex display>{`HXH = Z, \\quad HZH = X, \\quad H^2 = I`}</Katex>
      </FormulaBlock>

      <FormulaBlock title={t('reference.formulas.multiGates')}>
        <Katex display>{`\\text{CNOT}|a,b\\rangle = |a, b \\oplus a\\rangle`}</Katex>
        <Katex display>{`\\text{CZ} = \\text{diag}(1,1,1,-1)`}</Katex>
        <Katex display>{`\\text{SWAP} = \\text{CNOT}_{12}\\,\\text{CNOT}_{21}\\,\\text{CNOT}_{12}`}</Katex>
      </FormulaBlock>

      <FormulaBlock title={t('reference.formulas.entanglementChsh')}>
        <Katex display>{`S = E(a,b) + E(a,b') + E(a',b) - E(a',b')`}</Katex>
        <Katex display>{`|S| \\leq 2 \\text{ (classical)}, \\quad |S| \\leq 2\\sqrt{2} \\text{ (quantum)}`}</Katex>
        <Katex display>{`F(\\rho, \\sigma) = \\left(\\mathrm{Tr}\\sqrt{\\sqrt{\\rho}\\sigma\\sqrt{\\rho}}\\right)^2`}</Katex>
      </FormulaBlock>

      <FormulaBlock title={t('reference.formulas.qft')}>
        <Katex display>{`\\mathrm{QFT}|x\\rangle = \\frac{1}{\\sqrt{N}}\\sum_{k=0}^{N-1} e^{2\\pi i xk/N}|k\\rangle`}</Katex>
        <Katex display>{`\\mathrm{QFT}|j\\rangle = \\frac{1}{\\sqrt{2^n}}\\sum_{k=0}^{2^n-1} e^{2\\pi i jk/2^n}|k\\rangle`}</Katex>
      </FormulaBlock>

      <FormulaBlock title={t('reference.formulas.grover')}>
        <Katex display>{`O_w = I - 2|w\\rangle\\langle w| \\quad \\text{(oracle reflection)}`}</Katex>
        <Katex display>{`D = 2|s\\rangle\\langle s| - I \\quad \\text{(diffusion about uniform } |s\\rangle)`}</Katex>
        <Katex display>{`\\text{Queries: } O(\\sqrt{N}) \\quad \\text{for } N \\text{ items}`}</Katex>
      </FormulaBlock>

      <FormulaBlock title={t('reference.formulas.shor')}>
        <Katex display>{`a^r \\equiv 1 \\pmod{N} \\quad \\text{(period } r \\text{ of modular exponentiation)}`}</Katex>
        <Katex display>{`\\gcd(a^{r/2} \\pm 1, N) \\quad \\text{(factors when } r \\text{ even)}`}</Katex>
      </FormulaBlock>

      <FormulaBlock title={t('reference.formulas.phaseEst')}>
        <Katex display>{`|\\psi\\rangle = \\sum_j c_j |j\\rangle, \\quad U|j\\rangle = e^{2\\pi i \\phi j}|j\\rangle`}</Katex>
        <Katex display>{`\\text{Estimate } \\phi \\text{ to } t \\text{ bits using } t \\text{ control qubits}`}</Katex>
      </FormulaBlock>

      <FormulaBlock title={t('reference.formulas.errorCorrection')}>
        <Katex display>{`|0\\rangle_L = |000\\rangle, \\quad |1\\rangle_L = |111\\rangle \\quad \\text{(3-qubit bit-flip code)}`}</Katex>
        <Katex display>{`S_1 = Z_0 Z_1, \\quad S_2 = Z_1 Z_2 \\quad \\text{(syndrome generators)}`}</Katex>
        <Katex display>{`\\epsilon_L \\sim \\left(\\frac{p}{p_{\\text{th}}}\\right)^{(d+1)/2} \\quad \\text{(surface code scaling intuition)}`}</Katex>
      </FormulaBlock>

      <FormulaBlock title={t('reference.formulas.noise')}>
        <Katex display>{`T_2 \\leq 2T_1`}</Katex>
        <Katex display>{`\\mathcal{E}(\\rho) = \\sum_k E_k \\rho E_k^\\dagger, \\quad \\sum_k E_k^\\dagger E_k = I \\quad \\text{(Kraus)}`}</Katex>
        <Katex display>{`\\rho \\mapsto (1-p)\\rho + \\frac{p}{2}(X\\rho X + Y\\rho Y + Z\\rho Z) \\quad \\text{(depolarizing)}`}</Katex>
      </FormulaBlock>

      <FormulaBlock title={t('reference.formulas.complexity')}>
        <Katex display>{`\\text{BQP} \\subseteq \\text{PSPACE}`}</Katex>
        <Katex display>{`\\text{P} \\subseteq \\text{BQP} \\subseteq \\text{NP}? \\quad \\text{(NP relation unknown)}`}</Katex>
      </FormulaBlock>

      <FormulaBlock title={t('reference.formulas.classical')}>
        <Katex display>{`a \\oplus b = (a + b) \\mod 2`}</Katex>
        <Katex display>{`\\text{Toffoli: } |a,b,c\\rangle \\mapsto |a,b, c \\oplus (a \\land b)\\rangle`}</Katex>
      </FormulaBlock>
    </article>
  );
}
