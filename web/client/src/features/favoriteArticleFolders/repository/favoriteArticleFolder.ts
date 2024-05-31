"use server";

// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

import { Database } from "@/types/database.types";
import { FavoriteArticleType } from "@/types/favoriteArticle";
import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

type GetFavoriteArticleFolders = {
  userId: string;
  keyword?: string;
};

export const getFavoriteArticleFolders = async ({
  userId,
  keyword,
}: GetFavoriteArticleFolders): Promise<Array<FavoriteArticleFolderType>> => {
  try {
    const supabase = await createGetOnlyServerSideClient();

    const query = supabase
      .from("favorite_article_folders")
      .select(
        `
        *,
        favorite_articles (
          *
        )
      `
      )
      .eq("user_id", userId);

    if (keyword) {
      query.or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%`);
    }

    const { data, error } = await query.order("created_at", {
      ascending: true,
    });

    if (error || !data) return [];
    const favoriteArticleFolders: Array<FavoriteArticleFolderType> = data.map(
      (favoriteArticleFolder) =>
        convertDatabaseResponseToFavoriteArticleFolderResponse(
          favoriteArticleFolder
        )
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
    const supabase = await createGetOnlyServerSideClient();

    const query = supabase
      .from("favorite_article_folders")
      .select(
        `
        *,
        favorite_articles (
          *
        )
      `
      )
      .eq("id", id)
      .eq("user_id", userId);

    const { data, error } = await query.single();

    if (error || !data) return;

    return convertDatabaseResponseToFavoriteArticleFolderResponse(data);
  } catch (err) {
    throw new Error(`Failed to get favorite article folder: ${err}`);
  }
};

type FavoriteArticleFolderGetDatabaseResponseType =
  Database["public"]["Tables"]["favorite_article_folders"]["Row"] & {
    favorite_articles: Array<
      Database["public"]["Tables"]["favorite_articles"]["Row"]
    >;
  };

const convertDatabaseResponseToFavoriteArticleFolderResponse = (
  favoriteArticleFolder: FavoriteArticleFolderGetDatabaseResponseType
): FavoriteArticleFolderType => {
  const favoriteArticles: Array<FavoriteArticleType> =
    favoriteArticleFolder.favorite_articles.map((favoriteArticle) => {
      return {
        id: favoriteArticle.id,
        platformId: favoriteArticle.platform_id || undefined,
        articleId: favoriteArticle.article_id,
        userId: favoriteArticle.user_id,
        favoriteArticleFolderId: favoriteArticle.favorite_article_folder_id,
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
    });

  return {
    id: favoriteArticleFolder.id,
    userId: favoriteArticleFolder.user_id,
    title: favoriteArticleFolder.title,
    description: favoriteArticleFolder.description || undefined,
    favoriteArticles: favoriteArticles,
    createdAt: favoriteArticleFolder.created_at,
    updatedAt: favoriteArticleFolder.updated_at,
  };
};

/**
 * ==========================================
 * Create
 * ==========================================
 */

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

    const supabase = await createGetOnlyServerSideClient();
    const { data, error } = await supabase
      .from("favorite_article_folders")
      .insert({
        id: uuid,
        user_id: dto.userId,
        title: dto.title,
        description: dto.description,
      })
      .select();
    if (error || !data) return;

    return data[0].id;
  } catch (err) {
    throw new Error(`Failed to create favorite article folder: ${err}`);
  }
};

/**
 * ==========================================
 * Update
 * ==========================================
 */

export type UpdateFavoriteArticleFolderDTO = {
  id: string;
  title: string;
  description: string;
  userId: string;
};

export const updateFavoriteArticleFolder = async ({
  id,
  title,
  description,
  userId,
}: UpdateFavoriteArticleFolderDTO) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const { error } = await supabase
      .from("favorite_article_folders")
      .update({
        title,
        description,
      })
      .eq("id", id)
      .eq("user_id", userId);

    if (error) return;
    return id;
  } catch (err) {
    throw new Error(`Failed to update favorite article folder: ${err}`);
  }
};

/**
 * ==========================================
 * Delete
 * ==========================================
 */

export const deleteFavoriteArticleFolder = async (id: string) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const { error } = await supabase
      .from("favorite_article_folders")
      .delete()
      .eq("id", id);

    if (error) return;

    return id;
  } catch (err) {
    throw new Error(`Failed to delete favorite article folder: ${err}`);
  }
};
