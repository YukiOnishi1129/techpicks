import { FavoriteArticle as PrismaFavoriteArticle } from "@prisma/client";

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
  platform_name: string;
  platform_url: string;
  isEng: boolean;
  isPrivate: boolean;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FavoriteArticleType = Omit<PrismaFavoriteArticle, "userId">;
