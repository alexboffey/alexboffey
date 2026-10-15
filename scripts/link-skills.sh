#!/usr/bin/env sh
# Symlink installed skills from .agents/skills into .claude/skills, which is
# where Claude Code looks. Safe to rerun: links for removed skills are pruned,
# and real directories (repo-owned skills like tailor-cover-letter) are left alone.
set -eu
cd "$(dirname "$0")/.."
mkdir -p .claude/skills

for link in .claude/skills/*; do
  [ -L "$link" ] && [ ! -e "$link" ] && rm "$link" && echo "pruned $(basename "$link")"
done

for dir in .agents/skills/*/; do
  name=$(basename "$dir")
  target=.claude/skills/$name
  if [ -e "$target" ] && [ ! -L "$target" ]; then
    echo "skip $name (real directory in .claude/skills)"
    continue
  fi
  ln -sfn "../../.agents/skills/$name" "$target"
done

echo "linked: $(find .claude/skills -maxdepth 1 -type l | wc -l | tr -d ' ')"
