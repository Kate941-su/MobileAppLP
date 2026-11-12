import type { MetadataRoute } from "next";
import { apps } from "@/content/site";
import { siteUrl } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl }, ...apps.map((a) => ({ url: `${siteUrl}/${a.slug}` }))];
}
