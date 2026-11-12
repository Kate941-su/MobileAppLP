# MobileAppLP

自社モバイルアプリ（個人開発）を宣伝する LP サイト。Next.js（App Router、全ページ静的生成）を Vercel で公開する。

## このサイトの意図

- **目的**: ストアのページだけでは伝えにくいアプリの魅力をシンプルに見せ、ストア（Google Play / App Store）へ送る。SNS・ブログ・名刺などから貼るリンク先にもなる
- **型は 1 つ**（参考: GDO ゴルフ場予約アプリの LP `reserve.golfdigest.co.jp/sp/app/lp/`。本家は 403 なので Web Archive で確認した）
  1. ヒーロー: アプリの概要＋背景（ブランド色）＋短い宣伝＋ストアへのボタン＋端末画面
  2. メイン機能を 2〜4 個に分けて紹介（POINT 01〜）
  3. フッター: もう一度ダウンロードボタン＋自社アプリへのリンク
- **素材は Google Play の掲載データ**（アイコン・スクショ・説明文）から作る。ストアと LP の内容をそろえるため、文言も掲載文から外れたことを書かない
- **1 サイトで複数アプリ**（2026-11-12 ユーザー決定）: `/` にアプリ一覧、`/<slug>` に各アプリの LP。アプリの追加は設定ファイル 1 つと画像だけ
- 解析タグ・Cookie・問い合わせフォームは置かない（置くならプライバシーポリシーの更新が必要）

## アプリ一覧

| slug | アプリ | Android | iOS | ポリシー（privacy-policy-root） | 備考 |
|---|---|---|---|---|---|
| `dopadatsu` | ドパ脱！ | jp.vntech.dopadatsu | id6828511093 | `/dopadatsu`、`/dopadatsu/support` | 「医療機器ではありません」等の注意書き必須 |
| `data-holder` | データホルダー | com.dataholder.dataholder | id6830575982 | `/data-holder`、`/data-holder/support` | Play の日本語掲載は英語のスクショのため、スクショは data-holder リポジトリの `fastlane/screenshots/ja` から。NFC 読み取りの画面のスクショが無い（POINT 03 はテキストのみ） |
| `stacklens` | スタックレンズ | jp.vntech.stacklens | なし（Android 専用） | `/stack-lens`（サポートなし） | App Store のバッジは出さない |
| — | 血圧手帳 | com.kaitokitaya.pressure_management | なし | — | LP なし。フッターの一覧のみ |
| — | World Info | com.worldinfo.app | なし | — | LP なし。フッターの一覧のみ |

## 構成

```
src/content/types.ts          AppLP（LP 1 つ分の設定の型）。各項目の意味はコメント参照
src/content/apps/<slug>.ts    アプリごとの設定（文言・色・画像・ストア URL）
src/content/site.ts           LP の並び順、LP なしの自社アプリ、サイト名
src/components/               Hero / Features / Footer / StoreBadges / Screenshot（全アプリ共通）
src/app/[app]/page.tsx        LP（generateStaticParams で静的生成。未登録の slug は 404）
public/apps/<slug>/           icon.webp、screenshots/、feature-graphic.png（OG 画像）
public/badges/                ストアの公式バッジ（日本語）。加工しない
data/listings/<slug>.json     Play の掲載データの控え（文言を書くときの参照用。ページからは読まない）
scripts/fetch-store-listing.mjs  Play / App Store から上記の素材を取得
.claude/skills/app-lp/        LP の追加・更新の手順（スキル）とひな形
```

- スクショはストア用の画像（上部に見出し付き）をそのまま使い、`screenshotCaptionRatio` の割合だけ上を切り落として端末部分を見せる
- ヒーローの背景色はスクショの背景色に合わせる（切り落とした画像が背景になじむ）

## コマンド

```sh
npm run dev                  # http://localhost:3000
npm run lint
npm run typecheck            # next typegen && tsc
npm run build
npm run fetch-listing -- <slug> <androidPackageId> [iosBundleId]
```

Node は `.nvmrc`（24）。CI（`.github/workflows/ci.yml`）は PR ごとに lint → typecheck → build。

## 公開（Vercel）

- リポジトリ: `Kate941-su/MobileAppLP`（公開リポジトリ）
- `main` はルールセット `protect-main` で保護（2026-11-12）: PR 必須（承認 0 人）、CI の `node` チェック通過が必須、force push 禁止
- **まず Vercel の無料プラン（Hobby）で公開する**（2026-11-12 ユーザー決定）。GitHub のリポジトリを Vercel にインポート（`main` が本番、PR ごとにプレビュー）。Framework は Next.js、設定の変更は不要
- Hobby は利用規約上「個人・非商用」向け。広告や課金のあるアプリの宣伝が商用とみなされる可能性があるので、収益が出てきたら Pro への切り替えを検討する
- 本番 URL は Vercel の `VERCEL_PROJECT_PRODUCTION_URL` から自動で入る。独自ドメインにしたら環境変数 `NEXT_PUBLIC_SITE_URL` を設定する（canonical / OG / sitemap に使う）

## 作業ルール

- アプリの追加・文言や画像の更新は **`app-lp` スキル**に従う
- ブランチ → PR → CI 通過 → ユーザーがマージ。`main` に直接 push しない（`~/.claude/rules/app-maintenance.md`）
- わからないこと（コピーの方向性、載せる機能の選び方、ドメインなど）は推測で決めずにユーザーに質問し、決まったことはこのファイルに日付付きで追記する
- アプリ側でストアの掲載文・スクショ・課金・対応 OS を変えたら、この LP も同じタイミングで直す

## 決定事項

- 2026-11-12: トップページのサイト名は「Kaito Kitaya のアプリ」
- 2026-11-12: データホルダーの NFC 読み取り画面のスクショはまだ無い。POINT 03 はテキストのみのまま。用意できたら `public/apps/data-holder/screenshots/` に置き、`features[2].image` に指定する

## 未決事項

- 独自ドメインを使うか（未定の間は `*.vercel.app`）
