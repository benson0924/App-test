import Katex from '../../components/Math';

export default function FormulaSheetPage() {
  return (
    <article>
      <h1>Formula Sheet</h1>

      <section className="card">
        <h2>States &amp; measurement</h2>
        <Katex display>{`|\\psi\\rangle = \\sum_i c_i |i\\rangle, \\quad \\sum_i |c_i|^2 = 1`}</Katex>
        <Katex display>{`P(i) = |\\langle i|\\psi\\rangle|^2`}</Katex>
      </section>

      <section className="card">
        <h2>Multi-qubit</h2>
        <Katex display>{`|\\psi\\rangle_{AB} = \\sum_{x,y} c_{xy}|x\\rangle|y\\rangle`}</Katex>
        <Katex display>{`|\\Phi^+\\rangle = \\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}}`}</Katex>
      </section>

      <section className="card">
        <h2>QFT</h2>
        <Katex display>{`\\text{QFT}|x\\rangle = \\frac{1}{\\sqrt{N}}\\sum_k e^{2\\pi i xk/N}|k\\rangle`}</Katex>
      </section>

      <section className="card">
        <h2>Algorithms</h2>
        <Katex display>{`\\text{Grover: } O(\\sqrt{N}) \\text{ queries}`}</Katex>
        <Katex display>{`S = E(a,b)+E(a,b')+E(a',b)-E(a',b') \\leq 2`}</Katex>
      </section>

      <section className="card">
        <h2>Error correction</h2>
        <Katex display>{`|0\\rangle_L = |000\\rangle, \\quad |1\\rangle_L = |111\\rangle`}</Katex>
      </section>
    </article>
  );
}
