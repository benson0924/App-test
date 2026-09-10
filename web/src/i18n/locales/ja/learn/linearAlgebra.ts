import type { TranslationTree } from '@/i18n/types';

export const linearAlgebra: TranslationTree = {
  meta: {
    tag: '第3章',
    title: '量子計算のための線形代数',
    intro:
      '量子力学は複数上の線形代数です。本章では ket、bra、内積、投影、ユニタリ演算子というディラック記法を整え、以降の章で状態・測定・可逆ゲートを記述します。',
  },
  sections: {
    '3.1': {
      title: '3.1 Ket——ベクトル表示',
      paragraphs: [
        '量子純状態は複ヒルベルト空間の列ベクトル。|ψ⟩（psi ket）と書きます。1 量子ビットは ℂ²、計算基底 |0⟩, |1⟩ で張られます。',
        '|0⟩ = (1,0)ᵀ, |1⟩ = (0,1)ᵀ。|ψ⟩ = α|0⟩ + β|1⟩ は 2 成分列ベクトル：',
        'ket は左から行列が作用するベクトルであることを示します。多量子ビットでも列ベクトル像は同じです。',
        'ket 内の記号は標準基底方向の略記で、古典値が格納されているわけではありません。',
      ],
      checkpoints: [{ question: '1 量子ビット純状態の複振幅はいくつ？', answer: '2', hint: '|0⟩ と |1⟩ を数える。' }],
      examples: [{ title: '|+⟩ を列ベクトルで', steps: [{ label: '|0⟩ と |1⟩ の等重ね合わせ。' }, { label: '基底列ベクトルを代入して加算。' }, { label: '等しい実成分の正規化列ベクトル。' }] }],
      expandables: [{ title: '全体位相は非物理', paragraphs: ['e^{iγ}|ψ⟩ は観測確率を変えません。|ψ⟩ と e^{iγ}|ψ⟩ は物理的に等価。'] }],
    },
    '3.2': {
      title: '3.2 Bra——共役転置',
      paragraphs: [
        'ket |ψ⟩ の双対 bra ⟨ψ| は共役転置（エルミート随伴）の行ベクトル。|ψ⟩ = (α,β)ᵀ なら ⟨ψ| = (α*, β*)。',
        '(·)† は共役転置。⟨ψ| = |ψ⟩†。braket ⟨φ|ψ⟩ は行×列の内積です。',
      ],
      checkpoints: [{ question: 'bra ⟨0| の行ベクトルは？', answer: '(1, 0)', hint: '|0⟩ の共役転置。' }],
      examples: [{ title: '|ψ⟩ = (1,i)ᵀ の ⟨ψ|', steps: [{ label: '列ベクトルを書く。' }, { label: '各成分の複共役。' }, { label: '行ベクトルを形成。' }] }],
      expandables: [
        { title: 'なぜ共役？', paragraphs: ['⟨ψ|ψ⟩ が非負実数（ノルム二乗）になるため。'] },
        { title: '行列–ベクトル積の予習', paragraphs: ['U|ψ⟩ で状態を変換。bra は ⟨ψ|U†。随伴の向きに注意。'] },
      ],
    },
    '3.3': {
      title: '3.3 内積、ノルム、直交',
      paragraphs: [
        '内積 ⟨φ|ψ⟩ は共役成分の積の和：',
        'ノルム ‖ψ‖ = √(⟨ψ|ψ⟩)。正規化 ⟨ψ|ψ⟩ = 1。⟨φ|ψ⟩ = 0 なら直交——一度の測定で完全に区別可能。',
        '計算基底 {|0⟩,|1⟩} は正規直交——本書のデフォルト測定基底です。',
      ],
      checkpoints: [{ question: '|+⟩ と |−⟩ は直交？', answer: 'yes', hint: '⟨+|−⟩ を計算。' }],
      examples: [{ title: '|0⟩ と |+⟩ の内積', steps: [{ label: '列ベクトルで書く。' }, { label: '⟨0|+⟩ = 1/√2。' }, { label: '重なりあり——直交しない。' }] }],
      expandables: [{ title: '内積の性質', paragraphs: ['共役対称と第 2 引数への線形性——セスクリニア形式。'] }],
    },
    '3.4': {
      title: '3.4 投影と測定',
      paragraphs: [
        '計算基底測定の Born 規則：',
        '振幅 ⟨m|ψ⟩ の絶対値二乗が確率。結果 m 後は |m⟩ に収束。',
        '投影 P_m = |m⟩⟨m|。P(m) = ⟨ψ|P_m|ψ⟩。',
        '投影はエルミートかつ冪等 P_m² = P_m。',
      ],
      checkpoints: [{ question: '|ψ⟩ = |+⟩ の計算基底で P(0) は？', answer: '1/2', hint: '|⟨0|+⟩|²。' }],
      examples: [{ title: '|ψ⟩ = (3/5)|0⟩ + (4/5)|1⟩ を Z で測定', steps: [{ label: '⟨0|ψ⟩ = 3/5。' }, { label: 'P(0) = 9/25。' }, { label: 'P(1) = 16/25。' }] }],
      expandables: [{ title: '一般投影測定', paragraphs: ['正規直交基底の投影は Σ P_m = I。X 基底は |+⟩,|−⟩ への投影。'] }],
      labLink: '測定ラボ',
    },
    '3.5': {
      title: '3.5 外積と完備性',
      paragraphs: [
        '外積 |ψ⟩⟨φ| は 2×2 行列。φ = ψ なら秩 1 投影。',
        '正規直交基底の外積の和は単位演算子：',
        '完備関係 I = Σ|j⟩⟨j| が Born 規則の基盤です。',
      ],
      checkpoints: [{ question: '|0⟩⟨0| のランクは？', answer: '1', hint: '1 次元への投影。' }],
      examples: [{ title: '1 量子ビットの完備性', steps: [{ label: '各投影を明示。' }, { label: '加算。' }, { label: '和は I。' }] }],
      expandables: [{ title: 'スペクトル分解の予習', paragraphs: ['観測可能 A = Σ λ_k |k⟩⟨k|。外積は測定とゲートのスペクトル理論を統一。'] }],
      labLink: 'テンソル積ラボ',
    },
    '3.6': {
      title: '3.6 ユニタリ行列',
      paragraphs: [
        '量子ゲートはユニタリ U†U = I：',
        '|ψ\'⟩ = U|ψ⟩ は U† で可逆——情報は測定まで失われません。',
        '正規化は保存されます：',
      ],
      checkpoints: [{ question: 'ユニタリ U の det(U) は一般に？', answer: 'e^(iθ)', hint: '単位円上。' }],
      examples: [{ title: 'H がユニタリであること', steps: [{ label: 'Hadamard 行列。' }, { label: 'H† を計算。' }, { label: 'H†H = I。' }, { label: '有効状態を有効状態へ。' }] }],
      expandables: [{ title: '内積保存の証明', paragraphs: ['ユニタリは等長写像——長さと角度を保存。ゲートの合成もユニタリ。'] }],
      labLink: 'ユニタリチェッカー',
    },
  },
  widgets: {
    innerProduct: { intro: '2 つの 2 ベクトル（複成分）。⟨a|b⟩ = a₀* b₀ + a₁* b₁（quantum-core）。', preset00: '|0⟩ · |+⟩', preset01: '|0⟩ · |1⟩', preset02: '|+⟩ · |−⟩', vectorA: '|a⟩ 成分', vectorB: '|b⟩ 成分', reA0: 'Re a₀', imA0: 'Im a₀', reA1: 'Re a₁', imA1: 'Im a₁', reB0: 'Re b₀', imB0: 'Im b₀', reB1: 'Re b₁', imB1: 'Im b₁', invalidEntry: '無効な複素入力', normA: '|a| = {{value}}', normB: '|b| = {{value}}', rawInner: '⟨a|b⟩（生）= {{value}}', normalizedInner: '⟨â|b̂⟩（正規化）= {{value}}', overlapSquared: '|⟨a|b⟩|² = {{value}}%', orthogonal: ' — 直交（内積 ≈ 0）' },
    unitary: { label: '単一量子ビットゲート U', matrixU: '行列 U', productUdU: '積 U†U', isUnitary: '✓ U†U = I——ノルムを保存。', notUnitary: '✗ 非ユニタリ——有効な量子ゲートではない。' },
    projection: { intro: '振幅 α, β（実数で簡略）。P(0), P(1) を計算。', alpha: 'α（実）', beta: 'β（実）', p0: 'P(0)', p1: 'P(1)', completeness: 'P(0) + P(1) = {{sum}}%（完備関係）。' },
    labLink: 'フルラボを開く：{{title}} →',
  },
  nav: { allChapters: '← 全章', next: '次：多量子ビット →' },
};
