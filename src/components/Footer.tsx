import Image from "next/image";
import Link from "next/link";
import type { AppLP } from "@/content/types";
import { apps, externalApps, site } from "@/content/site";
import { StoreBadges } from "./StoreBadges";
import styles from "./lp.module.css";

/** 3. フッター: もう一度ダウンロードボタン＋自社アプリへのリンク */
export function Footer({ app }: { app?: AppLP }) {
  const others = [
    ...apps
      .filter((a) => a.slug !== app?.slug)
      .map((a) => ({ name: a.name, tagline: a.tagline, icon: a.icon, href: `/${a.slug}`, internal: true })),
    ...externalApps.map((a) => ({ ...a, internal: false })),
  ];

  return (
    <footer className={styles.footer}>
      {app && (
        <section className={styles.footerCta}>
          <Image src={app.icon} alt="" width={88} height={88} className={styles.appIconLarge} />
          <p className={styles.footerCtaName}>{app.name}</p>
          <p className={styles.footerCtaTagline}>{app.tagline}</p>
          <StoreBadges stores={app.stores} appName={app.name} />
          {app.notes && (
            <ul className={styles.notes}>
              {app.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section className={styles.otherApps}>
        <h2 className={styles.otherAppsTitle}>{app ? "ほかのアプリ" : "アプリ一覧"}</h2>
        <ul className={styles.otherAppsList}>
          {others.map((o) => {
            const body = (
              <>
                <Image src={o.icon} alt="" width={48} height={48} className={styles.appIconSmall} />
                <span>
                  <span className={styles.otherAppName}>{o.name}</span>
                  <span className={styles.otherAppTagline}>{o.tagline}</span>
                </span>
              </>
            );
            return (
              <li key={o.href}>
                {o.internal ? (
                  <Link href={o.href} className={styles.otherApp}>
                    {body}
                  </Link>
                ) : (
                  <a href={o.href} target="_blank" rel="noopener" className={styles.otherApp}>
                    {body}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <nav className={styles.footerLinks}>
        {app?.links.privacy && (
          <a href={app.links.privacy} target="_blank" rel="noopener">
            プライバシーポリシー
          </a>
        )}
        {app?.links.terms && (
          <a href={app.links.terms} target="_blank" rel="noopener">
            利用規約
          </a>
        )}
        {app?.links.support && (
          <a href={app.links.support} target="_blank" rel="noopener">
            サポート
          </a>
        )}
        <a href={site.googlePlayDeveloper} target="_blank" rel="noopener">
          Google Play のデベロッパーページ
        </a>
        {app && <Link href="/">すべてのアプリ</Link>}
      </nav>
      <p className={styles.copyright}>
        © {new Date().getFullYear()} {site.developer}
      </p>
      <p className={styles.trademark}>
        Apple および Apple ロゴは米国その他の国で登録された Apple Inc. の商標です。App Store は Apple Inc. のサービスマークです。Google Play および Google Play ロゴは Google LLC の商標です。
      </p>
    </footer>
  );
}
