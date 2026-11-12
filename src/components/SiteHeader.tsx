import Link from "next/link";
import { site } from "@/content/site";
import styles from "./news.module.css";

/** LP 以外のページ（お知らせなど）の上部 */
export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.headerSite}>
          {site.name}
        </Link>
        <nav className={styles.headerNav}>
          <Link href="/news">お知らせ</Link>
        </nav>
      </div>
    </header>
  );
}
