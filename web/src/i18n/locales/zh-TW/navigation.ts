import type { TranslationTree } from '@/i18n/types';

export const navigation: TranslationTree = {
  learnNav: {
    classical: '古典計算',
    oneQubit: '單量子位元',
    linearAlgebra: '線性代數',
    multipleQubits: '多量子位元',
    circuits: '量子電路',
    errorCorrection: '量子錯誤校正',
    entanglement: '量子糾纏',
    protocols: '量子通訊協定',
    algorithms: '量子演算法',
    qft: '量子傅立葉轉換',
    phaseEstimation: '相位估計',
    shor: 'Shor 演算法',
    modern: '現代主題（2026）',
  },
  labChapters: {
    classical: '古典計算',
    oneQubit: '單量子位元',
    linearAlgebra: '線性代數',
    multipleQubits: '多量子位元',
    qec: '量子錯誤校正',
    protocols: '通訊協定',
    algorithms: '演算法',
    shor: 'Shor',
  },
  labs: {
    'binary-states': '二進位狀態探索器',
    'logic-gates': '邏輯閘模擬器',
    'binary-adder': '二進位加法器',
    'complex-plane': '複數平面探索器',
    'qubit-state': '單量子位元狀態探索器',
    measurement: '測量模擬器',
    'bloch-sphere': '三維 Bloch 球面',
    'gate-explorer': '量子閘探索器',
    'unitary-checker': '矩陣與酉矩陣檢查器',
    'tensor-product': '張量積計算器',
    'bell-states': 'Bell 態產生器',
    entanglement: '糾纏度量',
    'error-correction': '錯誤校正模擬器',
    chsh: 'Bell/CHSH 實驗',
    superdense: '超密集編碼',
    teleportation: '量子傳態',
    bb84: 'BB84 模擬器',
    deutsch: 'Deutsch 演算法',
    'deutsch-jozsa': 'Deutsch–Jozsa',
    'bernstein-vazirani': 'Bernstein–Vazirani',
    simon: 'Simon 演算法',
    grover: 'Grover 搜尋',
    qft: 'QFT 視覺化',
    'phase-estimation': '相位估計',
    'period-finding': '週期探索器',
    shor: 'Shor 演算法示範',
  },
  glossary: {
    amplitude: {
      term: '振幅',
      definition: '與量子基底態相關的複數係數。',
    },
    ancilla: {
      term: '輔助量子位元',
      definition: '在計算過程中暫時使用的額外量子位元。',
    },
    basis: {
      term: '基底',
      definition: '用於表示量子態的正交歸一向量集合。',
    },
    bit: {
      term: '位元',
      definition: '古典的雙態資訊單位。',
    },
    blochSphere: {
      term: 'Bloch 球面',
      definition: '純單量子位元態的幾何表示。',
    },
    bqp: {
      term: 'BQP',
      definition: '有界誤差量子電腦可有效求解的決定問題複雜度類別。',
    },
    circuitDepth: {
      term: '電路深度',
      definition: '電路所需的連續操作層數。',
    },
    cnot: {
      term: 'CNOT',
      definition: '受控 X 閘（Controlled-X gate）。',
    },
    decoherence: {
      term: '退相干',
      definition: '量子系統與環境相互作用而喪失量子相干性的過程。',
    },
    entanglement: {
      term: '量子糾纏',
      definition: '無法表示為各子系統態乘積的量子相關性。',
    },
    gate: {
      term: '閘',
      definition: '作用於古典位元或量子態的操作。',
    },
    globalPhase: {
      term: '全域相位',
      definition: '不影響可觀測預測的整體複數相位因子。',
    },
    hadamardGate: {
      term: 'Hadamard 閘',
      definition: '在 Z 基底與 X 基底之間轉換的單量子位元閘。',
    },
    hilbertSpace: {
      term: 'Hilbert 空間',
      definition: '表示量子態的複向量空間。',
    },
    ket: {
      term: 'Ket',
      definition: 'Dirac 符號 |ψ⟩，表示狀態向量。',
    },
    measurement: {
      term: '測量',
      definition: '依量子機率產生古典結果的過程。',
    },
    oracle: {
      term: '神諭',
      definition: '演算法查詢的黑箱函數操作。',
    },
    phase: {
      term: '相位',
      definition: '複數振幅的角分量。',
    },
    qubit: {
      term: '量子位元',
      definition: '基本的雙能級量子資訊單位。',
    },
    superposition: {
      term: '疊加',
      definition: '基底態的線性組合。',
    },
    tensorProduct: {
      term: '張量積',
      definition: '組合量子系統的數學運算。',
    },
    unitary: {
      term: '酉',
      definition: '保範數的可逆線性操作。',
    },
  },
  misconceptions: {
    q0: {
      myth: '一個量子位元儲存無限多可讀取的古典資訊。',
      correction: '雖然純量子位元的數學描述需要連續振幅，但單次測量並不能揭示這些振幅。',
    },
    q1: {
      myth: '疊加意味著我們能同時檢視所有可能的答案。',
      correction: '量子演算法操控振幅，使干涉提高有用輸出的機率。',
    },
    q2: {
      myth: '測量只是揭示量子位元原本就藏有的值。',
      correction: '這種古典解釋通常無法重現量子測量的統計結果。',
    },
    q3: {
      myth: '量子糾纏能超光速傳送訊息。',
      correction: '糾纏產生相關性，但可用通訊仍遵守無信號原理。',
    },
    q4: {
      myth: '量子傳態能移動物質。',
      correction: '它利用共享糾纏與古典通訊傳遞量子態，而非移動粒子本身。',
    },
    q5: {
      myth: '量子電腦將取代古典電腦。',
      correction: '量子處理器是專用系統，通常與古典電腦協同運作。',
    },
    q6: {
      myth: 'Grover 搜尋能瞬間檢查資料庫中的每一筆資料。',
      correction: 'Grover 提供二次查詢加速：O(N) → O(√N)。',
    },
    q7: {
      myth: 'Shor 演算法使所有加密系統失效。',
      correction: 'Shor 針對 RSA 等系統的數學結構；其他密碼學方法採用不同假設。',
    },
  },
};
