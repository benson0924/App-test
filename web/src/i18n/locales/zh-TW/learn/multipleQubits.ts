import type { TranslationTree } from '@/i18n/types';

export const multipleQubits: TranslationTree = {
  meta: {
    tag: '第 4 章',
    title: '多量子位元',
    intro:
      '真實量子電腦操作多量子位元暫存器。本章說明單量子位元空間如何透過張量積組合、糾纏為何違反古典直覺、多量子位元閘在電路中的角色，以及為何某些操作（如克隆未知態）被根本禁止。',
  },
  sections: {
    '4.1': {
      title: '4.1 張量積與希爾伯特空間維度',
      paragraphs: [
        '當維度為 d_A 的 ℋ_A 與維度為 d_B 的 ℋ_B 被視為單一複合系統時，聯合空間為張量積 ℋ_A ⊗ ℋ_B，維度 d_A · d_B。',
        '對量子位元，各單量子位元空間維度為 2。n 量子位元暫存器因此存在於 2^n 維複希爾伯特空間。五量子位元需 32 個振幅；二十量子位元需逾百萬。此指數增長使一般量子電路的古典模擬變得不可行，也是量子電腦在部分問題上可能具優勢的原因。',
      ],
      checkpoints: [{ question: '4 量子位元純態需要多少個複振幅？', answer: '16', hint: '使用 2^n，n = 4。' }],
      examples: [{ title: '計算 3 量子位元的振幅數', steps: [{ label: '每個量子位元使維度加倍。' }, { label: '計算 2³。' }, { label: '基底為 {|000⟩, |001⟩, …, |111⟩}——八個正規正交 ket。' }] }],
      expandables: [],
      labLink: '張量積實驗室',
    },
    '4.2': {
      title: '4.2 克羅內克積',
      paragraphs: [
        '克羅內克積（向量上的張量積）由單量子位元 ket 建構複合 ket。若 |a⟩ = (a₀, a₁)ᵀ，|b⟩ = (b₀, b₁)ᵀ，則',
        '基底順序很重要：我們使用大端位元字串，最左量子位元為索引 0。故 |10⟩ 表示量子位元 0 為 |1⟩、量子位元 1 為 |0⟩。矩陣的克羅內克積類似地描述在不同量子位元上同時套用獨立閘：U ⊗ V。',
      ],
      checkpoints: [{ question: '|+⟩⊗|0⟩ 是否等同 |0⟩⊗|+⟩？', answer: 'no', hint: '張量積有順序——交換量子位元得不同態，除非同時 SWAP。' }],
      examples: [{ title: '手算 |+⟩ ⊗ |0⟩', steps: [{ label: '寫出單量子位元向量。' }, { label: '套用克羅內克積規則。' }, { label: '化簡——僅 |00⟩ 與 |10⟩ 存活。' }] }],
      expandables: [{ title: '矩陣的克羅內克積', paragraphs: ['對 |00⟩ 套用 H ⊗ I 使量子位元 0 進入疊加、量子位元 1 不變——每個 Bell 態製備電路的第一步。'] }],
    },
    '4.3': {
      title: '4.3 糾纏',
      paragraphs: [
        '並非每個兩量子位元態都是乘积 |a⟩ ⊗ |b⟩。無法因式分解的態稱為糾纏。Bell 態 |Φ⁺⟩ = (1/√2)(|00⟩ + |11⟩) 是典型例子：測量一個量子位元即瞬間決定另一個，無論距離多遠。',
        '糾纏產生比任何古典共享隨機性更強的相關。若 Alice 與 Bob 各持 |Φ⁺⟩ 的一個量子位元，各自見 0 或 1 各 50%——但結果恆相同。這不是古典意義下創造時送出的「隱藏指令」；量子力學預測 Bell 不等式違反，實驗已確認。',
      ],
      checkpoints: [{ question: '糾纏能否用於超光速傳送資訊？', answer: 'no', hint: '個別測量結果隨機；相關僅在事後比對結果時出現。' }],
      examples: [{ title: '|Φ⁺⟩ 的測量相關', steps: [{ label: '在計算基底展開。' }, { label: '測量兩量子位元：僅 |00⟩ 或 |11⟩，各 50%。' }, { label: '量子位元 0 得 0 時，量子位元 1 必為 0——完美相關。' }] }],
      expandables: [
        { title: '無超光速信號', paragraphs: ['雖測量相關，雙方無法控制本地結果以編碼訊息。無信號定理保證各子系統的約化密度矩陣不因遠方測量選擇而變。糾纏是傳送、超密編碼、QKD 等協定的資源，仍遵守因果性。'] },
        { title: '部分測量使聯合態坍縮', paragraphs: ['測量 |Φ⁺⟩ 的量子位元 0 得 |0⟩ 機率 ½，對處於 |00⟩；得 |1⟩ 機率 ½，處於 |11⟩。未測量子位元現與結果相關——但需經古典通道比對才能偵測。'] },
      ],
      labLinks: ['糾纏測量實驗室', 'Bell 態產生器'],
    },
    '4.4': {
      title: '4.4 多量子位元閘',
      paragraphs: [
        '單量子位元閘在兩量子位元系統上為 U ⊗ I 或 I ⊗ U。產生糾纏需要無法分解為獨立單量子位元操作的多量子位元閘。主力是 CNOT（受控 NOT）：控制為 |1⟩ 時翻轉目標。',
        'SWAP 交換兩量子位元——在連通性受限的硬體上用於路由。Toffoli（CCNOT）在兩控制皆為 |1⟩ 時翻轉目標；對古典可逆計算通用，並出現於量子算術電路。',
      ],
      checkpoints: [{ question: 'SWAP|01⟩ 等於什麼？', answer: '|10⟩' }],
      examples: [{ title: 'CNOT 在計算基底上的真值表', steps: [{ label: '控制為 0 時 |00⟩、|01⟩ 不變。' }, { label: '控制為 1 時目標翻轉。' }, { label: '對 H 後的 (|00⟩+|10⟩)/√2 套用，得 |Φ⁺⟩。' }] }],
      expandables: [{ title: '閘順序很重要', paragraphs: ['量子電路由左到右（或由上到下）排序。[H ⊗ I, CNOT] 產生 Bell 態，但先 CNOT 再 H 則否。不可對易閘須按正確順序套用——電路圖即程式。'] }],
      labLink: '量子電路建構器',
    },
    '4.5': {
      title: '4.5 不可克隆定理',
      paragraphs: [
        '古典位元可自由複製——COPY 閘複製資訊。量子力學禁止類似操作：不存在酉 U 將任意未知 |ψ⟩ 克隆到初態 |0⟩ 的輔助量子位元：',
        'Wootters、Zurek（1982）與 Dieks 獨立證明的定理是線性的直接後果。若克隆器對 |0⟩、|1⟩ 有效，對其疊加也須有效——但會產生非兩份輸入乘積的態。',
      ],
      checkpoints: [{ question: '若確知為 |0⟩ 或 |1⟩（古典資訊），能否克隆？', answer: 'yes', hint: '已知正交態可複製——定理針對未知任意態。' }],
      examples: [{ title: '反證法概要', steps: [{ label: '假設克隆器 U 滿足 U|0⟩|0⟩ = |0⟩|0⟩ 與 U|1⟩|0⟩ = |1⟩|1⟩。' }, { label: '對 |+⟩|0⟩ = (|0⟩|0⟩ + |1⟩|0⟩)/√2 套用 U。' }, { label: '若克隆成立，亦得 |+⟩|+⟩ = (|00⟩+|01⟩+|10⟩+|11⟩)/2。' }, { label: '兩態不同——矛盾。無通用克隆器。' }] }],
      expandables: [{ title: '對量子資訊的意涵', paragraphs: ['量子錯誤校正不能單純重複量子位元——需糾纏與症候測量。', 'QKD 中竊聽會擾動態——克隆會以不同方式破壞安全。', '傳送在不克隆的情況下轉移態——原件被摧毀。'] }],
    },
    '4.6': {
      title: '4.6 通用閘集 {H, T, CNOT}',
      paragraphs: [
        '閘集為通用若僅用其中閘組成的電路可任意精度逼近任意 n 量子位元酉算子。{H, T, CNOT} 對單量子位元旋轉加糾纏操作通用——足以執行任意量子演算法。',
        'Hadamard H 產生疊加；T 閘 T|0⟩ = |0⟩，T|1⟩ = e^{iπ/4}|1⟩ 對 |1⟩ 加 π/4 相位。與 H、T 生成的旋轉（經 Solovay–Kitaev 編譯）可逼近任意單量子位元酉。CNOT 糾纏量子位元，使多量子位元酉成為可能。',
      ],
      checkpoints: [{ question: '{H, CNOT}  alone 能否逼近任意 T 旋轉？', answer: 'no', hint: 'H 與 CNOT 僅生成 Clifford 操作；T 加入非 Clifford 相位。' }],
      examples: [{ title: '為何 Clifford + T 是標準容錯集', steps: [{ label: 'Clifford 閘（H, S, CNOT）可高效古典模擬（Gottesman–Knill）但非通用。' }, { label: '加入 T 使集合通用——任意酉可逼近。' }, { label: 'T 閘在容錯架構中昂貴（magic state distillation）。' }] }],
      expandables: [{ title: '其他通用集', paragraphs: ['其他通用集包括 {H, S, CNOT, T}、{Toffoli, H}，以及所有單量子位元旋轉加 CNOT 的連續參數集。硬體原生閘（Rx, Rz, CZ）編譯為容錯集以供錯誤校正計算。'] }],
      labLink: '閘探索器',
    },
  },
  widgets: {
    dimensionExplorer: {
      label: '量子位元數 (n)：{{n}}',
      hilbertSpace: '{{n}} 量子位元暫存器存在於維度 2^{{n}} = {{dim}} 的希爾伯特空間。',
      stateVectorNote: '態向量長度：{{dim}} 個複振幅。稠密模擬記憶體以 O(2^n) 增長——古典模擬量子系統的核心挑戰。',
      tooManyLabels: '{{dim}} 個基底 ket——太多無法顯示。試 n ≤ 5 以見全部標籤。',
    },
    kroneckerProduct: {
      intro: '透過振幅向量的克羅內克積建構 |+⟩ ⊗ |0⟩（以 kronVec / tensorProduct 計算）。',
      basisKet: '基底 ket',
      amplitude: '振幅',
      productNote: '僅 |00⟩ 與 |10⟩ 非零（皆 1/√2）。這是乘积態：第一量子位元 |+⟩，第二 |0⟩——無糾纏。',
      kronMatch: ' ✓ kronVec 與 tensorProduct 一致。',
    },
    entanglementChecker: {
      label: '選擇兩量子位元態',
      phiPlus: '|Φ⁺⟩ Bell',
      product: '|0⟩⊗|+⟩',
      psiPlus: '|Ψ⁺⟩ Bell',
      ket: 'Ket',
      probSquared: '|振幅|²',
      productState: '✓ 乘积態——可寫為 |a⟩⊗|b⟩。',
      entangled: '✗ 糾纏——無法分解為獨立量子位元態。',
    },
    bellPairCircuit: {
      title: 'Bell 對電路：H — CNOT',
      step: '步驟 {{n}}：',
      reset: '重設',
      nextGate: '下一閘',
      steps: { init: '初始化 |00⟩', hadamard: '對量子位元 0（左）套用 H', cnot: '套用 CNOT（控制 q0，目標 q1）' },
      tableKet: '|xy⟩',
      tableAmplitude: '振幅',
    },
    multiQubitGate: {
      cnotDesc: 'CNOT：控制 (q0) 為 |1⟩ 時翻轉目標 (q1)。|10⟩ → |11⟩、|11⟩ → |10⟩；|00⟩、|01⟩ 不變。',
      swapDesc: 'SWAP 交換兩量子位元：|01⟩ ↔ |10⟩。',
      toffoliDesc: 'Toffoli (CCNOT)：兩控制 (q0, q1) 皆 |1⟩ 時翻轉目標 (q2)。',
      inputLabel: '輸入基底態 |{{input}}⟩',
      result: '{{gate}}|{{input}}⟩ = |{{output}}⟩',
    },
    universalGateSet: {
      intro: '同族單量子位元閘：S = T²（π/2 相位），Z = S²（π 相位）。僅 Clifford（H, S, CNOT）非通用——需 T（或其他非 Clifford 閘）。',
      bellNote: 'Bell 態 |Φ⁺⟩ 僅用 {H, CNOT}——一般演算法（如 Shor、精確相位估計）需 T 以達任意相位精度。',
    },
    labLink: '開啟完整實驗室：{{title}} →',
  },
  nav: { prev: '← 線性代數', next: '下一章：量子電路 →' },
};
