import type { TranslationTree } from '@/i18n/types';

export const reference: TranslationTree = {
  "index": {
    "title": "參考資料",
    "gates": {
      "title": "量子閘參考",
      "desc": "單量子位元與多量子位元閘矩陣。"
    },
    "formulas": {
      "title": "公式表",
      "desc": "各章節關鍵方程式。"
    },
    "complexity": {
      "title": "複雜度",
      "desc": "古典與量子查詢／時間界。"
    },
    "glossary": {
      "title": "詞彙表",
      "desc": "導覽資料中的術語。"
    },
    "misconceptions": {
      "title": "常見誤解",
      "desc": "常見迷思與正確說明。"
    }
  },
  "gates": {
    "title": "量子閘參考",
    "intro": "完整的閘表，含符號、矩陣（來自 quantum-core）、作用、Bloch 球解釋與逆閘。",
    "singleQubit": "單量子位元閘",
    "twoQubit": "雙量子位元閘",
    "threeQubit": "三量子位元閘",
    "commonIdentities": "常用恆等式",
    "pauliRelations": "Pauli 群關係",
    "universalSets": "通用閘集",
    "colSymbol": "符號",
    "colMatrix": "矩陣",
    "colAction": "作用",
    "colBloch": "Bloch",
    "colInverse": "逆",
    "universalEstablished1": "已建立：{H, S, T, CNOT} 是容錯計算常用的通用閘集（T 閘在容錯架構中需要魔法態蒸馏）。",
    "universalEstablished2": "已建立：{Rx, Ry, Rz, CNOT} 在 NISQ 裝置上可用於近似編譯，為通用集。",
    "I": {
      "name": "恆等",
      "action": "I|0⟩ = |0⟩, I|1⟩ = |1⟩ — 無變化",
      "bloch": "恆等旋轉：Bloch 球上不移動",
      "inverse": "I† = I"
    },
    "X": {
      "name": "Pauli X（NOT）",
      "action": "位元翻轉：X|0⟩ = |1⟩, X|1⟩ = |0⟩",
      "bloch": "繞 x 軸旋轉 π：|0⟩ ↔ |1⟩",
      "inverse": "X† = X (X² = I)"
    },
    "Y": {
      "name": "Pauli Y",
      "action": "Y|0⟩ = i|1⟩，Y|1⟩ = −i|0⟩",
      "bloch": "繞 y 軸旋轉 π",
      "inverse": "Y† = Y (Y² = I)"
    },
    "Z": {
      "name": "Pauli Z",
      "action": "相位翻轉：Z|0⟩ = |0⟩，Z|1⟩ = −|1⟩",
      "bloch": "繞 z 軸旋轉 π",
      "inverse": "Z† = Z (Z² = I)"
    },
    "H": {
      "name": "Hadamard",
      "action": "H|0⟩ = |+⟩, H|1⟩ = |−⟩",
      "bloch": "繞 (x+z)/√2 軸旋轉 π；z ↔ x",
      "inverse": "H† = H (H² = I)"
    },
    "S": {
      "name": "相位（S 閘）",
      "action": "S|0⟩ = |0⟩，S|1⟩ = i|1⟩",
      "bloch": "繞 z 軸旋轉 π/2",
      "inverse": "S† = S³ = ZS (S² = Z)"
    },
    "T": {
      "name": "π/8 閘",
      "action": "T|0⟩ = |0⟩，T|1⟩ = e^{iπ/4}|1⟩",
      "bloch": "繞 z 軸旋轉 π/4",
      "inverse": "T† = T⁷ (T² = S, T⁴ = Z)"
    },
    "Rx": {
      "name": "繞 x 旋轉",
      "action": "R_x(θ)|0⟩ = cos(θ/2)|0⟩ − i sin(θ/2)|1⟩",
      "bloch": "繞 x 軸旋轉 θ",
      "inverse": "R_x(θ)† = R_x(−θ)"
    },
    "Ry": {
      "name": "繞 y 旋轉",
      "action": "R_y(θ)|0⟩ = cos(θ/2)|0⟩ + sin(θ/2)|1⟩",
      "bloch": "繞 y 軸旋轉 θ",
      "inverse": "R_y(θ)† = R_y(−θ)"
    },
    "Rz": {
      "name": "繞 z 旋轉",
      "action": "R_z(θ)|0⟩ = e^{−iθ/2}|0⟩，R_z(θ)|1⟩ = e^{iθ/2}|1⟩",
      "bloch": "繞 z 軸旋轉 θ（|0⟩ 上的全局相位）",
      "inverse": "R_z(θ)† = R_z(−θ)"
    },
    "CNOT": {
      "name": "受控 NOT",
      "action": "CNOT|a,b⟩ = |a, b⊕a⟩ — 控制為 1 時翻轉目標",
      "bloch": "產生糾纏；非單量子位元 Bloch 旋轉",
      "inverse": "CNOT† = CNOT (CNOT² = I on target)"
    },
    "CZ": {
      "name": "受控 Z",
      "action": "CZ|11⟩ = −|11⟩；其他不變 — 兩者為 1 時加 π 相位",
      "bloch": "產生糾纏的相位閘；CZ = (I⊗H) CNOT (I⊗H)",
      "inverse": "CZ† = CZ (CZ² = I)"
    },
    "SWAP": {
      "name": "交換",
      "action": "SWAP|a,b⟩ = |b,a⟩",
      "bloch": "交換量子位元狀態；3 個 CNOT 分解",
      "inverse": "SWAP† = SWAP (SWAP² = I)"
    },
    "Toffoli": {
      "name": "CCNOT（Toffoli）",
      "action": "當兩個控制皆為 |1⟩ 時翻轉目標",
      "bloch": "通用古典邏輯；可逆 AND",
      "inverse": "Toffoli† = Toffoli（自逆）"
    }
  },
  "formulas": {
    "title": "公式表",
    "intro": "與教科書符號一致的快速參考。研究截止：2026 年 9 月。",
    "singleQubit": "單量子位元狀態",
    "measurement": "測量",
    "linearAlgebra": "線性代數",
    "multiQubit": "多量子位元與張量積",
    "bell": "Bell 態",
    "singleGates": "單量子位元閘",
    "multiGates": "多量子位元閘",
    "entanglementChsh": "糾纏與 CHSH",
    "qft": "量子傅立葉變換",
    "grover": "Grover 演算法",
    "shor": "Shor 演算法",
    "phaseEst": "相位估計",
    "errorCorrection": "錯誤校正",
    "noise": "噪聲與退相干",
    "complexity": "複雜度類",
    "classical": "古典計算（第一部）"
  },
  "complexity": {
    "title": "複雜度參考",
    "intro": "基礎量子演算法的查詢與時間複雜度比較。常數省略；除非另有說明，假設容錯模型。",
    "tableTitle": "演算法比較表",
    "colAlgorithm": "演算法",
    "colProblem": "問題",
    "colClassical": "古典",
    "colQuantum": "量子",
    "colNotes": "備註",
    "bqpTitle": "BQP 定義",
    "bqpIntro": "BQP（有界誤差量子多項式時間）是以誤差概率至多 1/3 で多項式時間量子電路族可解的決策問題類。",
    "bqpContainments": "已知包含關係：每個古典多項式時間演算法都是量子演算法（古典為子集），且量子模擬不超過 PSPACE。",
    "cautionTitle": "注意：BQP 與 NP",
    "cautionIntro": "NP ⊆ BQP 是否成立尚未知。量子電腦並非已知能高效解所有 NP 完全問題。Shor 演算法適用於週期尋找／因數分解，而非一般 NP 搜尋。",
    "cautionGrover": "Grover 對無結構搜尋僅提供二次加速 — 非指數級。",
    "cautionPromise": "Deutsch–Jozsa 與 Bernstein–Vazirani 的分离針對具有結構神諭的承諾問題。",
    "cautionSampling": "隨機電路採樣對特定任務展示量子行為難以古典模擬 — 非通用 NP 加速。",
    "queryVsTime": "查詢複雜度 vs 時間複雜度",
    "queryVsTimeBody": "查詢複雜度計數神諭呼叫（Deutsch、Grover）。時間複雜度包含實現神諭與算術的電路大小（Shor）。少量查詢可能隱藏大量古典預處理或昂貴神諭。",
    "faultTolerance": "容錯需求",
    "faultToleranceBody": "Shor 因數分解與大規模相位估計需要錯誤率低於閾值的容錯邏輯量子位元。無校正的 NISQ 裝置無法執行密碼學相關的 Shor 實例 — 複雜度敘述假設理想容錯模型。",
    "checkpointQ": "Grover 演算法是否證明 BQP 包含 NP？",
    "checkpointHint": "Grover 為二次加速，非指數；NP 與 BQP 關係仍開放。",
    "rows": {
      "deutsch": {
        "algorithm": "Deutsch",
        "problem": "f:{0,1}→{0,1} 是常數還是平衡？",
        "classical": "2 次查詢（最壞）",
        "quantum": "1 次查詢",
        "notes": "首次分离；平衡 = 至少一個輸入上輸出不同"
      },
      "deutschJozsa": {
        "algorithm": "Deutsch–Jozsa",
        "problem": "常數 vs 平衡 f:{0,1}ⁿ→{0,1}",
        "classical": "2ⁿ⁻¹ + 1 次查詢（最壞）",
        "quantum": "1 次查詢",
        "notes": "指數級查詢分离；不實用（承諾問題）"
      },
      "bernsteinVazirani": {
        "algorithm": "Bernstein–Vazirani",
        "problem": "找出隱藏字串 s，f(x) = s·x mod 2",
        "classical": "n 次查詢",
        "quantum": "1 次查詢",
        "notes": "線性查詢分离；推廣 Deutsch–Jozsa"
      },
      "grover": {
        "algorithm": "Grover",
        "problem": "在 N 個項目中無結構搜尋",
        "classical": "O(N) 次查詢",
        "quantum": "O(√N) 次查詢",
        "notes": "二次加速；無結構搜尋最優"
      },
      "shor": {
        "algorithm": "Shor",
        "problem": "分解 N 位元整數",
        "classical": "次指數（GNFS）；無已知多項式時間",
        "quantum": "多項式時間（容錯模型）",
        "notes": "需要 QFT + 相位估計；密碼規模下非 NISQ 可行"
      },
      "simon": {
        "algorithm": "Simon",
        "problem": "找出 f(x)=f(x⊕s) 的隱藏週期",
        "classical": "O(2ⁿ/²) 次查詢",
        "quantum": "O(n) 次查詢",
        "notes": "指數級分离；Shor 的前身"
      },
      "stateSimulation": {
        "algorithm": "狀態模擬",
        "problem": "模擬 n 量子位元通用電路",
        "classical": "O(2ⁿ) 記憶體／時間",
        "quantum": "物理實現 — 無法高效輸出完整 2ⁿ 向量",
        "notes": "Clifford 電路可古典 O(n²) 模擬（Gottesman–Knill）"
      }
    }
  }
};
