# rojo-works-site-v2

路 R O J O 上 (rojo.works) の本番サイト（開発用：dev.rojo.works）。

- **開発URL**: <https://dev.rojo.works/>
- **将来の本番URL**: <https://rojo.works/>（仮置きサイトと差し替え予定）
- **構成**: Astro（静的サイト・SSG）
- **ホスティング**: [Cloudflare Pages](https://pages.cloudflare.com/)

## 構成

| 項目 | 値 |
| ---- | -- |
| フレームワーク | Astro 5.x |
| 言語 | TypeScript |
| デザイン | シングルページ・縦並び（#articles / #dialogs / #rentals / #contact） |
| 背景色 | `#283446`（深い藍） |
| 文字色 | `#f0f0f0` |
| サブ文字色 | `#8d99ad` |
| フォント | LINE Seed JP（subset・セルフホスト・Apache 2.0） |
| ロゴ | `logo_rojo_283446.svg`（暗い四角背景＋白いROJO文字） |

## ファイル構成

```text
.
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro          # 共通レイアウト（ヘッダー＋ナビ＋フッター）
│   ├── pages/
│   │   └── index.astro               # シングルページ本体
│   └── content/
│       ├── articles/                 # 記事 Markdown（GW中作業で追加）
│       ├── dialogs/                  # 対話 Markdown
│       └── rentals/                  # 賃貸物件 Markdown
├── public/
│   ├── assets/
│   │   ├── logo.svg                  # ロゴ（viewBox最適化済）
│   │   └── fonts/
│   │       └── line-seed-jp-regular.woff2
│   └── favicon.svg
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 開発

```bash
# インストール
npm install

# ローカル開発サーバ
npm run dev

# ビルド（dist/ に出力）
npm run build

# プレビュー（ビルド後の確認）
npm run preview
```

## デプロイ

GitHub にpushすると Cloudflare Pages が自動でビルド＆デプロイ：

```bash
git add .
git commit -m "更新内容"
git push
```

## フォントの再生成（文言変更時）

`public/assets/fonts/line-seed-jp-regular.woff2` は使用文字だけのsubset。
新しい日本語・記号を追加したら再生成必要。

```bash
TEXT="（使用文字を全部含む文字列）"
ENCODED=$(python3 -c "import urllib.parse, sys; print(urllib.parse.quote(sys.argv[1]))" "$TEXT")
curl -s -H "User-Agent: Mozilla/5.0" \
  "https://fonts.googleapis.com/css2?family=LINE+Seed+JP:wght@400&text=${ENCODED}&display=swap" \
  > /tmp/font.css
WOFF2_URL=$(grep -oE 'https://fonts.gstatic.com/[^)]+' /tmp/font.css)
curl -sL -o public/assets/fonts/line-seed-jp-regular.woff2 "$WOFF2_URL"
```

## プライバシー方針

- Cookie 不使用
- アクセス解析なし
- 外部トラッキング・CDN なし
- フォント・画像はすべて同一オリジン配信

## ライセンス

- LINE Seed JP — [Apache License 2.0](https://github.com/line/LINESeedJP)
- ロゴ・コンテンツ — © 路上 / rojo.works
