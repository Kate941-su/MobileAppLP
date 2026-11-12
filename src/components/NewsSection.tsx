import Link from "next/link";
import type { AppLP } from "@/content/types";
import { newsForApp } from "@/lib/news";
import { NewsList } from "./NewsList";
import styles from "./news.module.css";

/** LP のフッター手前に出す、そのアプリの最新のお知らせ（無ければ出さない） */
export function NewsSection({ app, limit = 3 }: { app: AppLP; limit?: number }) {
  const items = newsForApp(app.slug);
  if (items.length === 0) return null;
  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionTitle}>お知らせ</h2>
        <NewsList items={items.slice(0, limit)} showApp={false} />
        {items.length > limit && (
          <p className={styles.more}>
            <Link href={`/${app.slug}/news`}>すべてのお知らせ</Link>
          </p>
        )}
      </div>
    </section>
  );
}
