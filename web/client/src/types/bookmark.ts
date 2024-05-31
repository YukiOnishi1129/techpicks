import { OriginFavoriteArticleType } from "./favoriteArticle";
import { OriginProfileType } from "./profile";
import { OptionalNullable } from "./util";

export type OriginBookmarkType = {
  id: string;
  articleId: string;
  userId: string;
  platformId?: string;
  title: string;
  description: string;
  articleUrl: string;
  thumbnailUrl: string;
  publishedAt?: string;
  platformName: string;
  platformUrl: string;
  platformFaviconUrl: string;
  isEng: boolean;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BookmarkType = OptionalNullable<OriginBookmarkType> & {
  user: OriginProfileType;
  favoriteArticles?: Array<OriginFavoriteArticleType>;
  isFollowing?: boolean;
};
