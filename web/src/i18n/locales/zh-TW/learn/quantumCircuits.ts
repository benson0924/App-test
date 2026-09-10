import type { TranslationTree } from '@/i18n/types';

export const quantumCircuits: TranslationTree = {
  meta: {
    title: '第 6 章：量子電路',
    intro:
      '量子電路模型是量子演算法的標準程式圖像：量子位元為線，時間由左到右（或圖由上到下），酉閘變換振幅，測量產生古典位元。本章固定慣例、逐步走過 Bell 製備電路、概覽常用閘集，並將電路度量連結到模擬與硬體限制。',
  },
  sections: {
    '6.1': {
      title: '6.1 電路模型慣例',
      paragraphs: [
        '每條水平線是一個量子位元的世界線。線上的方塊是單量子位元閘；連接兩線的垂直線是兩量子位元閘（CNOT 的控制為實心點、目標為 ⊕）。閘依序套用：左到右圖中最右閘最後作用於態向量。',
        '控制使操作以另一量子位元為 |1⟩ 為條件（正控制）。多控制閘推廣此概念。測量以儀表符號表示；投影到計算基底結果並輸出古典位元。中途測量與古典前饋使後續閘依早先結果而定——傳送與錯誤校正所必需。',
        '古典線（雙線）承載測量結果。本教科書模擬器追蹤完整態向量直至測量；硬體依校準與連通性限制執行脈衝實作各閘。',
      ],
      checkpoints: [{ question: '左到右圖中，哪個閘最先作用於 |ψ_in⟩？', answer: 'leftmost', hint: '時間由左到右；最左閘最先。' }],
      examples: [{ title: '閱讀閘順序', steps: [{ label: '電路：對 |0⟩ 先 X 再 H。' }, { label: '先 X：|0⟩ → |1⟩。' }, { label: '再 H：|1⟩ → |−⟩。' }, { label: '反序得 H|0⟩ = |+⟩ 再 X|+⟩ = |−⟩——此例相同，但一般 [H,X] ≠ 0。' }] }],
      expandables: [{ title: '張量積線序', paragraphs: ['n 量子位元基底態為 |q₀q₁…q_{n−1}⟩，量子位元 0 常在最上線。模擬器中態索引通常為二進位整數。移植電路時請查各工具量子位元索引慣例。'] }],
      practice: [{ question: 'CNOT 控制為量子位元 1、目標為 0，初態 |10⟩。輸出是什麼？', answer: '控制為 |1⟩，目標翻轉：|10⟩ → |11⟩。' }],
      labLink: '開啟電路建構器',
    },
    '6.2': {
      title: '6.2 Bell 電路逐步演示',
      paragraphs: [
        'Bell 態 |Φ⁺⟩ = (|00⟩ + |11⟩)/√2 是典型糾纏對。由 |00⟩ 經一個 Hadamard 與一個 CNOT 製備——最小糾纏電路。理解各步建立控制量子位元疊加如何將相關傳到目標的直覺。',
        'H₀ 後量子位元 0 為 |+⟩、量子位元 1 仍 |0⟩——乘积態 (|+⟩⊗|0⟩)。CNOT 糾纏：+ 分支保持 |00⟩；結果為 |00⟩ 與 |11⟩ 等權，|01⟩、|10⟩ 為零。',
      ],
      checkpoints: [{ question: '僅對量子位元 0 套用 H 後，兩量子位元態是否糾纏？', answer: 'no', hint: '仍是乘积 |+⟩ ⊗ |0⟩。' }],
      examples: [{ title: '各步振幅', steps: [{ label: '|00⟩ 在索引 00 振幅為 1。' }, { label: 'H₀：( |00⟩ + |10⟩)/√2。' }, { label: 'CNOT₀₁ 將 |10⟩ → |11⟩。' }, { label: '最終為 |Φ⁺⟩。' }] }],
      expandables: [],
      practice: [{ question: '概念上寫 Bell 製備電路在 {|00⟩,|01⟩,|10⟩,|11⟩} 基底的酉矩陣，並列出非零振幅。', answer: 'U = CNOT · (H ⊗ I)。由 |00⟩ 起僅 |00⟩、|11⟩ 振幅 1/√2；|01⟩、|10⟩ 為零——偶宇稱子空間上的最大糾纏支撐。' }],
      labLink: 'Bell 態產生器實驗室',
    },
    '6.3': {
      title: '6.3 閘集：I, X, Y, Z, H, S, T, 旋轉, CNOT, CZ, SWAP, Toffoli',
      paragraphs: [
        'Pauli 閘 I, X, Y, Z 為對合（X 翻轉位元、Z 翻相位、Y = iXZ）。Hadamard H 產生疊加並交換 Z/X 基底。相位閘 S（√Z，|1⟩ 上 π/2）與 T（⁴√Z，π/4）在容錯構造中常見，因 T 非 Clifford——與 H、CNOT 一起才通用。',
        '旋轉閘 Rx(θ), Ry(θ), Rz(θ) 實作 exp(−iθσ/2)——任意單量子位元酉（至多差全域相位）為旋轉。CNOT 在控制 |1⟩ 時翻目標；CZ 僅對 |11⟩ 加 −1 相位。SWAP 交換兩量子位元（硬體可能用三個 CNOT 實作）。Toffoli 在兩控制皆 |1⟩ 時翻目標——嵌入量子電路的古典可逆邏輯通用閘。',
      ],
      checkpoints: [{ question: '哪個閘非 Clifford 且與 H、CNOT 一起才通用？', answer: 'T', hint: '對 |1⟩ 加 π/4 相位。' }],
      examples: [{ title: '用 CNOT 分解 SWAP', steps: [{ label: 'SWAP = CNOT₀₁ · CNOT₁₀ · CNOT₀₁。' }, { label: '三個 CNOT 在線性拓撲上交換量子位元 0 與 1。' }, { label: '若每 CNOT 一層，深度為 3。' }] }],
      expandables: [{ title: '通用性：{H, T, CNOT}', paragraphs: ['任意 n 量子位元酉可用 H、T、CNOT 任意精度逼近（Solovay–Kitaev）。Clifford {H, S, CNOT, CZ} 可高效古典模擬（Gottesman–Knill）——加入 T 才計算通用。'] }],
      practice: [{ question: '對 |1⟩ 套用兩次 S。SS 等價於何閘？', answer: 'S|1⟩ = i|1⟩；S²|1⟩ = −|1⟩ = Z|1⟩。故 SS = Z（其他基底至多差全域相位，S² = Z 精確）。' }],
      labLink: '量子閘探索器',
    },
    '6.4': {
      title: '6.4 態向量與機率讀出',
      paragraphs: [
        '理想模擬器儲存態向量——n 量子位元有 2ⁿ 個複振幅。每閘後振幅以矩陣乘法更新。測量在取樣或坍縮前不改變向量：Born 規則給 P(x) = |α_x|²。',
        '糾纏態中單量子位元邊際機率可能 50/50，但聯合結果完美相關。請區分完整態向量讀出（模擬器）與多次射擊直方圖（硬體）。',
      ],
      checkpoints: [{ question: '理想模擬器主要追蹤什麼物件？', answer: 'statevector', hint: '2^n 個振幅的列表。' }],
      examples: [{ title: '|Φ⁺⟩ 讀出', steps: [{ label: '非零振幅：00 與 11 各 1/√2。' }, { label: 'P(00) = P(11) = 1/2。' }, { label: '單量子位元邊際：P(q₀=0)=P(q₀=1)=1/2——個別無相關。' }, { label: '聯合：永不見 01 或 10——糾纏特徵。' }] }],
      expandables: [{ title: '弱測量與強測量', paragraphs: ['強投影測量使態坍縮。弱測量以較小擾動提取部分資訊——用於部分實驗與錯誤監測。本課程除非註明，使用 Z（計算）基底的投影測量。'] }],
      practice: [{ question: '兩量子位元態在 |00⟩、|01⟩ 振幅 1/2，|10⟩、|11⟩ 為 0。P(00) 是多少？量子位元 1 是否獨立於 0？', answer: 'P(00) = (1/2)² = 1/4。已知 q₀=0 僅剩 |00⟩、|01⟩ 等權——q₁ 不獨立。' }],
    },
    '6.5': {
      title: '6.5 電路深度、閘數與 OpenQASM',
      paragraphs: [
        '電路深度計數同一量子位元上無法並行執行的閘層數。閘數為操作總數——與執行時間及錯誤累積相關。寬度為量子位元數。NISQ 裝置偏好淺而寬、原生閘集與有限連通性的電路。',
        '隨 n 指數增長的是態向量維度 2ⁿ——精確模擬 50+ 量子位元對一般態不可行。結構化電路（Clifford、低糾纏）可能更久可處理。',
      ],
      checkpoints: [{ question: '精確模擬中何者隨量子位元數 n 指數增長？', answer: 'state vector dimension', hint: '希爾伯特空間大小 2^n。' }],
      examples: [{ title: '並行與串行 H 閘', steps: [{ label: '對量子位元 0、1 並行 H：深度 1，2 閘。' }, { label: '對量子位元 0 連續兩次 H：深度 2。' }, { label: 'Bell 電路 H₀ + CNOT：深度 2（CNOT 等控制上 H 完成）。' }] }],
      expandables: [
        { title: 'OpenQASM 3 範例——Bell 對', paragraphs: ['OpenQASM 是常見交換格式。qreg/creg 宣告量子與古典暫存器；閘名稱對應硬體或標準庫。可從電路建構器匯出（若可用）。'] },
        { title: '硬體與理想模擬', paragraphs: ['真實裝置有退相干、讀出錯誤與有限連通性——SWAP 鏈增加深度。本書模擬理想酉演化；實驗室可另行注入雜訊。估計成功機率時請比較深度與相干時間 T₂ 及閘保真度。'] },
      ],
      practice: [{ question: 'Bell 製備 2 閘深度 2。之後用 3 個 CNOT 實作 SWAP，若 3 層串行，深度如何？', answer: '原深度 2。三層 CNOT 加 3，總深度 5（假設 SWAP 在 Bell 之後且各層不與先前操作重疊）。' }],
      labLink: '開啟電路建構器',
    },
  },
  widgets: {
    bellStepWalkthrough: {
      title: 'Bell 對——逐步模式',
      description: '電路：對量子位元 0 套用 H，再 CNOT（控制 0、目標 1）。逐步建構 |Φ⁺⟩。',
      prev: '← 上一步',
      next: '下一步 →',
      stepLabel: '步驟 {{current}}/{{total}}：{{gate}}',
      steps: { init: '初態 |00⟩', hadamard: '對量子位元 0 套用 H', cnot: 'CNOT₀₁' },
    },
    gateSetExplorer: {
      title: '閘集探索器',
      theta: 'θ = {{value}} 弧度',
      notes: {
        toffoli: '|110⟩ → |111⟩（兩控制皆 1 時翻目標）',
        cnot: '|10⟩ → |11⟩',
        cz: '對 |11⟩ 加 −1 相位',
        swap: 'SWAP 交換量子位元',
        single: '對 |{{input}}⟩ 套用 {{gate}}',
      },
    },
    stateReadout: {
      title: '態向量與機率讀出',
      phiPlus: '|Φ⁺⟩（2 量子位元）',
      uniform: '均勻（2 量子位元）',
      bornRule: 'Born 規則：P(x) = |⟨x|ψ⟩|²。僅顯示非零振幅的 {{n}} 位元字串。',
      probability: 'P(|{{label}}⟩) = {{value}}%',
    },
    circuitMetrics: {
      title: '深度與閘數',
      description: '基礎電路：H₀、CNOT₀₁。在量子位元 1 上加額外 H（同線→增加深度）。',
      extraH: '量子位元 1 上額外 H 閘：{{count}}',
      metrics: '閘數：{{gates}} · 電路深度：{{depth}}',
      note: '寬度 = 量子位元線數 ({{width}})。深度 = 重疊量子位元上最長關鍵路徑。態向量維度 = 2^n = {{dim}}。',
    },
    practice: { label: '練習題。', revealSolution: '顯示解答' },
  },
  nav: { prev: '← 多量子位元', next: '下一章：錯誤校正 →' },
};
