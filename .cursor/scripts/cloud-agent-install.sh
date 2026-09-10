#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
BIN_DIR="${ROOT_DIR}/.cursor/bin"
SWIFTLINT_VERSION="0.65.1"
SWIFTLINT_URL="https://github.com/realm/SwiftLint/releases/download/${SWIFTLINT_VERSION}/swiftlint_linux_amd64.zip"
SWIFTLINT_BIN="${BIN_DIR}/swiftlint"

mkdir -p "${BIN_DIR}"

if [[ -x "${SWIFTLINT_BIN}" ]]; then
  installed_version="$("${SWIFTLINT_BIN}" version)"
  if [[ "${installed_version}" == "${SWIFTLINT_VERSION}" ]]; then
    echo "SwiftLint ${SWIFTLINT_VERSION} already installed."
  else
    echo "Replacing SwiftLint ${installed_version} with ${SWIFTLINT_VERSION}."
    rm -f "${SWIFTLINT_BIN}"
  fi
fi

if [[ ! -x "${SWIFTLINT_BIN}" ]]; then
  tmp_dir="$(mktemp -d)"
  trap 'rm -rf "${tmp_dir}"' EXIT

  curl -fsSL "${SWIFTLINT_URL}" -o "${tmp_dir}/swiftlint_linux_amd64.zip"
  unzip -q "${tmp_dir}/swiftlint_linux_amd64.zip" -d "${tmp_dir}"
  install -m 0755 "${tmp_dir}/swiftlint-static" "${SWIFTLINT_BIN}"
  echo "Installed SwiftLint ${SWIFTLINT_VERSION} to ${SWIFTLINT_BIN}"
fi

"${ROOT_DIR}/.cursor/scripts/cloud-agent-verify.sh"
