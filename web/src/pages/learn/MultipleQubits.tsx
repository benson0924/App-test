import Section from '../../components/Section';
import Math from '../../components/Math';
import Checkpoint from '../../components/Checkpoint';
import WorkedExample from '../../components/WorkedExample';
import Expandable from '../../components/Expandable';
import { Link } from 'react-router-dom';

export default function MultipleQubits() {
  return (
    <article>
      <h1>Multiple Qubits</h1>
      <p>Chapter 4 — composite systems, product states, and multi-qubit gates.</p>

      <Section id="4.1" title="4.1 Composite systems" prev={{ title: 'Linear Algebra', path: '/learn/linear-algebra' }}>
        <Math display>{`|\\psi\\rangle_{AB} = \\sum_{x,y} c_{xy}|x\\rangle|y\\rangle, \\quad x,y \\in \\{0,1\\}`}</Math>
        <p>An n-qubit register has dimension 2ⁿ — exponential in qubit count for the state description.</p>
      </Section>

      <Section id="4.2" title="4.2 Product vs entangled states">
        <Math display>{`|\\psi\\rangle = |a\\rangle \\otimes |b\\rangle \\quad \\text{(product)}`}</Math>
        <Checkpoint question="Is |Φ⁺⟩ = (|00⟩+|11⟩)/√2 a product state?" answer="no" hint="Try factoring." />
        <p><Link to="/playground/entanglement">Entanglement lab →</Link></p>
      </Section>

      <Section id="4.3" title="4.3 Bell states">
        <WorkedExample title="Create |Φ⁺⟩ with H and CNOT" steps={[
          { label: 'Start from |00⟩', latex: '|00\\rangle' },
          { label: 'Apply H on qubit 0', latex: '\\frac{|00\\rangle + |10\\rangle}{\\sqrt{2}}' },
          { label: 'CNOT₀₁ entangles', latex: '\\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}} = |\\Phi^+\\rangle' },
        ]} />
        <p><Link to="/playground/bell-states">Bell State Generator →</Link></p>
      </Section>

      <Section id="4.4" title="4.4 Multi-qubit gates">
        <p>CNOT flips the target when control is |1⟩. SWAP exchanges qubits. Toffoli is universal for classical reversible logic.</p>
        <Expandable title="Gate ordering matters">
          <p>[H₀, CNOT₀₁] ≠ [CNOT₀₁, H₀] in general — circuit order is part of the program semantics.</p>
        </Expandable>
      </Section>

      <Section id="4.5" title="4.5 Partial measurement">
        <p>Measuring one qubit collapses the joint state; remaining qubits may become correlated with the outcome.</p>
        <Checkpoint question="After measuring first qubit of |Φ⁺⟩, what happens to the second?" answer="perfectly correlated" />
      </Section>

      <Section id="4.6" title="4.6 Schmidt decomposition" next={{ title: 'Quantum Circuits', path: '/learn/circuits' }}>
        <Math display>{`|\\psi\\rangle = \\sum_i \\lambda_i |i_A\\rangle|i_B\\rangle, \\quad \\lambda_i \\geq 0`}</Math>
        <p>Schmidt rank 1 iff the state is product; rank &gt; 1 indicates entanglement.</p>
      </Section>
    </article>
  );
}
