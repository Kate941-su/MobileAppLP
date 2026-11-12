import Image from "next/image";
import styles from "./lp.module.css";

type Props = {
  src: string;
  alt: string;
  /** 幅 / 高さ */
  aspect: number;
  /** 上側を切り落とす割合（ストア画像の見出し部分を隠す） */
  cropTop: number;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** ストア用スクショの見出しを切り落とし、端末の部分だけを見せる */
export function Screenshot({ src, alt, aspect, cropTop, sizes, priority, className }: Props) {
  return (
    <div
      className={`${styles.shot} ${className ?? ""}`}
      style={{ aspectRatio: `${aspect / (1 - cropTop)}` }}
    >
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={styles.shotImg} />
    </div>
  );
}
