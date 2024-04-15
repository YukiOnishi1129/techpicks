"use server";

// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import { getUser } from "@/features/users/actions/user";

import prisma from "@/lib/prisma";

import { BookmarkType } from "@/types/bookmark";
import { LanguageStatus } from "@/types/language";

const LIMIT = 20;

type GetBookmarkList = {
  platformId?: string;
  keyword?: string;
  languageStatus?: LanguageStatus;
  platformIdList: Array<string>;
  offset?: number;
  sort?: "asc" | "desc";
  sortColum?: string;
};

export const getBookmarkList = async ({
  keyword,
  languageStatus = 1,
  platformIdList,
  offset = 1,
  sort = "desc",
  sortColum = "createdAt",
}: GetBookmarkList) => {
  const user = await getUser();
  let where = {};
  if (keyword) {
    where = {
      AND: [
        {
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
          ],
        },
        {
          isEng: languageStatus === 2,
        },
      ],
    };
  } else {
    where = {
      isEng: languageStatus === 2,
    };
  }

  if (platformIdList.length) {
    where = {
      ...where,
      platformId: {
        in: [...platformIdList],
      },
    };
  }

  where = {
    ...where,
    userId: user?.id,
  };

  try {
    const res = await prisma.bookmark.findMany({
      take: 20,
      skip: (offset - 1) * LIMIT,
      where,
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      include: {
        profile: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    const bookmarkList: Array<BookmarkType> = res.map((bookmark) => {
      const bookmarkData: BookmarkType = {
        id: bookmark.id,
        articleId: bookmark?.articleId || undefined,
        title: bookmark.title,
        description: bookmark.description,
        articleUrl: bookmark.articleUrl,
        publishedAt: bookmark.publishedAt || undefined,
        thumbnailURL: bookmark.thumbnailURL || undefined,
        isRead: bookmark.isRead,
        isEng: bookmark.isEng,
        platformName: bookmark.platformName || undefined,
        platformUrl: bookmark.platformUrl || undefined,
        platformFaviconUrl: bookmark.platformFaviconUrl || undefined,
        user: {
          id: bookmark.profile.id,
          name: bookmark.profile.name,
          email: bookmark.profile.email,
          image: bookmark.profile.image,
          createdAt: bookmark.profile.createdAt,
          updatedAt: bookmark.profile.updatedAt,
        },
        createdAt: bookmark.createdAt,
        updatedAt: bookmark.updatedAt,
      };

      return bookmarkData;
    });

    return bookmarkList;
  } catch (err) {
    throw new Error(`Failed to get bookmark list: ${err}`);
  }
};

type GetBookmarkDTO = {
  bookmarkId: string;
  userId: string;
};

export const getBookmark = async ({ bookmarkId, userId }: GetBookmarkDTO) => {
  try {
    const data = await prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId: userId,
      },
      include: {
        profile: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        platform: {
          select: {
            id: true,
            name: true,
            siteUrl: true,
            faviconUrl: true,
            platformType: true,
            isEng: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!data) {
      return null;
    }

    const bookmarkData: BookmarkType = {
      id: data.id,
      articleId: data?.articleId || undefined,
      title: data.title,
      description: data.description,
      articleUrl: data.articleUrl,
      publishedAt: data.publishedAt || undefined,
      thumbnailURL: data.thumbnailURL || undefined,
      isRead: data.isRead,
      isEng: data.isEng,
      platformName: data.platformName || undefined,
      platformUrl: data.platformUrl || undefined,
      platformFaviconUrl: data.platformFaviconUrl || undefined,
      user: {
        id: data.profile.id,
        name: data.profile.name,
        email: data.profile.email,
        image: data.profile.image,
        createdAt: data.profile.createdAt,
        updatedAt: data.profile.updatedAt,
      },
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    return bookmarkData;
  } catch (err) {
    throw new Error(`Failed to get bookmark: ${err}`);
  }
};

export const getBookmarkCountById = async ({
  bookmarkId,
  userId,
}: {
  bookmarkId: string;
  userId: string;
}) => {
  try {
    const res = await prisma.bookmark.count({
      where: {
        id: bookmarkId,
        userId: userId,
      },
    });

    return res;
  } catch (err) {
    throw new Error(`Failed to get bookmark count: ${err}`);
  }
};

export const getBookmarkCountByArticleId = async ({
  articleId,
  userId,
}: {
  articleId: string;
  userId: string;
}) => {
  try {
    const count = await prisma.bookmark.count({
      where: {
        userId: userId,
        articleId: articleId,
      },
    });
    return count;
  } catch (err) {
    throw new Error(`Failed to get bookmark count: ${err}`);
  }
};

export const getBookmarkCountByArticleUrl = async ({
  articleUrl,
  userId,
}: {
  articleUrl: string;
  userId: string;
}) => {
  try {
    const res = await prisma.bookmark.count({
      where: {
        userId: userId,
        articleUrl: articleUrl,
      },
    });
    return res;
  } catch (err) {
    throw new Error(`Failed to get bookmark count: ${err}`);
  }
};

type CreateBookmarkDTO = {
  title: string;
  description: string;
  articleId?: string;
  articleUrl: string;
  publishedAt?: Date;
  thumbnailURL: string;
  isRead: boolean;
  userId: string;
  platformId?: string;
  platformName?: string;
  platformUrl?: string;
  platformFaviconUrl?: string;
  isEng: boolean;
};

export const createBookmark = async (dto: CreateBookmarkDTO) => {
  try {
    const uuid = uuidv4();
    const data = await prisma.bookmark.create({
      data: {
        id: uuid,
        title: dto.title,
        description: dto.description,
        articleId: dto.articleId,
        articleUrl: dto.articleUrl,
        publishedAt: dto.publishedAt,
        thumbnailURL: dto.thumbnailURL,
        isRead: dto.isRead,
        userId: dto.userId,
        platformId: dto.platformId,
        platformName: dto?.platformName || "",
        platformUrl: dto?.platformUrl || "",
        platformFaviconUrl: dto?.platformFaviconUrl || "",
        isEng: dto.isEng,
      },
    });
    return data.id;
  } catch (err) {
    throw new Error(`Failed to create bookmark: ${err}`);
  }
};

type DeleteBookmarkDTO = {
  bookmarkId: string;
  userId: string;
};

export const deleteBookmark = async ({
  bookmarkId,
  userId,
}: DeleteBookmarkDTO) => {
  try {
    const data = await prisma.bookmark.delete({
      where: {
        id: bookmarkId,
        userId: userId,
      },
    });
    return data.id;
  } catch (err) {
    throw new Error(`Failed to delete bookmark: ${err}`);
  }
};
