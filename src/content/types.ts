/** ストアへのリンク。無いストアは省略する（そのバッジは出ない） */
export type StoreLinks = {
  googlePlay?: string;
  appStore?: string;
};

/** 機能紹介の 1 ブロック（LP では 2〜4 個） */
export type Feature = {
  title: string;
  body: string;
  /** public/ からのパス。省略するとテキストだけのブロックになる */
  image?: string;
};

/** LP を持つアプリ 1 つ分の設定。src/content/apps/<slug>.ts に 1 ファイルずつ置く */
export type AppLP = {
  /** URL になる（/<slug>）。英小文字・数字・- のみ */
  slug: string;
  /** 表示名（ストアのアプリ名の短い形） */
  name: string;
  /** 一言の説明。トップページのカードとフッターのアプリ一覧に出る */
  tagline: string;
  /** public/ からのパス（512px 程度の正方形） */
  icon: string;

  theme: {
    /** ボタン・見出しのアクセント色 */
    brand: string;
    /** ヒーロー背景のグラデーション。ストアのスクショの背景色に合わせると画像がなじむ */
    heroFrom: string;
    heroTo: string;
    /** ヒーロー上の文字色が明るい背景用（dark）か暗い背景用（light）か */
    heroInk: "light" | "dark";
  };

  /**
   * ストアのスクショ（キャプション付き）の上側を何割切り落として端末部分だけを見せるか。
   * 0 なら切らない。スクショの見出しの高さに合わせて 0.15〜0.3 くらい
   */
  screenshotCaptionRatio: number;
  /** スクショの 幅 / 高さ（Play: 1080/1920、iPhone 6.9": 1320/2868） */
  screenshotAspect: number;

  hero: {
    /** 改行は \n */
    headline: string;
    lead: string;
    /** ヒーロー右側に重ねて見せるスクショ（1〜3 枚） */
    screenshots: string[];
  };

  /** 2〜4 個 */
  features: Feature[];

  stores: StoreLinks;

  /** 推奨環境・注意書きなど（フッターの手前に小さく出す） */
  notes?: string[];

  links: {
    privacy?: string;
    support?: string;
    terms?: string;
  };

  seo: {
    title: string;
    description: string;
    /** 1200x630 前後の横長画像（Play のフィーチャーグラフィックなど）。省略時はアイコン */
    ogImage?: string;
  };
};

/** LP を持たない自社アプリ（フッターのアプリ一覧に載せるだけ） */
export type ExternalApp = {
  name: string;
  tagline: string;
  icon: string;
  href: string;
};
