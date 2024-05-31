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

export type ArticleType = OriginArticleType & {
  platform?: OriginPlatformType;
  feeds: Array<
    OriginFeedType & {
      category: OriginCategoryType;
    }
  >;
  isBookmarked: boolean;
  bookmarkId?: string;
  likeCount?: number;
  favoriteArticles?: Array<OriginFavoriteArticleType>;
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
