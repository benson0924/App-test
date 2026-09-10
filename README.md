# Introduction to Quantum Computing — 2026

A unified modern textbook and interactive learning platform covering classical information, quantum mechanics for computing, and foundational algorithms through Shor's factoring algorithm — updated for the 2026 research landscape.

**Research cutoff:** September 2026

## Two synchronized formats

| Format | Description |
|--------|-------------|
| **Interactive web textbook** | Full chapters, 27 labs, circuit builder, exercises, KaTeX math, light/dark themes |
| **PDF textbook** | LaTeX source in `book/` — formal printable edition with matching notation and lab references |

This is an **independently authored** educational work. It uses standard curriculum progression (classical → qubit → algorithms) familiar from introductory texts, but prose, examples, and organization are original.

## Live site

**Interactive textbook:** https://benson0924.github.io/

**PDF (60 pages):** [book/main.pdf](book/main.pdf) in this repository

> **GitHub Pages 設定：** 到 [Settings → Pages](https://github.com/benson0924/benson0924.github.io/settings/pages)，**Build and deployment → Source** 選 **Deploy from a branch**，Branch 選 `gh-pages` / `/ (root)`。Repo 需設為 **Public** 才能公開存取。

## Quick start

```bash
npm install
npm run dev          # Web app at http://localhost:5173 (Ctrl/Cmd+K to search)
npm run build        # Production build with code-splitting

# PDF (requires TeX Live) — 60-page edition
cd book && chmod +x build.sh && ./build.sh
```

## Highlights

- **13 Learn chapters** with sticky table-of-contents, reading progress, and automatic prerequisite/next-concept links
- **27 Playground labs** + full **Circuit Builder** (SVG drag-drop, step simulation, OpenQASM export)
- **Global search** (Ctrl/Cmd+K) across chapters, sections, and labs
- **Practice hub** with randomized problems, hints, and step-by-step solutions
- **60-page PDF** synchronized with web chapters, lab cross-references, and exercises
- **Research cutoff:** September 2026

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
