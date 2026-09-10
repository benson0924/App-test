# Introduction to Quantum Computing — 2026

A unified modern textbook and interactive learning platform covering classical information, quantum mechanics for computing, and foundational algorithms through Shor's factoring algorithm — updated for the 2026 research landscape.

**Research cutoff:** September 2026

## Two synchronized formats

| Format | Description |
|--------|-------------|
| **Interactive web textbook** | Full chapters, 27 labs, circuit builder, exercises, KaTeX math, light/dark themes |
| **PDF textbook** | LaTeX source in `book/` — formal printable edition with matching notation and lab references |

This is an **independently authored** educational work. It uses standard curriculum progression (classical → qubit → algorithms) familiar from introductory texts, but prose, examples, and organization are original.

## Quick start

```bash
npm install
npm run dev          # Web app at http://localhost:5173
npm run build        # Production build

# PDF (requires TeX Live)
cd book && chmod +x build.sh && ./build.sh
```

## Project structure

```
packages/quantum-core/   Shared simulation library (states, gates, circuits, algorithms)
web/                     React + Vite interactive textbook
book/                    LaTeX PDF source synchronized with web chapters
```

## Web features

- **Learn:** 13 chapters from classical computing through modern 2026 topics
- **Playground:** 27 interactive labs (Bloch sphere, teleportation, BB84, Grover, QFT, Shor, …)
- **Circuit Builder:** Drag-and-drop gate simulation with state-vector readout
- **Reference:** Gate tables, formula sheet, complexity, glossary, misconceptions
- **Practice:** Randomized problems with hints and step-by-step solutions

## Pedagogical progression

Classical information → computation → reversible logic → one qubit → measurement → Bloch sphere → gates → linear algebra → multiple qubits → entanglement → circuits → error correction → protocols → algorithms → QFT → phase estimation → Shor

## License

Educational use. Verify hardware and industry claims against peer-reviewed sources; see Chapter 9 and `ModernTopics` on the website for evidence labeling.
