import {
  Article as PrismaArticle,
  Platform as PrismaPlatform,
  Feed as PrismaFeed,
  Category as PrismaCategory,
} from "@prisma/client";

export type ArticleType = Omit<PrismaArticle, "platformId"> & {
  platform: Omit<PrismaPlatform, "createdAt" | "updatedAt" | "deletedAt">;
  feeds: Array<
    Omit<
      PrismaFeed & {
        category: Omit<PrismaCategory, "createdAt" | "updatedAt" | "deletedAt">;
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

export type ArticleTabType =
  | ArticleTrendTab
  | ArticleSiteTab
  | ArticleCompanyTab
  | ArticleSummaryTab;

type ArticleTrendTab = "trend";
type ArticleSiteTab = "site";
type ArticleCompanyTab = "company";
type ArticleSummaryTab = "summary";
