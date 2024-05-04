"use server";

// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import prisma from "@/lib/prisma";

import { FavoriteArticleType } from "@/types/favoriteArticle";
import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

type GetFavoriteArticleFolders = {
  userId: string;
};

export const getFavoriteArticleFolders = async ({
  userId,
}: GetFavoriteArticleFolders): Promise<Array<FavoriteArticleFolderType>> => {
  try {
    const res = await prisma.favoriteArticleFolder.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        favoriteArticles: {
          select: {
            id: true,
            favoriteArticleFolderId: true,
            publishedAt: true,
            articleUrl: true,
            title: true,
            description: true,
            platformId: true,
            articleId: true,
            authorName: true,
            tags: true,
            thumbnailURL: true,
            platformName: true,
            platformUrl: true,
            platformFaviconUrl: true,
            isEng: true,
            isRead: true,
            isPrivate: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    const favoriteArticleFolders: Array<FavoriteArticleFolderType> = res.map(
      (favoriteArticleFolder) => {
        const favoriteArticles: Array<FavoriteArticleType> =
          favoriteArticleFolder.favoriteArticles.map((favoriteArticle) => {
            return {
              id: favoriteArticle.id,
              title: favoriteArticle.title,
              description: favoriteArticle.description,
              articleUrl: favoriteArticle.articleUrl,
              publishedAt: favoriteArticle.publishedAt,
              favoriteArticleFolderId: favoriteArticle.favoriteArticleFolderId,
              platformId: favoriteArticle.platformId,
              articleId: favoriteArticle.articleId,
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

        return {
          id: favoriteArticleFolder.id,
          title: favoriteArticleFolder.title,
          description: favoriteArticleFolder.description,
          favoriteArticles: favoriteArticles,
          createdAt: favoriteArticleFolder.createdAt,
          updatedAt: favoriteArticleFolder.updatedAt,
        };
      }
    );

    return favoriteArticleFolders;
  } catch (err) {
    throw new Error(`Failed to get favorite article folders: ${err}`);
  }
};

type GetFavoriteArticleFolderById = {
  id: string;
  userId: string;
};

export const getFavoriteArticleFolderById = async ({
  id,
  userId,
}: GetFavoriteArticleFolderById) => {
  try {
    const favoriteArticleFolder = await prisma.favoriteArticleFolder.findUnique(
      {
        where: {
          id: id,
          userId: userId,
        },
        include: {
          favoriteArticles: {
            select: {
              id: true,
              favoriteArticleFolderId: true,
              publishedAt: true,
              articleUrl: true,
              title: true,
              description: true,
              platformId: true,
              articleId: true,
              authorName: true,
              tags: true,
              thumbnailURL: true,
              platformName: true,
              platformUrl: true,
              platformFaviconUrl: true,
              isEng: true,
              isRead: true,
              isPrivate: true,
              createdAt: true,
              updatedAt: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      }
    );

    if (!favoriteArticleFolder) return;

    const favoriteArticles: Array<FavoriteArticleType> =
      favoriteArticleFolder.favoriteArticles.map((favoriteArticle) => {
        return {
          id: favoriteArticle.id,
          title: favoriteArticle.title,
          description: favoriteArticle.description,
          articleUrl: favoriteArticle.articleUrl,
          publishedAt: favoriteArticle.publishedAt,
          favoriteArticleFolderId: favoriteArticle.favoriteArticleFolderId,
          platformId: favoriteArticle.platformId,
          articleId: favoriteArticle.articleId,
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

    const resFavoriteArticleFolder: FavoriteArticleFolderType = {
      id: favoriteArticleFolder.id,
      title: favoriteArticleFolder.title,
      description: favoriteArticleFolder.description,
      favoriteArticles: favoriteArticles,
      createdAt: favoriteArticleFolder.createdAt,
      updatedAt: favoriteArticleFolder.updatedAt,
    };

    return resFavoriteArticleFolder;
  } catch (err) {
    throw new Error(`Failed to get favorite article folder: ${err}`);
  }
};

export type CreateFavoriteArticleFolderDTO = {
  title: string;
  description?: string;
  userId: string;
};

export const createFavoriteArticleFolder = async (
  dto: CreateFavoriteArticleFolderDTO
) => {
  try {
    const uuid = uuidv4();
    const data = await prisma.favoriteArticleFolder.create({
      data: {
        id: uuid,
        title: dto.title,
        description: dto.description,
        userId: dto.userId,
      },
    });
    return data.id;
  } catch (err) {
    throw new Error(`Failed to create favorite article folder: ${err}`);
  }
};

export type UpdateFavoriteArticleFolderDTO = {
  id: string;
  title: string;
  description: string;
  userId: string;
};

export const updateFavoriteArticleFolder = async (
  dto: UpdateFavoriteArticleFolderDTO
) => {
  try {
    const data = await prisma.favoriteArticleFolder.update({
      where: {
        id: dto.id,
        userId: dto.userId,
      },
      data: {
        title: dto.title,
        description: dto.description,
      },
    });
    return data.id;
  } catch (err) {
    throw new Error(`Failed to update favorite article folder: ${err}`);
  }
};

export const deleteFavoriteArticleFolder = async (id: string) => {
  try {
    const data = await prisma.favoriteArticleFolder.delete({
      where: {
        id: id,
      },
    });

    return data.id;
  } catch (err) {
    throw new Error(`Failed to delete favorite article folder: ${err}`);
  }
};
