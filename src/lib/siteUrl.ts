/** 本番の URL。独自ドメインにしたら Vercel の環境変数 NEXT_PUBLIC_SITE_URL に入れる */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
