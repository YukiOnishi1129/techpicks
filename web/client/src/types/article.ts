import {
  Article as PrismaArticle,
  Platform as PrismaPlatform,
  Feed as PrismaFeed,
  Category as PrismaCategory,
} from "@prisma/client";

import { PlatformType } from "./platform";

export type ArticleType = Omit<PrismaArticle, "platformId"> & {
  platform: PrismaPlatform;
  feeds: Array<
    Omit<
      PrismaFeed & {
        category: PrismaCategory;
      },
      "platformId" | "categoryId"
    >
  >;
  isBookmarked: boolean;
};

export type ArticlePlatform = {
  id: string;
  name: string;
  categoryName: string;
  platformType: PlatformType;
  siteUrl: string;
  faviconUrl: string;
};
