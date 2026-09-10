import type { TranslationTree } from '@/i18n/types';

export const oneQubit: TranslationTree = {
  meta: {
    title: '第2章：量子ビット',
    intro:
      '量子ビットは量子情報の基本単位です。古典ビットと異なり、干渉可能な複素振幅で記述されます。本章では重ね合わせ、測定、別基底、位相、ブロッホ球、基本ゲートの言語を整え、多量子ビットへ進む前の基盤を築きます。',
  },
  misconception: {
    myth: '量子ビットは単に 0 と 1 を同時に持つ。',
    correction:
      '量子ビットは ℂ² の正規化ベクトルです。測定は |α|² と |β|² の確率で古典結果を返します。振幅は位相情報を持ち、干渉と非 Z 測定に影響します。',
  },
  sections: {
    'what-is-a-qubit': {
      title: '2.1 量子ビットとは',
      paragraphs: [
        '古典ビットは {0, 1} に属します。量子ビットは |0⟩, |1⟩ を正規直交基底とする 2 次元複ベクトル空間に属し、一般の純状態は重ね合わせです：',
        '正規化で総測定確率は 1。全体位相 e^{iγ}|ψ⟩ は観測不能ですが、α と β の相対位相は非 Z 基底で物理的に意味があります。',
      ],
      checkpoints: [{ question: '全体位相を除き純量子ビットは何個の実パラメータ？', answer: '2', hint: 'ブロッホ球の θ と φ を考える。' }],
      examples: [{ title: '等重ね合わせ |+⟩', steps: [{ label: 'α = β = 1/√2。' }, { label: '正規化：1/2 + 1/2 = 1。' }, { label: 'H|0⟩ = |+⟩。' }, { label: 'Z 測定：P(0) = P(1) = 1/2。' }] }],
      expandables: [{ title: 'なぜ 2 つの複素数？', paragraphs: ['実数 2 つでは不足：複ヒルベルト空間がユニタリ演化による回転と干渉を可能にします。Born 規則は |α|² ですが、ゲートは平方前に複位相で振幅を合成します。'] }],
      labLink: '単一量子ビット状態探索器',
    },
    'complex-amplitudes': {
      title: '2.2 複素振幅',
      paragraphs: ['z = a + bi、共役 z* = a − bi、|z| = √(a² + b²)、極形式 z = re^{iφ}。オイラー e^{iφ} = cos φ + i sin φ が回転と位相を結びます。'],
      checkpoints: [],
      examples: [{ title: '振幅 (2 + i)/√13', steps: [{ label: 'a = 2/√13, b = 1/√13。' }, { label: '|z|² の確認。' }, { label: '完全な状態では |α|² + |β|² = 1。' }] }],
      expandables: [],
      labLink: '複素数探索器',
    },
    measurement: {
      title: '2.3 測定',
      paragraphs: ['Z 基底測定で 0 の確率 P(0) = |α|²、1 は P(1) = |β|²。0 を得れば |0⟩ に、1 なら |1⟩ に収束。これが投影測定の Born 規則です。'],
      checkpoints: [{ question: '|ψ⟩ を測って 1 なら測定後の状態は？', answer: '|1⟩' }],
      examples: [{ title: '状態 (√3/2 |0⟩ + 1/2 |1⟩)', steps: [{ label: 'α = √3/2, β = 1/2。' }, { label: 'P(0) = 3/4。' }, { label: 'P(1) = 1/4。' }, { label: '3/4 + 1/4 = 1。' }] }],
      expandables: [{ title: 'P(0) の完全な投影計算', paragraphs: ['⟨1|ψ⟩ = β。|0⟩⟨0| により P(0) = |α|²。'] }],
      labLink: '測定シミュレータ',
    },
    'other-bases': {
      title: '2.4 他の測定基底',
      paragraphs: ['X 基底：|+⟩, |−⟩。Y 基底：|i⟩, |−i⟩。選んだ基底で状態を書き、係数の絶対値二乗が確率です。'],
      checkpoints: [],
      examples: [{ title: 'X 基底で |−⟩ を測定', steps: [{ label: '|−⟩ は X 固有状態。' }, { label: 'P(−) = 1。' }, { label: 'Z 基底では P(0) = P(1) = 1/2——|+⟩ と同じ。' }] }],
      expandables: [],
      labLink: '測定シミュレータ（基底選択）',
    },
    'global-relative-phase': {
      title: '2.5 全体位相と相対位相',
      paragraphs: ['e^{iγ}|ψ⟩ を掛けても任意基底の確率は変わりません。|0⟩ と |1⟩ の相対位相は重要：|+⟩ と (|0⟩ + i|1⟩)/√2 は Z 統計は同じでも X,Y とブロッホ球上で異なります。'],
      checkpoints: [{ question: '|+⟩ と |−⟩ の Z 確率は同じ？', answer: 'yes', hint: 'どちらも等振幅の重ね合わせ。' }],
      examples: [],
      expandables: [],
      labLink: '単一量子ビット状態探索器',
    },
    'bloch-sphere': {
      title: '2.6 ブロッホ球',
      paragraphs: ['純量子ビット（全体位相を除く）は単位球上の点、θ ∈ [0,π], φ ∈ [0,2π)：'],
      checkpoints: [],
      examples: [{ title: '|0⟩ on ブロッホ球', steps: [{ label: 'θ = 0。' }, { label: '(x,y,z) = (0,0,1) 北極。' }] }],
      expandables: [],
      table: { headerState: '状態', headerBloch: 'ブロッホ (x, y, z)' },
      labLink: '3D ブロッホ球',
    },
    'one-qubit-gates': {
      title: '2.7 単一量子ビットゲート',
      paragraphs: ['ゲートは 2×2 ユニタリ。Pauli X はビット反転、Z は |1⟩ に位相、H は重ね合わせ。X² = Y² = Z² = H² = I, S² = Z, T² = S。'],
      checkpoints: [{ question: 'H|+⟩ は？', answer: '|0⟩', hint: 'H² = I。' }],
      examples: [],
      expandables: [{ title: 'ブロッホ球上の几何作用', paragraphs: ['X,Y,Z は各軸まわり 180° 回転。', 'H は Z 軸と X 軸を入れ替え。', 'S は Z まわり 90°、T は 45°。'] }],
      labLink: '量子ゲート探索器',
    },
  },
  widgets: {
    basisProbability: { title: '基底確率計算器', reAlpha: 'Re(α)：{{value}}', reBeta: 'Re(β)：{{value}}', imBeta: 'Im(β)：{{value}}', measurementBasis: '測定基底', outcome: '結果', probability: '確率', stateLabel: '|ψ⟩ = {{alpha}}|0⟩ + {{beta}}|1⟩' },
    relativePhase: { title: '相対位相スライダー', phiLabel: 'φ（ラジアン）：{{value}}', stateFormula: '|ψ⟩ = (|0⟩ + e^{iφ}|1⟩)/√2', zBasis: 'Z 基底', xBasis: 'X 基底', zUnchanged: 'P(0)：{{before}}% vs {{after}}%——変化なし', xChanges: 'P(+)：{{before}}% vs {{after}}%——φ で変化', blochY: 'ブロッホ y：{{before}} → {{after}}' },
  },
  practice: [
    { question: '(2|0⟩ + 3i|1⟩) を正規化し Z で P(0) を求める。', answer: 'ノルム √13。P(0) = 4/13。' },
    { question: '|ψ⟩ = (|0⟩ − |1⟩)/√2 の X で P(−) は？', answer: '状態は |−⟩ なので P(−) = 1。' },
    { question: '|0⟩ に X 次に H。結果は？', answer: 'X|0⟩ = |1⟩, H|1⟩ = |−⟩。' },
    { question: '|i⟩ のブロッホ座標は？', answer: '(0, 1, 0)、+Y 方向の赤道。' },
  ],
  nav: { prev: '← 古典計算', next: '線形代数 →' },
};
