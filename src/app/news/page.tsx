import type { Metadata } from "next";
import { NewsIndex } from "@/components/NewsIndex";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `お知らせ | ${site.name}`,
  description: "アプリのアップデートや新機能のお知らせ。",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return <NewsIndex />;
}
