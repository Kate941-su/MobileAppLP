import type { AppLP } from "../types";

// 文言の元: data/listings/stacklens.json（Google Play の掲載文）
// Android のみ（iOS は他アプリのバイナリを読めないため）。App Store のバッジは出さない
const app: AppLP = {
  slug: "stacklens",
  name: "スタックレンズ",
  tagline: "アプリの技術スタック判定",
  icon: "/apps/stacklens/icon.webp",
  theme: {
    brand: "#0a6ad6",
    heroFrom: "#0a6ad6",
    heroTo: "#10376b",
    heroInk: "light",
  },
  screenshotCaptionRatio: 0.27,
  screenshotAspect: 1080 / 1920,
  hero: {
    headline: "そのアプリ、\n何で作られてる？",
    lead: "スマホに入っているアプリが Flutter、React Native、Unity などのどれで作られているかを判定する開発者向けツール。Flutter アプリはバージョンと使っているパッケージまでわかります。",
    screenshots: ["/apps/stacklens/screenshots/01.webp", "/apps/stacklens/screenshots/03.webp"],
  },
  features: [
    {
      title: "アプリの技術スタックが\nひと目でわかる",
      body: "Flutter / React Native / Unity / .NET MAUI / Compose Multiplatform / Capacitor / Cordova / Godot / Unreal Engine などを自動で判定します。",
      image: "/apps/stacklens/screenshots/01.webp",
    },
    {
      title: "Flutter と Dart の\nバージョンまで特定",
      body: "Flutter アプリは、Flutter 公式のリリース一覧と照合して Flutter と Dart のバージョンまで特定します。",
      image: "/apps/stacklens/screenshots/02.webp",
    },
    {
      title: "使っているパッケージを\n一覧表示",
      body: "riverpod や dio など、Flutter アプリが使っているパッケージを一覧に。pub.dev や Zenn・Qiita の関連記事にワンタップでアクセスできます。",
      image: "/apps/stacklens/screenshots/03.webp",
    },
    {
      title: "スマホの技術スタックを\n画像で共有",
      body: "「私のスマホの技術スタック」を画像カードにして X などで共有。解析はすべて端末内で行い、アプリの一覧を外部に送ることはありません。",
      image: "/apps/stacklens/screenshots/04.webp",
    },
  ],
  stores: {
    googlePlay: "https://play.google.com/store/apps/details?id=jp.vntech.stacklens",
  },
  notes: [
    "Android 専用です（iOS では他のアプリの中身を読み取れないため、提供していません）。",
    "ビルド方法によっては、バージョンやパッケージを取得できない場合があります。",
    "Flutter は Google LLC の商標です。本アプリは Google、Meta、Unity などの各社とは関係がありません。",
  ],
  links: {
    privacy: "https://privacy-policy-root.vercel.app/stack-lens",
  },
  seo: {
    title: "スタックレンズ - アプリの技術スタック判定",
    description:
      "スマホのアプリが Flutter・React Native・Unity などのどれで作られているかを判定する Android アプリ。Flutter アプリは Flutter / Dart のバージョンと使用パッケージまで表示。",
  },
};

export default app;
