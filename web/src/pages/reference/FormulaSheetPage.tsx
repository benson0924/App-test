import Math from '../../components/Math';

export default function FormulaSheetPage() {
  return (
    <article>
      <h1>Formula Sheet</h1>

      <section className="card">
        <h2>States &amp; measurement</h2>
        <Math display>{`|\\psi\\rangle = \\sum_i c_i |i\\rangle, \\quad \\sum_i |c_i|^2 = 1`}</Math>
        <Math display>{`P(i) = |\\langle i|\\psi\\rangle|^2`}</Math>
      </section>

      <section className="card">
        <h2>Multi-qubit</h2>
        <Math display>{`|\\psi\\rangle_{AB} = \\sum_{x,y} c_{xy}|x\\rangle|y\\rangle`}</Math>
        <Math display>{`|\\Phi^+\\rangle = \\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}}`}</Math>
      </section>

      <section className="card">
        <h2>QFT</h2>
        <Math display>{`\\text{QFT}|x\\rangle = \\frac{1}{\\sqrt{N}}\\sum_k e^{2\\pi i xk/N}|k\\rangle`}</Math>
      </section>

      <section className="card">
        <h2>Algorithms</h2>
        <Math display>{`\\text{Grover: } O(\\sqrt{N}) \\text{ queries}`}</Math>
        <Math display>{`S = E(a,b)+E(a,b')+E(a',b)-E(a',b') \\leq 2`}</Math>
      </section>

      <section className="card">
        <h2>Error correction</h2>
        <Math display>{`|0\\rangle_L = |000\\rangle, \\quad |1\\rangle_L = |111\\rangle`}</Math>
      </section>
    </article>
  );
}
