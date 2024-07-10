"use server";
// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

import { Database } from "@/types/database.types";
import { MyFeedFolderType } from "@/types/myFeedFolder";

type GetMyFeedFolders = {
  userId: string;
  keyword?: string;
};

export const getMyFeedFolders = async ({
  userId,
  keyword,
}: GetMyFeedFolders) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase
      .from("my_feed_folders")
      .select(
        `
          *,
          profiles!inner(*),
          my_feeds(*, feeds!inner(*, platforms!inner(*), categories!inner(*)))
        `
      )
      .eq("user_id", userId)
      .eq("my_feeds.user_id", userId)
      .order("created_at", {
        ascending: true,
      });

    if (keyword) {
      query.or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%`);
    }

    const { data, error } = await query;

    if (error || !data) return [];

    return data.map((myFeedFolder) => {
      return convertDatabaseResponseToMyFeedFolderResponse(myFeedFolder);
    });
  } catch (err) {
    throw new Error(`Failed to get my feed folders: ${err}`);
  }
};

type GetMyFeedFolderById = {
  id: string;
  userId: string;
};

export const getMyFeedFolderById = async ({
  id,
  userId,
}: GetMyFeedFolderById) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase
      .from("my_feed_folders")
      .select(
        `
          *,
          profiles!inner(*),
          my_feeds(*, feeds!inner(*, platforms!inner(*), categories!inner(*)))
        `
      )
      .eq("id", id)
      .eq("user_id", userId)
      .eq("my_feeds.user_id", userId);

    const { data, error } = await query.single();

    if (error || !data) return;

    return convertDatabaseResponseToMyFeedFolderResponse(data);
  } catch (err) {
    throw new Error(`Failed to get my feed folder by id: ${err}`);
  }
};

type MyFeedFolderGetDatabaseResponseType =
  Database["public"]["Tables"]["my_feed_folders"]["Row"] & {
    my_feeds: Array<
      Database["public"]["Tables"]["my_feeds"]["Row"] & {
        feeds: Database["public"]["Tables"]["feeds"]["Row"] & {
          categories: Database["public"]["Tables"]["categories"]["Row"];
          platforms: Database["public"]["Tables"]["platforms"]["Row"];
        };
      }
    >;
    profiles: Database["public"]["Tables"]["profiles"]["Row"];
  };

const convertDatabaseResponseToMyFeedFolderResponse = (
  myFeedFolder: MyFeedFolderGetDatabaseResponseType
): MyFeedFolderType => {
  return {
    id: myFeedFolder.id,
    userId: myFeedFolder.user_id,
    title: myFeedFolder.title,
    description: myFeedFolder.description || undefined,
    createdAt: myFeedFolder.created_at,
    updatedAt: myFeedFolder.updated_at,
    profile: {
      id: myFeedFolder.profiles.id,
      name: myFeedFolder.profiles.name,
      email: myFeedFolder.profiles.email,
      image: myFeedFolder.profiles.image,
      isSuperAdmin: myFeedFolder.profiles.is_super_admin,
      createdAt: myFeedFolder.profiles.created_at,
      updatedAt: myFeedFolder.profiles.updated_at,
    },
    feeds: myFeedFolder.my_feeds.map((myFeed) => {
      return {
        id: myFeed.feeds.id,
        platformId: myFeed.feeds.platform_id,
        categoryId: myFeed.feeds.category_id,
        name: myFeed.feeds.name,
        description: myFeed.feeds.description,
        thumbnailUrl: myFeed.feeds.thumbnail_url,
        siteUrl: myFeed.feeds.site_url,
        rssUrl: myFeed.feeds.rss_url,
        apiQueryParam: myFeed.feeds.api_query_param || undefined,
        trendPlatformType: myFeed.feeds.trend_platform_type,
        createdAt: myFeed.feeds.created_at,
        updatedAt: myFeed.feeds.updated_at,
        category: {
          id: myFeed.feeds.categories.id,
          name: myFeed.feeds.categories.name,
          type: myFeed.feeds.categories.type,
          createdAt: myFeed.feeds.categories.created_at,
          updatedAt: myFeed.feeds.categories.updated_at,
        },
        platform: {
          id: myFeed.feeds.platforms.id,
          name: myFeed.feeds.platforms.name,
          siteUrl: myFeed.feeds.platforms.site_url,
          faviconUrl: myFeed.feeds.platforms.favicon_url,
          platformSiteType: myFeed.feeds.platforms.platform_site_type,
          isEng: myFeed.feeds.platforms.is_eng,
          createdAt: myFeed.feeds.platforms.created_at,
          updatedAt: myFeed.feeds.platforms.updated_at,
        },
        myFeedId: myFeed.id,
      };
    }),
  };
};

/**
 * ==========================================
 * Create
 * ==========================================
 */

export type CreateMyFeedFolderDTO = {
  title: string;
  description: string;
  userId: string;
};

export const createMyFeedFolder = async ({
  title,
  description,
  userId,
}: CreateMyFeedFolderDTO) => {
  try {
    const uuid = uuidv4();
    const supabase = await createGetOnlyServerSideClient();
    const { data, error } = await supabase
      .from("my_feed_folders")
      .insert({
        id: uuid,
        user_id: userId,
        title,
        description,
      })
      .select();
    if (error || !data) return;

    return data[0].id;
  } catch (err) {
    throw new Error(`Failed to create my feed folder: ${err}`);
  }
};

/**
 * ==========================================
 * Update
 * ==========================================
 */

export type UpdateMyFeedFolderDTO = {
  id: string;
  title: string;
  description: string;
  userId: string;
};

export const updateMyFeedFolder = async ({
  id,
  title,
  description,
  userId,
}: UpdateMyFeedFolderDTO) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const { error } = await supabase
      .from("my_feed_folders")
      .update({
        title,
        description,
      })
      .eq("id", id)
      .eq("user_id", userId);
    if (error) return;
    return id;
  } catch (err) {
    throw new Error(`Failed to update my feed folder: ${err}`);
  }
};

/**
 * ==========================================
 * Delete
 * ==========================================
 */

export const deleteMyFeedFolder = async (id: string) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const { error } = await supabase
      .from("my_feed_folders")
      .delete()
      .eq("id", id);

    if (error) return;

    return id;
  } catch (err) {
    throw new Error(`Failed to delete my feed folder: ${err}`);
  }
};
