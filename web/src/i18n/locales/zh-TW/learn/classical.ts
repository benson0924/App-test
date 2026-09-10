import type { TranslationTree } from '@/i18n/types';

export const classical: TranslationTree = {
  meta: {
    tag: '第 1 章',
    title: '古典計算',
    intro:
      '在進入量子位元與疊加之前，我們需要先精確理解古典電腦如何表示資訊、以邏輯操作處理資訊，以及如何分析計算成本。本章建立這項基礎，並強調可逆性、錯誤校正與複雜度等概念——它們之後會以量子形式再次出現。',
  },
  sections: {
    'states-and-information': {
      title: '1.1 狀態與資訊',
      paragraphs: [
        '古典資訊存在於離散、可區分的配置中。最基本的單位是位元（bit），取 0 或 1 兩個值。實體實作方式多樣（電壓位準、磁化方向、打孔卡片等），但在邏輯上，每個古典暫存器都是一串位元。',
        'n 位元暫存器在任何時刻只能處於 2^n 種狀態之一。沒有「半個位元」，也不存在同時為 0 與 1 的情況——暫存器內容完全由其所持有的位元字串決定。',
        '請試用上方的互動探索器，或開啟「二元狀態探索器」實驗室。',
      ],
      checkpoints: [
        {
          question: '7 位元古典暫存器可表示多少種不同狀態？',
          answer: '128',
          hint: '使用 2^n，其中 n = 7。',
        },
      ],
      examples: [
        {
          title: '計算 4 位元位址數量',
          steps: [
            { label: '每增加一個位元，不同狀態數就加倍。從 1 位元 → 2 種狀態開始。' },
            { label: '當 n = 4 時，連乘四個 2。' },
            { label: '暫存器可表示無符號整數 0 到 15，或任意 16 個不同符號。' },
          ],
        },
      ],
      expandables: [],
      links: { binaryExplorer: '二元狀態探索器' },
    },
    'binary-numbers': {
      title: '1.2 二進位數',
      paragraphs: [
        '二進位字串不只是抽象狀態——它們編碼數字。每一位的權重是 2 的冪，從右（最低有效位）到左（最高有效位）讀取。',
        '二進位與十進位之間的轉換是常備技能。固定寬度表示會以前置零補齊，例如 4 位元中 5 寫成 0101。',
        '可在「二元狀態探索器」實驗室中練習轉換。',
      ],
      checkpoints: [
        {
          question: '二進位 10110 的十進位值是多少？',
          answer: '22',
          hint: '對位元為 1 的位置加總 2 的冪：16 + 4 + 2。',
        },
      ],
      examples: [
        {
          title: '將 1101₂ 轉為十進位',
          steps: [
            { label: '標出各位位置與權重（最右索引 i = 0）。' },
            { label: '計算各項。' },
            { label: '因此 1101₂ = 13₁₀。' },
          ],
        },
      ],
      expandables: [],
      links: { binaryExplorer: '二元狀態探索器' },
    },
    'logic-gates': {
      title: '1.3 邏輯閘',
      paragraphs: [
        '計算是轉換。邏輯閘根據固定真值表，將一個或多個位元輸入產生一個輸出位元。閘是電路的建構單元：組合式網路（無記憶）與循序式機器（含回授或時鐘）。',
        '常見閘包括 NOT（反相器）、AND、OR、XOR，以及其否定變體 NAND 與 NOR。',
        '可在「邏輯閘模擬器」實驗室中探索閘的組合。',
      ],
      checkpoints: [
        {
          question: 'AND(1, 0) 的輸出是多少？',
          answer: '0',
        },
      ],
      examples: [
        {
          title: '用 AND、OR、NOT 建構 XOR',
          steps: [
            { label: 'XOR 在輸入不同時為真——一個為 0、另一個為 1。' },
            { label: '等價地，XOR 是 OR 減去兩者皆為 1 的重疊情況。' },
            { label: '兩層電路：先算 AND 與 NOT 項，再以 OR 合併。' },
          ],
        },
      ],
      expandables: [],
      links: { logicGates: '邏輯閘模擬器' },
    },
    'boolean-algebra': {
      title: '1.4 布林代數',
      paragraphs: [
        '布林代數將閘抽象為符號，並具備交換律、結合律、分配律、單位元與補元等代數定律。這些定律讓我們能簡化電路，並在不逐一列舉所有輸入的情況下證明閘網路等價。',
        '德摩根定律在否定下交換 AND/OR，在正負邏輯轉換或優化晶片面積時不可或缺。',
      ],
      checkpoints: [
        {
          question: '依德摩根定律，NOT(A OR B) 等價於什麼？',
          answer: 'NOT(A) AND NOT(B)',
          hint: '否定會翻轉 AND 與 OR。',
        },
      ],
      examples: [
        {
          title: '化簡 ¬(A ∧ B) ∨ A',
          steps: [
            { label: '對被否定的 AND 項套用德摩根定律。' },
            { label: '代入原式。' },
            { label: '利用 OR 結合律與恆等式 A ∨ ¬A = 1。' },
            { label: '此式為恆真式——無論輸入如何，結果恒為 1。' },
          ],
        },
      ],
      expandables: [
        { title: '其他布林恆等式', paragraphs: [] },
      ],
    },
    adders: {
      title: '1.5 加法器',
      paragraphs: [
        '算術可化為重複的位元操作。半加器將兩位元相加產生和與進位；全加器還接受前一（較低位）欄的進位輸入。串接全加器即得漣波進位加法器。',
        '可在「二元加法器」實驗室中逐步互動練習加法。',
      ],
      checkpoints: [
        {
          question: '半加器在兩輸入皆為 1 時，和位元是多少？',
          answer: '0',
          hint: '和為 XOR；1 XOR 1 = 0。（進位為 1。）',
        },
      ],
      examples: [
        {
          title: '計算 0110₂ + 0011₂',
          steps: [
            { label: '從最右欄（LSB）開始：0 + 1 = 1，進位 0。' },
            { label: '下一欄：1 + 1 = 0，進位 1。' },
            { label: '第三欄含進位：1 + 0 + 1 = 0，進位 1。' },
            { label: '最高位欄：0 + 0 + 1 = 1。結果 1001₂ = 9₁₀。' },
          ],
        },
      ],
      expandables: [],
      links: { binaryAdder: '二元加法器' },
    },
    'reversible-computation': {
      title: '1.6 可逆計算',
      paragraphs: [
        '標準 AND 與 OR 閘是不可逆的：輸出無法唯一決定輸入（AND(0,0) 與 AND(0,1) 皆為 0）。Landauer 指出抹除資訊有熱力學成本——這促使可逆電路的發展，使每個輸出位元都能追溯回輸入。',
        '可逆古典閘是位元字串上的排列。Toffoli（CCNOT）閘在兩控制位元皆為 1 時翻轉目標位元；與 NOT 結合時，它是古典可逆計算的通用閘。量子計算採用 Toffoli（及其兩量子位元對應 CNOT）作為原生操作。',
      ],
      checkpoints: [
        {
          question: '當 A=1、B=1、C=0 時，Toffoli 閘的目標輸出是多少？',
          answer: '1',
          hint: '兩控制位元皆為 1 時，目標會翻轉。',
        },
      ],
      examples: [
        {
          title: '為何單獨的 AND 不可逆',
          steps: [
            { label: '假設 AND 閘輸出為 0。' },
            { label: '(0,0)、(0,1)、(1,0) 皆為有效原像——輸入資訊遺失。' },
            { label: '可逆替代方案保留輸入：以輔助位元將 (a,b) 映射為 (a, b, a∧b)。' },
          ],
        },
      ],
      expandables: [],
    },
    'classical-error-correction': {
      title: '1.7 古典錯誤校正',
      paragraphs: [
        '實體線路與記憶單元會因雜訊發生位元翻轉。錯誤校正碼增加冗餘，使接收端能偵測或修正錯誤。最簡單的想法是重複：每位元傳送三次，解碼時以多數決。',
        '更有效率的碼（Hamming、Reed–Solomon）在碼率與距離之間取得更好權衡。量子錯誤校正將這些概念推廣到保護量子位元——但不可克隆定理禁止單純重複，需要基於糾纏的穩定子碼。',
      ],
      checkpoints: [
        {
          question: '使用 3 位元重複碼，可校正多少個位元翻轉？',
          answer: '1',
          hint: '兩個相同位元可勝過第三個。',
        },
      ],
      examples: [
        {
          title: '含一個錯誤的多數決',
          steps: [
            { label: '將位元 1 編碼為三份：(1, 1, 1)。' },
            { label: '假設第 2 條線翻轉：收到 (1, 0, 1)。' },
            { label: '計數 1 的個數：三個中有兩個。多數決 = 1——錯誤已修正。' },
          ],
        },
      ],
      expandables: [],
      links: { errorCorrection: '錯誤校正模擬器' },
    },
    complexity: {
      title: '1.8 複雜度',
      paragraphs: [
        '隨問題規模擴大，資源使用變得重要。計算複雜度依輸入大小 n 下時間或空間的增長方式分類問題。多項式增長通常可行；指數增長很快變得難以處理。',
        '類別 P 包含在確定性圖靈機上可在多項式時間內解決的問題。NP 包含解可在多項式時間內驗證的問題。P 是否等於 NP 仍是未解問題。量子複雜度引入 BQP——有界誤差下量子電腦可有效解決的問題。',
      ],
      checkpoints: [
        {
          question: '對大的 n，O(n²) 與 O(2ⁿ) 哪個增長更快？',
          answer: 'O(2ⁿ)',
          hint: '指數最終會超越任何多項式。',
        },
      ],
      examples: [
        {
          title: '在 n = 20 時比較 O(n) 與 O(2ⁿ)',
          steps: [
            { label: '線性增長：20 次操作（至多常數因子）。' },
            { label: '指數：2²⁰ ≈ 1,048,576 次操作。' },
            { label: '在此 modest 輸入大小下，指數演算法約慢 50,000 倍。' },
          ],
        },
      ],
      expandables: [],
      links: { complexity: '複雜度類別' },
    },
    'turing-machines': {
      title: '1.9 圖靈機',
      paragraphs: [
        '圖靈機是計算的抽象模型：有限控制、分成格子的無限紙帶，以及可左右移動的讀寫頭。儘管結構簡單，它捕捉現代電腦可計算的一切——Church–Turing 論題將直覺上的「演算法」等同於圖靈機可計算性。',
        '轉移函數 δ 指定在每個狀態與紙帶符號下，要寫入什麼、往哪個方向移動、以及下一狀態。若機器在每個輸入上皆停機，接受成員、拒絕非成員，則稱其決定一個語言。',
      ],
      checkpoints: [
        {
          question: '圖靈機可以有無限多個狀態嗎？',
          answer: 'no',
          hint: '控制部分是有限的；只有紙帶是無界的。',
        },
      ],
      examples: [
        {
          title: '判定以「01」結尾的字串',
          steps: [
            { label: '向右掃描直到空白——記住最後看到的兩個符號。' },
            { label: '若最後兩個符號為 0 接 1，則接受。' },
            { label: '否則拒絕。儘管紙帶無界，機器只使用有限記憶（最後兩字元）。' },
          ],
        },
      ],
      expandables: [
        {
          title: '量子電路作為新模型',
          paragraphs: [
            '量子電腦不是帶隨機性的圖靈機——它以振幅、酉演化與投影測量擴展模型。類別 BQP 捕捉高效量子演算法可計算的内容；它位於 PSPACE 內，且對特定結構化問題可能超越 P。',
          ],
        },
      ],
    },
  },
  widgets: {
    bitExplorer: {
      label: '位元數 (n)：{{n}}',
      registerStates: '{{n}} 位元暫存器有 2^{{n}} = {{count}} 種不同狀態。',
      scrollHint: '顯示全部 {{count}} 個字串——可捲動瀏覽。當 n = 10 時，暫存器有 1,024 種狀態。',
    },
    binaryConverter: {
      binary: '二進位',
      decimal: '十進位',
      toDecimal: '→ 十進位',
      toBinary: '→ 二進位',
      fixedWidth: '固定寬度：{{width}} 位元',
      unsignedInterpretation: '（無符號解釋）',
    },
    truthTable: {
      gate: '閘',
      headerA: 'A',
      headerB: 'B',
      notPlaceholder: '—',
    },
    deMorgan: {
      andMode: '德摩根（AND）',
      orMode: '德摩根（OR）',
      equal: '✓ 相等',
      differ: '✗ 不同',
    },
    rippleCarry: {
      aBinary: 'A（二進位）',
      bBinary: 'B（二進位）',
      carries: '進位（MSB→LSB）：[{{carries}}]',
      reset: '重設',
      stepThrough: '逐步加法',
      doneRestart: '完成——重新開始',
      nextBit: '下一位（欄 {{col}}）',
      decimalCheck: '十進位驗算：{{a}} + {{b}} = {{sum}}',
    },
    toffoli: {
      description: '控制位 A、B——當兩控制皆為 1 時，目標 C 會翻轉。',
      targetFlipped: '——目標已翻轉',
      noChange: '——無變化',
    },
    errorCorrection: {
      description: '3 位元重複碼：每位元編碼三次；解碼時以多數決。',
      dataBit: '資料位元：{{bit}}',
      flipWire: '翻轉線 {{i}}',
      encoded: '編碼後：[{{bits}}]',
      transmitted: '傳送後：[{{bits}}]',
      majorityVote: '多數決 →',
      correct: '（正確！）',
      error: '（錯誤！）',
      parityNote: '傳送位元的同奇偶性：{{parity}}。古典碼以冗餘換取穩健性。',
    },
    complexityGraph: {
      inputSize: '輸入大小 n = {{n}}',
      exponentialNote:
        '指數增長（O(2ⁿ)）很快占優——這是量子演算法在結構化問題上具有潛力的核心動機之一。',
    },
    turingSimulation: {
      title: '概念模擬：二進位加一',
      description:
        '想像一台圖靈機在紙帶上讀取二進位數（最低有效位在讀寫頭下），加 1 後停機。演算法類似漣波進位：從右往左翻轉位元，直到 0 變 1 或需要新的最高位 1。',
      step1: '在 LSB 以「進位 = 1」狀態開始。',
      step2: '若當前格為 0 且進位 = 1：寫 1，進位 = 0，停機（或若還有更多位則左移）。',
      step3: '若當前格為 1 且進位 = 1：寫 0，進位 = 1，左移。',
      step4: '若紙帶結束時進位仍 = 1：延伸並寫入新的最高位 1。',
      example: '範例：1011₂ + 1 → 1100₂（翻轉尾端 1 直到遇到 0，再傳播進位）。',
    },
  },
  nav: {
    allChapters: '← 所有章節',
    next: '下一章：單量子位元 →',
  },
};
