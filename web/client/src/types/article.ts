import {
  Article as PrismaArticle,
  Platform as PrismaPlatform,
  Feed as PrismaFeed,
  Category as PrismaCategory,
  FavoriteArticle as PrismaFavoriteArticle,
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
  likeCount?: number;
  favoriteArticles?: Array<Omit<PrismaFavoriteArticle, "userId">>;
  isFollowing?: boolean;
};

export type ArticleTabType =
  | ArticleTrendTab
  | ArticleSiteTab
  | ArticleCompanyTab
  | ArticleSummaryTab
  | ArticleUnknownTab;

type ArticleTrendTab = "trend";
type ArticleSiteTab = "site";
type ArticleCompanyTab = "company";
type ArticleSummaryTab = "summary";
type ArticleUnknownTab = "unknown";
