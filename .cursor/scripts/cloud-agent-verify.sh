#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SWIFTLINT_BIN="${ROOT_DIR}/.cursor/bin/swiftlint"
PROJECT_DIR="${ROOT_DIR}/1234"
XCODEPROJ="${ROOT_DIR}/1234.xcodeproj"

required_paths=(
  "${XCODEPROJ}/project.pbxproj"
  "${PROJECT_DIR}/AppDelegate.swift"
  "${PROJECT_DIR}/SceneDelegate.swift"
  "${PROJECT_DIR}/ViewController.swift"
  "${PROJECT_DIR}/Info.plist"
  "${PROJECT_DIR}/Base.lproj/Main.storyboard"
  "${PROJECT_DIR}/Base.lproj/LaunchScreen.storyboard"
)

echo "Verifying iOS project structure..."
for path in "${required_paths[@]}"; do
  if [[ ! -f "${path}" ]]; then
    echo "Missing required project file: ${path}" >&2
    exit 1
  fi
done

python3 - "${PROJECT_DIR}/Info.plist" <<'PY'
import plistlib
import sys

with open(sys.argv[1], "rb") as handle:
    plist = plistlib.load(handle)

scene_manifest = plist.get("UIApplicationSceneManifest")
if not isinstance(scene_manifest, dict):
    raise SystemExit("Info.plist missing UIApplicationSceneManifest")

configurations = scene_manifest.get("UISceneConfigurations", {})
window_scenes = configurations.get("UIWindowSceneSessionRoleApplication")
if not window_scenes:
    raise SystemExit("Info.plist missing UIWindowSceneSessionRoleApplication scene configuration")

delegate = window_scenes[0].get("UISceneDelegateClassName", "")
if "SceneDelegate" not in delegate:
    raise SystemExit("Info.plist scene delegate is not wired to SceneDelegate")

print(f"Info.plist valid (scene delegate: {delegate})")
PY

xmllint --noout "${PROJECT_DIR}/Base.lproj/Main.storyboard"
xmllint --noout "${PROJECT_DIR}/Base.lproj/LaunchScreen.storyboard"
echo "Storyboard XML is well-formed."

if [[ ! -x "${SWIFTLINT_BIN}" ]]; then
  echo "SwiftLint binary not found at ${SWIFTLINT_BIN}" >&2
  exit 1
fi

echo "Running SwiftLint..."
"${SWIFTLINT_BIN}" lint "${PROJECT_DIR}"
echo "SwiftLint completed successfully."

echo "Project verification passed."
