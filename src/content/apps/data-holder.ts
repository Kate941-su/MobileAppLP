import type { AppLP } from "../types";

// 文言の元: data/listings/data-holder.json（Google Play の掲載文）
// スクショ: Play の日本語掲載は英語画像のため、data-holder リポジトリの fastlane/screenshots/ja を使用
const app: AppLP = {
  slug: "data-holder",
  name: "データホルダー",
  tagline: "パスワードや番号を暗号化して端末に保存",
  icon: "/apps/data-holder/icon.webp",
  theme: {
    brand: "#0DBAD9",
    heroFrom: "#d6f4fa",
    heroTo: "#ffffff",
    heroInk: "dark",
  },
  screenshotCaptionRatio: 0.2,
  screenshotAspect: 1320 / 2868,
  hero: {
    headline: "大切なデータは、\nスマホの中だけに。",
    lead: "ログイン情報、会員番号、パスポートの記載事項。人に見せたくない情報を、暗号化して端末の中に保管します。アカウント登録も広告もありません。",
    screenshots: ["/apps/data-holder/screenshots/01.png", "/apps/data-holder/screenshots/02.png"],
  },
  features: [
    {
      title: "暗号化して、\n端末の中だけに保存",
      body: "項目名と値は端末内で作った鍵で暗号化し、鍵は端末のセキュアな領域で守ります。入力した内容が開発者のサーバーに送られることはありません。",
      image: "/apps/data-holder/screenshots/01.png",
    },
    {
      title: "値は伏せて、\n必要なときだけ表示",
      body: "キーと値のセットで自由に記録。値は表示を選ぶまで伏せたまま。コピーした値は 60 秒後にクリップボードから自動で消えます。",
      image: "/apps/data-holder/screenshots/02.png",
    },
    {
      title: "パスポートを\nNFC でそのまま保存",
      body: "パスポートの IC チップから、顔写真を含む情報を入力の手間なく保存。チップの署名も端末内で確認します（NFC 対応端末が必要です）。",
    },
    {
      title: "パスワード付きで\nバックアップ",
      body: "パスワードで暗号化したバックアップファイルを書き出して、別の端末で復元できます。パスワードは保存も送信もされません。",
      image: "/apps/data-holder/screenshots/03.png",
    },
  ],
  stores: {
    googlePlay: "https://play.google.com/store/apps/details?id=com.dataholder.dataholder",
    appStore: "https://apps.apple.com/jp/app/id6830575982",
  },
  notes: [
    "無料プランでは Vault を 20 件まで保存できます。買い切りの Data Holder Pro で無制限になります（サブスクリプションではありません）。",
    "バックアップのパスワードを忘れると、バックアップは復元できません。",
  ],
  links: {
    privacy: "https://privacy-policy-root.vercel.app/data-holder",
    support: "https://privacy-policy-root.vercel.app/data-holder/support",
  },
  seo: {
    title: "データホルダー - パスワードや番号を暗号化して端末に保存",
    description:
      "パスワード、会員番号、パスポートの情報を暗号化してスマホの中だけに保管するアプリ。アカウント登録・広告・解析なし。パスポートの NFC 読み取り、パスワード付きバックアップに対応。",
  },
};

export default app;
