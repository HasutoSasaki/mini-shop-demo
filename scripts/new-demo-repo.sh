#!/usr/bin/env bash
# テンプレートから日付付きのデモ用リポジトリを作り、issue を登録して手元に取得する。
# 使い方: scripts/new-demo-repo.sh [YYYYMMDD]   （省略時は今日の日付）
set -euo pipefail

TEMPLATE="HasutoSasaki/mini-shop-demo"
ISSUES=(1 2 3)

date_suffix="${1:-$(date +%Y%m%d)}"
owner="$(gh api user -q .login)"
repo="${owner}/mini-shop-demo-${date_suffix}"

if gh repo view "$repo" >/dev/null 2>&1; then
  echo "既に存在します: $repo" >&2
  exit 1
fi

gh repo create "$repo" --template "$TEMPLATE" --public

# テンプレートからのコピーが終わるまで待つ
until gh api "repos/${repo}/commits" >/dev/null 2>&1; do sleep 2; done

for n in "${ISSUES[@]}"; do
  title="$(gh issue view "$n" --repo "$TEMPLATE" --json title -q .title)"
  body="$(gh issue view "$n" --repo "$TEMPLATE" --json body -q .body)"
  gh issue create --repo "$repo" --title "$title" --body "$body"
done

ghq get "$repo"
dir="$(ghq root)/github.com/${repo}"
(cd "$dir" && pnpm install)

echo
echo "作成しました: https://github.com/${repo}"
echo "フォルダ: $dir"
