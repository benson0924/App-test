import type { TranslationTree } from '@/i18n/types';

export const playground: TranslationTree = {
  "index": {
    "title": "Playground",
    "intro": "{{count}} interactive labs for hands-on exploration. Each lab connects to material in the Learn chapters — use them to build intuition before or after reading.",
    "homeLink": "← Home",
    "learnLink": "Learn Chapters →",
    "chapterCircuits": "Circuits",
    "circuitBuilderTitle": "Quantum Circuit Builder"
  },
  "labPage": {
    "notFound": "Lab not found",
    "unknownId": "Unknown lab id:",
    "comingSoon": "This lab is coming soon.",
    "backToPlayground": "← Back to Playground",
    "allLabs": "← All Labs"
  },
  "circuitBuilder": {
    "title": "Quantum Circuit Builder",
    "intro": "Drag gates onto the circuit grid. Run step-by-step to watch the statevector evolve, or simulate the full circuit. Export equivalent OpenQASM 3.0.",
    "qubitsLabel": "Qubits: {{n}}",
    "depthGates": "Depth: {{depth}} · Gates: {{gates}}",
    "run": "Run",
    "step": "Step",
    "measure1024": "Measure (1024 shots)",
    "clear": "Clear",
    "showQasm": "Show OpenQASM",
    "hideQasm": "Hide OpenQASM",
    "statevector": "Statevector |ψ⟩",
    "probDistribution": "Probability distribution",
    "measurementHistogram": "Measurement histogram",
    "presetBell": "Bell |Φ⁺⟩",
    "presetGhz": "GHZ (3)",
    "presetTeleport": "Teleport (partial)",
    "dragGate": "Drag {{gate}} onto circuit",
    "rotationTheta": "Rotation θ: {{deg}}°"
  }
};
