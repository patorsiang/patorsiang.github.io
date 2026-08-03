#!/usr/bin/env bash
#
# Fails when an interactive control is styled shorter than the 40px minimum tap
# target in docs/design/design-system.md ("Interactive targets should be at
# least 40px tall, with 44px preferred for mobile").
#
# How it decides something is interactive: every interactive control in this app
# carries a `focus-visible:` class, and non-interactive components (Card, Tag,
# Section, ExperienceCard) carry none. So a `focus-visible:` and a sub-40px
# height class on the same line is the signal. That is a heuristic, not a
# parser - it reads class strings, so it cannot see a height composed at
# runtime or split across lines. It exists to catch the common regression
# (someone edits a class string months from now), not to prove the rule.
#
# Escape hatch: put `tap-target-ok` in a comment on the same line, with a reason.

set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
target="${1:-$root/apps/portfolio-web/src}"

# Tailwind heights under h-10: h-px, h-0..h-9, the .5 steps, and arbitrary
# values below 40px. Anchored on a leading space, quote, or variant colon so
# `min-h-8` and `max-h-8` (which do not set a fixed height) are left alone.
too_short='[[:space:]:"'"'"'`]h-(px|[0-9](\.5)?|\[([0-9]|[1-3][0-9])px\])([[:space:]"'"'"'`]|$)'

# grep exits 1 on no match, which is the passing case here.
violations="$(
  grep -rnE "$too_short" "$target" \
    --include='*.tsx' \
    --include='*.ts' \
    --include='*.css' \
    | grep -E 'focus-visible:' \
    | grep -v 'tap-target-ok' \
    || true
)"

if [ -n "$violations" ]; then
  echo "Tap target check failed: interactive elements shorter than 40px (h-10)."
  echo "See docs/design/design-system.md. Raise the height, or add a"
  echo "\`tap-target-ok\` comment on the line explaining why it is exempt."
  echo
  echo "$violations"
  exit 1
fi

echo "Tap target check passed: no interactive element under 40px."
