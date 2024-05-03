"use server";
// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import prisma from "@/lib/prisma";

import { FavoriteArticleType } from "@/types/favoriteArticle";

type GetFavoriteArticleByIdDTO = {
  id: string;
  userId: string;
};

export const getFavoriteArticleById = async (
  dto: GetFavoriteArticleByIdDTO
) => {
  try {
    const favoriteArticle = await prisma.favoriteArticle.findFirst({
      where: {
        id: dto.id,
        userId: dto.userId,
      },
    });
    if (!favoriteArticle) return;
    const resFavoriteArticle: FavoriteArticleType = {
      id: favoriteArticle.id,
      favoriteArticleFolderId: favoriteArticle.favoriteArticleFolderId,
      platformId: favoriteArticle.platformId,
      articleId: favoriteArticle.articleId,
      title: favoriteArticle.title,
      description: favoriteArticle.description,
      articleUrl: favoriteArticle.articleUrl,
      publishedAt: favoriteArticle.publishedAt,
      authorName: favoriteArticle.authorName,
      tags: favoriteArticle.tags,
      thumbnailURL: favoriteArticle.thumbnailURL,
      platformName: favoriteArticle.platformName,
      platformUrl: favoriteArticle.platformUrl,
      platformFaviconUrl: favoriteArticle.platformFaviconUrl,
      isEng: favoriteArticle.isEng,
      isRead: favoriteArticle.isRead,
      isPrivate: favoriteArticle.isPrivate,
      createdAt: favoriteArticle.createdAt,
      updatedAt: favoriteArticle.updatedAt,
    };
    return resFavoriteArticle;
  } catch (err) {
    throw new Error(`Failed to get favorite article: ${err}`);
  }
};

type GetFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdDTO = {
  userId: string;
  articleId: string;
  favoriteArticleFolderId: string;
};

export const getFavoriteArticleCountByFavoriteArticleFolderIdAndArticleId =
  async ({
    userId,
    articleId,
    favoriteArticleFolderId,
  }: GetFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdDTO): Promise<number> => {
    const count = await prisma.favoriteArticle.count({
      where: {
        userId: userId,
        favoriteArticleFolderId: favoriteArticleFolderId,
        articleId: articleId,
      },
    });

    return count;
  };

export type CreateFavoriteArticleDTO = {
  userId: string;
  favoriteArticleFolderId: string;
  platformId?: string;
  articleId?: string;
  title: string;
  description: string;
  articleUrl: string;
  publishedAt: Date;
  authorName?: string;
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
        authorName: dto.authorName,
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
    return data;
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
