import type { TranslationTree } from '@/i18n/types';

export const entanglement: TranslationTree = {
  meta: {
    title: '第 7 章：糾纏與 Bell 相關',
    intro:
      '兩量子位元糾纏時，聯合態無法分解為各自描述。分離粒子的測量呈現 Einstein、Podolsky、Rosen 所困惑的相關——預測卻與實驗一致。本章介紹 EPR 問題、四個 Bell 態、相關與因果的區別，以及部分迹給出的約化態。',
  },
  sections: {
    '7.1': {
      title: '7.1 EPR 與局域隱變量',
      paragraphs: [
        '1935 年 Einstein、Podolsky、Rosen 質疑：若量子力學完備，測量糾纏對之一似乎瞬間固定另一性質——與相對論不符。其思想實驗用糾纏位置/動量；現代表述用自旋或偏振量子位元。',
        '局域隱變量（LHV）模型假設各粒子在創造時帶有預設值，測量僅揭示它們而無超光速影響。Bell 等證明某些相關不等式（CHSH）限制 LHV 可產生的相關——量子力學超越該上限。',
        '使用糾纏不需形而上學：它是傳送、超密編碼、錯誤校正的資源。EPR 辯論 sharpen 了問題——相關是帶隱藏指令的古典式，還是真正量子？實驗支持量子力學，無信號定理保證相對論。',
      ],
      checkpoints: [{ question: '糾纏 alone 能否超光速傳訊？', answer: 'no', hint: 'Bob 的邊際結果不依 Alice 的設定。' }],
      examples: [{ title: 'EPR 風格相關概要', steps: [{ label: 'Alice 與 Bob 共享 |Ψ⁻⟩。' }, { label: '皆測 Z：恆為相反位元 (01 或 10)。' }, { label: 'LHV：各粒子在源處有隱藏 z ∈ {+1,−1}。' }, { label: 'Bell/CHSH：某些角度使 LHV ≤ 2；量子達 2√2。' }] }],
      expandables: [{ title: 'EPR 並未主張', paragraphs: ['EPR 質疑量子理論完備性，非其實驗成功。他們未提實用超光速電話。現代量子資訊將糾纏視為無可控通信的相關——由無信號定理驗證。'] }],
      practice: [{ question: '一句話：局域隱變量試圖回答 Bell 相關的什麼問題？', answer: '源處預共享的古典隨機變量能否在無非局域影響下重現所有量子相關統計。' }],
      labLink: 'Bell/CHSH 實驗實驗室',
    },
    '7.2': {
      title: '7.2 四個 Bell 態',
      paragraphs: [
        'Bell 基底是最大糾纏兩量子位元態的完備正規正交集。任意兩量子位元純態可表為此基底，但四 Bell 態是糾纏交換、超密編碼與許多演算法的基石。',
        '|Φ⁺⟩ 由 |00⟩ 經 H 再 CNOT 製備。在一量子位元上 Z 得 |Φ⁻⟩；X 得 |Ψ⁺⟩；兩者得 |Ψ⁻⟩。彼此正交——|⟨Φ⁺|Ψ⁻⟩|² = 0 確認正交性。',
      ],
      checkpoints: [{ question: '|Φ⁺⟩ 是乘积態嗎？', answer: 'no', hint: '試分別寫兩量子位元的 α|0⟩+β|1⟩。' }],
      examples: [{ title: '製備 |Φ⁺⟩ 與 |Φ⁻⟩ 關係', steps: [{ label: 'H₀ 於 |00⟩。' }, { label: 'CNOT₀₁ → |Φ⁺⟩。' }, { label: '對量子位元 1 套用 Z。' }, { label: '改套用 X。' }] }],
      expandables: [],
      practice: [{ question: '僅 |00⟩、|11⟩ 等振幅的子空間由幾個 Bell 態張成？', answer: '兩個：|Φ⁺⟩ 與 |Φ⁻⟩ 差在 |00⟩ 與 |11⟩ 間相對符號。|Ψ±⟩ 張成奇宇稱子空間。' }],
      labLink: 'Bell 態產生器',
    },
    '7.3': {
      title: '7.3 相關與因果',
      paragraphs: [
        '遠距測量的強相關不意味古典意義下的因果。糾纏下，標準量子形式中測量前未必有確定古典值——但基底匹配時聯合統計嚴格相關。',
        'Alice 先測或 Bob 先測，預測的聯合分布相同（相同可觀測量）。相對論量子場論以無信號形式化：Alice 不能以測量基底選擇編碼訊息，因 Bob 邊際統計不變。',
      ],
      checkpoints: [{ question: 'Alice 能否僅以選擇測量角傳訊？', answer: 'no' }],
      examples: [{ title: 'Z 基底中的 |Φ⁺⟩', steps: [{ label: '聯合態僅 |00⟩、|11⟩。' }, { label: 'Alice 測 Z：0 或 1 各 50%。' }, { label: 'A=0 時 Bob 為 |0⟩；A=1 時為 |1⟩。' }, { label: 'Bob 單獨邊際仍 50/50——相關但無可控信號。' }] }],
      expandables: [{ title: '常見誤解', paragraphs: ['「鬼魅般的超距作用」聽像因果，但無古典通道則不能用糾纏傳古典位元。相關是傳送所需，但可用資訊在古典 2 位元訊息中。'] }],
      practice: [{ question: 'Alice、Bob 共享 |Φ⁺⟩。Alice 測 Z 得 0。Bob 測前態？Alice 選 X 而非 Z 是否改變 Bob 的 Z 邊際（Bob 恆測 Z）？', answer: '條件於 Alice 的 0，Bob 在 |0⟩。若 Alice 測 X，Bob 的 Z 邊際仍 50/50——Alice 基底改變相關，不改 Bob 僅 Z 的邊際。' }],
    },
    '7.4': {
      title: '7.4 約化態與部分迹',
      paragraphs: [
        '描述糾纏對的一子系統需對另一子系統求迹。純聯合態 |ψ⟩_AB 在 A 上的約化密度矩陣為 ρ_A = Tr_B(|ψ⟩⟨ψ|)。若 ρ_A 非純投影，則 A 與 B 糾纏——即使 A 單獨測量可能完全隨機。',
        '對 |Φ⁺⟩，ρ_A = I/2——最大混合。Alice 的 Z 結果 50/50，聯合態卻純。這是糾纏特徵：局部無知、全局有資訊。乘积態 |00⟩ 則 ρ_A = |0⟩⟨0|——純且無相關。',
      ],
      checkpoints: [{ question: '對 |Φ⁺⟩，單量子位元約化態純還是混合？', answer: 'mixed', hint: 'Tr(ρ_A²) = 1/2。' }],
      examples: [{ title: '|Φ⁺⟩ 的部分迹', steps: [{ label: '振幅 c₀₀ = c₁₁ = 1/√2。' }, { label: 'ρ_A = Tr_B。' }, { label: '純度 Tr(ρ_A²) = 1/2 < 1 → 混合。' }, { label: '糾纏熵 S(ρ_A) = ln 2。' }] }],
      expandables: [{ title: 'Schmidt 分解預覽', paragraphs: ['任意雙分純態 |ψ⟩ = Σᵢ λᵢ|i_A⟩|i_B⟩，λᵢ ≥ 0。Schmidt 秩 1 當且僅當乘积；> 1 則糾纏。λᵢ² 為 ρ_A、ρ_B 本征值——相同谱。見多量子位元章。'] }],
      practice: [{ question: '計算 |00⟩ 的 ρ_A 並與 |Φ⁺⟩ 比較純度。', answer: '|00⟩ 為乘积：ρ_A = |0⟩⟨0|，純度 1。|Φ⁺⟩ 得 ρ_A = I/2，純度 1/2。糾纏表現為純聯合態下的混合邊際。' }],
      labLink: '糾纏測量實驗室',
    },
  },
  widgets: {
    bellStatesExplorer: {
      title: '四個 Bell 態',
      productQuestion: '乘积態？',
      productYes: '是',
      productNo: '否',
      entangledNote: ' — 四 Bell 態皆糾纏。',
      jointProbabilities: '聯合機率：',
    },
    partialTrace: {
      title: '量子位元 A 的約化態（部分迹）',
      phiPlus: '|Φ⁺⟩（糾纏）',
      product: '|00⟩（乘积）',
      description: 'Tr_B(|ψ⟩⟨ψ|) 描述單獨的 A。糾纏態即使聯合態純，約化態仍可混合。',
      rhoLabel: 'ρ_A = [ {{matrix}} ]（計算基底）',
      purity: '純度 Tr(ρ_A²) ≈ {{value}} —',
      pureCase: '純（乘积情況）',
      mixedCase: '混合（Bell 最大混合 ≈ 0.5）',
    },
    correlationDemo: {
      title: '相關與因果',
      zBasis: 'Z 基底（計算）',
      xBasis: 'X 基底（Hadamard）',
      zNote: '皆在 Z 測量：結果恆相同 (00 或 11)——完美相關。',
      xNote: '皆在 X 測量：對 |Φ⁺⟩ 在匹配角度反相關——仍非古典。',
      footer: '相關不意味 Alice 的測量「導致」Bob 的結果——無信號。共享糾纏加本地測量解釋統計；CHSH（後述）量化何時超越 LHV。',
    },
    practice: { label: '練習題。', revealSolution: '顯示解答' },
    labLink: '開啟完整實驗室：{{title}} →',
  },
  nav: { prev: '← 錯誤校正', next: '下一章：量子協定 →' },
};
