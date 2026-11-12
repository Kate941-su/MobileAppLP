import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/siteUrl";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.name, template: "%s" },
  description: site.description,
  alternates: { types: { "application/rss+xml": [{ url: "/news/feed.xml", title: `${site.name} お知らせ` }] } },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
