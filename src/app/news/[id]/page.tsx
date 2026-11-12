import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { findApp } from "@/content/site";
import { allNews, CATEGORIES, findNews, formatDate } from "@/lib/news";
import listStyles from "@/components/news.module.css";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allNews().map((n) => ({ id: n.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const n = findNews((await params).id);
  if (!n) return {};
  const app = n.app ? findApp(n.app) : undefined;
  const image = n.image ?? app?.seo.ogImage ?? app?.icon;
  return {
    title: app ? `${n.title} | ${app.name}` : n.title,
    description: n.summary,
    alternates: { canonical: `/news/${n.id}` },
    openGraph: {
      type: "article",
      locale: "ja_JP",
      url: `/news/${n.id}`,
      title: n.title,
      description: n.summary,
      publishedTime: n.date,
      images: image ? [image] : undefined,
    },
  };
}

export default async function NewsArticle({ params }: Props) {
  const n = findNews((await params).id);
  if (!n) notFound();
  const app = n.app ? findApp(n.app) : undefined;

  return (
    <>
      <SiteHeader />
      <article className={listStyles.article}>
        <p className={listStyles.meta}>
          <time dateTime={n.date}>{formatDate(n.date)}</time>
          <span className={listStyles.category} data-category={n.category}>
            {CATEGORIES[n.category]}
          </span>
          {app && (
            <Link href={`/${app.slug}`} className={listStyles.app}>
              <Image src={app.icon} alt="" width={18} height={18} className={listStyles.appIcon} />
              {app.name}
            </Link>
          )}
          {n.version && <span>バージョン {n.version}</span>}
        </p>
        <h1 className={listStyles.articleTitle}>{n.title}</h1>
        {n.image && (
          // 記事ごとに縦横比が違うので next/image の fill ではなく実寸で出す
          // eslint-disable-next-line @next/next/no-img-element
          <img src={n.image} alt="" className={listStyles.cover} />
        )}
        <div className={listStyles.body} dangerouslySetInnerHTML={{ __html: n.html }} />


        <p className={listStyles.back}>
          <Link href={app ? `/${app.slug}/news` : "/news"}>← お知らせ一覧へ</Link>
        </p>
      </article>
      <Footer app={app} />
    </>
  );
}
