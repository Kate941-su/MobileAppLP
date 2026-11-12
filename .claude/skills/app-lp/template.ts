// src/content/apps/<slug>.ts のひな形。コピーして <> を埋める。
// 型の説明は src/content/types.ts のコメントを参照
import type { AppLP } from "../types";

// 文言の元: data/listings/<slug>.json（Google Play の掲載文）
const app: AppLP = {
  slug: "<slug>",
  name: "<アプリ名>",
  tagline: "<一言の説明。ストアのサブタイトル程度>",
  icon: "/apps/<slug>/icon.webp",
  theme: {
    brand: "<#アクセント色>",
    heroFrom: "<#スクショ上端の背景色>",
    heroTo: "<#スクショ下端の背景色>",
    heroInk: "light", // 明るい背景なら "dark"
  },
  screenshotCaptionRatio: 0.2,
  screenshotAspect: 1080 / 1920,
  hero: {
    headline: "<1 行目>\n<2 行目>",
    lead: "<2〜3 文の宣伝文>",
    screenshots: ["/apps/<slug>/screenshots/01.webp", "/apps/<slug>/screenshots/02.webp"],
  },
  features: [
    {
      title: "<1 行目>\n<2 行目>",
      body: "<2〜3 文>",
      image: "/apps/<slug>/screenshots/01.webp",
    },
    {
      title: "<1 行目>\n<2 行目>",
      body: "<2〜3 文>",
      image: "/apps/<slug>/screenshots/02.webp",
    },
  ],
  stores: {
    googlePlay: "https://play.google.com/store/apps/details?id=<packageId>",
    appStore: "https://apps.apple.com/jp/app/id<数字>", // App Store に無ければ行ごと消す
  },
  notes: ["<料金・広告・対応端末などの注意書き>"],
  links: {
    privacy: "https://privacy-policy-root.vercel.app/<name>",
    support: "https://privacy-policy-root.vercel.app/<name>/support",
  },
  seo: {
    title: "<アプリ名> - <一言>",
    description: "<120 字前後。検索結果に出る説明>",
    // ogImage: "/apps/<slug>/feature-graphic.png",
  },
};

export default app;
