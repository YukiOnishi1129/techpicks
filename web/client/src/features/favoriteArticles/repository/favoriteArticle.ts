"use server";
// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import prisma from "@/lib/prisma";

import { FavoriteArticleType } from "@/types/favoriteArticle";

const LIMIT = 20;

type GetFavoriteArticlesByFavoriteArticleFolderIdDTO = {
  userId: string;
  favoriteArticleFolderId: string;
  offset: number;
  keyword?: string;
};

export const getFavoriteArticlesByFavoriteArticleFolderId = async ({
  userId,
  favoriteArticleFolderId,
  offset,
  keyword,
}: GetFavoriteArticlesByFavoriteArticleFolderIdDTO): Promise<
  Array<FavoriteArticleType>
> => {
  let where = {};
  where = {
    userId: userId,
    favoriteArticleFolderId: favoriteArticleFolderId,
  };

  if (keyword) {
    where = {
      ...where,
      OR: [
        {
          title: {
            contains: keyword,
          },
        },
        {
          description: {
            contains: keyword,
          },
        },
        {
          authorName: {
            contains: keyword,
          },
        },
        {
          tags: {
            contains: keyword,
          },
        },
        {
          platformName: {
            contains: keyword,
          },
        },
      ],
    };
  }

  try {
    const favoriteArticles = await prisma.favoriteArticle.findMany({
      take: LIMIT,
      skip: (offset - 1) * LIMIT,
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    const resFavoriteArticles: Array<FavoriteArticleType> =
      favoriteArticles.map((favoriteArticle) => {
        return {
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
      });
    return resFavoriteArticles;
  } catch (err) {
    throw new Error(`Failed to get favorite articles: ${err}`);
  }
};

type GetFavoriteArticleByIdDTO = {
  id: string;
  userId: string;
};

export const getFavoriteArticleById = async ({
  id,
  userId,
}: GetFavoriteArticleByIdDTO) => {
  try {
    const favoriteArticle = await prisma.favoriteArticle.findUnique({
      where: {
        id: id,
        userId: userId,
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

type GetFavoriteArticleCountByFolderIdAndArticleUrlDTO = {
  userId: string;
  favoriteArticleFolderId: string;
  articleUrl: string;
};

export const getFavoriteArticleCountByFolderIdAndArticleUrl = async ({
  userId,
  favoriteArticleFolderId,
  articleUrl,
}: GetFavoriteArticleCountByFolderIdAndArticleUrlDTO) => {
  try {
    const count = await prisma.favoriteArticle.count({
      where: {
        userId: userId,
        favoriteArticleFolderId: favoriteArticleFolderId,
        articleUrl: articleUrl,
      },
    });

    return count;
  } catch (err) {
    throw new Error(`Failed to get favorite article count: ${err}`);
  }
};

export type CreateFavoriteArticleDTO = {
  userId: string;
  favoriteArticleFolderId: string;
  platformId?: string;
  articleId?: string;
  title: string;
  description: string;
  articleUrl: string;
  publishedAt?: Date;
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
        platformId: dto?.platformId,
        articleId: dto?.articleId,
        title: dto.title,
        description: dto.description,
        articleUrl: dto.articleUrl,
        publishedAt: dto?.publishedAt,
        authorName: dto?.authorName,
        tags: dto?.tags,
        thumbnailURL: dto?.thumbnailURL || "",
        platformName: dto?.platformName || "",
        platformUrl: dto?.platformUrl || "",
        platformFaviconUrl: dto?.platformFaviconUrl || "",
        isEng: dto?.isEng,
        isRead: dto?.isRead,
        isPrivate: dto?.isPrivate,
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
