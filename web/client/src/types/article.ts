import { OriginCategoryType } from "./category";
import { OriginFavoriteArticleType } from "./favoriteArticle";
import { OriginFeedType } from "./feed";
import { OriginPlatformType } from "./platform";

export type OriginArticleType = {
  id: string;
  platformId?: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  articleUrl: string;
  publishedAt?: string;
  authorName?: string;
  tags?: string;
  isEng: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ArticleType = Omit<OriginArticleType, "platformId"> & {
  platform?: Omit<OriginPlatformType, "createdAt" | "updatedAt" | "deletedAt">;
  feeds: Array<
    Omit<
      OriginFeedType & {
        category: Omit<
          OriginCategoryType,
          "createdAt" | "updatedAt" | "deletedAt"
        >;
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
  favoriteArticles?: Array<Pick<OriginFavoriteArticleType, "id">>;
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
