# rojo-works-site-v2

路 R O J O 上 (rojo.works) の作り直し版。現在は開発用ドメイン（dev.rojo.works）で確認しながら作っている。記事が揃ったら、本番の `rojo.works` を、この土台に切り替える。

- **開発URL**: <https://dev.rojo.works/>
- **将来の本番URL**: <https://rojo.works/>（現行の仮置きサイト `rojo-works-site` と差し替え予定）
- **構成**: Astro（静的サイト・SSG）＋ Cloudflare Pages Functions（`functions/`）
- **ホスティング**: [Cloudflare Pages](https://pages.cloudflare.com/)

## 構成

| 項目 | 値 |
| ---- | -- |
| フレームワーク | Astro `^6.2.1` |
| Node | `>=22.12.0`（`package.json` の `engines`） |
| 言語 | TypeScript |
| デザイン | シングルページのトップ（ARTICLES / DIALOGS / RENTALS / WORKS / CONTACT）＋ 記事3種類の一覧・詳細ページ |
| 背景色 | `#2b2b2b` |
| 文字色 | `#f8fbf8` |
| サブ文字色 | `#888` |
| リンク色 | `#00a3af` |
| フォント（固定の見出し・ナビ・フッター） | JetBrains Mono ＋ LINE Seed JP（サブセット・セルフホスト） |
| フォント（記事の題名・本文） | OSのフォント（サブセットに無い文字で崩れるため。詳しくは下記） |
| ロゴ | `logo.svg` |

## ファイル構成

```text
.
├── src/
│   ├── components/
│   │   ├── Header.astro          # サイト共通のヘッダー
│   │   ├── Footer.astro          # サイト共通のフッター
│   │   └── EntryCard.astro       # 一覧の1件分（記事カード）
│   ├── layouts/
│   │   └── BaseLayout.astro      # 共通レイアウト（head、Header、Footer）
│   ├── lib/
│   │   └── content-types.ts      # 記事3種類の名前と見出しの対応
│   ├── pages/
│   │   ├── index.astro           # トップページ
│   │   ├── 404.astro
│   │   └── [type]/
│   │       ├── index.astro       # 一覧（/articles/ 等）
│   │       └── [id].astro        # 詳細（/articles/xxx/ 等）
│   ├── content.config.ts         # 記事の型（articles / dialogs / rentals）
│   ├── content/
│   │   ├── articles/
│   │   ├── dialogs/
│   │   └── rentals/
│   └── styles/                   # CSS（Codex が見た目を編集する場所）
├── functions/
│   └── _middleware.js            # 本番ドメイン以外への noindex ヘッダー
├── public/
│   ├── assets/
│   │   ├── logo.svg
│   │   └── fonts/
│   │       ├── line-seed-jp-regular.woff2（サブセット）
│   │       ├── line-seed-jp-OFL.txt
│   │       ├── jetbrains-mono-regular.woff2
│   │       └── jetbrains-mono-OFL.txt
│   └── favicon.svg
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 開発

```bash
# インストール
npm ci

# ローカル開発サーバ
npm run dev

# ビルド（dist/ に出力）
npm run build

# プレビュー（ビルド後の確認）
npm run preview
```

## デプロイ

`main` に push すると、Cloudflare Pages（プロジェクト `rojo-works-site-v2`）が自動でビルド＆デプロイする（GitHub 連携）。反映先は `dev.rojo.works` と `rojo-works-site-v2.pages.dev`。`rojo.works` への切り替えは、別途ドメインの付け替えで行う。

```bash
git add .
git commit -m "更新内容"
git push
```

## 検索エンジンへの表示（noindex）

`dev.rojo.works` と `*.pages.dev` は、本番ではない。`functions/_middleware.js` が、アクセスしてきたホスト名を見て、`rojo.works` 以外への応答に `X-Robots-Tag: noindex` を足す。ビルドは全ホスト共通の静的ファイルなので、ホストの区別はこの Function でしか行えない。

## フォントの再生成（固定の見出し・部品の文言を変えたとき）

`public/assets/fonts/line-seed-jp-regular.woff2` は、固定の見出し・ナビ・フッターなど、決まった文字だけのサブセット（記事の本文・題名には使わない。上の「構成」参照）。それらの文言を変えたら、再生成が必要。

```bash
TEXT="（固定の文言を全部含む文字列）"
ENCODED=$(python3 -c "import urllib.parse, sys; print(urllib.parse.quote(sys.argv[1]))" "$TEXT")
curl -s -H "User-Agent: Mozilla/5.0" \
  "https://fonts.googleapis.com/css2?family=LINE+Seed+JP:wght@400&text=${ENCODED}&display=swap" \
  > /tmp/font.css
WOFF2_URL=$(grep -oE 'https://fonts.gstatic.com/[^)]+' /tmp/font.css)
curl -sL -o public/assets/fonts/line-seed-jp-regular.woff2 "$WOFF2_URL"
```

## プライバシー方針

- フォント・画像は、すべて同一オリジン（このサイト自身）から配信
- 現時点（段階1）では、Cookie 不使用・アクセス解析なし・広告なし
- 計測（Cloudflare Web Analytics）と広告（Google アドセンス）は、あとの段階で入れる予定。入れる前に、フッターの宣言とプライバシーポリシーを、実際の内容に合わせて書き直す

## ライセンス

- LINE Seed JP — [SIL Open Font License 1.1](public/assets/fonts/line-seed-jp-OFL.txt)（© LY Corporation）
- JetBrains Mono — [SIL Open Font License 1.1](public/assets/fonts/jetbrains-mono-OFL.txt)（© The JetBrains Mono Project Authors）
- ロゴ・コンテンツ — © 路上 / rojo.works
