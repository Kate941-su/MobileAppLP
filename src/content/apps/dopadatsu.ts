import type { AppLP } from "../types";

// 文言の元: data/listings/dopadatsu.json（Google Play の掲載文）
// 表現の制約（dopadatsu/SPEC.md §19）: 性的な言葉・「NoFap」は使わない。
// 「医療機器ではありません」「効果を保証するものではありません」を必ず載せる
const app: AppLP = {
  slug: "dopadatsu",
  name: "ドパ脱！",
  tagline: "習慣化・スマホ断ちの記録",
  icon: "/apps/dopadatsu/icon.webp",
  theme: {
    brand: "#E0653A",
    heroFrom: "#6a9b69",
    heroTo: "#4a7a49",
    heroInk: "light",
  },
  screenshotCaptionRatio: 0.18,
  screenshotAspect: 1080 / 1920,
  hero: {
    headline: "やめたい習慣を、\n小坊主と一緒にゆるく修行。",
    lead: "SNS、ショート動画、ゲーム。「やめたいのに、ついやってしまう」習慣を断った日数を記録して、ゆるく続けるためのアプリです。登録不要、記録はスマホの中だけ。",
    screenshots: ["/apps/dopadatsu/screenshots/01.webp", "/apps/dopadatsu/screenshots/06.webp"],
  },
  features: [
    {
      title: "続けた日数で、\n小坊主が成長",
      body: "続けた日数に応じて、あなたの小坊主が「小坊主」から「悟りの境地」まで 9 つの段位を上がっていきます。ホームには経過時間と次の段位までの残り時間を表示。",
      image: "/apps/dopadatsu/screenshots/01.webp",
    },
    {
      title: "つらい瞬間は\nSOS で切り替え",
      body: "衝動が来たら SOS をタップ。64 秒のボックス呼吸、自分で決めたやめたい理由、代わりにやることのリストで、気持ちを切り替える手助けをします。",
      image: "/apps/dopadatsu/screenshots/02.webp",
    },
    {
      title: "振り返りで、\n次はもっと続く",
      body: "カレンダー、ベスト記録、乗り越えた回数、きっかけの TOP3 で自分の傾向がわかります。リスタートしても責めません。ここまでの記録はちゃんと残ります。",
      image: "/apps/dopadatsu/screenshots/04.webp",
    },
    {
      title: "のぞき見対策も\nしっかり",
      body: "生体認証・PIN のアプリロック、アプリ切り替え画面のぼかし、メモ帳風・計算機風へのアイコン着せ替え。通知にも習慣の内容がわかる言葉は入れません。",
    },
  ],
  stores: {
    googlePlay: "https://play.google.com/store/apps/details?id=jp.vntech.dopadatsu",
    appStore: "https://apps.apple.com/jp/app/id6828511093",
  },
  notes: [
    "本アプリは医療機器ではありません。効果を保証するものではありません。",
    "無料版には広告が表示されます。買い切りのプレミアムで広告の非表示や詳しい統計が使えます。",
  ],
  links: {
    privacy: "https://privacy-policy-root.vercel.app/dopadatsu",
    support: "https://privacy-policy-root.vercel.app/dopadatsu/support",
  },
  seo: {
    title: "ドパ脱！ - 習慣化・スマホ断ちの記録",
    description:
      "SNS やショート動画、ゲームなど、やめたい習慣を断った日数を記録するアプリ。小坊主と一緒に 9 つの段位を目指して、ゆるく修行。登録不要、記録はスマホの中だけ。",
    ogImage: "/apps/dopadatsu/feature-graphic.png",
  },
};

export default app;
