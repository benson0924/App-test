import type { TranslationTree } from '@/i18n/types';

export const index: TranslationTree = {
  "title": "學習",
  "intro": "十三個章節，從古典計算經量子演算法到當代主題循序漸進。每章包含互動元素、詳解範例與實驗場連結。",
  "chapterTag": "第 {{n}} 章",
  "fallbackDescription": "含概念檢查與實驗的互動章節。",
  "nav": {
    "home": "← 首頁",
    "start": "古典計算 →"
  },
  "descriptions": {
    "/learn/classical": "位元、二進位算術、邏輯閘、布林代數、加法器、可逆性、古典錯誤校正、複雜度類別與圖靈機——量子計算所延伸的古典基礎。",
    "/learn/one-qubit": "量子位元作為二能級量子系統：疊加、Bloch 球面、測量統計與基本單量子位元閘 X、Y、Z、H 及相位旋轉。",
    "/learn/linear-algebra": "複數、向量、矩陣、內積、本征值與張量積——量子計算全程使用的數學語言。",
    "/learn/multiple-qubits": "複合系統、張量積 Hilbert 空間、多量子位元閘、Bell 態與子系統的部分測量。",
    "/learn/circuits": "量子電路模型、通用閘集、電路深度與寬度、分解策略及演算法如何映射為閘序列。",
    "/learn/error-correction": "量子噪聲模型、不可克隆定理、穩定子碼、表面碼直覺與容錯的閾值定理。",
    "/learn/entanglement": "糾纏度量、可分性、Schmidt 分解、EPR 對，以及糾纏為何是資源而非通訊通道。",
    "/learn/protocols": "量子傳態、超密集編碼、Bell/CHSH 測試與 BB84 量子密鑰分配——使用糾纏與測量的協定。",
    "/learn/algorithms": "神諭模型、Deutsch 與 Deutsch–Jozsa、Bernstein–Vazirani、Simon 與 Grover 搜尋——早期量子加速與查詢複雜度。",
    "/learn/qft": "量子傅立葉變換、相位回踢、QFT 電路構造及其在週期尋找與化學模擬中的子程序角色。",
    "/learn/phase-estimation": "量子相位估計：估計酉算子本征值、精度縮放與哈密頓量模擬的連結。",
    "/learn/shor": "Shor 因數分解演算法——模指數、透過 QFT 的週期尋找及對公鑰密碼學的影響。",
    "/learn/modern": "容錯路線圖（2026）、NISQ 變分演算法、量子優勢宣稱、錯誤缓解技術與開放研究前沿。"
  }
};
