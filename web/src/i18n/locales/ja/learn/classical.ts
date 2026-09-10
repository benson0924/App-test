import type { TranslationTree } from '@/i18n/types';

export const classical: TranslationTree = {
  meta: {
    tag: '第1章',
    title: '古典計算',
    intro:
      '量子ビットと重ね合わせの前に、古典コンピュータが情報をどのように表現し、論理で操作し、計算コストをどう考えるかを明確にする必要があります。本章はその基盤を築き、可逆性・誤り訂正・計算量など、後に量子の形で再登場する概念を強調します。',
  },
  sections: {
    'states-and-information': {
      title: '1.1 状態と情報',
      paragraphs: [
        '古典情報は離散的で区別可能な構成に存在します。最小単位はビットで、0 または 1 のいずれかをとります。物理実装は様々ですが、論理的にはすべての古典レジスタはビット列です。',
        'n ビットのレジスタは任意の瞬間に 2^n 状態のいずれか一つにあります。分数ビットはなく、0 と 1 の同時状態もありません——内容はビット列で完全に決まります。',
        '上のインタラクティブ探索器を試すか、「バイナリ状態探索器」ラボを開いてください。',
      ],
      checkpoints: [{ question: '7 ビットの古典レジスタは何種類の状態を表せますか？', answer: '128', hint: '2^n（n = 7）を使います。' }],
      examples: [{ title: '4 ビットアドレスの数え上げ', steps: [{ label: 'ビットを増やすと状態数は倍になります。1 ビット → 2 状態。' }, { label: 'n = 4 のとき、2 を 4 回掛けます。' }, { label: 'レジスタは符号なし整数 0〜15、または 16 個の任意の記号を表せます。' }] }],
      expandables: [],
      links: { binaryExplorer: 'バイナリ状態探索器' },
    },
    'binary-numbers': {
      title: '1.2 二進数',
      paragraphs: [
        '二進列は抽象状態ではなく数を符号化します。各桁の重みは 2 の累乗で、右（LSB）から左（MSB）に読みます。',
        '二進と十進の変換は基本技能です。固定幅では先頭に 0 を付け、例えば 4 ビットで 5 は 0101 になります。',
        '「バイナリ状態探索器」ラボで変換を練習できます。',
      ],
      checkpoints: [{ question: '二進 10110 の十進値は？', answer: '22', hint: 'ビットが 1 の位置の 2 の累乗を足します：16 + 4 + 2。' }],
      examples: [{ title: '1101₂ を十進に変換', steps: [{ label: '桁位置と重みを特定（右端 i = 0）。' }, { label: '各項を計算。' }, { label: 'よって 1101₂ = 13₁₀。' }] }],
      expandables: [],
      links: { binaryExplorer: 'バイナリ状態探索器' },
    },
    'logic-gates': {
      title: '1.3 論理ゲート',
      paragraphs: [
        '計算は変換です。論理ゲートは固定の真理値表に従い、ビット入力から出力ビットを生成します。ゲートは回路の構成要素：組合せ回路（記憶なし）と順序回路（フィードバックやクロック）。',
        'NOT、AND、OR、XOR および NAND、NOR などが一般的です。',
        '「論理ゲートシミュレータ」ラボでゲートの組み合わせを探索してください。',
      ],
      checkpoints: [{ question: 'AND(1, 0) の出力は？', answer: '0' }],
      examples: [{ title: 'AND、OR、NOT から XOR を構成', steps: [{ label: 'XOR は入力が異なるとき真——一方 0、他方 1。' }, { label: '等価に、OR から両方 1 の重なりを引く。' }, { label: '2 段回路：AND と NOT 項を計算し OR で結合。' }] }],
      expandables: [],
      links: { logicGates: '論理ゲートシミュレータ' },
    },
    'boolean-algebra': {
      title: '1.4 ブール代数',
      paragraphs: [
        'ブール代数はゲートを記号化し、交換・結合・分配・単位元・補元などの法則を持ちます。これにより回路を簡約し、全入力を列挙せずゲート網の等価を証明できます。',
        'ド・モルガンの法則は否定下で AND/OR を入れ替え、正負論理の変換やチップ面積最適化に不可欠です。',
      ],
      checkpoints: [{ question: 'ド・モルガンにより NOT(A OR B) は何と等価？', answer: 'NOT(A) AND NOT(B)', hint: '否定は AND と OR を入れ替えます。' }],
      examples: [{ title: '¬(A ∧ B) ∨ A を簡約', steps: [{ label: '否定された AND にド・モルガンを適用。' }, { label: '式に代入。' }, { label: 'OR の結合と A ∨ ¬A = 1 を使用。' }, { label: '常に 1 の恒真式。' }] }],
      expandables: [{ title: 'その他のブール恒等式', paragraphs: [] }],
    },
    adders: {
      title: '1.5 加算器',
      paragraphs: [
        '算術はビット操作の反復に帰着します。半加算器は和と桁上げを出し、全加算器は前桁からの桁上げも受け取ります。全加算器を連鎖するとリプルキャリー加算器になります。',
        '「バイナリ加算器」ラボでインタラクティブに加算を追えます。',
      ],
      checkpoints: [{ question: '半加算器で両入力が 1 のとき和ビットは？', answer: '0', hint: '和は XOR；1 XOR 1 = 0（桁上げは 1）。' }],
      examples: [{ title: '0110₂ + 0011₂', steps: [{ label: '最右列（LSB）：0 + 1 = 1、桁上げ 0。' }, { label: '次列：1 + 1 = 0、桁上げ 1。' }, { label: '桁上げ込み：1 + 0 + 1 = 0、桁上げ 1。' }, { label: 'MSB：0 + 0 + 1 = 1。結果 1001₂ = 9₁₀。' }] }],
      expandables: [],
      links: { binaryAdder: 'バイナリ加算器' },
    },
    'reversible-computation': {
      title: '1.6 可逆計算',
      paragraphs: [
        '標準の AND/OR は不可逆：出力から入力を一意に決められません（AND(0,0) と AND(0,1) はどちらも 0）。ランドアauer は情報消去に熱力学的コストがあることを示し、すべての出力ビットが入力に遡れる可逆回路を促しました。',
        '可逆古典ゲートはビット列の置換です。トフォリ（CCNOT）は両制御が 1 のときだけターゲットを反転し、NOT と組み合わせて古典可逆計算に普遍的です。量子計算はトフォリ（と 2 量子ビットの CNOT）をネイティブ操作として採用します。',
      ],
      checkpoints: [{ question: 'A=1, B=1, C=0 のときトフォリのターゲット出力は？', answer: '1', hint: '両制御が 1 のときターゲットが反転。' }],
      examples: [{ title: 'AND だけでは不可逆な理由', steps: [{ label: 'AND の出力が 0 とする。' }, { label: '(0,0),(0,1),(1,0) がすべて原像——入力が失われる。' }, { label: '可逆代替：補助ビットで (a,b)→(a,b,a∧b)。' }] }],
      expandables: [],
    },
    'classical-error-correction': {
      title: '1.7 古典誤り訂正',
      paragraphs: [
        '物理配線とメモリはノイズでビットが反転します。誤り訂正符号は冗長性を加え、受信側が誤りを検出・修正できます。最も単純なのは 3 回繰り返しと多数決です。',
        'より効率的な符号（ハミング、リード・ソロモン）はレートと距離のトレードオフを改善します。量子誤り訂正はこれを量子ビットに拡張しますが、クローン禁止定理により単純な反復は不可で、もつれベースの安定化符号が必要です。',
      ],
      checkpoints: [{ question: '3 ビット反復符号で訂正できるビット反転はいくつ？', answer: '1', hint: '2 つの一致が第 3 を上回る。' }],
      examples: [{ title: '1 ビット誤りの多数決', steps: [{ label: 'ビット 1 を (1,1,1) に符号化。' }, { label: '線 2 が反転：(1,0,1)。' }, { label: '1 が 2/3——多数決 1 で訂正。' }] }],
      expandables: [],
      links: { errorCorrection: '誤り訂正シミュレータ' },
    },
    complexity: {
      title: '1.8 計算量',
      paragraphs: [
        '問題が大きくなると資源が重要になります。計算量論は入力サイズ n に対する時間・空間の増え方で問題を分類します。多項式は一般に実行可能、指数は急速に非現実的になります。',
        'クラス P は決定性チューリングマシンで多項式時間に解ける問題。NP は解が多項式時間で検証可能。P = NP かは未解。量子計算量では BQP——有界誤差で量子が効率的に解ける問題——が導入されます。',
      ],
      checkpoints: [{ question: '大きな n で O(n²) と O(2ⁿ) のどちらが速く増える？', answer: 'O(2ⁿ)', hint: '指数はいずれの多項式も支配する。' }],
      examples: [{ title: 'n = 20 で O(n) と O(2ⁿ) を比較', steps: [{ label: '線形：約 20 操作。' }, { label: '指数：2²⁰ ≈ 1,048,576 操作。' }, { label: 'このサイズで指数は約 50,000 倍遅い。' }] }],
      expandables: [],
      links: { complexity: '計算量クラス' },
    },
    'turing-machines': {
      title: '1.9 チューリングマシン',
      paragraphs: [
        'チューリングマシンは計算の抽象モデル：有限制御、無限テープ、左右に動く読み書きヘッドです。その単純さにもかかわらず現代コンピュータが計算できるすべてを捉えます——チャーチ＝チューリングの論題が「アルゴリズム」と等価です。',
        '転移関数 δ は状態とテープ記号ごとに書き込み・移動・次状態を指定します。すべての入力で停止しメンバーを受理・非メンバーを拒否すれば、その言語を決定します。',
      ],
      checkpoints: [{ question: 'チューリングマシンは無限に多くの状態を持てる？', answer: 'no', hint: '制御は有限；テープだけが無限。' }],
      examples: [{ title: '末尾が「01」の文字列を決定', steps: [{ label: '空白まで右へ——最後の 2 記号を記憶。' }, { label: '0 の次が 1 なら受理。' }, { label: '否则拒否。無限テープでも有限記憶（最後 2 文字）。' }] }],
      expandables: [{ title: '量子回路という新モデル', paragraphs: ['量子コンピュータはランダム性付きチューリングマシンではなく、振幅・ユニタリ演化・投影測定でモデルを拡張します。BQP が効率的量子アルゴリズムを捉え、PSPACE 内にあり特定問題で P を超える可能性があります。'] }],
    },
  },
  widgets: {
    bitExplorer: { label: 'ビット数 (n)：{{n}}', registerStates: '{{n}} ビットレジスタは 2^{{n}} = {{count}} 状態。', scrollHint: '全 {{count}} 文字列を表示——スクロールで閲覧。n = 10 では 1,024 状態。' },
    binaryConverter: { binary: '二進', decimal: '十進', toDecimal: '→ 十進', toBinary: '→ 二進', fixedWidth: '固定幅：{{width}} ビット', unsignedInterpretation: '（符号なし解釈）' },
    truthTable: { gate: 'ゲート', headerA: 'A', headerB: 'B', notPlaceholder: '—' },
    deMorgan: { andMode: 'ド・モルガン (AND)', orMode: 'ド・モルガン (OR)', equal: '✓ 等しい', differ: '✗ 異なる' },
    rippleCarry: { aBinary: 'A（二進）', bBinary: 'B（二進）', carries: '桁上げ（MSB→LSB）：[{{carries}}]', reset: 'リセット', stepThrough: '加算をステップ', doneRestart: '完了——再開', nextBit: '次のビット（列 {{col}}）', decimalCheck: '十進確認：{{a}} + {{b}} = {{sum}}' },
    toffoli: { description: '制御 A, B——両方 1 のときターゲット C が反転。', targetFlipped: '——ターゲット反転', noChange: '——変化なし' },
    errorCorrection: { description: '3 ビット反復符号：各ビットを 3 回符号化、復号は多数決。', dataBit: 'データビット：{{bit}}', flipWire: '線 {{i}} を反転', encoded: '符号化：[{{bits}}]', transmitted: '送信：[{{bits}}]', majorityVote: '多数決 →', correct: '（正しい！）', error: '（誤り！）', parityNote: '送信ビットのパリティ：{{parity}}。古典符号は冗長で耐性を得る。' },
    complexityGraph: { inputSize: '入力サイズ n = {{n}}', exponentialNote: '指数増長 O(2ⁿ) は急速に支配——構造化問題での量子アルゴリズムの主要動機。' },
    turingSimulation: { title: '概念シミュレーション：二進インクリメント', description: 'テープ上の二進数（LSB がヘッド下）に 1 を足して停止するチューリングマシンを想像。リプルキャリーと同様に右からビットを反転。', step1: 'LSB で「桁上げ = 1」状態から開始。', step2: 'セル 0 かつ桁上げ 1：1 を書き桁上げ 0、停止（または左へ）。', step3: 'セル 1 かつ桁上げ 1：0 を書き桁上げ 1、左へ。', step4: 'テープ終端で桁上げ 1：新しい先頭 1 を追加。', example: '例：1011₂ + 1 → 1100₂。' },
  },
  nav: { allChapters: '← 全章', next: '次：単一量子ビット →' },
};
