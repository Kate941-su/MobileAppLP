import Image from "next/image";
import type { StoreLinks } from "@/content/types";
import styles from "./lp.module.css";

/**
 * ストアの公式バッジ（日本語版）。
 * Google Play のバッジは画像の周りに余白があるため、高さを大きめにして見た目の高さをそろえる。
 */
export function StoreBadges({ stores, appName }: { stores: StoreLinks; appName: string }) {
  return (
    <div className={styles.badges}>
      {stores.appStore && (
        <a href={stores.appStore} target="_blank" rel="noopener" className={styles.badgeApple}>
          <Image
            src="/badges/app-store-ja.svg"
            alt={`App Store で${appName}をダウンロード`}
            width={136}
            height={50}
            unoptimized
          />
        </a>
      )}
      {stores.googlePlay && (
        <a href={stores.googlePlay} target="_blank" rel="noopener" className={styles.badgeGoogle}>
          <Image
            src="/badges/google-play-ja.png"
            alt={`Google Play で${appName}を手に入れよう`}
            width={190}
            height={74}
          />
        </a>
      )}
    </div>
  );
}
