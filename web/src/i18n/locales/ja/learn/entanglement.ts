import type { TranslationTree } from '@/i18n/types';

export const entanglement: TranslationTree = {
  meta: {
    title: '第7章：もつれと Bell 相関',
    intro:
      'もつれた 2 量子ビットの状態は因数分解できません。EPR の問い、4 つの Bell 状態、相関と因果、部分トレースによる縮約状態を扱います。',
  },
  sections: {
    '7.1': { title: '7.1 EPR と局所隠れ変数', paragraphs: ['1935 年 EPR は量子力学の完全性を問いました。', 'LHV は作成時の事前値。Bell/CHSH は LHV の上限を超える量子相関を示す。', 'もつれはテレポーテーション等の資源。実験は量子を支持、ノーシグナリングは相対論を守る。'], checkpoints: [{ question: 'もつれだけで超光速メッセージ？', answer: 'no' }], examples: [{ title: 'EPR 型相関', steps: [{ label: '|Ψ⁻⟩ を共有。' }, { label: 'Z で常に反対。' }, { label: 'LHV の z。' }, { label: '量子は 2√2。' }] }], expandables: [{ title: 'EPR が主張しなかったこと', paragraphs: ['実用 FTL 電話ではない。'] }], practice: [{ question: 'LHV が答える問いは？', answer: '事前共有古典変数で非局所性なく全相関を再現できるか。' }], labLink: 'Bell/CHSH 実験ラボ' },
    '7.2': { title: '7.2 4 つの Bell 状態', paragraphs: ['Bell 基底は最大もつれ 2 量子ビットの完全正規直交集合。', '|Φ⁺⟩ は H+CNOT。Z/X で他 Bell 状態へ。|⟨Φ⁺|Ψ⁻⟩|²=0。'], checkpoints: [{ question: '|Φ⁺⟩ は積状態？', answer: 'no' }], examples: [{ title: '|Φ⁺⟩ と |Φ⁻⟩', steps: [{ label: 'H₀。' }, { label: 'CNOT。' }, { label: 'Z₁。' }, { label: 'X₁。' }] }], expandables: [], practice: [{ question: '|00⟩,|11⟩ だけの部分空間の Bell 状態数は？', answer: '2：|Φ⁺⟩,|Φ⁻⟩。' }], labLink: 'Bell 状態生成器' },
    '7.3': { title: '7.3 相関と因果', paragraphs: ['強い相関は古典因果を意味しない。', '測定順序を入れ替えても joint 分布同じ。Alice の基底選択は Bob の周辺を変えない。'], checkpoints: [{ question: 'Alice の角度だけでメッセージ？', answer: 'no' }], examples: [{ title: 'Z で |Φ⁺⟩', steps: [{ label: '|00⟩,|11⟩ のみ。' }, { label: 'Alice Z：50/50。' }, { label: 'A=0 なら Bob |0⟩。' }, { label: 'Bob 周辺は 50/50。' }] }], expandables: [{ title: 'よくある誤解', paragraphs: ['古典チャネルなしではビット送信不可。'] }], practice: [{ question: 'Alice Z で 0、Bob の Z 周辺は？', answer: '条件付き |0⟩。Alice が X 測定でも Bob Z 周辺は 50/50。' }] },
    '7.4': { title: '7.4 縮約状態と部分トレース', paragraphs: ['ρ_A = Tr_B(|ψ⟩⟨ψ|)。|Φ⁺⟩ では ρ_A = I/2——局所無知、大域情報。', '|00⟩ では ρ_A = |0⟩⟨0|。'], checkpoints: [{ question: '|Φ⁺⟩ の縮約状態は純か混合か？', answer: 'mixed' }], examples: [{ title: '|Φ⁺⟩ の部分トレース', steps: [{ label: 'c₀₀=c₁₁=1/√2。' }, { label: 'Tr_B。' }, { label: 'Tr(ρ_A²)=1/2。' }, { label: 'S=ln2。' }] }], expandables: [{ title: 'Schmidt 分解', paragraphs: ['ランク 1 なら積状態。'] }], practice: [{ question: '|00⟩ と |Φ⁺⟩ の純度比較', answer: '|00⟩ 純度 1、|Φ⁺⟩ 1/2。' }], labLink: 'もつれ測定ラボ' },
  },
  widgets: {
    bellStatesExplorer: { title: '4 つの Bell 状態', productQuestion: '積状態？', productYes: 'はい', productNo: 'いいえ', entangledNote: '——4 つすべてもつれ。', jointProbabilities: 'Joint 確率：' },
    partialTrace: { title: '量子ビット A の縮約状態', phiPlus: '|Φ⁺⟩（もつれ）', product: '|00⟩（積）', description: 'Tr_B(|ψ⟩⟨ψ|)。もつれでは純 joint でも混合縮約。', rhoLabel: 'ρ_A = [ {{matrix}} ]', purity: '純度 Tr(ρ_A²) ≈ {{value}} —', pureCase: '純（積）', mixedCase: '混合（Bell で ≈0.5）' },
    correlationDemo: { title: '相関と因果', zBasis: 'Z 基底', xBasis: 'X 基底', zNote: 'Z で常に一致。', xNote: 'X で反相関——非古典。', footer: '相関は因果ではない。CHSH が LHV を超える度合いを定量化。' },
    practice: { label: '練習問題。', revealSolution: '解答を表示' },
    labLink: 'フルラボ：{{title}} →',
  },
  nav: { prev: '← 誤り訂正', next: '次：量子プロトコル →' },
};
