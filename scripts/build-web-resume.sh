#!/usr/bin/env bash
# Builds the public copy of the résumé, with the phone number removed.
#
# ~/resume/resume.tex keeps the phone number: that version is what gets sent
# directly to people. Only this web copy drops it, because /resume.pdf is
# crawlable and a phone number published there is public permanently.
#
# Output: public/resume.pdf
set -euo pipefail

RESUME_DIR="${RESUME_DIR:-$HOME/resume}"
SRC="$RESUME_DIR/resume.tex"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/resume.pdf"
PHONE='781-205-0452'

[ -f "$SRC" ] || { echo "error: no resume.tex at $SRC" >&2; exit 1; }

# pdflatex ships with MacTeX and is not on the default PATH.
export PATH="/Library/TeX/texbin:$PATH"
command -v pdflatex >/dev/null || { echo "error: pdflatex not found (MacTeX)" >&2; exit 1; }

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# Drop the phone line, and the "\textbar \" separator sitting immediately before
# it, so the header does not end up with a dangling divider.
awk -v phone="$PHONE" '
  { l[NR] = $0 }
  END {
    for (i = 1; i <= NR; i++) {
      if (l[i] ~ phone) continue
      if (i < NR && l[i+1] ~ phone && l[i] ~ /textbar/) continue
      print l[i]
    }
  }
' "$SRC" > "$TMP/resume.tex"

if grep -q "$PHONE" "$TMP/resume.tex"; then
  echo "error: phone number survived the strip" >&2
  exit 1
fi

(cd "$TMP" && pdflatex -interaction=nonstopmode -halt-on-error resume.tex >/dev/null)

# The résumé is designed to be exactly one page; a stray extra page means the
# edit broke the layout.
if command -v pdfinfo >/dev/null; then
  pages="$(pdfinfo "$TMP/resume.pdf" | awk '/^Pages:/ {print $2}')"
  [ "$pages" = "1" ] || { echo "error: built résumé is $pages pages, expected 1" >&2; exit 1; }
fi

# Belt and braces: confirm the rendered text really has no phone number.
if command -v pdftotext >/dev/null; then
  if pdftotext "$TMP/resume.pdf" - | grep -q "$PHONE"; then
    echo "error: phone number still present in rendered PDF" >&2
    exit 1
  fi
fi

cp "$TMP/resume.pdf" "$OUT"
echo "wrote $OUT (phone number removed, ${pages:-?} page)"
