import { useChapterMeta, LearnSection } from '@/components/LocalizedContent';
import { useT } from '@/context/LocaleContext';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Katex from '@/components/Math';
import { chshExperiment, runBB84 } from 'quantum-core';

function LabLink({ id, title }: { id: string; title: string }) {
  return (
    <p style={{ marginTop: '0.75rem' }}>
      <Link to={`/playground/${id}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
        Open full lab: {title} →
      </Link>
    </p>
  );
}

function CHSHDemo() {
  const [trials, setTrials] = useState(500);
  const result = useMemo(() => {
    const a = 0;
    const ap = Math.PI / 4;
    const b = Math.PI / 8;
    const bp = -Math.PI / 8;
    return chshExperiment(a, b, ap, bp, trials);
  }, [trials]);

  const tsirelson = 2 * Math.sqrt(2);

  return (
    <div className="lab-panel">
      <label>Simulation trials: {trials}</label>
      <input type="range" min={100} max={5000} step={100} value={trials} onChange={(e) => setTrials(Number(e.target.value))} />
      <Katex display>{`S = E(a,b) + E(a,b') + E(a',b) - E(a',b')`}</Katex>
      <table className="data-table" style={{ maxWidth: '400px' }}>
        <tbody>
          {Object.entries(result.E).map(([k, v]) => (
            <tr key={k}><td>{k}</td><td>{v.toFixed(3)}</td></tr>
          ))}
          <tr><td><strong>S</strong></td><td><strong>{result.S.toFixed(3)}</strong></td></tr>
        </tbody>
      </table>
      <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>
        Classical bound: |S| ≤ 2. Quantum (Tsirelson): |S| ≤ 2√2 ≈ {tsirelson.toFixed(3)}.
        Simulated S ≈ {result.S.toFixed(2)}.
      </p>
    </div>
  );
}

function SuperdenseTable() {
  const encodings = [
    { bits: '00', gate: 'I', latex: '|\\Phi^+\\rangle' },
    { bits: '01', gate: 'X', latex: '|\\Psi^+\\rangle' },
    { bits: '10', gate: 'Z', latex: '|\\Phi^-\\rangle' },
    { bits: '11', gate: 'XZ (= iY)', latex: '|\\Psi^-\\rangle' },
  ];

  return (
    <table className="data-table" style={{ maxWidth: '520px' }}>
      <thead>
        <tr><th>Classical bits</th><th>Alice&apos;s gate</th><th>Shared state becomes</th></tr>
      </thead>
      <tbody>
        {encodings.map((row) => (
          <tr key={row.bits}>
            <td><code>{row.bits}</code></td>
            <td>{row.gate}</td>
            <td><Katex>{row.latex}</Katex></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TeleportCorrectionTable() {
  const rows = [
    { m1: 0, m2: 0, correction: 'I', note: 'No change needed' },
    { m1: 0, m2: 1, correction: 'X', note: 'Bit flip' },
    { m1: 1, m2: 0, correction: 'Z', note: 'Phase flip' },
    { m1: 1, m2: 1, correction: 'ZX (= iY)', note: 'Both flips' },
  ];

  return (
    <table className="data-table" style={{ maxWidth: '560px' }}>
      <thead>
        <tr><th>m₁ (Alice)</th><th>m₂ (Alice)</th><th>Bob applies</th><th>Effect</th></tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={`${r.m1}${r.m2}`}>
            <td>{r.m1}</td>
            <td>{r.m2}</td>
            <td><Katex>{r.correction}</Katex></td>
            <td>{r.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function BB84Demo() {
  const [numQubits, setNumQubits] = useState(40);
  const [eve, setEve] = useState(false);
  const [seed, setSeed] = useState(0);

  const result = useMemo(() => {
    void seed;
    return runBB84(numQubits, eve);
  }, [numQubits, eve, seed]);

  return (
    <div className="lab-panel">
      <label>Qubits per run: {numQubits}</label>
      <input type="range" min={20} max={100} step={10} value={numQubits} onChange={(e) => setNumQubits(Number(e.target.value))} />
      <div className="btn-group" style={{ marginTop: '0.75rem' }}>
        <button className={`btn ${!eve ? 'btn-primary' : ''}`} onClick={() => { setEve(false); setSeed((s) => s + 1); }}>
          No eavesdropper
        </button>
        <button className={`btn ${eve ? 'btn-primary' : ''}`} onClick={() => { setEve(true); setSeed((s) => s + 1); }}>
          Eve intercepts
        </button>
        <button className="btn" onClick={() => setSeed((s) => s + 1)}>Re-run</button>
      </div>
      <p>
        Sifted key length: <strong>{result.siftedKey.length}</strong> bits (≈ half of {numQubits} — matching bases).
        Error rate on sifted bits: <strong>{(result.errorRate * 100).toFixed(1)}%</strong>
        {eve && result.errorRate > 0.1 && ' — elevated, Eve detected!'}
      </p>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 0 }}>
        Eve measuring in a random basis disturbs states when her basis ≠ Alice&apos;s, introducing ~25% errors on sifted key.
      </p>
    </div>
  );
}

export default function Protocols() {
  const { tag, title, intro } = useChapterMeta('protocols');
  const t = useT();
  return (
    <article>
      <h1>{title}</h1>
      <p>
        Entanglement and quantum channels enable communication primitives impossible classically —
        but never faster-than-light signaling. This chapter covers EPR paradox and hidden variables,
        the CHSH test, superdense coding, teleportation, and BB84 key distribution.
      </p>

      <LearnSection chapter="protocols" sectionId="7.1" prev={{ title: 'Entanglement', path: '/learn/entanglement' }}
        widgets={<>
          <Katex display>{`|\\Psi^{-}\\rangle = \\frac{1}{\\sqrt{2}}(|01\\rangle - |10\\rangle)`}</Katex>
        </>}
      >
        <p>
                  The Einstein–Podolsky–Rosen (EPR) argument (1935) questioned whether quantum mechanics is complete.
                  Consider the singlet state shared between Alice and Bob:
                </p>
        <p>
                  Measuring Alice&apos;s qubit in the Z basis instantly determines Bob&apos;s outcome (anti-correlated).
                  EPR asked: could pre-existing <strong>local hidden variables</strong> (LHV) explain these correlations
                  without &quot;spooky action at a distance&quot;?
                </p>
      </LearnSection>

      <LearnSection chapter="protocols" sectionId="7.2"
        widgets={<>
          <Katex display>{`S = E(a,b) + E(a,b') + E(a',b) - E(a',b')`}</Katex>
          <Katex display>{`|S| \\leq 2\\sqrt{2} \\approx 2.828`}</Katex>
          <CHSHDemo />
          <LabLink id="chsh" title="Bell/CHSH Experiment" />
        </>}
      >
        <p>
                  Bell (1964) and CHSH (1969) showed that LHV models constrain correlation functions. Define
                  the CHSH parameter:
                </p>
        <p>
                  Any local hidden variable theory satisfies <Katex>{`|S| \\leq 2`}</Katex>. Quantum mechanics
                  can violate this bound — the maximum quantum value is the <strong>Tsirelson bound</strong>:
                </p>
        <p>
                  For a singlet state with optimal angles (a = 0, a&apos; = π/4, b = π/8, b&apos; = −π/8),
                  quantum mechanics predicts S = 2√2 — maximal violation.
                </p>
      </LearnSection>

      <LearnSection chapter="protocols" sectionId="7.3"
        widgets={<>
          <h3>Encoding table</h3>
          <SuperdenseTable />
          <LabLink id="superdense" title="Superdense Coding" />
        </>}
      >
        <p>
                  Superdense coding (Bennett &amp; Wiesner, 1992) transmits <strong>two classical bits</strong> by
                  sending <strong>one qubit</strong>, given a pre-shared ebit (entangled bit).
                </p>
        <p>
                  The protocol consumes one ebit and one qubit transmission to send two bits — doubling classical
                  channel capacity in this specific sense. Without pre-shared entanglement, sending two bits requires
                  two qubits (each qubit carries at most one bit when measured in a fixed basis).
                </p>
      </LearnSection>

      <LearnSection chapter="protocols" sectionId="7.4"
        widgets={<>
          <Katex display>{`|\\psi\\rangle_A \\otimes |\\Phi^+\\rangle_{BC} \\xrightarrow{\\text{Bell measure}} \\xrightarrow{\\text{2 classical bits}} |\\psi\\rangle_B`}</Katex>
          <h3>Correction table</h3>
          <TeleportCorrectionTable />
          <LabLink id="teleportation" title="Quantum Teleportation" />
        </>}
      >
        <p>
                  Teleportation (Bennett et al., 1993) transfers an unknown qubit state |ψ⟩ from Alice to Bob using
                  one ebit and <strong>two classical bits</strong> — without physically moving the original particle
                  and without cloning.
                </p>
      </LearnSection>

      <LearnSection chapter="protocols" sectionId="7.5" next={{ title: 'Quantum Algorithms', path: '/learn/algorithms' }}
        widgets={<>
          <h3>Basis encoding</h3>
          <table className="data-table" style={{ maxWidth: '360px' }}>
                    <thead>
                      <tr><th>Bit</th><th>Z basis</th><th>X basis</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>0</td><td>|0⟩</td><td>|+⟩</td></tr>
                      <tr><td>1</td><td>|1⟩</td><td>|−⟩</td></tr>
                    </tbody>
                  </table>
          <BB84Demo />
          <LabLink id="bb84" title="BB84 Simulator" />
        </>}
      >
        <p>
                  BB84 (Bennett &amp; Brassard, 1984) allows Alice and Bob to establish a shared secret key
                  with information-theoretic security against passive eavesdropping — detecting Eve via elevated
                  error rates.
                </p>
      </LearnSection>
    </article>
  );
}
