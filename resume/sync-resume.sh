#!/usr/bin/env bash
#
# sync-resume.sh — regenerate the website's downloadable resume from the MASTER .docx.
#
# Single source of truth: the .docx below is what Suneel shares with recruiters.
# This script exports it to PDF (via LibreOffice, faithful Calibri layout) and drops
# it into the portfolio's public/ folder so the website always mirrors the master.
#
# WORKFLOW for any resume change:
#   1. Edit the MASTER .docx first (the file below).
#   2. Run this script:            ./resume/sync-resume.sh
#   3. Mirror the same change into src/data.js (experience/skills the site renders).
#   4. npm run build && git commit && git push   (GitHub Actions deploys the site).
#
set -euo pipefail

MASTER="/Users/MAC/Downloads/Documents/Resume/SuneelBikkasani - Sr. Java Fullstack Developer.docx"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PUBLIC="$ROOT/public"

if [[ ! -f "$MASTER" ]]; then
  echo "ERROR: master resume not found at:" >&2
  echo "  $MASTER" >&2
  exit 1
fi

if ! command -v soffice >/dev/null 2>&1; then
  echo "ERROR: LibreOffice 'soffice' not found. Install with:" >&2
  echo "  brew install --cask libreoffice" >&2
  exit 1
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

soffice --headless --convert-to pdf --outdir "$TMP" "$MASTER" >/dev/null 2>&1
PDF="$(ls "$TMP"/*.pdf | head -1)"

if [[ -z "${PDF:-}" || ! -f "$PDF" ]]; then
  echo "ERROR: conversion produced no PDF" >&2
  exit 1
fi

cp "$PDF" "$PUBLIC/resume.pdf"
echo "✔ Synced master .docx → $PUBLIC/resume.pdf ($(wc -c < "$PUBLIC/resume.pdf" | tr -d ' ') bytes)"
echo "  Next: mirror content into src/data.js, then npm run build && git push."
