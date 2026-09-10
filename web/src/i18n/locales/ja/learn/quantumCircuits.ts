import type { TranslationTree } from '@/i18n/types';

export const quantumCircuits: TranslationTree = {
  meta: {
    title: '第6章：量子回路',
    intro:
      '量子回路モデルは量子アルゴリズムの標準的なプログラミング図式です。線は量子ビット、左から右に時間が流れ、ユニタリゲートが振幅を変え、測定が古典ビットを出力します。本章では慣例、Bell 回路、ゲート集合、深度とシミュレーションの関係を扱います。',
  },
  sections: {
    '6.1': { title: '6.1 回路モデルの慣例', paragraphs: ['水平線は各量子ビットの世界線。左から右にゲートが適用され、最右が最後。', '制御は |1⟩ で条件付き。測定は計算基底への投影。古典線は測定結果。', 'シミュレータは測定まで完全状態ベクトルを追跡。'], checkpoints: [{ question: '左から右の図で |ψ_in⟩ に最初に作用するゲートは？', answer: 'leftmost', hint: '最左。' }], examples: [{ title: 'ゲート順序の読み方', steps: [{ label: 'X 次に H、|0⟩ から。' }, { label: 'X：|1⟩。' }, { label: 'H：|−⟩。' }, { label: '一般に [H,X] ≠ 0。' }] }], expandables: [{ title: 'テンソル積の線順', paragraphs: ['量子ビット 0 は上の線が多い。ツール間でインデックス慣例を確認。'] }], practice: [{ question: '制御 q1、ターゲット q0 の CNOT、|10⟩ から。出力は？', answer: '制御 |1⟩ でターゲット反転：|11⟩。' }], labLink: '回路ビルダーを開く' },
    '6.2': { title: '6.2 Bell 回路ウォークスルー', paragraphs: ['|Φ⁺⟩ は |00⟩ に H と CNOT——最小もつれ回路。', 'H 後は積状態 |+⟩⊗|0⟩。CNOT で |00⟩, |11⟩ に等重み。'], checkpoints: [{ question: 'q0 にだけ H 後、もつれている？', answer: 'no', hint: '積状態 |+⟩⊗|0⟩。' }], examples: [{ title: '各ステップの振幅', steps: [{ label: '|00⟩ 振幅 1。' }, { label: 'H 後 (|00⟩+|10⟩)/√2。' }, { label: 'CNOT で |11⟩ 成分。' }, { label: '最終 |Φ⁺⟩。' }] }], expandables: [], practice: [{ question: 'Bell 準備の非零振幅は？', answer: '|00⟩, |11⟩ のみ各 1/√2。' }], labLink: 'Bell 状態生成ラボ' },
    '6.3': { title: '6.3 ゲート集合', paragraphs: ['Pauli, H, S, T, 回転, CNOT, CZ, SWAP, トフォリ。T は非クリフォードで普遍性に必要。', 'Rx,Ry,Rz は任意単一量子ビットユニタリ（位相を除く）。'], checkpoints: [{ question: 'H,CNOT と組み非クリフォードで普遍に必要なゲートは？', answer: 'T' }], examples: [{ title: 'CNOT から SWAP', steps: [{ label: '3 つの CNOT。' }, { label: '線形トポロジーで交換。' }, { label: '深度 3。' }] }], expandables: [{ title: '普遍性 {H,T,CNOT}', paragraphs: ['Solovay–Kitaev。クリフォードは古典シミュレーション可能。'] }], practice: [{ question: 'S² on |1⟩ は？', answer: 'SS = Z。' }], labLink: '量子ゲート探索器' },
    '6.4': { title: '6.4 状態ベクトルと確率読出し', paragraphs: ['理想シミュレータは 2^n 振幅の状態ベクトル。Born 規則 P(x)=|α_x|²。', 'もつれでは一量子ビット周辺は 50/50 でも joint は相関。'], checkpoints: [{ question: '理想シミュレータが追う主オブジェクトは？', answer: 'statevector' }], examples: [{ title: '|Φ⁺⟩ の読出し', steps: [{ label: '00,11 が 1/√2。' }, { label: 'P(00)=P(11)=1/2。' }, { label: '周辺は 50/50。' }, { label: '01,10 はゼロ——もつれの印。' }] }], expandables: [{ title: '弱測定と強測定', paragraphs: ['本コースは Z 投影測定を既定。'] }], practice: [{ question: '|00⟩,|01⟩ に振幅 1/2 のみ。P(00) と独立性は？', answer: 'P(00)=1/4。積状態ではない。' }] },
    '6.5': { title: '6.5 深度、ゲート数、OpenQASM', paragraphs: ['深度は並列化できない層の数。幅は量子ビット数。NISQ は浅い回路を好む。', '指数増長するのは状態ベクトル次元 2^n。'], checkpoints: [{ question: '厳密シミュレーションで n に指数増長するのは？', answer: 'state vector dimension' }], examples: [{ title: '並列 vs 直列 H', steps: [{ label: '並列 H：深度 1。' }, { label: '同線に 2 H：深度 2。' }, { label: 'Bell：深度 2。' }] }], expandables: [{ title: 'OpenQASM 3 Bell 例', paragraphs: ['共通交換形式。'] }, { title: 'ハードウェア vs 理想', paragraphs: ['デコヒーレンス、SWAP 連鎖、T₂ と比較。'] }], practice: [{ question: 'Bell 後に SWAP（3 CNOT 直列）で深度は？', answer: '2+3=5。' }], labLink: '回路ビルダーを開く' },
  },
  widgets: {
    bellStepWalkthrough: { title: 'Bell 対——ステップモード', description: 'H₀ 次に CNOT₀₁。|Φ⁺⟩ を構築。', prev: '← 前', next: '次 →', stepLabel: 'ステップ {{current}}/{{total}}：{{gate}}', steps: { init: '初態 |00⟩', hadamard: 'q0 に H', cnot: 'CNOT₀₁' } },
    gateSetExplorer: { title: 'ゲート集合探索器', theta: 'θ = {{value}} rad', notes: { toffoli: '|110⟩→|111⟩', cnot: '|10⟩→|11⟩', cz: '|11⟩ に −1 位相', swap: '量子ビット交換', single: '{{gate}} on |{{input}}⟩' } },
    stateReadout: { title: '状態ベクトルと確率', phiPlus: '|Φ⁺⟩（2 量子ビット）', uniform: '一様（2 量子ビット）', bornRule: 'Born：P(x)=|⟨x|ψ⟩|²。', probability: 'P(|{{label}}⟩) = {{value}}%' },
    circuitMetrics: { title: '深度とゲート数', description: '基本 H₀, CNOT₀₁。q1 に追加 H。', extraH: 'q1 の追加 H：{{count}}', metrics: 'ゲート数 {{gates}} · 深度 {{depth}}', note: '幅 {{width}}。次元 2^n = {{dim}}。' },
    practice: { label: '練習問題。', revealSolution: '解答を表示' },
  },
  nav: { prev: '← 多量子ビット', next: '次：誤り訂正 →' },
};
