import Image from "next/image";
import Link from "next/link";
import { findApp } from "@/content/site";
import { CATEGORIES, formatDate, type NewsMeta } from "@/lib/news";
import styles from "./news.module.css";

/** お知らせの一覧（新しい順に渡す） */
export function NewsList({ items, showApp = true }: { items: NewsMeta[]; showApp?: boolean }) {
  if (items.length === 0) return <p className={styles.empty}>お知らせはまだありません。</p>;
  return (
    <ul className={styles.list}>
      {items.map((n) => {
        const app = n.app ? findApp(n.app) : undefined;
        return (
          <li key={n.id}>
            <Link href={`/news/${n.id}`} className={styles.item}>
              <span className={styles.meta}>
                <time dateTime={n.date}>{formatDate(n.date)}</time>
                <span className={styles.category} data-category={n.category}>
                  {CATEGORIES[n.category]}
                </span>
                {showApp && app && (
                  <span className={styles.app}>
                    <Image src={app.icon} alt="" width={18} height={18} className={styles.appIcon} />
                    {app.name}
                  </span>
                )}
              </span>
              <span className={styles.title}>{n.title}</span>
              <span className={styles.summary}>{n.summary}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
