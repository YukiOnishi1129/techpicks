import { OriginArticleType } from "./article";
import { OriginCategoryType } from "./category";
import { OriginFavoriteArticleType } from "./favoriteArticle";
import { OriginFeedType } from "./feed";
import { OriginPlatformType } from "./platform";

export type OriginTrendArticleType = {
  id: string;
  articleId: string;
  platformId: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
};

export type TrendArticleType = Omit<OriginTrendArticleType, "platformId"> & {
  article: Omit<OriginArticleType, "platformId">;
  platform: Omit<OriginPlatformType, "createdAt" | "updatedAt" | "deletedAt">;
  feeds: Array<
    Omit<
      OriginFeedType & {
        category: OriginCategoryType;
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
  favoriteArticles?: Array<Pick<OriginFavoriteArticleType, "id">>;
  isFollowing?: boolean;
};
