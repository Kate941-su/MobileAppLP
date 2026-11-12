import Image from "next/image";
import type { AppLP } from "@/content/types";
import { Screenshot } from "./Screenshot";
import { StoreBadges } from "./StoreBadges";
import styles from "./lp.module.css";

/** 1. アプリの概要: 背景（ブランド色）＋短い宣伝＋ストアへのボタン＋端末画面 */
export function Hero({ app }: { app: AppLP }) {
  const [front, back] = app.hero.screenshots;
  return (
    <header className={styles.hero} data-ink={app.theme.heroInk}>
      <div className={styles.heroInner}>
        <div className={styles.heroText}>
          <div className={styles.heroApp}>
            <Image src={app.icon} alt="" width={64} height={64} className={styles.appIcon} priority />
            <div>
              <p className={styles.heroAppName}>{app.name}</p>
              <p className={styles.heroAppTagline}>{app.tagline}</p>
            </div>
          </div>
          <h1 className={styles.heroHeadline}>{app.hero.headline}</h1>
          <p className={styles.heroLead}>{app.hero.lead}</p>
          <StoreBadges stores={app.stores} appName={app.name} />
        </div>
        <div className={styles.heroVisual} aria-hidden>
          {back && (
            <Screenshot
              src={back}
              alt=""
              aspect={app.screenshotAspect}
              cropTop={app.screenshotCaptionRatio}
              sizes="(max-width: 768px) 45vw, 260px"
              className={styles.heroShotBack}
            />
          )}
          {front && (
            <Screenshot
              src={front}
              alt=""
              aspect={app.screenshotAspect}
              cropTop={app.screenshotCaptionRatio}
              sizes="(max-width: 768px) 55vw, 320px"
              priority
              className={styles.heroShotFront}
            />
          )}
        </div>
      </div>
    </header>
  );
}
