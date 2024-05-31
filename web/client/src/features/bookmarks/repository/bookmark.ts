"use server";
// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

import { BookmarkType } from "@/types/bookmark";
import { Database } from "@/types/database.types";
import { LanguageStatus } from "@/types/language";

const LIMIT = 20;

type GetBookmarkList = {
  userId: string;
  platformId?: string;
  keyword?: string;
  languageStatus?: LanguageStatus;
  platformIdList: Array<string>;
  offset?: number;
  sort?: "asc" | "desc";
  sortColum?: string;
};
export const getBookmarkList = async ({
  userId,
  keyword,
  languageStatus = 0,
  platformIdList,
  offset = 1,
}: GetBookmarkList) => {
  try {
    const supabase = await createGetOnlyServerSideClient();

    const query = supabase
      .from("bookmarks")
      .select(
        `
        *,
        profiles!inner(
          *
        ),
        articles!inner(
          *,
          favorite_articles(
            *
          )
        )
      `
      )
      .eq("user_id", userId)
      .eq("articles.favorite_articles.user_id", userId);

    if (keyword) {
      query.or(`title.ilike.*${keyword}*,description.ilike.*${keyword}*`);
    }
    if (languageStatus) {
      query.eq("is_eng", languageStatus === 2);
    }
    if (platformIdList.length) {
      query.in("platform_id", platformIdList);
    }

    const { data, error } = await query
      .order("created_at", { ascending: false })
      .range((offset - 1) * LIMIT, offset * LIMIT);

    if (error) return [];

    return data.map((bookmark) => {
      return convertDatabaseResponseToBookmarkResponse(bookmark);
    });
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
    const supabase = await createGetOnlyServerSideClient();

    const query = supabase
      .from("bookmarks")
      .select(
        `
        *,
        profiles!inner(
          *
        ),
        articles!inner(
          *,
          favorite_articles(
            *
          )
        )
      `
      )
      .eq("id", bookmarkId)
      .eq("user_id", userId)
      .eq("articles.favorite_articles.user_id", userId);
    const { data, error } = await query.single();

    if (error || !data) return null;

    return convertDatabaseResponseToBookmarkResponse(data);
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
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase
      .from("bookmarks")
      .select(`*`, { count: "exact", head: true })
      .eq("id", bookmarkId)
      .eq("user_id", userId);

    const { error, count } = await query;

    if (error || !count) return 0;

    return count;
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
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase
      .from("bookmarks")
      .select(`*`, { count: "exact", head: true })
      .eq("article_id", articleId)
      .eq("user_id", userId);

    const { error, count } = await query;

    if (error || !count) return 0;

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
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase
      .from("bookmarks")
      .select(`*`, { count: "exact" })
      .eq("article_url", articleUrl)
      .eq("user_id", userId);

    const { error, count } = await query;
    if (error || !count) return 0;

    return count;
  } catch (err) {
    throw new Error(`Failed to get bookmark count: ${err}`);
  }
};

type BookmarkGetDatabaseResponseType =
  Database["public"]["Tables"]["bookmarks"]["Row"] & {
    profiles: Database["public"]["Tables"]["profiles"]["Row"];
    articles: Database["public"]["Tables"]["articles"]["Row"] & {
      favorite_articles: Array<
        Database["public"]["Tables"]["favorite_articles"]["Row"]
      >;
    };
  };

const convertDatabaseResponseToBookmarkResponse = (
  bookmark: BookmarkGetDatabaseResponseType
) => {
  const bookmarkData: BookmarkType = {
    id: bookmark.id,
    userId: bookmark.user_id,
    articleId: bookmark.article_id,
    title: bookmark.title,
    description: bookmark.description,
    articleUrl: bookmark.article_url,
    publishedAt: bookmark.published_at || undefined,
    thumbnailUrl: bookmark.thumbnail_url,
    isRead: bookmark.is_read,
    isEng: bookmark.is_eng,
    platformId: bookmark.platform_id || undefined,
    platformName: bookmark.platform_name,
    platformUrl: bookmark.platform_url,
    platformFaviconUrl: bookmark.platform_favicon_url,
    user: {
      id: bookmark.profiles.id,
      name: bookmark.profiles.name,
      email: bookmark.profiles.email,
      emailVerifiedAt: bookmark.profiles.email_verified_at || undefined,
      image: bookmark.profiles.image,
      isSuperAdmin: bookmark.profiles.is_super_admin,
      createdAt: bookmark.profiles.created_at,
      updatedAt: bookmark.profiles.updated_at,
    },
    favoriteArticles: bookmark?.articles?.favorite_articles.map((favorite) => {
      return {
        id: favorite.id,
        favoriteArticleFolderId: favorite.favorite_article_folder_id,
        articleId: favorite.article_id,
        platformId: favorite.platform_id || undefined,
        userId: favorite.user_id,
        title: favorite.title,
        description: favorite.description,
        thumbnailUrl: favorite.thumbnail_url,
        articleUrl: favorite.article_url,
        platformFaviconUrl: favorite.platform_favicon_url,
        publishedAt: favorite.published_at || undefined,
        authorName: favorite.author_name || undefined,
        tags: favorite.tags || undefined,
        platformName: favorite.platform_name,
        platformUrl: favorite.platform_url,
        isEng: favorite.is_eng,
        isPrivate: favorite.is_private,
        isRead: favorite.is_read,
        createdAt: favorite.created_at,
        updatedAt: favorite.updated_at,
      };
    }),
    isFollowing: bookmark?.articles?.favorite_articles?.length ? true : false,
    createdAt: bookmark.created_at,
    updatedAt: bookmark.updated_at,
  };

  return bookmarkData;
};

/**
 * ==========================================
 * Create
 * ==========================================
 */

type CreateBookmarkDTO = {
  title: string;
  description: string;
  articleId: string;
  articleUrl: string;
  publishedAt?: string;
  thumbnailUrl: string;
  isRead: boolean;
  userId: string;
  platformId?: string;
  platformName: string;
  platformUrl: string;
  platformFaviconUrl: string;
  isEng: boolean;
};

export const createBookmark = async (dto: CreateBookmarkDTO) => {
  try {
    const uuid = uuidv4();
    const supabase = await createGetOnlyServerSideClient();

    const { data, error } = await supabase
      .from("bookmarks")
      .insert({
        id: uuid,
        title: dto.title,
        description: dto.description,
        article_id: dto.articleId,
        article_url: dto.articleUrl,
        published_at: dto.publishedAt,
        thumbnail_url: dto.thumbnailUrl,
        is_read: dto.isRead,
        user_id: dto.userId,
        platform_id: dto.platformId,
        platform_name: dto.platformName,
        platform_url: dto.platformUrl,
        platform_favicon_url: dto.platformFaviconUrl,
        is_eng: dto.isEng,
      })
      .select();

    if (error || !data) return;

    return data[0];
  } catch (err) {
    throw new Error(`Failed to create bookmark: ${err}`);
  }
};

/**
 * ==========================================
 * Delete
 * ==========================================
 */

type DeleteBookmarkDTO = {
  bookmarkId: string;
  userId: string;
};

export const deleteBookmark = async ({
  bookmarkId,
  userId,
}: DeleteBookmarkDTO) => {
  try {
    const supabase = await createGetOnlyServerSideClient();

    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", bookmarkId)
      .eq("user_id", userId);
    if (error) return;

    return bookmarkId;
  } catch (err) {
    throw new Error(`Failed to delete bookmark: ${err}`);
  }
};
