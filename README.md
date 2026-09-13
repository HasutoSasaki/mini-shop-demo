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
├── App.tsx                 # 画面切り替えとカート状態
├── components/
│   ├── Cart.tsx            # カート
│   ├── ProductImage.tsx    # 商品画像の代わり（色付きの枚）
│   └── ProductList.tsx     # 商品一覧
├── data/products.ts        # 商品データ（固定配列）
└── lib/
    ├── cart.ts             # 金額計算（小計・送料・合計・点数）
    └── cart.test.ts
```
