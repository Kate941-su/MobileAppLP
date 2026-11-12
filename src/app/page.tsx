import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { apps, site } from "@/content/site";
import styles from "./home.module.css";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>{site.name}</h1>
        <p className={styles.lead}>{site.description}</p>
        <ul className={styles.list}>
          {apps.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/${a.slug}`}
                className={styles.card}
                style={{ background: `linear-gradient(160deg, ${a.theme.heroFrom}, ${a.theme.heroTo})` }}
                data-ink={a.theme.heroInk}
              >
                <Image src={a.icon} alt="" width={72} height={72} className={styles.icon} />
                <span className={styles.name}>{a.name}</span>
                <span className={styles.tagline}>{a.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
