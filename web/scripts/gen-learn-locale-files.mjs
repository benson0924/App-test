#!/usr/bin/env node
/**
 * Generates learn chapter i18n locale files (protocols, algorithms, qft,
 * phaseEstimation, shor, modern, index) for en, zh-TW, and ja.
 */
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { algorithms } from './learn-data/algorithms.mjs';
import { qft } from './learn-data/qft.mjs';
import { phaseEstimation } from './learn-data/phaseEstimation.mjs';
import { shor } from './learn-data/shor.mjs';
import { modern } from './learn-data/modern.mjs';
import { index } from './learn-data/index.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = join(__dirname, '../src/i18n/locales');

function normalizeForTree(value) {
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (Array.isArray(value)) {
    const out = {};
    value.forEach((item, i) => {
      out[String(i)] = normalizeForTree(item);
    });
    return out;
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = normalizeForTree(v);
    }
    return out;
  }
  return value;
}

function emit(locale, name, obj) {
  const dir = join(base, locale, 'learn');
  mkdirSync(dir, { recursive: true });
  const normalized = normalizeForTree(obj);
  const body = `import type { TranslationTree } from '@/i18n/types';\n\nexport const ${name}: TranslationTree = ${JSON.stringify(normalized, null, 2)};\n`;
  writeFileSync(join(dir, `${name}.ts`), body);
}

const shared = {
  en: { labLink: 'Open full lab: {{title}} →' },
  'zh-TW': { labLink: '開啟完整實驗：{{title}} →' },
  ja: { labLink: 'フルラボを開く：{{title}} →' },
};

// ─── PROTOCOLS (Chapter 7) ───────────────────────────────────────────────────
const protocols = {
  en: {
    title: 'Chapter 7: Quantum Protocols',
    intro:
      'Entanglement and quantum channels enable communication primitives impossible classically — but never faster-than-light signaling. This chapter covers EPR paradox and hidden variables, the CHSH test, superdense coding, teleportation, and BB84 key distribution.',
    ...shared.en,
    sections: {
      '7.1': {
        title: '7.1 EPR and Local Hidden Variables',
        paragraphs: {
          p1:
            'The Einstein–Podolsky–Rosen (EPR) argument (1935) questioned whether quantum mechanics is complete. Consider the singlet state shared between Alice and Bob:',
          p2:
            "Measuring Alice's qubit in the Z basis instantly determines Bob's outcome (anti-correlated). EPR asked: could pre-existing local hidden variables (LHV) explain these correlations without \"spooky action at a distance\"?",
        },
        expandables: {
          lhv: {
            title: 'Local hidden variable models',
            p1:
              "An LHV model assigns each particle definite properties λ before measurement. Outcomes are functions A(a, λ) and B(b, λ) where a, b are measurement settings. Locality means Alice's outcome cannot depend on Bob's setting b, and vice versa.",
          },
          noSignaling: {
            title: 'No-signaling',
            p1:
              'Although correlations are non-classical, Alice cannot send a message to Bob by choosing her measurement basis. Bob\'s marginal outcome statistics are independent of Alice\'s setting — only the correlations change. This is the no-signaling principle, preserved by quantum mechanics and required by relativity.',
          },
        },
        workedExamples: {
          singlet: {
            title: 'Perfect anti-correlations in the singlet',
            steps: [
              { label: 'Alice and Bob share |Ψ⁻⟩ and measure in the same basis (e.g. Z).', latex: 'P(01) = P(10) = 0' },
              { label: 'Outcomes are always opposite: Alice gets 0 ↔ Bob gets 1.', latex: 'A_Z B_Z = -1 \\text{ with certainty}' },
              { label: 'This holds for any matched basis — but LHV models cannot reproduce all correlation patterns.', latex: '\\text{See CHSH (Section 7.2)}' },
            ],
          },
        },
        checkpoints: {
          signaling: {
            question: 'Can Alice signal Bob by choosing her measurement angle on a shared EPR pair?',
            answer: 'no',
            hint: 'Marginal statistics at Bob are unchanged.',
          },
        },
      },
      '7.2': {
        title: '7.2 CHSH Inequality and Tsirelson Bound',
        paragraphs: {
          p1: 'Bell (1964) and CHSH (1969) showed that LHV models constrain correlation functions. Define the CHSH parameter:',
          p2:
            'Any local hidden variable theory satisfies |S| ≤ 2. Quantum mechanics can violate this bound — the maximum quantum value is the Tsirelson bound:',
          p3:
            "For a singlet state with optimal angles (a = 0, a' = π/4, b = π/8, b' = −π/8), quantum mechanics predicts S = 2√2 — maximal violation.",
        },
        expandables: {
          noSignalingVsBell: {
            title: 'No-signaling vs Bell violation',
            p1:
              "CHSH violation proves correlations cannot arise from any local hidden variable model — but it does not enable signaling. The no-signaling condition limits how much correlation can deviate from classical; Tsirelson's bound 2√2 is below the no-signaling limit of 4.",
          },
        },
        checkpoints: {
          classicalBound: { question: 'What is the classical upper bound on |S|?', answer: '2' },
        },
        widgets: {
          chsh: {
            simulationTrials: 'Simulation trials: {{trials}}',
            classicalBound: 'Classical bound: |S| ≤ 2. Quantum (Tsirelson): |S| ≤ 2√2 ≈ {{tsirelson}}. Simulated S ≈ {{s}}.',
          },
        },
        labs: { chsh: 'Bell/CHSH Experiment' },
      },
      '7.3': {
        title: '7.3 Superdense Coding',
        paragraphs: {
          p1:
            'Superdense coding (Bennett & Wiesner, 1992) transmits two classical bits by sending one qubit, given a pre-shared ebit (entangled bit).',
          p2:
            'The protocol consumes one ebit and one qubit transmission to send two bits — doubling classical channel capacity in this specific sense. Without pre-shared entanglement, sending two bits requires two qubits (each qubit carries at most one bit when measured in a fixed basis).',
        },
        headings: { encodingTable: 'Encoding table' },
        tables: {
          superdense: {
            headers: ['Classical bits', "Alice's gate", 'Shared state becomes'],
            rows: [
              { bits: '00', gate: 'I', state: '|Φ⁺⟩' },
              { bits: '01', gate: 'X', state: '|Ψ⁺⟩' },
              { bits: '10', gate: 'Z', state: '|Φ⁻⟩' },
              { bits: '11', gate: 'XZ (= iY)', state: '|Ψ⁻⟩' },
            ],
          },
        },
        workedExamples: {
          steps: {
            title: 'Superdense coding step-by-step',
            steps: [
              { label: 'Prepare shared Bell state |Φ⁺⟩ = (|00⟩ + |11⟩)/√2 between Alice and Bob.', latex: '|\\Phi^+\\rangle = \\tfrac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)' },
              { label: 'Alice encodes two classical bits (b₁b₂) by applying I, X, Z, or XZ to her qubit.', latex: '00 \\to I,\\; 01 \\to X,\\; 10 \\to Z,\\; 11 \\to XZ' },
              { label: 'Alice sends her qubit to Bob (one qubit transmitted).' },
              { label: 'Bob decodes with CNOT (Alice→Bob control) then H on his qubit, measuring both qubits to read (b₁b₂).', latex: '(CNOT)(H \\otimes I) \\text{ reverses the encoding}' },
            ],
          },
        },
        expandables: {
          noSignaling: {
            title: 'No-signaling in superdense coding',
            p1:
              'The ebit must be established before encoding — typically by Alice and Bob meeting or using a quantum channel. The classical bits are not transmitted until Alice sends her qubit; the entanglement alone carries no usable classical information (no-signaling).',
          },
        },
        labs: { superdense: 'Superdense Coding' },
      },
      '7.4': {
        title: '7.4 Quantum Teleportation',
        paragraphs: {
          p1:
            'Teleportation (Bennett et al., 1993) transfers an unknown qubit state |ψ⟩ from Alice to Bob using one ebit and two classical bits — without physically moving the original particle and without cloning.',
        },
        headings: { correctionTable: 'Correction table' },
        tables: {
          teleport: {
            headers: ['m₁ (Alice)', 'm₂ (Alice)', 'Bob applies', 'Effect'],
            rows: [
              { m1: '0', m2: '0', correction: 'I', note: 'No change needed' },
              { m1: '0', m2: '1', correction: 'X', note: 'Bit flip' },
              { m1: '1', m2: '0', correction: 'Z', note: 'Phase flip' },
              { m1: '1', m2: '1', correction: 'ZX (= iY)', note: 'Both flips' },
            ],
          },
        },
        workedExamples: {
          algebra: {
            title: 'Teleportation algebra',
            steps: [
              { label: 'Start: Alice holds |ψ⟩ = α|0⟩ + β|1⟩; Alice & Bob share |Φ⁺⟩ on qubits 2,3.', latex: '|\\psi\\rangle_1 \\otimes |\\Phi^+\\rangle_{23} = \\tfrac{1}{\\sqrt{2}}(\\alpha|0\\rangle + \\beta|1\\rangle)(|00\\rangle + |11\\rangle)' },
              { label: "Rewrite in Bell basis on Alice's qubits (1,2). Four Bell terms appear with distinct (m₁,m₂) outcomes.", latex: '|\\psi\\rangle_1 \\otimes |\\Phi^+\\rangle_{23} = \\tfrac{1}{2}\\sum_{m_1,m_2} |B_{m_1 m_2}\\rangle_{12} \\otimes X^{m_2} Z^{m_1}|\\psi\\rangle_3' },
              { label: "Alice measures qubits 1,2 in Bell basis → outcomes m₁m₂. Bob's qubit becomes X^{m₂}Z^{m₁}|ψ⟩.", latex: '\\text{Bob applies } Z^{m_1} X^{m_2} \\text{ to recover } |\\psi\\rangle' },
              { label: 'Alice sends (m₁,m₂) to Bob via classical channel. Bob applies the correction. Fidelity F = 1 for ideal devices.', latex: 'F = |\\langle\\psi|\\psi_{\\text{out}}\\rangle|^2 = 1' },
            ],
          },
        },
        expandables: {
          noCloning: {
            title: 'No-cloning and no-signaling',
            p1:
              "Teleportation destroys Alice's original state (by measurement) — consistent with the no-cloning theorem. The two classical bits carry no information about |ψ⟩ until Alice performs her measurement; Bob cannot decode before receiving them. No information travels faster than light.",
          },
        },
        checkpoints: {
          classicalBits: { question: 'How many classical bits does teleportation require?', answer: '2' },
        },
        labs: { teleportation: 'Quantum Teleportation' },
      },
      '7.5': {
        title: '7.5 BB84 Quantum Key Distribution',
        paragraphs: {
          p1:
            'BB84 (Bennett & Brassard, 1984) allows Alice and Bob to establish a shared secret key with information-theoretic security against passive eavesdropping — detecting Eve via elevated error rates.',
        },
        headings: { basisEncoding: 'Basis encoding' },
        tables: {
          basis: {
            headers: ['Bit', 'Z basis', 'X basis'],
            rows: [
              { bit: '0', z: '|0⟩', x: '|+⟩' },
              { bit: '1', z: '|1⟩', x: '|−⟩' },
            ],
          },
        },
        workedExamples: {
          protocol: {
            title: 'BB84 protocol',
            steps: [
              { label: 'Alice chooses random bits and random bases (Z or X) for each qubit, encodes, and sends.' },
              { label: 'Bob measures each qubit in a randomly chosen Z or X basis.' },
              { label: 'Alice and Bob publicly compare bases (not outcomes). Keep positions where bases matched — the sifted key.' },
              { label: 'Compare a random subset of sifted bits to estimate error rate. If too high, abort — possible eavesdropper.' },
              { label: 'Apply error correction and privacy amplification to obtain a final secret key.' },
            ],
          },
        },
        expandables: {
          eveAttack: {
            title: "Eve's intercept–resend attack",
            p1:
              "If Eve intercepts each qubit, measures in a random basis, and resends, she guesses wrong half the time. When Eve's basis ≠ Alice's, she randomizes the state — Bob's sifted key shows ~25% bit errors (50% wrong basis × 50% random outcome). Alice and Bob detect this and abort.",
          },
          security: {
            title: 'Security sketch and no-signaling',
            p1:
              'BB84 security against passive eavesdropping is information-theoretic with ideal devices. Real deployments add authentication, error correction, and privacy amplification. The quantum channel enables key distribution; it does not allow instantaneous key extraction — classical communication is required for sifting and error estimation (no-signaling throughout).',
          },
        },
        checkpoints: {
          eveError: {
            question: 'What happens to the error rate when Eve intercepts BB84 qubits?',
            answer: 'increases',
            hint: 'Wrong-basis measurements disturb the state.',
          },
        },
        widgets: {
          bb84: {
            qubitsPerRun: 'Qubits per run: {{num}}',
            noEavesdropper: 'No eavesdropper',
            eveIntercepts: 'Eve intercepts',
            rerun: 'Re-run',
            siftedKey: 'Sifted key length: {{length}} bits (≈ half of {{num}} — matching bases). Error rate on sifted bits: {{rate}}%',
            eveDetected: ' — elevated, Eve detected!',
            footnote:
              "Eve measuring in a random basis disturbs states when her basis ≠ Alice's, introducing ~25% errors on sifted key.",
          },
        },
        labs: { bb84: 'BB84 Simulator' },
      },
    },
  },
  'zh-TW': {
    title: '第 7 章：量子協定',
    intro:
      '糾纏與量子通道使古典上不可能的通訊原語成為可能——但絕不會實現超光速信號傳遞。本章涵蓋 EPR 悖論與隱變量、CHSH 測試、超密集編碼、傳態與 BB84 密鑰分配。',
    ...shared['zh-TW'],
    sections: {
      '7.1': {
        title: '7.1 EPR 與局域隱變量',
        paragraphs: {
          p1: '愛因斯坦–波多爾斯基–羅森（EPR）論證（1935）質疑量子力學是否完備。考慮 Alice 與 Bob 共享的單態：',
          p2:
            '在 Z 基中測量 Alice 的量子位元會立即決定 Bob 的結果（反相關）。EPR 問：能否用預先存在的局域隱變量（LHV）解釋這些相關性，而不需要「鬼魅般的超距作用」？',
        },
        expandables: {
          lhv: {
            title: '局域隱變量模型',
            p1:
              'LHV 模型在測量前為每個粒子賦予確定的性質 λ。結果是函數 A(a, λ) 與 B(b, λ)，其中 a、b 為測量設定。局域性意味 Alice 的結果不能依賴 Bob 的設定 b，反之亦然。',
          },
          noSignaling: {
            title: '無信號傳遞',
            p1:
              '雖然相關性是非古典的，Alice 無法透過選擇測量基向 Bob 傳送訊息。Bob 的邊緣結果統計與 Alice 的設定無關——只有相關性會改變。這是無信號傳遞原理，由量子力學保持並為相對論所要求。',
          },
        },
        workedExamples: {
          singlet: {
            title: '單態中的完美反相關',
            steps: [
              { label: 'Alice 與 Bob 共享 |Ψ⁻⟩ 並在相同基（例如 Z）中測量。', latex: 'P(01) = P(10) = 0' },
              { label: '結果總是相反：Alice 得到 0 ↔ Bob 得到 1。', latex: 'A_Z B_Z = -1 \\text{ with certainty}' },
              { label: '對任何匹配的基都成立——但 LHV 模型無法重現所有相關模式。', latex: '\\text{See CHSH (Section 7.2)}' },
            ],
          },
        },
        checkpoints: {
          signaling: {
            question: 'Alice 能否透過在共享 EPR 對上選擇測量角度向 Bob 傳信？',
            answer: 'no',
            hint: 'Bob 的邊緣統計不變。',
          },
        },
      },
      '7.2': {
        title: '7.2 CHSH 不等式與 Tsirelson 上界',
        paragraphs: {
          p1: 'Bell（1964）與 CHSH（1969）證明 LHV 模型限制相關函數。定義 CHSH 參數：',
          p2: '任何局域隱變量理論滿足 |S| ≤ 2。量子力學可違反此上界——量子最大值為 Tsirelson 上界：',
          p3: "對於最佳角度的單態（a = 0, a' = π/4, b = π/8, b' = −π/8），量子力學預測 S = 2√2——最大違反。",
        },
        expandables: {
          noSignalingVsBell: {
            title: '無信號傳遞 vs Bell 違反',
            p1:
              'CHSH 違反證明相關性不能來自任何局域隱變量模型——但不會實現信號傳遞。無信號條件限制相關性偏離古典的程度；Tsirelson 上界 2√2 低於無信號極限 4。',
          },
        },
        checkpoints: {
          classicalBound: { question: '|S| 的古典上界是多少？', answer: '2' },
        },
        widgets: {
          chsh: {
            simulationTrials: '模擬試驗次數：{{trials}}',
            classicalBound: '古典上界：|S| ≤ 2。量子（Tsirelson）：|S| ≤ 2√2 ≈ {{tsirelson}}。模擬 S ≈ {{s}}。',
          },
        },
        labs: { chsh: 'Bell/CHSH 實驗' },
      },
      '7.3': {
        title: '7.3 超密集編碼',
        paragraphs: {
          p1: '超密集編碼（Bennett & Wiesner，1992）在預先共享 ebit（糾纏位元）的條件下，透過傳送一個量子位元傳輸兩個古典位元。',
          p2:
            '協定消耗一個 ebit 與一次量子位元傳輸來傳送兩個位元——在此特定意義上使古典通道容量加倍。沒有預先共享糾纏時，傳送兩個位元需要兩個量子位元（每個量子位元在固定基測量時最多攜帶一個位元）。',
        },
        headings: { encodingTable: '編碼表' },
        tables: {
          superdense: {
            headers: ['古典位元', 'Alice 的閘', '共享態變為'],
            rows: [
              { bits: '00', gate: 'I', state: '|Φ⁺⟩' },
              { bits: '01', gate: 'X', state: '|Ψ⁺⟩' },
              { bits: '10', gate: 'Z', state: '|Φ⁻⟩' },
              { bits: '11', gate: 'XZ (= iY)', state: '|Ψ⁻⟩' },
            ],
          },
        },
        workedExamples: {
          steps: {
            title: '超密集編碼逐步說明',
            steps: [
              { label: '在 Alice 與 Bob 之間準備共享 Bell 態 |Φ⁺⟩ = (|00⟩ + |11⟩)/√2。', latex: '|\\Phi^+\\rangle = \\tfrac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)' },
              { label: 'Alice 透過對其量子位元套用 I、X、Z 或 XZ 編碼兩個古典位元（b₁b₂）。', latex: '00 \\to I,\\; 01 \\to X,\\; 10 \\to Z,\\; 11 \\to XZ' },
              { label: 'Alice 將其量子位元傳給 Bob（傳送一個量子位元）。' },
              { label: 'Bob 以 CNOT（Alice→Bob 控制）然後 H 解碼，測量兩個量子位元讀出 (b₁b₂)。', latex: '(CNOT)(H \\otimes I) \\text{ reverses the encoding}' },
            ],
          },
        },
        expandables: {
          noSignaling: {
            title: '超密集編碼中的無信號傳遞',
            p1:
              'ebit 必須在編碼前建立——通常由 Alice 與 Bob 會面或使用量子通道。古典位元在 Alice 傳送其量子位元前不會傳輸；僅靠糾纏無法攜帶可用的古典資訊（無信號傳遞）。',
          },
        },
        labs: { superdense: '超密集編碼' },
      },
      '7.4': {
        title: '7.4 量子傳態',
        paragraphs: {
          p1:
            '傳態（Bennett 等，1993）使用一個 ebit 與兩個古典位元將未知量子位元態 |ψ⟩ 從 Alice 傳給 Bob——不物理移動原始粒子且不克隆。',
        },
        headings: { correctionTable: '校正表' },
        tables: {
          teleport: {
            headers: ['m₁ (Alice)', 'm₂ (Alice)', 'Bob 套用', '效果'],
            rows: [
              { m1: '0', m2: '0', correction: 'I', note: '無需改變' },
              { m1: '0', m2: '1', correction: 'X', note: '位元翻轉' },
              { m1: '1', m2: '0', correction: 'Z', note: '相位翻轉' },
              { m1: '1', m2: '1', correction: 'ZX (= iY)', note: '兩種翻轉' },
            ],
          },
        },
        workedExamples: {
          algebra: {
            title: '傳態代數',
            steps: [
              { label: '起始：Alice 持有 |ψ⟩ = α|0⟩ + β|1⟩；Alice 與 Bob 在量子位元 2,3 共享 |Φ⁺⟩。', latex: '|\\psi\\rangle_1 \\otimes |\\Phi^+\\rangle_{23} = \\tfrac{1}{\\sqrt{2}}(\\alpha|0\\rangle + \\beta|1\\rangle)(|00\\rangle + |11\\rangle)' },
              { label: '在 Alice 的量子位元 (1,2) 上以 Bell 基重寫。出現四個具有不同 (m₁,m₂) 結果的 Bell 項。', latex: '|\\psi\\rangle_1 \\otimes |\\Phi^+\\rangle_{23} = \\tfrac{1}{2}\\sum_{m_1,m_2} |B_{m_1 m_2}\\rangle_{12} \\otimes X^{m_2} Z^{m_1}|\\psi\\rangle_3' },
              { label: 'Alice 在 Bell 基測量量子位元 1,2 → 結果 m₁m₂。Bob 的量子位元變為 X^{m₂}Z^{m₁}|ψ⟩。', latex: '\\text{Bob applies } Z^{m_1} X^{m_2} \\text{ to recover } |\\psi\\rangle' },
              { label: 'Alice 透過古典通道傳送 (m₁,m₂) 給 Bob。Bob 套用校正。理想裝置的保真度 F = 1。', latex: 'F = |\\langle\\psi|\\psi_{\\text{out}}\\rangle|^2 = 1' },
            ],
          },
        },
        expandables: {
          noCloning: {
            title: '不可克隆與無信號傳遞',
            p1:
              '傳態破壞 Alice 的原始態（透過測量）——與不可克隆定理一致。兩個古典位元在 Alice 測量前不攜帶 |ψ⟩ 的資訊；Bob 在收到前無法解碼。沒有資訊以超光速傳播。',
          },
        },
        checkpoints: {
          classicalBits: { question: '傳態需要多少古典位元？', answer: '2' },
        },
        labs: { teleportation: '量子傳態' },
      },
      '7.5': {
        title: '7.5 BB84 量子密鑰分配',
        paragraphs: {
          p1:
            'BB84（Bennett & Brassard，1984）允許 Alice 與 Bob 建立共享秘密密鑰，對被動竊聽具有資訊理論安全性——透過升高的錯誤率偵測 Eve。',
        },
        headings: { basisEncoding: '基編碼' },
        tables: {
          basis: {
            headers: ['位元', 'Z 基', 'X 基'],
            rows: [
              { bit: '0', z: '|0⟩', x: '|+⟩' },
              { bit: '1', z: '|1⟩', x: '|−⟩' },
            ],
          },
        },
        workedExamples: {
          protocol: {
            title: 'BB84 協定',
            steps: [
              { label: 'Alice 為每個量子位元選擇隨機位元與隨機基（Z 或 X），編碼後傳送。' },
              { label: 'Bob 以隨機選擇的 Z 或 X 基測量每個量子位元。' },
              { label: 'Alice 與 Bob 公開比較基（不比較結果）。保留基匹配的位置——篩選後密鑰。' },
              { label: '比較篩選位元的一個隨機子集以估計錯誤率。若太高則中止——可能有竊聽者。' },
              { label: '套用錯誤校正與私密放大以獲得最終秘密密鑰。' },
            ],
          },
        },
        expandables: {
          eveAttack: {
            title: 'Eve 的截獲–重送攻擊',
            p1:
              '若 Eve 截獲每個量子位元、以隨機基測量並重送，她有一半時間猜錯基。當 Eve 的基 ≠ Alice 的基時，她隨機化態——Bob 的篩選密鑰顯示約 25% 位元錯誤（50% 錯基 × 50% 隨機結果）。Alice 與 Bob 偵測到並中止。',
          },
          security: {
            title: '安全性概述與無信號傳遞',
            p1:
              '對被動竊聽，BB84 在理想裝置下具有資訊理論安全性。實際部署加入認證、錯誤校正與私密放大。量子通道使密鑰分配成為可能；它不允許瞬時提取密鑰——篩選與錯誤估計需要古典通訊（全程無信號傳遞）。',
          },
        },
        checkpoints: {
          eveError: {
            question: 'Eve 截獲 BB84 量子位元時錯誤率會如何？',
            answer: 'increases',
            hint: '錯基測量會擾動態。',
          },
        },
        widgets: {
          bb84: {
            qubitsPerRun: '每次執行的量子位元：{{num}}',
            noEavesdropper: '無竊聽者',
            eveIntercepts: 'Eve 截獲',
            rerun: '重新執行',
            siftedKey: '篩選後密鑰長度：{{length}} 位元（約 {{num}} 的一半——匹配基）。篩選位元錯誤率：{{rate}}%',
            eveDetected: ' — 升高，偵測到 Eve！',
            footnote: 'Eve 以隨機基測量時，若其基 ≠ Alice 的基會擾動態，在篩選密鑰上引入約 25% 錯誤。',
          },
        },
        labs: { bb84: 'BB84 模擬器' },
      },
    },
  },
  ja: {
    title: '第7章：量子プロトコル',
    intro:
      'もつれと量子チャネルは、古典では不可能な通信プリミティブを可能にします——ただし光速を超える信号伝達はありません。本章では EPR パラドックスと隠れ変数、CHSH テスト、超高密度符号化、テレポーテーション、BB84 鍵配送を扱います。',
    ...shared.ja,
    sections: {
      '7.1': {
        title: '7.1 EPR と局所隠れ変数',
        paragraphs: {
          p1: 'アインシュタイン・ポドルスキー・ローゼン（EPR）の論証（1935）は量子力学の完備性を問いました。Alice と Bob が共有する一重項を考えます：',
          p2:
            'Z 基底で Alice の量子ビットを測定すると、Bob の結果が即座に決まります（反相関）。EPR は、既存の局所隠れ変数（LHV）が「幽霊のような超距離作用」なしにこれらの相関を説明できるかと問いました。',
        },
        expandables: {
          lhv: {
            title: '局所隠れ変数モデル',
            p1:
              'LHV モデルは測定前に各粒子に確定的な性質 λ を割り当てます。結果は関数 A(a, λ) と B(b, λ) で、a, b は測定設定です。局所性とは Alice の結果が Bob の設定 b に依存できず、その逆も成り立つことを意味します。',
          },
          noSignaling: {
            title: 'ノーシグナリング',
            p1:
              '相関は非古典的ですが、Alice は測定基底を選ぶことで Bob にメッセージを送れません。Bob の周辺統計は Alice の設定に依存しません——変わるのは相関だけです。これはノーシグナリング原理で、量子力学が保持し相対論が要求します。',
          },
        },
        workedExamples: {
          singlet: {
            title: '一重項での完全な反相関',
            steps: [
              { label: 'Alice と Bob は |Ψ⁻⟩ を共有し、同じ基底（例：Z）で測定します。', latex: 'P(01) = P(10) = 0' },
              { label: '結果は常に反対：Alice が 0 ↔ Bob が 1。', latex: 'A_Z B_Z = -1 \\text{ with certainty}' },
              { label: '一致した基底ならどれでも成立——しかし LHV モデルはすべての相関パターンを再現できません。', latex: '\\text{See CHSH (Section 7.2)}' },
            ],
          },
        },
        checkpoints: {
          signaling: {
            question: 'Alice は共有 EPR 対で測定角度を選ぶことで Bob に信号を送れますか？',
            answer: 'no',
            hint: 'Bob の周辺統計は変わりません。',
          },
        },
      },
      '7.2': {
        title: '7.2 CHSH 不等式とツァイレルソン限界',
        paragraphs: {
          p1: 'Bell（1964）と CHSH（1969）は LHV モデルが相関関数を制約することを示しました。CHSH パラメータを定義します：',
          p2: '任意の局所隠れ変数理論は |S| ≤ 2 を満たします。量子力学はこの限界を破ることができ——量子最大値はツァイレルソン限界です：',
          p3: "最適角度の一重項（a = 0, a' = π/4, b = π/8, b' = −π/8）では、量子力学は S = 2√2——最大の違反を予測します。",
        },
        expandables: {
          noSignalingVsBell: {
            title: 'ノーシグナリング vs Bell 違反',
            p1:
              'CHSH 違反は相関が局所隠れ変数モデルから生じられないことを証明します——しかし信号伝達は可能にしません。ノーシグナリング条件は相関が古典からどれだけ逸脱できるかを制限します；ツァイレルソン限界 2√2 はノーシグナリング限界 4 より低いです。',
          },
        },
        checkpoints: {
          classicalBound: { question: '|S| の古典的上界は？', answer: '2' },
        },
        widgets: {
          chsh: {
            simulationTrials: 'シミュレーション試行回数：{{trials}}',
            classicalBound: '古典限界：|S| ≤ 2。量子（ツァイレルソン）：|S| ≤ 2√2 ≈ {{tsirelson}}。シミュレーション S ≈ {{s}}。',
          },
        },
        labs: { chsh: 'Bell/CHSH 実験' },
      },
      '7.3': {
        title: '7.3 超高密度符号化',
        paragraphs: {
          p1: '超高密度符号化（Bennett & Wiesner, 1992）は、事前共有の ebit（もつれビット）を使い、1 量子ビットの送信で 2 古典ビットを伝送します。',
          p2:
            'プロトコルは 1 ebit と 1 量子ビット送信で 2 ビットを送ります——この特定の意味で古典チャネル容量を倍増します。事前共有もつれがない場合、2 ビットの送信には 2 量子ビットが必要です（各量子ビットは固定基底測定で最大 1 ビット）。',
        },
        headings: { encodingTable: '符号化表' },
        tables: {
          superdense: {
            headers: ['古典ビット', 'Alice のゲート', '共有状態は'],
            rows: [
              { bits: '00', gate: 'I', state: '|Φ⁺⟩' },
              { bits: '01', gate: 'X', state: '|Ψ⁺⟩' },
              { bits: '10', gate: 'Z', state: '|Φ⁻⟩' },
              { bits: '11', gate: 'XZ (= iY)', state: '|Ψ⁻⟩' },
            ],
          },
        },
        workedExamples: {
          steps: {
            title: '超高密度符号化のステップ',
            steps: [
              { label: 'Alice と Bob の間で共有 Bell 状態 |Φ⁺⟩ = (|00⟩ + |11⟩)/√2 を準備。', latex: '|\\Phi^+\\rangle = \\tfrac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)' },
              { label: 'Alice は I, X, Z, XZ を自分の量子ビットに適用して 2 古典ビット (b₁b₂) を符号化。', latex: '00 \\to I,\\; 01 \\to X,\\; 10 \\to Z,\\; 11 \\to XZ' },
              { label: 'Alice は自分の量子ビットを Bob に送る（1 量子ビット送信）。' },
              { label: 'Bob は CNOT（Alice→Bob 制御）と H で復号し、両量子ビットを測定して (b₁b₂) を読む。', latex: '(CNOT)(H \\otimes I) \\text{ reverses the encoding}' },
            ],
          },
        },
        expandables: {
          noSignaling: {
            title: '超高密度符号化のノーシグナリング',
            p1:
              'ebit は符号化前に確立する必要があります——通常 Alice と Bob が会うか量子チャネルを使います。古典ビットは Alice が量子ビットを送るまで伝送されません；もつれだけでは有用な古典情報は運べません（ノーシグナリング）。',
          },
        },
        labs: { superdense: '超高密度符号化' },
      },
      '7.4': {
        title: '7.4 量子テレポーテーション',
        paragraphs: {
          p1:
            'テレポーテーション（Bennett 他, 1993）は 1 ebit と 2 古典ビットで未知の量子ビット状態 |ψ⟩ を Alice から Bob に転送します——元の粒子を物理的に動かさず、複製もしません。',
        },
        headings: { correctionTable: '訂正表' },
        tables: {
          teleport: {
            headers: ['m₁ (Alice)', 'm₂ (Alice)', 'Bob が適用', '効果'],
            rows: [
              { m1: '0', m2: '0', correction: 'I', note: '変更不要' },
              { m1: '0', m2: '1', correction: 'X', note: 'ビット反転' },
              { m1: '1', m2: '0', correction: 'Z', note: '位相反転' },
              { m1: '1', m2: '1', correction: 'ZX (= iY)', note: '両方反転' },
            ],
          },
        },
        workedExamples: {
          algebra: {
            title: 'テレポーテーション代数',
            steps: [
              { label: '開始：Alice は |ψ⟩ = α|0⟩ + β|1⟩ を保持；Alice と Bob は量子ビット 2,3 で |Φ⁺⟩ を共有。', latex: '|\\psi\\rangle_1 \\otimes |\\Phi^+\\rangle_{23} = \\tfrac{1}{\\sqrt{2}}(\\alpha|0\\rangle + \\beta|1\\rangle)(|00\\rangle + |11\\rangle)' },
              { label: 'Alice の量子ビット (1,2) で Bell 基底に書き直す。異なる (m₁,m₂) 結果の 4 Bell 項が現れる。', latex: '|\\psi\\rangle_1 \\otimes |\\Phi^+\\rangle_{23} = \\tfrac{1}{2}\\sum_{m_1,m_2} |B_{m_1 m_2}\\rangle_{12} \\otimes X^{m_2} Z^{m_1}|\\psi\\rangle_3' },
              { label: 'Alice は量子ビット 1,2 を Bell 基底で測定 → 結果 m₁m₂。Bob の量子ビットは X^{m₂}Z^{m₁}|ψ⟩ になる。', latex: '\\text{Bob applies } Z^{m_1} X^{m_2} \\text{ to recover } |\\psi\\rangle' },
              { label: 'Alice は古典チャネルで (m₁,m₂) を Bob に送る。Bob は訂正を適用。理想装置では保真度 F = 1。', latex: 'F = |\\langle\\psi|\\psi_{\\text{out}}\\rangle|^2 = 1' },
            ],
          },
        },
        expandables: {
          noCloning: {
            title: 'ノークローニングとノーシグナリング',
            p1:
              'テレポーテーションは Alice の元の状態を破壊します（測定による）——ノークローニング定理と一致。2 古典ビットは Alice が測定するまで |ψ⟩ の情報を運びません；Bob は受信前に復号できません。情報は光速を超えて伝わりません。',
          },
        },
        checkpoints: {
          classicalBits: { question: 'テレポーテーションに必要な古典ビット数は？', answer: '2' },
        },
        labs: { teleportation: '量子テレポーテーション' },
      },
      '7.5': {
        title: '7.5 BB84 量子鍵配送',
        paragraphs: {
          p1:
            'BB84（Bennett & Brassard, 1984）は Alice と Bob が共有秘密鍵を確立でき、受動的盗聴に対して情報理論的に安全——エラー率の上昇で Eve を検出します。',
        },
        headings: { basisEncoding: '基底符号化' },
        tables: {
          basis: {
            headers: ['ビット', 'Z 基底', 'X 基底'],
            rows: [
              { bit: '0', z: '|0⟩', x: '|+⟩' },
              { bit: '1', z: '|1⟩', x: '|−⟩' },
            ],
          },
        },
        workedExamples: {
          protocol: {
            title: 'BB84 プロトコル',
            steps: [
              { label: 'Alice は各量子ビットにランダムビットとランダム基底（Z または X）を選び、符号化して送信。' },
              { label: 'Bob はランダムに選んだ Z または X 基底で各量子ビットを測定。' },
              { label: 'Alice と Bob は基底を公開比較（結果は比較しない）。基底が一致した位置を保持——シフト済み鍵。' },
              { label: 'シフト済みビットのランダム部分集合を比較してエラー率を推定。高すぎれば中止——盗聴の可能性。' },
              { label: '誤り訂正とプライバシー増幅を適用して最終秘密鍵を得る。' },
            ],
          },
        },
        expandables: {
          eveAttack: {
            title: 'Eve の傍受–再送攻撃',
            p1:
              'Eve が各量子ビットを傍受し、ランダム基底で測定して再送すると、半分の時間で基底を間違えます。Eve の基底 ≠ Alice の基底のとき、状態をランダム化——Bob のシフト済み鍵は約 25% のビットエラー（50% 誤基底 × 50% ランダム結果）。Alice と Bob はこれを検出して中止します。',
          },
          security: {
            title: '安全性の概説とノーシグナリング',
            p1:
              '受動盗聴に対する BB84 の安全性は理想装置では情報理論的です。実運用では認証、誤り訂正、プライバシー増幅を追加します。量子チャネルは鍵配送を可能にしますが、瞬時の鍵抽出は許しません——シフトとエラー推定には古典通信が必要（全体を通じてノーシグナリング）。',
          },
        },
        checkpoints: {
          eveError: {
            question: 'Eve が BB84 量子ビットを傍受するとエラー率はどうなる？',
            answer: 'increases',
            hint: '誤った基底での測定は状態を乱します。',
          },
        },
        widgets: {
          bb84: {
            qubitsPerRun: '1 回の量子ビット数：{{num}}',
            noEavesdropper: '盗聴者なし',
            eveIntercepts: 'Eve が傍受',
            rerun: '再実行',
            siftedKey: 'シフト済み鍵長：{{length}} ビット（約 {{num}} の半分——一致基底）。シフト済みビットのエラー率：{{rate}}%',
            eveDetected: ' — 上昇、Eve 検出！',
            footnote: 'Eve がランダム基底で測定すると、基底 ≠ Alice のとき状態を乱し、シフト済み鍵に約 25% のエラーを導入します。',
          },
        },
        labs: { bb84: 'BB84 シミュレータ' },
      },
    },
  },
};

const chapters = { protocols, algorithms, qft, phaseEstimation, shor, modern, index };

const created = [];
for (const [chapterName, locales] of Object.entries(chapters)) {
  for (const [locale, data] of Object.entries(locales)) {
    emit(locale, chapterName, data);
    created.push(`${locale}/learn/${chapterName}.ts`);
  }
}

console.log(`Generated ${created.length} learn locale files:`);
created.forEach((f) => console.log(`  ${f}`));
