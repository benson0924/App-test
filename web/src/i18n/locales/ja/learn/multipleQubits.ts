import type { TranslationTree } from '@/i18n/types';

export const multipleQubits: TranslationTree = {
  meta: {
    tag: '第4章',
    title: '多量子ビット',
    intro:
      '実際の量子コンピュータは多量子ビットレジスタを操作します。テンソル積による結合、もつれ、多量子ビットゲート、未知状態のクローン禁止について説明します。',
  },
  sections: {
    '4.1': { title: '4.1 テンソル積とヒルベルト空間の次元', paragraphs: ['二つの系 ℋ_A（次元 d_A）と ℋ_B（d_B）の合成空間は ℋ_A ⊗ ℋ_B、次元 d_A·d_B。', '各量子ビットは次元 2。n 量子ビットは 2^n 次元——古典シミュレーションが困難になる指数増長の理由。'], checkpoints: [{ question: '4 量子ビット純状態の複振幅数は？', answer: '16', hint: '2^n, n=4。' }], examples: [{ title: '3 量子ビットの振幅数', steps: [{ label: '量子ビットごとに次元倍。' }, { label: '2³ = 8。' }, { label: '基底 {|000⟩,…,|111⟩}。' }] }], expandables: [], labLink: 'テンソル積ラボ' },
    '4.2': { title: '4.2 クロネッカー積', paragraphs: ['ベクトルのテンソル積で複合 ket を構成。', 'ビッグエンディアン：左が量子ビット 0。|10⟩ は q0=|1⟩, q1=|0⟩。ゲートは U ⊗ V。'], checkpoints: [{ question: '|+⟩⊗|0⟩ と |0⟩⊗|+⟩ は同じ？', answer: 'no', hint: '順序が重要。' }], examples: [{ title: '|+⟩ ⊗ |0⟩ を手計算', steps: [{ label: '単一ベクトルを書く。' }, { label: 'クロネッカー規則。' }, { label: '|00⟩, |10⟩ だけ残る。' }] }], expandables: [{ title: '行列のクロネッカー積', paragraphs: ['H ⊗ I は Bell 準備の第一歩。'] }] },
    '4.3': { title: '4.3 もつれ', paragraphs: ['すべての 2 量子ビット状態が |a⟩⊗|b⟩ ではない。|Φ⁺⟩ = (|00⟩+|11⟩)/√2 が典型例。', 'もつれは古典的共有乱数を超える相関を生む。Bell 不等式の破れが実験で確認されています。'], checkpoints: [{ question: 'もつれで超光速通信できる？', answer: 'no', hint: '個別結果はランダム。' }], examples: [{ title: '|Φ⁺⟩ の測定相関', steps: [{ label: '計算基底で展開。' }, { label: '|00⟩ か |11⟩ のみ各 50%。' }, { label: 'q0=0 なら q1=0——完全相関。' }] }], expandables: [{ title: '超光速信号なし', paragraphs: ['ノーシグナリング定理。'] }, { title: '部分測定で状態収束', paragraphs: ['q0 を測ると |00⟩ か |11⟩ に。'] }], labLinks: ['もつれ測定ラボ', 'Bell 状態生成器'] },
    '4.4': { title: '4.4 多量子ビットゲート', paragraphs: ['単一ゲートは U⊗I または I⊗U。もつれには CNOT などが必要。', 'SWAP は交換、トフォリは古典可逆論理に普遍的。'], checkpoints: [{ question: 'SWAP|01⟩ は？', answer: '|10⟩' }], examples: [{ title: 'CNOT 真理値表', steps: [{ label: '制御 0 で変化なし。' }, { label: '制御 1 でターゲット反転。' }, { label: 'H 後に CNOT で |Φ⁺⟩。' }] }], expandables: [{ title: 'ゲート順序', paragraphs: ['[H⊗I, CNOT] が Bell。順序が重要。'] }], labLink: '量子回路ビルダー' },
    '4.5': { title: '4.5 クローン禁止定理', paragraphs: ['任意未知 |ψ⟩ を |0⟩ 付きで |ψ⟩|ψ⟩ にするユニタリは存在しない：', '線形性からの矛盾——Wootters-Zurek, Dieks。'], checkpoints: [{ question: '|0⟩ か |1⟩ と分かっているならクローン可能？', answer: 'yes', hint: '既知の直交状態。' }], examples: [{ title: '背理法の概略', steps: [{ label: 'クローナー U を仮定。' }, { label: '|+⟩|0⟩ に適用。' }, { label: '|+⟩|+⟩ とも矛盾。' }, { label: '普遍クローナーなし。' }] }], expandables: [{ title: '量子情報への含意', paragraphs: ['QEC は単純反復不可。', 'QKD で盗聴は状態を乱す。', 'テレポーテーションはクローンせず転送。'] }] },
    '4.6': { title: '4.6 普遍ゲート集合 {H, T, CNOT}', paragraphs: ['{H,T,CNOT} は任意 n 量子ビットユニタリを近似可能。', 'T は非クリフォード位相。CNOT がもつれを可能に。'], checkpoints: [{ question: '{H,CNOT} だけで任意 T 回転を近似できる？', answer: 'no', hint: 'クリフォードのみでは不十分。' }], examples: [{ title: 'クリフォード + T', steps: [{ label: 'クリフォードは古典シミュレーション可能だが非普遍。' }, { label: 'T で普遍化。' }, { label: 'T ゲートは FT で高コスト。' }] }], expandables: [{ title: '他の普遍集合', paragraphs: ['{Toffoli,H} など。ハードウェア原生ゲートは FT 集合にコンパイル。'] }], labLink: 'ゲート探索器' },
  },
  widgets: {
    dimensionExplorer: { label: '量子ビット数 (n)：{{n}}', hilbertSpace: '{{n}} 量子ビットは次元 2^{{n}} = {{dim}}。', stateVectorNote: '状態ベクトル長 {{dim}}。メモリ O(2^n)。', tooManyLabels: '{{dim}} 基底——表示過多。n ≤ 5 を試す。' },
    kroneckerProduct: { intro: '|+⟩ ⊗ |0⟩ を kronVec/tensorProduct で構成。', basisKet: '基底 ket', amplitude: '振幅', productNote: '|00⟩, |10⟩ のみ 1/√2——積状態、もつれなし。', kronMatch: ' ✓ 一致。' },
    entanglementChecker: { label: '2 量子ビット状態を選択', phiPlus: '|Φ⁺⟩ Bell', product: '|0⟩⊗|+⟩', psiPlus: '|Ψ⁺⟩ Bell', ket: 'Ket', probSquared: '|振幅|²', productState: '✓ 積状態。', entangled: '✗ もつれ——分解不可。' },
    bellPairCircuit: { title: 'Bell 対回路：H — CNOT', step: 'ステップ {{n}}：', reset: 'リセット', nextGate: '次のゲート', steps: { init: '|00⟩ で初期化', hadamard: '量子ビット 0 に H', cnot: 'CNOT（制御 q0, ターゲット q1）' }, tableKet: '|xy⟩', tableAmplitude: '振幅' },
    multiQubitGate: { cnotDesc: 'CNOT：制御 |1⟩ でターゲット反転。', swapDesc: 'SWAP：|01⟩ ↔ |10⟩。', toffoliDesc: 'トフォリ：両制御 |1⟩ でターゲット反転。', inputLabel: '入力 |{{input}}⟩', result: '{{gate}}|{{input}}⟩ = |{{output}}⟩' },
    universalGateSet: { intro: 'S = T², Z = S²。クリフォードだけでは非普遍——T が必要。', bellNote: 'Bell は {H,CNOT} のみ——一般アルゴリズムでは T が位相精度に必要。' },
    labLink: 'フルラボ：{{title}} →',
  },
  nav: { prev: '← 線形代数', next: '次：量子回路 →' },
};
