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
            author_name: true,
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
            // article: {
            //   select: {
            //     feedArticleRelatoins: {
            //       select: {
            //         feed: {
            //           select: {
            //             id: true,
            //             name: true,
            //             description: true,
            //             thumbnailUrl: true,
            //             siteUrl: true,
            //             rssUrl: true,
            //             apiQueryParam: true,
            //             trendPlatformType: true,
            //             createdAt: true,
            //             updatedAt: true,
            //             deletedAt: true,
            //             category: {
            //               select: {
            //                 id: true,
            //                 name: true,
            //                 type: true,
            //                 createdAt: true,
            //                 updatedAt: true,
            //                 deletedAt: true,
            //               },
            //             },
            //             platform: {
            //               select: {
            //                 id: true,
            //                 name: true,
            //                 siteUrl: true,
            //                 faviconUrl: true,
            //                 platformType: true,
            //                 isEng: true,
            //               },
            //             },
            //           },
            //         },
            //       },
            //     },
            //   },
            // },
          },
        },
      },
    });

    const favoriteArticleFolders: Array<FavoriteArticleFolderType> = res.map(
      (data) => {
        const favoriteArticles: Array<FavoriteArticleType> =
          data.favoriteArticles.map((article) => {
            return {
              id: article.id,
              title: article.title,
              description: article.description,
              articleUrl: article.articleUrl,
              publishedAt: article.publishedAt,
              favoriteArticleFolderId: article.favoriteArticleFolderId,
              platformId: article.platformId,
              articleId: article.articleId,
              author_name: article.author_name,
              tags: article.tags,
              thumbnailURL: article.thumbnailURL,
              platformName: article.platformName,
              platformUrl: article.platformUrl,
              platformFaviconUrl: article.platformFaviconUrl,
              isEng: article.isEng,
              isRead: article.isRead,
              isPrivate: article.isPrivate,
              createdAt: article.createdAt,
              updatedAt: article.updatedAt,
            };
          });

        return {
          id: data.id,
          title: data.title,
          description: data.description,
          favoriteArticles: favoriteArticles,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };
      }
    );

    return favoriteArticleFolders;
  } catch (err) {
    throw new Error(`Failed to get favorite article folders: ${err}`);
  }
};

export type CreateFavoriteArticleFolderDTO = {
  title: string;
  description: string;
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
