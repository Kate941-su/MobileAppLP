import type { AppLP } from "@/content/types";
import { Screenshot } from "./Screenshot";
import styles from "./lp.module.css";

/** 2. メイン機能（2〜4 個）。画像とテキストを左右交互に並べる */
export function Features({ app }: { app: AppLP }) {
  return (
    <main>
      {app.features.map((f, i) => (
        <section key={f.title} className={styles.feature} data-alt={i % 2 === 1 || undefined}>
          <div className={styles.featureInner} data-text-only={!f.image || undefined}>
            <div className={styles.featureText}>
              <p className={styles.point}>POINT {String(i + 1).padStart(2, "0")}</p>
              <h2 className={styles.featureTitle}>{f.title}</h2>
              <p className={styles.featureBody}>{f.body}</p>
            </div>
            {f.image && (
              <Screenshot
                src={f.image}
                alt={`${f.title.replace(/\n/g, "")}の画面`}
                aspect={app.screenshotAspect}
                cropTop={app.screenshotCaptionRatio}
                sizes="(max-width: 768px) 70vw, 300px"
                className={styles.featureShot}
              />
            )}
          </div>
        </section>
      ))}
    </main>
  );
}
