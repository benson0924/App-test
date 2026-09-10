import type { TranslationTree } from '@/i18n/types';

export const errorCorrection: TranslationTree = {
  meta: {
    title: '第5章：量子誤り訂正',
    intro:
      '実ハードウェアはノイズがあります。QEC は論理情報を冗長なもつれ状態に符号化し、論理量子ビットを直接測らずに誤りを検出・逆転します。ノイズモデルから最簡符号、安定化子、訂正と緩和の違いまで扱います。',
  },
  sections: {
    '5.1': { title: '5.1 なぜ量子誤り訂正？', paragraphs: ['古典は 3 回コピーと多数決。量子はクローン禁止——もつれと症候測定で代替。', 'ビット反転 X、位相反転 Z、デコヒーレンス、ゲート誤差。', '物理量子ビットと論理量子ビット。閾値以下で論理エラー率を下げる。'], checkpoints: [{ question: '離散的 1 量子ビット Pauli 誤りを一つ。', answer: 'bit flip', hint: 'X,Y,Z——|0⟩,|1⟩ を入れ替える X。' }], examples: [{ title: '|+⟩ のビット反転', steps: [{ label: '|+⟩ = H|0⟩。' }, { label: 'X を適用→|−⟩。' }, { label: 'Z 確率は同じだが振幅パターン変化。' }] }], expandables: [{ title: 'クローンできない理由', paragraphs: ['CNOT 符号化と症候設計が必要。'] }], practice: [{ question: '古典的 3 回コピーは量子で不可能。代替は？', answer: '|0⟩_L=|000⟩, |1⟩_L=|111⟩ と Z パリティ症候。' }] },
    '5.2': { title: '5.2 3 量子ビットビット反転符号', paragraphs: ['|0⟩_L=|000⟩, |1⟩_L=|111⟩。', 'CNOT 符号化。Z₀Z₁, Z₁Z₂ 症候で 1 ビット X を訂正。', '対易測定——論理 0/1 は区別せず誤りのみ。'], checkpoints: [{ question: '訂正できるビット反転はいくつ？', answer: '1' }], examples: [{ title: 'q1 の X を検出・訂正', steps: [{ label: '|111⟩ に符号化。' }, { label: 'X₁→|101⟩。' }, { label: '症候 (1,0)。' }, { label: 'X₁ で復元。' }] }], expandables: [{ title: '符号化回路', paragraphs: ['α|0⟩+β|1⟩→α|000⟩+β|111⟩——古典三複製ではない。'] }], practice: [{ question: '症候 (1,0) の訂正は？', answer: 'X₁。論理値は漏れない。' }], labLink: '誤り訂正シミュレータ' },
    '5.3': { title: '5.3 位相反転、Shor 符号、安定化子', paragraphs: ['位相符号は |+++⟩, |−−−⟩。H⊗³ 共役でビット反転符号と双対。', 'Shor 9 量子ビットで任意単一 Pauli に対応。'], checkpoints: [{ question: 'ビット反転→位相反転の共役ゲートは？', answer: 'hadamard' }], examples: [{ title: 'Shor レイアウト', steps: [{ label: '3 ブロック各 3 量子ビット。' }, { label: 'ブロック間位相パリティ。' }, { label: '9 安定化子で一意症候。' }, { label: '逆 Pauli で訂正。' }] }], expandables: [{ title: '安定化子形式', paragraphs: ['S₁=Z₀Z₁, S₂=Z₁Z₂。表面符号へ。'] }], practice: [{ question: 'ビット反転符号の 2 安定化子は？', answer: 'S₁=Z₀Z₁, S₂=Z₁Z₂。' }], labLink: '誤り訂正シミュレータ（Shor）' },
    '5.4': { title: '5.4 緩和 vs 訂正', paragraphs: ['訂正は症候と回復で状態を保持。FT スタックが必要。', '緩和は ⟨O⟩ 推定——NISQ 向きだが指数抑制なし。', '閾値以下で論理エラーは消える。'], checkpoints: [{ question: 'QEC は論理値を直接測る？', answer: 'no' }, { question: '緩和で任意長相干計算を保証できる？', answer: 'no' }], examples: [{ title: 'ゼロノイズ外挿', steps: [{ label: 'ノイズ λ,2λ,3λ で実行。' }, { label: '⟨O⟩ 測定。' }, { label: 'λ→0 外挿。' }, { label: '中間の論理量子ビットは修復しない。' }] }], expandables: [{ title: 'フォールトトレランス', paragraphs: ['閾値 ~10⁻³–10⁻²。'] }], practice: [{ question: 'RSA-2048 Shor は緩和か FT か？', answer: 'FT QEC が必要。' }] },
  },
  widgets: {
    noiseExplorer: { title: '単一量子ビットへのノイズ', ideal: '理想 |+⟩', bitFlip: 'ビット反転 (X)', phaseFlip: '位相反転 (Z)', decoherence: 'デコヒーレンス', gateError: 'ゲート誤差', descriptions: { ideal: '|+⟩ = (|0⟩+|1⟩)/√2', bit: 'X：|+⟩→|−⟩', phase: 'Z：Z 確率同じ、位相 −1', decoherence: 'T₂：相干消失→|0⟩ 表示', gate: 'Rx(0.3) で H 近似ミス' }, probabilities: 'P(|0⟩)={{p0}}%, P(|1⟩)={{p1}}%' },
    syndromeTable: { title: '3 量子ビットビット反転——症候表', logicalQubit: '論理 |0⟩_L または |1⟩_L', logical0: '|0⟩_L→|000⟩', logical1: '|1⟩_L→|111⟩', injectError: 'ビット反転を注入', noError: '誤りなし', xOnQubit: '量子ビット {{n}} に X', headers: { error: '誤り', syndrome: '症候 (Z₀Z₁,Z₁Z₂)', correction: '訂正', active: '現在' }, errors: { none: 'なし', x0: 'q0 に X', x1: 'q1 に X', x2: 'q2 に X' }, fixes: { identity: '恒等', x0: 'X₀', x1: 'X₁', x2: 'X₂' }, measuredSyndrome: '測定症候：', applyCorrection: '→ X_{{n}} を適用', fidelity: '訂正後忠実度：{{value}}%', corruptedTitle: '破損状態', correctedTitle: '訂正後' },
    phaseFlipViaH: { title: 'H 共役による位相符号', description: '各量子ビットに H：Z 誤りが X として検出。', zErrorLocation: 'Z 誤り位置', noZError: 'Z なし', zOnQubit: 'q{{n}} に Z', rotatedNote: 'H⊗³ 後 q{{n}} でビット反転として現れる。', afterZError: 'Z 誤り後', afterH: 'H⊗³ 後' },
    physicalVsLogical: { title: '物理 vs 論理エラー率', physicalRate: '物理 p = {{value}}%', codeDistance: '距離 d = {{d}}', logicalFailure: '論理失敗 ≈ {{value}}%', note: '論理 1 量子ビットは多数物理量子ビット。閾値以下で指数抑制。' },
    practice: { label: '練習問題。', revealSolution: '解答を表示' },
    labLink: 'フルラボ：{{title}} →',
  },
  nav: { prev: '← 量子回路', next: '次：もつれ →' },
};
