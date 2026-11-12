#!/usr/bin/env node
// Google Play の掲載データ（タイトル・説明文・アイコン・スクリーンショット）と
// App Store の URL を取得し、LP の素材として保存する。
//
//   node scripts/fetch-store-listing.mjs <slug> <androidPackageId> [iosBundleId]
//
// 出力:
//   public/apps/<slug>/icon.webp
//   public/apps/<slug>/screenshots/01.webp ...
//   data/listings/<slug>.json   … コピーを書くときの参考（ページからは読まない）
//
// 依存なし（Node 20 以降の fetch を使う）。

import { mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";

const [slug, packageId, bundleId = packageId] = process.argv.slice(2);
if (!slug || !packageId) {
  console.error("usage: node scripts/fetch-store-listing.mjs <slug> <androidPackageId> [iosBundleId]");
  process.exit(1);
}

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36";

const decode = (s) =>
  s
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

async function get(url, init) {
  const res = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "ja" }, ...init });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res;
}

const playUrl = `https://play.google.com/store/apps/details?id=${packageId}`;
const html = await (await get(`${playUrl}&hl=ja&gl=JP`)).text();

const title = decode(html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? "").replace(/ - Google Play のアプリ$/, "");
const description = decode(html.match(/<div class="bARER"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? "");
const iconBase = html.match(/<meta property="og:image" content="(https:\/\/play-lh[^"=]+)/)?.[1];

// スクリーンショットは alt="スクリーンショット画像" の img。サイズ指定（=w526-h296 など）を外して原本の URL にする
const shots = [];
for (const m of html.matchAll(/<img([^>]+)>/g)) {
  if (!m[1].includes('alt="スクリーンショット画像"')) continue;
  const base = m[1].match(/src="(https:\/\/play-lh[^"=]+)/)?.[1];
  if (base && !shots.includes(base)) shots.push(base);
}

const outDir = path.join("public", "apps", slug);
await rm(path.join(outDir, "screenshots"), { recursive: true, force: true });
await mkdir(path.join(outDir, "screenshots"), { recursive: true });

async function save(url, file) {
  const buf = Buffer.from(await (await get(url)).arrayBuffer());
  await writeFile(file, buf);
  return file;
}

if (iconBase) await save(`${iconBase}=s512-rw`, path.join(outDir, "icon.webp"));
const screenshots = [];
for (const [i, base] of shots.entries()) {
  const file = path.join(outDir, "screenshots", `${String(i + 1).padStart(2, "0")}.webp`);
  await save(`${base}=w1080-rw`, file);
  screenshots.push("/" + path.relative("public", file));
}

// App Store（日本）。未掲載なら null
let appStoreUrl = null;
try {
  const lookup = await (await get(`https://itunes.apple.com/lookup?bundleId=${bundleId}&country=jp`)).json();
  appStoreUrl = lookup.results?.[0]?.trackViewUrl?.replace(/\?.*$/, "") ?? null;
} catch {
  /* ignore */
}

const listing = { slug, packageId, title, playUrl, appStoreUrl, screenshots, description, fetchedAt: new Date().toISOString().slice(0, 10) };
await mkdir("data/listings", { recursive: true });
await writeFile(path.join("data/listings", `${slug}.json`), JSON.stringify(listing, null, 2) + "\n");

console.log(`${title}\n  icon: ${iconBase ? "ok" : "none"}\n  screenshots: ${screenshots.length}\n  App Store: ${appStoreUrl ?? "none"}\n  -> data/listings/${slug}.json`);
