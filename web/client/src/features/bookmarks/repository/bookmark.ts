"use server";

import prisma from "@/lib/prisma";
import { BookmarkType } from "@/types/bookmark";

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

type GetBookmark = {
  bookmarkId: string;
  userId: string;
};

export const getBookmark = async ({ bookmarkId, userId }: GetBookmark) => {
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

export const createBookmark = async (bookmarkData: BookmarkType) => {
  try {
    const data = await prisma.bookmark.create({
      data: {
        title: bookmarkData.title,
        description: bookmarkData.description,
        articleUrl: bookmarkData.articleUrl,
        publishedAt: bookmarkData.publishedAt,
        thumbnailURL: bookmarkData.thumbnailURL,
        isRead: bookmarkData.isRead,
        userId: bookmarkData.user.id,
        platformId: bookmarkData?.platform?.id,
      },
    });
    return data.id;
  } catch (err) {
    throw new Error(`Failed to create bookmark: ${err}`);
  }
};

export const deleteBookmark = async (bookmarkId: string) => {
  try {
    await prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  } catch (err) {
    throw new Error(`Failed to delete bookmark: ${err}`);
  }
};
