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

export type TrendArticleType = OriginTrendArticleType & {
  article: OriginArticleType;
  platform: OriginPlatformType;
  feeds: Array<
    OriginFeedType & {
      category: OriginCategoryType;
    }
  >;
  isBookmarked: boolean;
  bookmarkId?: string;
  favoriteArticles?: Array<OriginFavoriteArticleType>;
  isFollowing?: boolean;
};
