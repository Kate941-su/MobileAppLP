import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { findApp } from "@/content/site";

// news/<YYYY-MM-DD>-<英小文字・数字・->.md → /news/<同じ名前>
const NEWS_DIR = path.join(process.cwd(), "news");
const ID_PATTERN = /^\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const CATEGORIES = {
  update: "アップデート",
  feature: "新機能",
  info: "お知らせ",
} as const;
export type Category = keyof typeof CATEGORIES;

export type NewsMeta = {
  id: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  /** アプリの slug。省略するとサイト全体のお知らせ */
  app?: string;
  category: Category;
  version?: string;
  /** 一覧・RSS・OG の説明に使う 1〜2 文 */
  summary: string;
  /** public/ からのパス（横長推奨） */
  image?: string;
};

export type News = NewsMeta & { html: string };

function fail(file: string, msg: string): never {
  throw new Error(`news/${file}: ${msg}`);
}

function toDateString(v: unknown): string | undefined {
  // gray-matter（js-yaml）は 2026-11-12 を Date にする
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  return undefined;
}

function parse(file: string): News {
  const id = file.slice(0, -3);
  if (!ID_PATTERN.test(id)) fail(file, "ファイル名は YYYY-MM-DD-<英小文字・数字・-> にする");

  const { data, content } = matter(fs.readFileSync(path.join(NEWS_DIR, file), "utf8"));

  const date = toDateString(data.date);
  if (!date) fail(file, "date は YYYY-MM-DD で書く");
  if (!id.startsWith(date)) fail(file, `ファイル名の日付と date（${date}）がずれている`);
  if (typeof data.title !== "string" || !data.title) fail(file, "title が無い");
  if (typeof data.summary !== "string" || !data.summary) fail(file, "summary が無い");
  if (!(data.category in CATEGORIES)) fail(file, `category は ${Object.keys(CATEGORIES).join(" / ")} のどれか`);
  if (data.app !== undefined && !findApp(String(data.app)))
    fail(file, `app「${data.app}」は src/content/site.ts の apps に無い`);
  if (data.image !== undefined && !fs.existsSync(path.join(process.cwd(), "public", String(data.image))))
    fail(file, `image ${data.image} が public/ に無い`);

  // 生の HTML は出力しない（remark-rehype の既定）
  const html = String(
    unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeStringify).processSync(content),
  );

  return {
    id,
    title: data.title,
    date,
    app: data.app === undefined ? undefined : String(data.app),
    category: data.category as Category,
    version: data.version === undefined ? undefined : String(data.version),
    summary: data.summary,
    image: data.image === undefined ? undefined : String(data.image),
    html,
  };
}

let cache: News[] | undefined;

/** 新しい順。ビルド時に一度だけ読む */
export function allNews(): News[] {
  if (!cache) {
    const files = fs.existsSync(NEWS_DIR) ? fs.readdirSync(NEWS_DIR).filter((f) => f.endsWith(".md")) : [];
    cache = files.map(parse).sort((a, b) => (a.id < b.id ? 1 : -1));
  }
  return cache;
}

export function newsForApp(slug: string): News[] {
  return allNews().filter((n) => n.app === slug);
}

export function findNews(id: string): News | undefined {
  return allNews().find((n) => n.id === id);
}

export function formatDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return `${y}年${m}月${d}日`;
}
