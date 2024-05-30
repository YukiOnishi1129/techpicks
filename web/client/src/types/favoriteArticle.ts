export type OriginFavoriteArticleType = {
  id: string;
  articleId: string;
  platformId?: string;
  favoriteArticleFolderId: string;
  userId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  articleUrl: string;
  platformFaviconUrl: string;
  publishedAt?: string;
  authorName?: string;
  tags?: string;
  platformName: string;
  platformUrl: string;
  isEng: boolean;
  isPrivate: boolean;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FavoriteArticleType = Omit<OriginFavoriteArticleType, "userId">;
