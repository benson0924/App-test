import type { TranslationTree } from '@/i18n/types';

export const playground: TranslationTree = {
  "index": {
    "title": "實驗場",
    "intro": "{{count}} 個互動實驗室，供親手探索。每個實驗與學習章節連結 — 可在閱讀前後建立直覺。",
    "homeLink": "← 首頁",
    "learnLink": "學習章節 →",
    "chapterCircuits": "電路",
    "circuitBuilderTitle": "量子電路建構器"
  },
  "labPage": {
    "notFound": "找不到實驗",
    "unknownId": "未知的實驗 ID：",
    "comingSoon": "此實驗即將推出。",
    "backToPlayground": "← 返回實驗場",
    "allLabs": "← 所有實驗"
  },
  "circuitBuilder": {
    "title": "量子電路建構器",
    "intro": "將閘拖曳至電路格線。逐步執行以觀察狀態向量演化，或模擬完整電路。可匯出等效的 OpenQASM 3.0。",
    "qubitsLabel": "量子位元：{{n}}",
    "depthGates": "深度：{{depth}} · 閘：{{gates}}",
    "run": "執行",
    "step": "步驟",
    "measure1024": "測量（1024 次）",
    "clear": "清除",
    "showQasm": "顯示 OpenQASM",
    "hideQasm": "隱藏 OpenQASM",
    "statevector": "狀態向量 |ψ⟩",
    "probDistribution": "機率分布",
    "measurementHistogram": "測量直方圖",
    "presetBell": "Bell |Φ⁺⟩",
    "presetGhz": "GHZ (3)",
    "presetTeleport": "傳態（部分）",
    "dragGate": "將 {{gate}} 拖曳至電路",
    "rotationTheta": "旋轉 θ：{{deg}}°"
  }
};
