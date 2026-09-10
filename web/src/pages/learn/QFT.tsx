import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Katex from '@/components/Math';
import { useChapterMeta, LearnSection } from '@/components/LocalizedContent';
import { useT } from '@/context/LocaleContext';
import { useSectionContent } from '@/i18n/hooks';
import { qft, iqft, basisState, C, stateLabel } from 'quantum-core';

function QFTAmplitudeDemo() {
  const t = useT();
  const section = useSectionContent('qft', '9.2');
  const w = (section?.widgets as { amplitude?: Record<string, string> } | undefined)?.amplitude ?? {};
  const wt = (key: string, params?: Record<string, string | number>) => {
    const template = w[key] ?? t(`learn.qft.sections.9.2.widgets.amplitude.${key}`, params);
    if (!params) return template;
    return template.replace(/\{\{(\w+)\}\}/g, (_, name: string) => String(params[name] ?? ''));
  };

  const [n, setN] = useState(3);
  const [inputIdx, setInputIdx] = useState(1);
  const N = 1 << n;

  const amplitudes = useMemo(() => {
    const input = basisState(n, inputIdx);
    const output = qft(input);
    return output.amplitudes.map((a, i) => ({
      label: stateLabel(i, n),
      prob: C.mag2(a),
    }));
  }, [n, inputIdx]);

  const maxProb = Math.max(...amplitudes.map((a) => a.prob));

  return (
    <div className="lab-panel">
      <label>{wt('numQubits', { n, N })}</label>
      <input type="range" min={2} max={4} value={n} onChange={(e) => { setN(Number(e.target.value)); setInputIdx(0); }} />
      <label>{wt('inputState', { x: inputIdx, label: stateLabel(inputIdx, n) })}</label>
      <input type="range" min={0} max={N - 1} value={inputIdx} onChange={(e) => setInputIdx(Number(e.target.value))} />
      <p style={{ marginTop: '1rem' }}>{wt('spread', { N })}</p>
      <div style={{ marginTop: '0.75rem' }}>
        {amplitudes.map((a) => (
          <div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span style={{ width: '48px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>|{a.label}⟩</span>
            <div style={{ flex: 1, height: '18px', background: 'var(--bg-elevated)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${(a.prob / maxProb) * 100}%`, height: '100%', background: 'var(--accent)' }} />
            </div>
            <span style={{ width: '56px', fontSize: '0.75rem', textAlign: 'right' }}>{(a.prob * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 0 }}>{wt('footnote')}</p>
    </div>
  );
}

function IQFTDemo() {
  const t = useT();
  const [n] = useState(3);
  const [x] = useState(5);

  const roundTrip = useMemo(() => {
    const input = basisState(n, x);
    const transformed = qft(input);
    const restored = iqft(transformed);
    return { fidelity: C.mag2(restored.amplitudes[x]) * 100 };
  }, [n, x]);

  const msg = t('learn.qft.sections.9.4.widgets.iqft.fidelity', {
    label: stateLabel(x, n),
    n,
    fidelity: roundTrip.fidelity.toFixed(2),
  });

  return (
    <div className="lab-panel">
      <p>{msg}</p>
      <Katex display>{`F_N^\\dagger F_N = I \\quad \\text{(unitarity)}`}</Katex>
    </div>
  );
}

export default function QFT() {
  const { title, intro } = useChapterMeta('qft');
  const t = useT();
  const omegaExample = useMemo(() => {
    const N = 8;
    const k = 3;
    const angle = (2 * Math.PI * k) / N;
    return { N, k, angleDeg: ((angle * 180) / Math.PI).toFixed(1) };
  }, []);

  const warningTitle = t('learn.qft.sections.9.2.warning.title');
  const warningP1 = t('learn.qft.sections.9.2.warning.p1');
  const warningP2 = t('learn.qft.sections.9.2.warning.p2');

  return (
    <article>
      <h1>{title}</h1>
      <p>{intro}</p>

      <LearnSection chapter="qft" sectionId="9.1" prev={{ title: 'Quantum Algorithms', path: '/learn/algorithms' }}
        widgets={<>
          <Katex display>{`\\omega_N = e^{2\\pi i / N}`}</Katex>
          <Katex display>{`\\text{QFT}|x\\rangle = \\frac{1}{\\sqrt{N}}\\sum_{k=0}^{N-1} \\omega_N^{xk}|k\\rangle`}</Katex>
        </>}
      >
        <p>
                  {t('learn.qft.sections.9.1.paragraphs.p3', {
                    N: omegaExample.N,
                    k: omegaExample.k,
                    angle: omegaExample.angleDeg,
                  })}
                </p>
      </LearnSection>

      <LearnSection chapter="qft" sectionId="9.2"
        widgets={<>
          <div className="card" style={{ borderLeft: '4px solid var(--warning, #c90)' }}>
                    <p><strong>{warningTitle}</strong> {warningP1}</p>
                    <p>{warningP2}</p>
                  </div>
          <QFTAmplitudeDemo />
        </>}
      >

      </LearnSection>

      <LearnSection chapter="qft" sectionId="9.3"
        widgets={<>
          <Katex display>{`\\text{QFT}|x_{n-1}\\cdots x_0\\rangle = \\bigotimes_{j=0}^{n-1} \\frac{|0\\rangle + e^{2\\pi i \\cdot 0.x_{n-1}\\cdots x_j}|1\\rangle}{\\sqrt{2}}`}</Katex>
        </>}
      >

      </LearnSection>

      <LearnSection chapter="qft" sectionId="9.4"
        widgets={<>
          <Katex display>{`\\text{QFT}^{-1}|k\\rangle = \\frac{1}{\\sqrt{N}}\\sum_{x=0}^{N-1} \\omega_N^{-kx}|x\\rangle`}</Katex>
          <IQFTDemo />
        </>}
      >

      </LearnSection>

      <LearnSection
        chapter="qft"
        sectionId="9.5"
        next={{ title: 'Phase Estimation', path: '/learn/phase-estimation' }}
      
        widgets={<>
          <p>
                    <Link to={`/playground/qft`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                      {t('learn.qft.labLink', { title: t('navigation.labs.qft') })}
                    </Link>
                  </p>
          <p>
                    <Link to="/playground/period-finding">{t('learn.qft.sections.9.5.links.periodFinding')}</Link>
                    {' · '}
                    <Link to="/learn/shor">{t('learn.qft.sections.9.5.links.shor')}</Link>
                  </p>
        </>}
      >

      </LearnSection>
    </article>
  );
}
