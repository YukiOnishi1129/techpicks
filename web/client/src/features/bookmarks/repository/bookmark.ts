"use server";

import prisma from "@/lib/prisma";
import { BookmarkType } from "@/types/bookmark";
import { platform } from "os";

type GetBookmarkList = {
  userId: string;
};

export const getBookmarkList = async ({ userId }: GetBookmarkList) => {
  const res = await prisma.bookmark.findMany({
    where: {
      userId: userId,
    },
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

    if (bookmark.platform) {
      bookmarkData.platform = {
        id: bookmark.platform.id,
        name: bookmark.platform.name,
        siteUrl: bookmark.platform.siteUrl,
        faviconUrl: bookmark.platform.faviconUrl,
        platformType: bookmark.platform.platformType,
        isEng: bookmark.platform.isEng,
        createdAt: bookmark.platform.createdAt,
        updatedAt: bookmark.platform.updatedAt,
      };
    }

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

  if (data.platform) {
    bookmarkData.platform = {
      id: data.platform.id,
      name: data.platform.name,
      siteUrl: data.platform.siteUrl,
      faviconUrl: data.platform.faviconUrl,
      platformType: data.platform.platformType,
      isEng: data.platform.isEng,
      createdAt: data.platform.createdAt,
      updatedAt: data.platform.updatedAt,
    };
  }

  return bookmarkData;
};

type CreateBookmarkDTO = {
  title: string;
  description: string;
  articleUrl: string;
  publishedAt: Date;
  thumbnailURL: string;
  isRead: boolean;
  userId: string;
  platformId: string;
};

export const createBookmark = async (dto: CreateBookmarkDTO) => {
  try {
    const data = await prisma.bookmark.create({
      data: {
        title: dto.title,
        description: dto.description,
        articleUrl: dto.articleUrl,
        publishedAt: dto.publishedAt,
        thumbnailURL: dto.thumbnailURL,
        isRead: dto.isRead,
        userId: dto.userId,
        platformId: dto.platformId,
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
