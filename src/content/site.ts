import type { AppLP, ExternalApp } from "./types";
import dataHolder from "./apps/data-holder";
import dopadatsu from "./apps/dopadatsu";
import stacklens from "./apps/stacklens";

/** LP を持つアプリ。並び順がトップページとフッターの一覧の順になる */
export const apps: AppLP[] = [dopadatsu, dataHolder, stacklens];

/** LP を持たない自社アプリ（フッターの一覧にだけ載せる） */
export const externalApps: ExternalApp[] = [
  {
    name: "血圧手帳",
    tagline: "血圧記録とグラフ",
    icon: "/apps/blood-pressure/icon.webp",
    href: "https://play.google.com/store/apps/details?id=com.kaitokitaya.pressure_management",
  },
  {
    name: "World Info",
    tagline: "230 か国の情報を比較",
    icon: "/apps/world-info/icon.webp",
    href: "https://play.google.com/store/apps/details?id=com.worldinfo.app",
  },
];

export const site = {
  name: "Kaito Kitaya のアプリ",
  description: "個人開発のスマートフォンアプリの紹介サイトです。",
  developer: "Kaito Kitaya",
  googlePlayDeveloper: "https://play.google.com/store/apps/developer?id=Kaito+Kitaya",
};

export function findApp(slug: string): AppLP | undefined {
  return apps.find((a) => a.slug === slug);
}
