"use server";
// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

import { Database } from "@/types/database.types";
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
  try {
    const supabase = await createGetOnlyServerSideClient();

    const query = supabase
      .from("favorite_articles")
      .select("*")
      .eq("user_id", userId)
      .eq("favorite_article_folder_id", favoriteArticleFolderId);

    if (keyword) {
      query.or(
        `title.ilike.%${keyword}%,description.ilike.%${keyword}%,tags.ilike.%${keyword}%`
      );
    }

    const { data, error } = await query
      .order("created_at", { ascending: false })
      .range((offset - 1) * LIMIT, offset * LIMIT - 1);

    if (error || !data) return [];

    return data.map((favoriteArticle) =>
      convertDatabaseResponseToFavoriteArticleResponse(favoriteArticle)
    );
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
    const supabase = await createGetOnlyServerSideClient();

    const query = supabase
      .from("favorite_articles")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId);

    const { data, error } = await query.single();

    if (error || !data) return undefined;

    return convertDatabaseResponseToFavoriteArticleResponse(data);
  } catch (err) {
    throw new Error(`Failed to get favorite article: ${err}`);
  }
};

type GetFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdAndArticleUrlDTO =
  {
    userId: string;
    articleId: string;
    favoriteArticleFolderId: string;
    articleUrl: string;
  };

export const getFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdAndArticleUrl =
  async ({
    userId,
    articleId,
    favoriteArticleFolderId,
    articleUrl,
  }: GetFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdAndArticleUrlDTO): Promise<number> => {
    try {
      const supabase = await createGetOnlyServerSideClient();
      const query = supabase
        .from("favorite_articles")
        .select("*", { count: "exact" })
        .eq("user_id", userId)
        .eq("favorite_article_folder_id", favoriteArticleFolderId)
        .eq("article_id", articleId)
        .eq("article_url", articleUrl);

      const { error, count } = await query;

      if (error || !count) return 0;

      return count;
    } catch (err) {
      throw new Error(`Failed to get favorite article count: ${err}`);
    }
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
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase
      .from("favorite_articles")
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .eq("favorite_article_folder_id", favoriteArticleFolderId)
      .eq("article_url", articleUrl);
    const { error, count } = await query;

    if (error || !count) return 0;

    return count;
  } catch (err) {
    throw new Error(`Failed to get favorite article count: ${err}`);
  }
};

export const getFavoriteArticleCountByFolderIdAndArticleUrlAndArticle = async ({
  userId,
  favoriteArticleFolderId,
  articleUrl,
}: GetFavoriteArticleCountByFolderIdAndArticleUrlDTO) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase
      .from("favorite_articles")
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .eq("favorite_article_folder_id", favoriteArticleFolderId)
      .eq("article_url", articleUrl);

    const { error, count } = await query;

    if (error || !count) return 0;

    return count;
  } catch (err) {
    throw new Error(`Failed to get favorite article count: ${err}`);
  }
};

type FavoriteArticleGetDatabaseResponseType =
  Database["public"]["Tables"]["favorite_articles"]["Row"];

const convertDatabaseResponseToFavoriteArticleResponse = (
  favoriteArticle: FavoriteArticleGetDatabaseResponseType
): FavoriteArticleType => {
  return {
    id: favoriteArticle.id,
    favoriteArticleFolderId: favoriteArticle.favorite_article_folder_id,
    platformId: favoriteArticle.platform_id || undefined,
    articleId: favoriteArticle.article_id,
    userId: favoriteArticle.user_id,
    title: favoriteArticle.title,
    description: favoriteArticle.description,
    articleUrl: favoriteArticle.article_url,
    publishedAt: favoriteArticle.published_at || undefined,
    authorName: favoriteArticle.author_name || undefined,
    tags: favoriteArticle.tags || undefined,
    thumbnailUrl: favoriteArticle.thumbnail_url,
    platformName: favoriteArticle.platform_name,
    platformUrl: favoriteArticle.platform_url,
    platformFaviconUrl: favoriteArticle.platform_favicon_url,
    isEng: favoriteArticle.is_eng,
    isRead: favoriteArticle.is_read,
    isPrivate: favoriteArticle.is_private,
    createdAt: favoriteArticle.created_at,
    updatedAt: favoriteArticle.updated_at,
  };
};

/**
 * ==========================================
 * Create
 * ==========================================
 */

export type CreateFavoriteArticleDTO = {
  userId: string;
  favoriteArticleFolderId: string;
  platformId?: string;
  articleId: string;
  title: string;
  description: string;
  articleUrl: string;
  publishedAt?: string;
  authorName?: string;
  tags?: string;
  thumbnailUrl?: string;
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
    const supabase = await createGetOnlyServerSideClient();

    const { data, error } = await supabase
      .from("favorite_articles")
      .insert({
        id: uuid,
        user_id: dto.userId,
        favorite_article_folder_id: dto.favoriteArticleFolderId,
        platform_id: dto.platformId,
        article_id: dto.articleId,
        title: dto.title,
        description: dto.description,
        article_url: dto.articleUrl,
        published_at: dto.publishedAt,
        author_name: dto.authorName,
        tags: dto.tags,
        thumbnail_url: dto.thumbnailUrl || "",
        platform_name: dto.platformName || "",
        platform_url: dto.platformUrl || "",
        platform_favicon_url: dto.platformFaviconUrl || "",
        is_eng: dto.isEng,
        is_read: dto.isRead,
        is_private: dto.isPrivate,
      })
      .select();

    if (error || !data) return;
    return convertDatabaseResponseToFavoriteArticleResponse(data[0]);
  } catch (err) {
    throw new Error(`Failed to create favorite article: ${err}`);
  }
};

/**
 * ==========================================
 * Delete
 * ==========================================
 */

type DeleteFavoriteArticleDTO = {
  id: string;
  userId: string;
};

export const deleteFavoriteArticle = async ({
  id,
  userId,
}: DeleteFavoriteArticleDTO) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const { error } = await supabase
      .from("favorite_articles")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);
    if (error) return;
    return id;
  } catch (err) {
    throw new Error(`Failed to delete favorite article: ${err}`);
  }
};
