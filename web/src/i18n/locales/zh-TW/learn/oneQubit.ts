import type { TranslationTree } from '@/i18n/types';

export const oneQubit: TranslationTree = {
  meta: {
    title: '第 2 章：量子位元',
    intro:
      '量子位元是量子資訊的基本單位。與古典位元不同，它由可干涉的複數振幅描述。本章建立疊加、測量、替代基底、相位、布洛赫球與基本閘的語言——在將量子位元組合成更大系統之前所需的一切。',
  },
  misconception: {
    myth: '量子位元就是同時既是 0 又是 1。',
    correction:
      '量子位元是 ℂ² 中的歸一化向量。測量會以 |α|² 與 |β|² 的機率回傳一個古典結果。振幅編碼相位資訊，影響干涉與非 Z 基底測量。',
  },
  sections: {
    'what-is-a-qubit': {
      title: '2.1 什麼是量子位元？',
      paragraphs: [
        '古典位元存在於集合 {0, 1}。量子位元存在於二維複向量空間，具有正規正交基底 |0⟩ 與 |1⟩。一般純態是疊加：',
        '歸一化確保總測量機率為 1。全域相位 e^{iγ}|ψ⟩ 不可觀測，但 α 與 β 之間的相對相位在非 Z 基底中具有物理意義。',
      ],
      checkpoints: [
        {
          question: '忽略全域相位時，純量子位元需要多少個實參數描述？',
          answer: '2',
          hint: '想想布洛赫球的角度 θ 與 φ。',
        },
      ],
      examples: [
        {
          title: '等權疊加 |+⟩',
          steps: [
            { label: '取 α = β = 1/√2。' },
            { label: '檢查歸一化：1/2 + 1/2 = 1。' },
            { label: '此態為 H|0⟩ = |+⟩。' },
            { label: 'Z 測量：P(0) = P(1) = 1/2。' },
          ],
        },
      ],
      expandables: [
        {
          title: '為何需要兩個複數？',
          paragraphs: [
            '兩個實數不足：量子力學需要複希爾伯特空間，使酉演化能實現旋轉與干涉。Born 規則使用 |α|²，但閘在平方之前以複相位組合振幅。',
          ],
        },
      ],
      labLink: '單量子位元狀態探索器',
    },
    'complex-amplitudes': {
      title: '2.2 複數振幅',
      paragraphs: [
        '寫 z = a + bi，共軛 z* = a − bi，模 |z| = √(a² + b²)，極形式 z = re^{iφ}。Euler 恆等式 e^{iφ} = cos φ + i sin φ 將旋轉與相位連結。',
      ],
      checkpoints: [],
      examples: [
        {
          title: '振幅 (2 + i)/√13',
          steps: [
            { label: '辨識 a = 2/√13，b = 1/√13。' },
            { label: '模平方：|z|² = 4/13 + 1/13 = 5/13... 注意：單一振幅為 (4+1)/13 = 5/13。' },
            { label: '對完整態，|α|² 與 |β|² 必須相加為 1。' },
          ],
        },
      ],
      expandables: [],
      labLink: '複數探索器',
    },
    measurement: {
      title: '2.3 測量',
      paragraphs: [
        '在 Z 基底測量，結果 0 的機率為 P(0) = |α|²，結果 1 為 P(1) = |β|²。觀測到 0 後，態坍縮為 |0⟩；觀測到 1 則為 |1⟩。這是投影測量的 Born 規則。',
      ],
      checkpoints: [
        {
          question: '測量 |ψ⟩ 得到 1 後，測量後的態是什麼？',
          answer: '|1⟩',
        },
      ],
      examples: [
        {
          title: '態 (√3/2 |0⟩ + 1/2 |1⟩)',
          steps: [
            { label: '辨識 α = √3/2，β = 1/2。' },
            { label: 'P(0) = (√3/2)² = 3/4。' },
            { label: 'P(1) = (1/2)² = 1/4。' },
            { label: '檢查：3/4 + 1/4 = 1。' },
          ],
        },
      ],
      expandables: [
        {
          title: 'P(0) 的完整投影計算',
          paragraphs: [
            '同理 ⟨1|ψ⟩ = β。投影算子 |0⟩⟨0| 給出 P(0) = ⟨ψ|0⟩⟨0|ψ⟩ = |α|²。',
          ],
        },
      ],
      labLink: '測量模擬器',
    },
    'other-bases': {
      title: '2.4 其他測量基底',
      paragraphs: [
        'X 基底使用 |+⟩ = (|0⟩ + |1⟩)/√2 與 |−⟩ = (|0⟩ − |1⟩)/√2。Y 基底使用 |i⟩ = (|0⟩ + i|1⟩)/√2 與 |−i⟩ = (|0⟩ − i|1⟩)/√2。將任意態改寫為所選基底，並對係數模平方得機率。',
      ],
      checkpoints: [],
      examples: [
        {
          title: '在 X 基底測量 |−⟩',
          steps: [
            { label: '|−⟩ 已是 X 基底本征態。' },
            { label: '因此 P(−) = 1，確定發生。' },
            { label: '在 Z 基底，P(0) = P(1) = 1/2——與 |+⟩ 相同。' },
          ],
        },
      ],
      expandables: [],
      labLink: '測量模擬器（基底選擇器）',
    },
    'global-relative-phase': {
      title: '2.5 全域與相對相位',
      paragraphs: [
        '將 |ψ⟩ 乘以 e^{iγ} 不會改變任何基底中的測量機率。|0⟩ 與 |1⟩ 分量之間的相對相位很重要：|+⟩ 與 (|0⟩ + i|1⟩)/√2 的 Z 統計相同，但 X、Y 統計與布洛赫球位置不同。',
      ],
      checkpoints: [
        {
          question: '|+⟩ 與 |−⟩ 的 Z 基底機率是否相同？',
          answer: 'yes',
          hint: '兩者都是等模的均勻疊加。',
        },
      ],
      examples: [],
      expandables: [],
      labLink: '單量子位元狀態探索器',
    },
    'bloch-sphere': {
      title: '2.6 布洛赫球',
      paragraphs: [
        '每個純量子位元（至多差一個全域相位）對應單位球上一點，θ ∈ [0, π]，φ ∈ [0, 2π)：',
      ],
      checkpoints: [],
      examples: [
        {
          title: '|0⟩ 在布洛赫球上',
          steps: [
            { label: 'θ = 0 ⇒ cos(θ/2) = 1，sin(θ/2) = 0。' },
            { label: '座標：x = y = 0，z = 1（北極）。' },
          ],
        },
      ],
      expandables: [],
      table: {
        headerState: '態',
        headerBloch: '布洛赫 (x, y, z)',
      },
      labLink: '3D 布洛赫球',
    },
    'one-qubit-gates': {
      title: '2.7 單量子位元閘',
      paragraphs: [
        '閘是 2×2 酉矩陣。Pauli X 翻轉 |0⟩ ↔ |1⟩；Z 對 |1⟩ 加相位；H 產生疊加。重要恆等式：X² = Y² = Z² = H² = I，S² = Z，T² = S。',
      ],
      checkpoints: [
        {
          question: 'H|+⟩ 是多少？',
          answer: '|0⟩',
          hint: 'H 是自逆的：H² = I。',
        },
      ],
      examples: [],
      expandables: [
        {
          title: '在布洛赫球上的幾何作用',
          paragraphs: [
            'X、Y、Z 是各自軸上的 180° 旋轉。',
            'H 將 Z 軸映射到 X 軸（又因 H² = I 而映射回去）。',
            'S 是繞 Z 的 90° 旋轉；T 是 45°。',
          ],
        },
      ],
      labLink: '量子閘探索器',
    },
  },
  widgets: {
    basisProbability: {
      title: '基底機率計算器',
      reAlpha: 'Re(α)：{{value}}',
      reBeta: 'Re(β)：{{value}}',
      imBeta: 'Im(β)：{{value}}',
      measurementBasis: '測量基底',
      outcome: '結果',
      probability: '機率',
      stateLabel: '|ψ⟩ = {{alpha}}|0⟩ + {{beta}}|1⟩',
    },
    relativePhase: {
      title: '相對相位滑桿',
      phiLabel: 'φ（弧度）：{{value}}',
      stateFormula: '|ψ⟩ = (|0⟩ + e^{iφ}|1⟩)/√2',
      zBasis: 'Z 基底',
      xBasis: 'X 基底',
      zUnchanged: 'P(0)：{{before}}% 對 {{after}}%——未變',
      xChanges: 'P(+)：{{before}}% 對 {{after}}%——隨 φ 改變',
      blochY: '布洛赫 y：{{before}} → {{after}}（隨 φ 變化）',
    },
  },
  practice: [
    {
      question: '將 (2|0⟩ + 3i|1⟩) 歸一化，並求 Z 基底中的 P(0)。',
      answer: '模為 √13。P(0) = 4/13。',
    },
    {
      question: '對 |ψ⟩ = (|0⟩ − |1⟩)/√2，X 基底中 P(−) 是多少？',
      answer: '此態為 |−⟩，故 P(−) = 1。',
    },
    {
      question: '對 |0⟩ 先套用 X 再套用 H，結果是什麼？',
      answer: 'X|0⟩ = |1⟩，H|1⟩ = |−⟩。',
    },
    {
      question: '|i⟩ 的布洛赫座標是多少？',
      answer: '(0, 1, 0)，位於 +Y 方向的赤道。',
    },
  ],
  nav: {
    prev: '← 古典計算',
    next: '線性代數 →',
  },
};
