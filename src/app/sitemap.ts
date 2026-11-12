import type { MetadataRoute } from "next";
import { apps } from "@/content/site";
import { allNews } from "@/lib/news";
import { siteUrl } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    ...apps.flatMap((a) => [{ url: `${siteUrl}/${a.slug}` }, { url: `${siteUrl}/${a.slug}/news` }]),
    { url: `${siteUrl}/news` },
    ...allNews().map((n) => ({ url: `${siteUrl}/news/${n.id}`, lastModified: n.date })),
  ];
}
