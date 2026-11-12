import { findApp, site } from "@/content/site";
import { allNews } from "@/lib/news";
import { siteUrl } from "@/lib/siteUrl";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0（新しい順に 50 件） */
export function GET() {
  const items = allNews()
    .slice(0, 50)
    .map((n) => {
      const url = `${siteUrl}/news/${n.id}`;
      const app = n.app ? findApp(n.app) : undefined;
      return `    <item>
      <title>${esc(app ? `【${app.name}】${n.title}` : n.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${n.date}T00:00:00+09:00`).toUTCString()}</pubDate>
      <description>${esc(n.summary)}</description>${app ? `\n      <category>${esc(app.name)}</category>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`${site.name} お知らせ`)}</title>
    <link>${siteUrl}/news</link>
    <atom:link href="${siteUrl}/news/feed.xml" rel="self" type="application/rss+xml" />
    <description>${esc("アプリのアップデートや新機能のお知らせ")}</description>
    <language>ja</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
