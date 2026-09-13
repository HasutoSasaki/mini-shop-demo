# CLAUDE.md

## プロジェクト概要

Mini Shop は Claude Code のデモ用の小さな EC サイト（商品一覧 + カートの 2 画面）。
Vite + React + TypeScript、テストは Vitest、パッケージマネージャーは pnpm（npm / npx は使わない）。
決済・ログイン・データ保存はない。カートの状態はメモリ上だけ。

## コマンド

- `pnpm dev` — 開発サーバー http://localhost:5173 （ポート固定）
- `pnpm test` — テスト（vitest run）
- `pnpm build` — 型チェック + ビルド

## 構成

- `src/data/products.ts` — 商品データ（固定配列、12点）
- `src/lib/cart.ts` — 金額計算（小計・送料・合計・点数）。`src/lib/catalog.ts` — 絞り込み・ポイント計算。ロジックはここに置く。テストは `src/lib/*.test.ts`
- `src/components/ProductList.tsx` — 商品一覧（カード表示。バッジ・ポイント・残り点数・お届け目安つき）
- `src/components/CategoryNav.tsx` — カテゴリのナビバー
- `src/components/Cart.tsx` — カート（左: 明細、右: 注文内容ボックス）
- `src/components/Price.tsx` / `Rating.tsx` / `ProductImage.tsx` / `QuantityControl.tsx` — 金額・星評価・商品画像・数量増減の表示部品
- `src/App.tsx` — ヘッダー（検索・アカウント表示・カート）、カテゴリと画面の切り替え、カート状態、フッター
- 見た目は大手 EC サイト風（濃紺ヘッダー、白カード、黄色ボタン）。新しい表示は既存の部品と配色に合わせる

## issue 対応の進め方

1. `gh issue view <番号>` で依頼内容と受け入れ条件を読む
2. `main` からブランチ `feat/issue-<番号>-<短い英語名>` を作る
3. 実装する。計算や判定のロジックは `src/lib/cart.ts` に置き、必ずテストを追加する
4. `pnpm test` と `pnpm build` を通す
5. ブラウザで動作確認し、証拠（スクリーンショットか GIF）を残す
6. commit → push → `gh pr create`

## ブラウザでの動作確認

- 開発サーバーは起動済みのことが多い。まず http://localhost:5173 を開く。開けなければ `pnpm dev` をバックグラウンドで起動する
- Chrome 拡張（Claude in Chrome）で実際に操作して確認する。例: 商品を「カートに入れる」→ ヘッダーの「カート」を押す → 表示を確認する
- 証拠の残し方
  - GIF: `gif_creator` で `start_recording` → 操作 → `stop_recording` → `export`（`download: true`、`filename` は `issue-<番号>.gif`）。Chrome のダウンロード先（通常 `~/Downloads`）に保存されるので、`docs/screenshots/` に移す
  - 静止画で十分なときは、GIF の代わりに `upload_image` で PR 画面の本文欄に直接ドロップしてもよい
- 証拠ファイルはブランチに commit し、PR 本文からは次の形式の URL で参照する（相対パスは PR 本文では表示されない）
  `https://github.com/HasutoSasaki/mini-shop-demo/blob/<ブランチ名>/docs/screenshots/<ファイル名>?raw=true`

## PR の書き方

- タイトル: `feat: <変更内容>（#<issue 番号>）`
- 本文は `.github/pull_request_template.md` の形式。「動作確認」にスクリーンショットか GIF を必ず貼る
- 本文末尾に `Closes #<issue 番号>`

## 規約

- コミットメッセージは日本語の Conventional Commits（例: `feat: 送料無料の表示を追加`）
- 依頼された範囲だけを変更する。無関係なリファクタリングや機能追加はしない
- 金額の表示は `formatYen`（`¥1,200` 形式）か `Price` 部品を使う
