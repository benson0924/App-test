#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if ! command -v pdflatex >/dev/null 2>&1; then
  echo "pdflatex not found. Install TeX Live to build the PDF:"
  echo "  sudo apt-get install texlive-latex-base texlive-latex-extra texlive-fonts-recommended"
  exit 1
fi

pdflatex -interaction=nonstopmode main.tex
pdflatex -interaction=nonstopmode main.tex
echo "Built: book/main.pdf"
