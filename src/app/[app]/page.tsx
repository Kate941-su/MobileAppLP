import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { NewsSection } from "@/components/NewsSection";
import { apps, findApp } from "@/content/site";

type Props = { params: Promise<{ app: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return apps.map((a) => ({ app: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = findApp((await params).app);
  if (!app) return {};
  const image = app.seo.ogImage ?? app.icon;
  return {
    title: app.seo.title,
    description: app.seo.description,
    alternates: { canonical: `/${app.slug}` },
    icons: { icon: app.icon, apple: app.icon },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      url: `/${app.slug}`,
      title: app.seo.title,
      description: app.seo.description,
      images: [image],
    },
    twitter: { card: app.seo.ogImage ? "summary_large_image" : "summary" },
    // iOS Safari のスマートバナーは App Store の ID が必要（例: { appId: "6830575982" }）
    itunes: app.stores.appStore ? { appId: app.stores.appStore.match(/id(\d+)/)?.[1] ?? "" } : undefined,
  };
}

export default async function AppPage({ params }: Props) {
  const app = findApp((await params).app);
  if (!app) notFound();

  return (
    <div
      style={
        {
          "--brand": app.theme.brand,
          "--hero-from": app.theme.heroFrom,
          "--hero-to": app.theme.heroTo,
        } as React.CSSProperties
      }
    >
      <Hero app={app} />
      <Features app={app} />
      <NewsSection app={app} />
      <Footer app={app} />
    </div>
  );
}
