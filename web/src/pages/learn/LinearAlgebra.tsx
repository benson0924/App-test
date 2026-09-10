import Section from '../../components/Section';
import Katex from '../../components/Math';
import Checkpoint from '../../components/Checkpoint';
import WorkedExample from '../../components/WorkedExample';
import Expandable from '../../components/Expandable';
import { Link } from 'react-router-dom';

export default function LinearAlgebra() {
  return (
    <article>
      <h1>Linear Algebra for Quantum Computing</h1>
      <p>Chapter 3 — vectors, matrices, and the rules that govern quantum states and gates.</p>

      <Section id="3.1" title="3.1 Complex vectors" prev={{ title: 'One Qubit', path: '/learn/one-qubit' }} next={{ title: '3.2 Inner products', path: '#3.2' }}>
        <p>Quantum states live in complex Hilbert spaces. A single-qubit pure state is a unit vector in ℂ².</p>
        <Katex display>{`|\\psi\\rangle = \\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix}, \\quad \\alpha, \\beta \\in \\mathbb{C}`}</Katex>
        <Checkpoint question="What constraint makes |ψ⟩ a valid quantum state?" answer="norm equals 1" hint="Think about total probability." />
        <Expandable title="Why complex numbers?">
          <p>Complex amplitudes enable interference — the phase relationship between terms affects measurement probabilities after gates combine paths.</p>
        </Expandable>
      </Section>

      <Section id="3.2" title="3.2 Inner products &amp; brakets">
        <Katex display>{`\\langle\\phi|\\psi\\rangle = \\sum_i \\phi_i^* \\psi_i, \\quad \\langle\\psi|\\psi\\rangle = 1`}</Katex>
        <WorkedExample title="Inner product of |0⟩ and |+⟩" steps={[
          { label: '|0⟩ = (1, 0)ᵀ and |+⟩ = (1/√2, 1/√2)ᵀ', latex: '\\langle 0|+\\rangle = \\frac{1}{\\sqrt{2}}' },
          { label: 'The states are not orthogonal — overlap is non-zero.' },
        ]} />
      </Section>

      <Section id="3.3" title="3.3 Matrices as linear operators">
        <p>Gates are unitary matrices: U†U = I. They preserve norms and are reversible.</p>
        <Katex display>{`U^\\dagger U = I \\iff \\text{U is unitary}`}</Katex>
        <p><Link to="/playground/unitary-checker">Try the Unitary Checker lab →</Link></p>
      </Section>

      <Section id="3.4" title="3.4 Tensor products">
        <Katex display>{`|\\psi\\rangle \\otimes |\\phi\\rangle \\in \\mathcal{H}_A \\otimes \\mathcal{H}_B`}</Katex>
        <Checkpoint question="Dimension of two-qubit space built from two qubits?" answer="4" />
        <p><Link to="/playground/tensor-product">Tensor Product lab →</Link></p>
      </Section>

      <Section id="3.5" title="3.5 Eigenvalues &amp; phases">
        <p>Many quantum algorithms encode information in eigenphases. The Z gate has eigenstates |0⟩, |1⟩ with eigenvalues +1, −1.</p>
        <Expandable title="Spectral theorem (sketch)">
          <p>Normal operators admit an orthonormal eigenbasis. Hermitian observables have real eigenvalues; unitaries have phases on the unit circle.</p>
        </Expandable>
      </Section>

      <Section id="3.6" title="3.6 Projectors &amp; measurement" next={{ title: 'Multiple Qubits', path: '/learn/multiple-qubits' }}>
        <Katex display>{`P_0 = |0\\rangle\\langle 0|, \\quad P_1 = |1\\rangle\\langle 1|, \\quad P_0 + P_1 = I`}</Katex>
        <Checkpoint question="Probability of outcome 0 for state |ψ⟩?" answer="|⟨0|ψ⟩|²" />
      </Section>
    </article>
  );
}
