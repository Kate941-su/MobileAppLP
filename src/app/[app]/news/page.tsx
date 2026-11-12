import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsIndex } from "@/components/NewsIndex";
import { apps, findApp } from "@/content/site";

type Props = { params: Promise<{ app: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return apps.map((a) => ({ app: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = findApp((await params).app);
  if (!app) return {};
  return {
    title: `${app.name}のお知らせ`,
    description: `${app.name}のアップデートや新機能のお知らせ。`,
    alternates: { canonical: `/${app.slug}/news` },
    icons: { icon: app.icon },
  };
}

export default async function AppNewsPage({ params }: Props) {
  const app = findApp((await params).app);
  if (!app) notFound();
  return <NewsIndex appSlug={app.slug} />;
}
