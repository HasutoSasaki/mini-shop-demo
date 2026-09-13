# Mini Shop（Claude Code デモ用）

Claude Code のライブデモで使う、小さな EC サイト。商品一覧とカートの 2 画面だけ。
決済・ログイン・データ保存はなく、カートの状態はページを再読み込みすると消える。

## 起動

```bash
pnpm install
pnpm dev   # http://localhost:5173
```

## テスト・ビルド

```bash
pnpm test
pnpm build
```

## デモの流れ

1. `docs/demo-issues.md` の issue を GitHub に登録する
2. Claude Code に「issue #N を対応して、動作確認の証拠を付けて PR を出して」と依頼する
3. Claude Code が実装 → テスト → ブラウザで確認 → PR 作成まで行う（手順は `CLAUDE.md`）

## 構成

```
src/
├── App.tsx                 # ヘッダー（検索・カート）、カテゴリ・画面の切り替え、カート状態、フッター
├── components/
│   ├── Cart.tsx            # カート（明細 + 注文内容ボックス）
│   ├── CategoryNav.tsx     # カテゴリのナビバー
│   ├── Price.tsx           # 金額表示（¥ を小さく）
│   ├── ProductImage.tsx    # 商品画像の代わり（アイコン）
│   ├── ProductList.tsx     # 商品一覧（バッジ・ポイント・残り点数つき）
│   ├── QuantityControl.tsx # 数量の増減（− n ＋）
│   └── Rating.tsx          # 星評価
├── data/products.ts        # 商品データ（固定配列、12点）
└── lib/
    ├── cart.ts             # 金額計算（小計・送料・合計・点数）
    ├── cart.test.ts
    ├── catalog.ts          # 絞り込み・ポイント計算
    └── catalog.test.ts
```
