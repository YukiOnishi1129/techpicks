import {
  TrendArticle as PrismaTrendArticle,
  Article as PrismaArticle,
  Platform as PrismaPlatform,
  Feed as PrismaFeed,
  Category as PrismaCategory,
} from "@prisma/client";

export type TrendArticleType = Omit<PrismaTrendArticle, "platformId"> & {
  article: Omit<PrismaArticle, "platformId">;
  platform: Omit<PrismaPlatform, "createdAt" | "updatedAt" | "deletedAt">;
  feeds: Array<
    Omit<
      PrismaFeed & {
        category: PrismaCategory;
      },
      | "platformId"
      | "categoryId"
      | "createdAt"
      | "updatedAt"
      | "deletedAt"
      | "rssUrl"
    >
  >;
  isBookmarked: boolean;
  bookmarkId?: string;
};
