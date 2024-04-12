"use server";

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
  sortColum = "publishedAt",
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
          platform: {
            isEng: languageStatus === 2,
          },
        },
      ],
    };
  } else {
    where = {
      platform: {
        isEng: languageStatus === 2,
      },
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

  const res = await prisma.bookmark.findMany({
    take: 20,
    skip: (offset - 1) * LIMIT,
    where,
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        publishedAt: "desc",
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

  const bookmarkList: Array<BookmarkType> = res.map((bookmark) => {
    const bookmarkData: BookmarkType = {
      id: bookmark.id,
      articleId: bookmark?.articleId,
      title: bookmark.title,
      description: bookmark.description,
      articleUrl: bookmark.articleUrl,
      publishedAt: bookmark.publishedAt,
      thumbnailURL: bookmark.thumbnailURL,
      isRead: bookmark.isRead,
      isEng: bookmark.isEng,
      platformName: bookmark.platformName,
      platformUrl: bookmark.platformUrl,
      platformFaviconUrl: bookmark.platformFaviconUrl,
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
};

type GetBookmarkDTO = {
  bookmarkId: string;
  userId: string;
};

export const getBookmark = async ({ bookmarkId, userId }: GetBookmarkDTO) => {
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
    articleId: data?.articleId,
    title: data.title,
    description: data.description,
    articleUrl: data.articleUrl,
    publishedAt: data.publishedAt,
    thumbnailURL: data.thumbnailURL,
    isRead: data.isRead,
    isEng: data.isEng,
    platformName: data.platformName,
    platformUrl: data.platformUrl,
    platformFaviconUrl: data.platformFaviconUrl,
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
};

type CreateBookmarkDTO = {
  id: string;
  title: string;
  description: string;
  articleId?: string;
  articleUrl: string;
  publishedAt: Date;
  thumbnailURL: string;
  isRead: boolean;
  userId: string;
  platformId: string;
  platformName?: string;
  platformUrl?: string;
  platformFaviconUrl?: string;
  isEng: boolean;
};

export const createBookmark = async (dto: CreateBookmarkDTO) => {
  try {
    const data = await prisma.bookmark.create({
      data: {
        id: dto.id,
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
    await prisma.bookmark.delete({
      where: {
        id: bookmarkId,
        userId: userId,
      },
    });
  } catch (err) {
    throw new Error(`Failed to delete bookmark: ${err}`);
  }
};
