import {
  Article as PrismaArticle,
  Platform as PrismaPlatform,
  Feed as PrismaFeed,
  Category as PrismaCategory,
} from "@prisma/client";

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
