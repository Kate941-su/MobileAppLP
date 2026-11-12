import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ padding: "96px 20px", textAlign: "center" }}>
      <h1>ページが見つかりません</h1>
      <p>
        <Link href="/">アプリ一覧へ</Link>
      </p>
    </main>
  );
}
