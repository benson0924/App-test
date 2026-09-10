import { useChapterMeta, LearnSection } from '@/components/LocalizedContent';
import { useT } from '@/context/LocaleContext';
import type { ReactNode } from 'react';
import Checkpoint from '@/components/Checkpoint';
import Katex from '@/components/Math';

type Evidence = 'Established' | 'Peer-reviewed' | 'Industry claim' | 'Open question';

function Label({ type }: { type: Evidence }) {
  const colors: Record<Evidence, string> = {
    Established: 'var(--success)',
    'Peer-reviewed': 'var(--accent)',
    'Industry claim': 'var(--warning, #c9a227)',
    'Open question': 'var(--text-muted)',
  };
  return (
    <span className="tag" style={{ borderColor: colors[type], color: colors[type], marginRight: '0.5rem' }}>
      {type}
    </span>
  );
}

function Ev({ type, children }: { type: Evidence; children: ReactNode }) {
  return (
    <p>
      <Label type={type} />
      {children}
    </p>
  );
}

export default function ModernTopics() {
  const { tag, title, intro } = useChapterMeta('modern');
  const t = useT();
  return (
    <article>
      <h1>{title}</h1>
      <p>
        A research-informed snapshot of quantum computing as of <strong>September 2026</strong>.
        Claims are tagged by evidence strength so you can distinguish textbook physics from
        vendor roadmaps and genuinely open problems.
      </p>

      <LearnSection chapter="modern" sectionId="12.1" prev={{ title: "Shor's Algorithm", path: '/learn/shor' }}>
        <p>
          Physical qubits are implemented on several competing platforms. Each trades off coherence,
          gate speed, connectivity, fabrication complexity, and control overhead differently.
        </p>

        <h3>Superconducting transmon qubits</h3>
        <Ev type="Established">
          Transmon circuits on microwave resonators are the dominant cloud-accessible platform (IBM, Google,
          Rigetti, and others). Two-qubit gates via cross-resonance or tunable couplers; typical T₁ ~ 50–300 μs
          and T₂ ~ 30–200 μs on leading devices (order-of-magnitude, device-dependent).
        </Ev>
        <Ev type="Peer-reviewed">
          Random circuit sampling milestones and small logical-qubit demonstrations have been published on
          superconducting hardware; read primary papers for qubit counts, fidelities, and verification methods.
        </Ev>
        <Ev type="Industry claim">
          Roadmaps projecting millions of physical qubits by ~2030 should be treated as engineering targets,
          not demonstrated capabilities.
        </Ev>

        <h3>Trapped ions</h3>
        <Ev type="Established">
          Ions confined in Paul traps offer long coherence (T₂ &gt; 1 s in favorable conditions) and
          all-to-all connectivity via shared motional modes. Gate times are slower (~μs–ms) than superconducting.
        </Ev>
        <Ev type="Peer-reviewed">
          IonQ, Quantinuum, and academic labs report high-fidelity two-qubit gates and algorithm demonstrations
          on chains of tens of ions.
        </Ev>

        <h3>Neutral atoms (Rydberg arrays)</h3>
        <Ev type="Peer-reviewed">
          Atoms in optical tweezers, excited to Rydberg states for entangling interactions, scale to
          hundreds–thousands of qubits with flexible 2D geometry. Native multi-qubit gates and analog Hamiltonian
          simulation are strengths.
        </Ev>
        <Ev type="Open question">
          Whether neutral-atom platforms achieve fault-tolerant logical qubits with competitive overheads
          relative to surface-code superconducting designs remains active research.
        </Ev>

        <h3>Photonic qubits</h3>
        <Ev type="Established">
          Photons carry qubits in polarization or path encoding; room-temperature operation and natural
          networking are advantages. Probabilistic entangling gates (linear optics + post-selection) limit
          deterministic circuit depth without multiplexing.
        </Ev>
        <Ev type="Industry claim">
          Photonic vendors emphasize scalability via chip integration and cluster-state architectures;
          independent benchmarking against other platforms is still maturing.
        </Ev>


        <Checkpoint
          question="Does a higher physical qubit count automatically mean a more powerful quantum computer?"
          answer="no"
          hint="Consider error rates, connectivity, and whether qubits are logical or physical."
        />
      </LearnSection>

      <LearnSection chapter="modern" sectionId="12.2">
        <p>
          Fault-tolerant quantum computation requires <em>logical</em> qubits encoded with redundancy so
          errors can be detected and corrected faster than they accumulate.
        </p>
        <Ev type="Established">
          The surface code is a leading 2D topological stabilizer code with a well-studied error threshold
          around ~1% (physical error rate per gate/measurement, model-dependent).
        </Ev>
        <Katex display>{`|0\\rangle_L = \\prod_{p \\in \\text{stabilizers}} (I + s_p)/2^{n/2} \\quad \\text{(conceptual projection)}`}</Katex>
        <Ev type="Peer-reviewed">
          Repeated syndrome extraction on distance-3 and distance-5 surface codes, demonstrating break-even
          or below-threshold logical error rates in isolated experiments, has been reported through 2025–2026.
        </Ev>
        <Ev type="Established">
          Encoding one logical qubit requires many physical qubits (distance d code: ~2d² physical qubits
          for a planar surface code layout) plus ancillas for syndrome measurement.
        </Ev>
        <Ev type="Open question">
          Million-logical-qubit machines capable of cryptographically relevant Shor runs are not available
          in 2026; resource estimates still point to 10⁶–10⁷ physical qubits for RSA-2048 factoring under
          optimistic assumptions.
        </Ev>

      </LearnSection>

      <LearnSection chapter="modern" sectionId="12.3">
        <p>
          Real qubits interact with their environment. Open-system dynamics are modeled by completely positive
          trace-preserving (CPTP) maps — <em>quantum channels</em>.
        </p>
        <Ev type="Established">
          T₁ (energy relaxation time): average time for |1⟩ → |0⟩ decay. T₂ (dephasing time): coherence
          decay in superposition; T₂ ≤ 2T₁ always.
        </Ev>
        <Katex display>{`\\rho \\mapsto e^{-\\Gamma t}\\rho + (1-e^{-\\Gamma t})\\frac{I}{2} \\quad \\text{(depolarizing intuition)}`}</Katex>
        <Ev type="Established">
          Common error models: bit-flip (X), phase-flip (Z), depolarizing (random Pauli), amplitude damping,
          and phase damping. Each channel has a Kraus operator representation.
        </Ev>
        <Ev type="Peer-reviewed">
          Randomized benchmarking and gate set tomography characterize average gate error rates on hardware;
          reported fidelities of 99.5%–99.9% for single-qubit and 99%–99.9% for two-qubit gates on leading platforms.
        </Ev>


        <Checkpoint
          question="Can T2 be longer than 2 times T1?"
          answer="no"
          hint="Think about the relationship between energy relaxation and pure dephasing."
        />
      </LearnSection>

      <LearnSection chapter="modern" sectionId="12.4">
        <Ev type="Established">
          <strong>Error mitigation</strong> (zero-noise extrapolation, probabilistic error cancellation,
          symmetry verification, readout error mitigation) reduces <em>bias</em> in noisy expectation values
          without full fault tolerance.
        </Ev>
        <Ev type="Established">
          <strong>Error correction</strong> (surface codes, LDPC codes, etc.) uses redundancy and syndrome
          measurement to <em>protect</em> quantum information arbitrarily long — provided physical error rates
          are below threshold and sufficient overhead is paid.
        </Ev>
        <Ev type="Peer-reviewed">
          Mitigation techniques have enabled useful chemistry and optimization experiments on NISQ devices
          with modest circuit depths; cost grows exponentially with depth in worst cases.
        </Ev>
        <Ev type="Open question">
          Whether mitigation alone can scale to classically intractable problems without correction is unsettled;
          most experts expect correction is required for long, precise computations.
        </Ev>

        <table className="data-table">
          <thead>
            <tr><th>Feature</th><th>Mitigation</th><th>Correction</th></tr>
          </thead>
          <tbody>
            <tr><td>Goal</td><td>Better estimates from noisy runs</td><td>Protect logical qubits</td></tr>
            <tr><td>Overhead</td><td>Extra shots / circuit variants</td><td>Many physical qubits + ancillas</td></tr>
            <tr><td>Depth limit</td><td>Practical ceiling on NISQ</td><td>Threshold theorem (in principle unbounded)</td></tr>
          </tbody>
        </table>

        <Checkpoint
          question="Does zero-noise extrapolation create a logical qubit?"
          answer="no"
          hint="Mitigation post-processes measurement statistics; it does not encode redundancy."
        />
      </LearnSection>

      <LearnSection chapter="modern" sectionId="12.5">
        <Ev type="Established">
          Exact simulation of an n-qubit pure state requires storing 2ⁿ complex amplitudes — memory and
          time scale exponentially in n for generic circuits.
        </Ev>
        <Katex display>{`|\\psi\\rangle = \\sum_{x=0}^{2^n-1} c_x |x\\rangle, \\quad \\text{memory} = O(2^n)`}</Katex>
        <Ev type="Established">
          Clifford circuits (H, S, CNOT, Pauli measurements) simulate efficiently via the Gottesman–Knill
          theorem in O(n²) time — not all quantum advantage candidates are Clifford-only.
        </Ev>
        <Ev type="Peer-reviewed">
          Tensor-network and approximate methods extend classical reach for structured circuits, but
          random-circuit sampling beyond ~50 qubits (depth-dependent) remains challenging on classical supercomputers.
        </Ev>
        <Ev type="Industry claim">
          Claims of &quot;quantum supremacy&quot; or &quot;utility advantage&quot; must specify the classical comparison,
          verification method, and problem size — cross-check against independent classical simulations where published.
        </Ev>
      </LearnSection>

      <LearnSection chapter="modern" sectionId="12.6">
        <p>
          Before running Shor on RSA or large chemistry, practitioners estimate qubit count, gate count,
          wall-clock time, and error budget — often using the surface code as a reference architecture.
        </p>
        <Ev type="Established">
          Logical error rate ε_L scales as (p/p_th)^((d+1)/2) for code distance d near threshold p_th
          (simplified scaling intuition).
        </Ev>
        <Ev type="Peer-reviewed">
          Open-source tools (e.g., Azure Quantum Resource Estimator, various academic calculators) implement
          updated gate counts from algorithm papers plus code-cycle times from hardware assumptions.
        </Ev>
      </LearnSection>

      <LearnSection chapter="modern" sectionId="12.7">
        <Ev type="Established">
          Quantum networks distribute entanglement or secret keys between nodes. Components include quantum
          memories, repeaters, and quantum-classical interfaces.
        </Ev>
        <Ev type="Peer-reviewed">
          Entanglement distribution over metropolitan fiber (tens of km) and satellite links has been
          demonstrated; full quantum internet with fault-tolerant repeaters is not yet operational at scale.
        </Ev>
        <Ev type="Open question">
          Which architecture (trusted-node QKD vs. repeater-based entanglement swapping) dominates commercial
          deployment by 2030 remains unclear.
        </Ev>
        <Katex display>{`|\\Phi^+\\rangle_{AB} \\xrightarrow{\\text{swap}} |\\Phi^+\\rangle_{BC} \\quad \\text{(entanglement routing)}`}</Katex>
      </LearnSection>

      <LearnSection chapter="modern" sectionId="12.8">
        <Ev type="Established">
          Shor's algorithm breaks RSA and elliptic-curve cryptography on a sufficiently large fault-tolerant
          machine. Harvest-now-decrypt-later threats motivate migration regardless of current hardware size.
        </Ev>
        <Ev type="Peer-reviewed">
          NIST standardized post-quantum classical algorithms (ML-KEM, ML-DSA, SLH-DSA, 2024) — lattice-based
          and hash-based schemes designed to resist known quantum attacks.
        </Ev>
        <Ev type="Established">
          Post-quantum cryptography (PQC) runs on classical computers; it is separate from quantum key
          distribution (QKD), which uses quantum states for key agreement under specific trust models.
        </Ev>
        <Checkpoint
          question="Does deploying ML-KEM require a quantum computer?"
          answer="no"
          hint="PQC algorithms are classical cryptographic standards."
        />
      </LearnSection>

      <LearnSection chapter="modern" sectionId="12.9">
        <Ev type="Established">
          <strong>Qiskit</strong> (IBM): dominant open SDK, transpilation, simulators, cloud backends, pulse-level control.
        </Ev>
        <Ev type="Established">
          <strong>Cirq</strong> (Google): Python framework tuned for NISQ circuits and Google hardware.
        </Ev>
        <Ev type="Established">
          <strong>PennyLane</strong> (Xanadu): differentiable quantum programming, hybrid ML/quantum workflows.
        </Ev>
        <Ev type="Peer-reviewed">
          <strong>OpenQASM 3</strong>: interoperable circuit description language; adoption across vendors growing.
          QIR (LLVM-based) targets compiler toolchains.
        </Ev>
        <Ev type="Industry claim">
          Vendor-specific cloud pricing, queue times, and claimed &quot;quantum advantage&quot; for customer workloads
          should be validated on your own problem instances.
        </Ev>
      </LearnSection>

      <LearnSection chapter="modern" sectionId="12.10">
        <Ev type="Established">
          Threshold theorems prove that if physical gate error rates are below a constant threshold, arbitrary
          long quantum computation is possible with polylog overhead in qubits and time.
        </Ev>
        <Ev type="Peer-reviewed">
          Early logical qubit prototypes with repeated error correction cycles exist; break-even (logical &lt; physical
          error rate) has been achieved in specific demonstrations.
        </Ev>
        <Ev type="Industry claim">
          Timelines for &quot;fault-tolerant quantum computing by [year]&quot; are corporate forecasts, not established science.
        </Ev>
        <Ev type="Open question">
          Which code family (surface, color, LDPC, bosonic) and platform wins on total system cost remains undecided.
        </Ev>
      </LearnSection>

      <LearnSection chapter="modern" sectionId="12.11" next={{ title: 'Reference', path: '/reference' }}>
        <Ev type="Established">
          Different benchmarks measure different things: random circuit sampling (RCS), quantum approximate
          optimization (QAOA), variational quantum eigensolver (VQE), quantum machine learning, and bespoke
          industry workloads.
        </Ev>
        <Ev type="Peer-reviewed">
          Google's RCS experiments (2019, 2023+) show sampling from circuits hard to simulate classically for
          specific sizes — this is not general-purpose speedup on all NP-hard problems.
        </Ev>
        <Ev type="Industry claim">
          &quot;Quantum utility&quot; or &quot;advantage&quot; press releases often compare against unoptimized classical baselines;
          always ask: optimized classical competitor? Verified result? Problem relevance?
        </Ev>
        <Ev type="Open question">
          Which application domains (catalysis, optimization, ML, finance) will show durable quantum advantage
          at economically meaningful scales is unknown as of September 2026.
        </Ev>


        <Checkpoint
          question="Does random circuit sampling prove that quantum computers solve all NP problems efficiently?"
          answer="no"
          hint="RCS is a specific sampling task; BQP vs NP is still unknown."
        />
      </LearnSection>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '2rem' }}>
        Research cutoff: September 2026. Re-verify hardware and industry claims against peer-reviewed primary sources.
      </p>
    </article>
  );
}
