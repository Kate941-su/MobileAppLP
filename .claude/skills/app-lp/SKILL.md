---
name: app-lp
description: 自社モバイルアプリの宣伝 LP（このリポジトリの /<slug> ページ）を追加・更新する。Google Play の掲載データ（アイコン・スクショ・説明文）を取り込み、「ヒーロー＋ストアボタン → 機能 2〜4 個 → フッターで再ダウンロード＋自社アプリ一覧」の型で作る。「〇〇の LP を作って」「新しいアプリを LP に追加」「LP の文言・画像を更新」「ストアの掲載を変えたので LP も直して」と言われたときに使う。
---

# アプリの LP を追加・更新する

ページの型は 1 つだけ。アプリごとの違いは `src/content/apps/<slug>.ts`（設定）と `public/apps/<slug>/`（画像）に閉じ込め、コンポーネントは触らずに済むようにする。

## ページの型（参考: GDO ゴルフ場予約アプリの LP）

| # | セクション | 中身 | 設定のキー |
|---|---|---|---|
| 1 | ヒーロー | アイコン＋アプリ名＋一言 / 見出し（2 行）/ 短い宣伝文（2〜3 文）/ ストアのバッジ / 右に端末画面 1〜2 枚。背景はスクショの背景色のグラデーション | `hero` `theme` `stores` |
| 2 | 機能 | `POINT 01`〜`04`。見出し（2 行）＋本文（2〜3 文）＋スクショ。左右交互、偶数番目は薄いブランド色の背景 | `features`（2〜4 個） |
| 3 | フッター | アイコン＋名前＋バッジをもう一度 / 注意書き / ほかの自社アプリ一覧 / ポリシー・サポートへのリンク / 商標表記 | `notes` `links`、一覧は `src/content/site.ts` |

参考サイトにある動画・クーポン・SNS リンクは入れていない（必要になったらユーザーに確認して型ごと拡張する）。

## 新しいアプリを追加する手順

1. **ブランチ**: `git branch --show-current` を確認し、`main` なら `feat/lp-<slug>` を切る
2. **掲載データの取り込み**
   ```sh
   npm run fetch-listing -- <slug> <androidPackageId> [iosBundleId]
   ```
   - `public/apps/<slug>/icon.webp` と `screenshots/NN.webp`、`data/listings/<slug>.json`（タイトル・説明文・App Store の URL）ができる
   - Play の開発者ページ（`site.googlePlayDeveloper`）で package ID を確認できる
3. **スクショを選ぶ**（取り込んだ画像を目で見て確認する。ffmpeg で横に並べると速い）
   - Play はスマホ用とタブレット用が混ざって返る。スマホ用の分だけ残して、ほかは消す
   - 日本語の掲載に英語の画像しかない場合は、アプリのリポジトリ（`fastlane/screenshots/ja` や `store/play/ja`）から日本語版を持ってくる。`sips -s format png -Z 1600` で縮小
   - 機能紹介に使う画像が無い機能は、`image` を省くとテキストだけのブロックになる（できれば画像を用意してもらう）
4. **設定ファイルを書く**: [template.ts](template.ts) を `src/content/apps/<slug>.ts` にコピーして埋める
   - `theme.heroFrom` / `heroTo`: スクショ上端と下端の背景色をそのまま使う（画像が背景になじむ）。
     `ffmpeg -i shot.webp -vf "crop=1:1:20:5,format=rgb24" -f rawvideo - | xxd -p`（webp が読めなければ sips で png にしてから）
   - `heroInk`: 背景が明るければ `dark`、暗ければ `light`
   - `screenshotCaptionRatio`: スクショ上部の見出しを隠す割合（見出しが 1 行なら 0.18、サブ見出し付きなら 0.27 くらい）。端末の上端が少し見える値にする
   - `screenshotAspect`: Play の画像は `1080 / 1920`、iPhone 6.9" は `1320 / 2868`
   - `stores`: App Store に無いアプリ（Android 専用など）は `appStore` を書かない → バッジが出ない
   - `links`: プライバシーポリシー・サポートは `https://privacy-policy-root.vercel.app/<name>`（そのリポジトリの `policies/` `support/` にある名前。slug と違うことがある。例: stacklens → `stack-lens`）。`curl -o /dev/null -w '%{http_code}'` で 200 を確認してから書く
   - `seo.ogImage`: 日本語のフィーチャーグラフィック（1024x500）があれば `public/apps/<slug>/feature-graphic.png` に置いて指定。無ければ省略（アイコンになる）
5. **登録**: `src/content/site.ts` の `apps` に import して加える（並び順＝表示順）。LP を作らないアプリは `externalApps` に入れるだけ
6. **確認**: `npm run lint && npm run typecheck && npm run build`、`npx next start` で PC 幅とスマホ幅を目視
   - ヘッドレス Chrome はウィンドウを約 500px 未満にできない。スマホ幅は 390px の iframe を並べた HTML を撮る
7. **CLAUDE.md の「アプリ一覧」表を更新**し、コミット → push → PR（マージはユーザー）

## 文言のルール

- 元ネタは `data/listings/<slug>.json` の説明文。**書いていない機能・数字・効果を足さない**
- ヒーローの見出しは 2 行、20 字前後。改行位置は `\n` で指定（文節の切れ目で）
- 宣伝文・機能の本文は 2〜3 文。「です・ます」。煽り（「最強」「今すぐ」）は使わない
- アプリ側の表現の制約を守る（例: ドパ脱は「医療機器ではありません」「効果を保証するものではありません」を必ず載せ、性的な言葉・「NoFap」を使わない。各アプリの SPEC / CLAUDE.md を確認）
- 課金・広告の有無は `notes` に正直に書く
- ストアの掲載文を変えたら LP も直す（`npm run fetch-listing` で取り込み直して差分を見る）

## やらないこと

- ストアのバッジの色・形を変えない、自作しない（Apple / Google のガイドラインで公式画像を使う決まり。`public/badges/` の公式画像を使う）
- 解析タグ・Cookie を入れない（入れるならプライバシーポリシーの更新が必要。ユーザーに確認）
- アプリごとに別コンポーネントを作らない。型で表せない要望は、まず `AppLP` 型の拡張で対応できないか考える
