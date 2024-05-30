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

export type BookmarkType = Omit<
  OptionalNullable<OriginBookmarkType>,
  "userId"
> & {
  user: Omit<
    OriginProfileType,
    "emailVerifiedAt" | "isSuperAdmin" | "provider" | "deletedAt"
  >;
  favoriteArticles?: Array<OriginFavoriteArticleType>;
  isFollowing?: boolean;
};
