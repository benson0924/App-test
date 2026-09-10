import type { TranslationTree } from '@/i18n/types';

export const playground: TranslationTree = {
  "index": {
    "title": "プレイグラウンド",
    "intro": "手を動かして学べる {{count}} 個のインタラクティブラボ。各ラボは学習章と連携 — 読む前後に直感を養えます。",
    "homeLink": "← ホーム",
    "learnLink": "学習章 →",
    "chapterCircuits": "回路",
    "circuitBuilderTitle": "量子回路ビルダー"
  },
  "labPage": {
    "notFound": "ラボが見つかりません",
    "unknownId": "不明なラボ ID：",
    "comingSoon": "このラボは近日公開予定です。",
    "backToPlayground": "← プレイグラウンドに戻る",
    "allLabs": "← すべてのラボ"
  },
  "circuitBuilder": {
    "title": "量子回路ビルダー",
    "intro": "ゲートを回路グリッドにドラッグ。段階実行で状態ベクトルの変化を観察するか、回路全体をシミュレート。等価な OpenQASM 3.0 をエクスポート。",
    "qubitsLabel": "量子ビット：{{n}}",
    "depthGates": "深さ：{{depth}} · ゲート：{{gates}}",
    "run": "実行",
    "step": "ステップ",
    "measure1024": "測定（1024 ショット）",
    "clear": "クリア",
    "showQasm": "OpenQASM を表示",
    "hideQasm": "OpenQASM を隠す",
    "statevector": "状態ベクトル |ψ⟩",
    "probDistribution": "確率分布",
    "measurementHistogram": "測定ヒストグラム",
    "presetBell": "ベル |Φ⁺⟩",
    "presetGhz": "GHZ (3)",
    "presetTeleport": "テレポ（一部）",
    "dragGate": "{{gate}} を回路にドラッグ",
    "rotationTheta": "回転 θ：{{deg}}°"
  }
};
