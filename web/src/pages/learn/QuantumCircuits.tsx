import Section from '../../components/Section';
import Math from '../../components/Math';
import Checkpoint from '../../components/Checkpoint';
import WorkedExample from '../../components/WorkedExample';
import Expandable from '../../components/Expandable';
import { Link } from 'react-router-dom';

export default function QuantumCircuits() {
  return (
    <article>
      <h1>Quantum Circuits</h1>
      <p>The circuit model — qubit wires, gates, measurements, and simulation.</p>

      <Section id="5.0" title="Circuit model" prev={{ title: 'Multiple Qubits', path: '/learn/multiple-qubits' }}>
        <p>A quantum circuit applies unitary gates left-to-right (or time-advancing), then optional measurements.</p>
        <Math display>{`|\\psi_{\\text{out}}\\rangle = U_k \\cdots U_2 U_1 |\\psi_{\\text{in}}\\rangle`}</Math>
        <p><Link to="/playground/circuit-builder">Open Circuit Builder →</Link></p>
      </Section>

      <Section id="5.1" title="Gate set &amp; universality">
        <p>{`{H, T, CNOT}`} is a common universal set; any unitary can be approximated to arbitrary precision.</p>
        <Expandable title="Solovay–Kitaev (informal)">
          <p>Finite gate sets generating a dense subgroup of SU(2ⁿ) allow efficient approximation of arbitrary gates.</p>
        </Expandable>
      </Section>

      <Section id="5.2" title="Circuit depth &amp; width">
        <Checkpoint question="What grows exponentially with qubit count n?" answer="state vector dimension" hint="Hilbert space size." />
        <WorkedExample title="Depth of Bell preparation" steps={[
          { label: 'H on qubit 0 — layer 1' },
          { label: 'CNOT — layer 2 (can overlap with other qubits)' },
          { label: 'Total depth = 2 for this 2-qubit circuit.' },
        ]} />
      </Section>

      <Section id="5.3" title="Measurement &amp; classical control">
        <p>Mid-circuit measurement feeds classical bits that can condition later gates (feed-forward), enabling adaptive algorithms.</p>
      </Section>

      <Section id="5.4" title="Simulation vs hardware" next={{ title: 'Error Correction', path: '/learn/error-correction' }}>
        <p>This textbook simulates ideal unitary evolution. Real devices add noise, calibration drift, and connectivity constraints.</p>
        <Checkpoint question="Ideal simulators track what object?" answer="statevector" />
      </Section>
    </article>
  );
}
