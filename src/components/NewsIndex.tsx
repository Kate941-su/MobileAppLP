import Image from "next/image";
import Link from "next/link";
import { apps } from "@/content/site";
import { allNews, newsForApp } from "@/lib/news";
import { NewsList } from "./NewsList";
import { SiteHeader } from "./SiteHeader";
import { Footer } from "./Footer";
import styles from "./news.module.css";

/** /news（全体）と /<slug>/news（アプリ別）の一覧ページ */
export function NewsIndex({ appSlug }: { appSlug?: string }) {
  const current = apps.find((a) => a.slug === appSlug);
  const items = current ? newsForApp(current.slug) : allNews();
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <h1 className={styles.pageTitle}>{current ? `${current.name}のお知らせ` : "お知らせ"}</h1>
        <p className={styles.pageLead}>アップデートや新機能のご紹介です。</p>
        <ul className={styles.filters}>
          <li>
            <Link href="/news" aria-current={current ? undefined : "page"}>
              すべて
            </Link>
          </li>
          {apps.map((a) => (
            <li key={a.slug}>
              <Link href={`/${a.slug}/news`} aria-current={a.slug === current?.slug ? "page" : undefined}>
                <Image src={a.icon} alt="" width={18} height={18} className={styles.appIcon} />
                {a.name}
              </Link>
            </li>
          ))}
        </ul>
        <NewsList items={items} showApp={!current} />
        <p className={styles.rss}>
          <a href="/news/feed.xml">RSS フィード</a>
        </p>
      </main>
      <Footer app={current} />
    </>
  );
}
