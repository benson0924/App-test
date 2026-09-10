import Section from '../../components/Section';
import Checkpoint from '../../components/Checkpoint';
import Expandable from '../../components/Expandable';

export default function ModernTopics() {
  return (
    <article>
      <h1>Modern Topics (2026)</h1>
      <p>
        A snapshot of the field — distinguishing <strong>established results</strong> from
        <strong> active research</strong> and <strong> vendor claims</strong> that may not yet be independently verified at scale.
      </p>

      <Section id="12.1" title="Hardware landscape" prev={{ title: "Shor's Algorithm", path: '/learn/shor' }}>
        <p><strong>Established:</strong> Superconducting, trapped-ion, photonic, neutral-atom, and spin qubit platforms all demonstrate multi-qubit programmable devices with varying connectivity and coherence times.</p>
        <p><strong>Active / evolving:</strong> Exact &quot;utility advantage&quot; for commercially relevant workloads remains case-by-case; published demonstrations should be read with problem-size and verification details.</p>
        <Expandable title="Reading vendor announcements">
          <p>Separate qubit counts, gate fidelities, and algorithmic results. Logical qubits require error correction overhead not always included in headline numbers.</p>
        </Expandable>
      </Section>

      <Section id="12.2" title="Surface codes &amp; logical qubits">
        <p><strong>Established:</strong> Surface codes are a leading 2D layout with well-studied thresholds; small logical qubit demonstrations with repeated syndrome extraction have been reported in peer-reviewed work.</p>
        <p><strong>Not yet established at scale:</strong> Million-logical-qubit machines capable of cryptographically relevant Shor runs — this remains a long-term engineering goal, not a 2026 commodity capability.</p>
      </Section>

      <Section id="12.3" title="Error mitigation (NISQ)">
        <p><strong>Established:</strong> Zero-noise extrapolation, probabilistic error cancellation, and symmetry verification reduce bias in noisy expectations — useful for small circuits.</p>
        <p><strong>Caveat:</strong> Mitigation is not fault tolerance; cost grows with circuit depth and does not provide arbitrary-length computation guarantees.</p>
        <Checkpoint question="Does zero-noise extrapolation create a logical qubit?" answer="no" />
      </Section>

      <Section id="12.4" title="Software ecosystem">
        <p><strong>Established:</strong> Qiskit, Cirq, PennyLane, and others provide circuit construction, simulators, and cloud backends. Interoperability via OpenQASM / QIR is improving.</p>
        <Expandable title="This textbook">
          <p>Our <code>quantum-core</code> package offers pedagogical simulation in-browser — not a replacement for production SDKs.</p>
        </Expandable>
      </Section>

      <Section id="12.5" title="Fault tolerance status">
        <p><strong>Established theory:</strong> Threshold theorems show fault-tolerant quantum computation is possible if physical error rates are below a constant threshold and overhead is paid in qubits and time.</p>
        <p><strong>2026 reality:</strong> The community is progressing through early logical qubit prototypes; timelines for fully fault-tolerant machines are uncertain and should not be treated as settled predictions.</p>
      </Section>
    </article>
  );
}
