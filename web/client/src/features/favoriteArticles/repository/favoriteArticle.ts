"use server";
// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import prisma from "@/lib/prisma";

export type CreateFavoriteArticleDTO = {
  userId: string;
  favoriteArticleFolderId: string;
  platformId?: string;
  articleId?: string;
  title: string;
  description: string;
  articleUrl: string;
  publishedAt: Date;
  author_name?: string;
  tags?: string;
  thumbnailURL?: string;
  platformName?: string;
  platformUrl?: string;
  platformFaviconUrl?: string;
  isEng?: boolean;
  isRead?: boolean;
  isPrivate?: boolean;
};

export const createFavoriteArticle = async (dto: CreateFavoriteArticleDTO) => {
  try {
    const uuid = uuidv4();
    const data = await prisma.favoriteArticle.create({
      data: {
        id: uuid,
        userId: dto.userId,
        favoriteArticleFolderId: dto.favoriteArticleFolderId,
        platformId: dto.platformId,
        articleId: dto.articleId,
        title: dto.title,
        description: dto.description,
        articleUrl: dto.articleUrl,
        publishedAt: dto.publishedAt,
        author_name: dto.author_name,
        tags: dto.tags,
        thumbnailURL: dto.thumbnailURL,
        platformName: dto.platformName,
        platformUrl: dto.platformUrl,
        platformFaviconUrl: dto.platformFaviconUrl,
        isEng: dto.isEng,
        isRead: dto.isRead,
        isPrivate: dto.isPrivate,
      },
    });
    return data.id;
  } catch (err) {
    throw new Error(`Failed to create favorite article: ${err}`);
  }
};

type DeleteFavoriteArticleDTO = {
  id: string;
  userId: string;
};

export const deleteFavoriteArticle = async (dto: DeleteFavoriteArticleDTO) => {
  try {
    const data = await prisma.favoriteArticle.delete({
      where: {
        id: dto.id,
        userId: dto.userId,
      },
    });
    return data.id;
  } catch (err) {
    throw new Error(`Failed to delete favorite article: ${err}`);
  }
};
