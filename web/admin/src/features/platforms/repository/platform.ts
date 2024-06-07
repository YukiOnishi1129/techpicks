"use server";
// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

import { Database } from "@/types/database.types";
import { PlatformType } from "@/types/platform";

export type GetPlatformsDT0 = {
  offset?: number;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
};

export const getPlatforms = async ({
  offset = 1,
  keyword,
  language,
  platformSiteType,
}: GetPlatformsDT0) => {
  const limit = 8;

  try {
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase.from("platforms").select(
      `
        *,
        feeds(*,categories!inner(*))
      `
    );

    if (keyword) {
      query.like("name", `%${keyword}%`);
    }

    if (language) {
      query.eq("is_eng", language === "2");
    }

    let argPlatformSiteType = 0;
    switch (platformSiteType) {
      case "1":
        argPlatformSiteType = 1;
        break;
      case "2":
        argPlatformSiteType = 2;
        break;
      case "3":
        argPlatformSiteType = 3;
        break;
      default:
        argPlatformSiteType = 0;
        break;
    }

    if (argPlatformSiteType) {
      query.eq("platform_site_type", argPlatformSiteType);
    }

    query
      .order("created_at", {
        ascending: true,
      })
      .range((offset - 1) * limit, offset * limit - 1);

    const { data, error } = await query;

    if (error || !data) return [];

    return data.map((platform) =>
      convertDatabaseResponseToPlatformResponse(platform)
    );
  } catch (err) {
    throw new Error(`Failed to get platforms: ${err}`);
  }
};

export type GetPlatformsCountDT0 = {
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  siteUrl?: string;
};

export const getPlatformsCount = async ({
  keyword,
  language,
  platformSiteType,
  siteUrl,
}: GetPlatformsCountDT0) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase.from("platforms").select(`*`, { count: "exact" });

    if (keyword) {
      query.like("name", `%${keyword}%`);
    }

    if (language) {
      query.eq("is_eng", language === "2");
    }

    let argPlatformSiteType = 0;
    switch (platformSiteType) {
      case "1":
        argPlatformSiteType = 1;
        break;
      case "2":
        argPlatformSiteType = 2;
        break;
      case "3":
        argPlatformSiteType = 3;
        break;
      default:
        argPlatformSiteType = 0;
        break;
    }

    if (argPlatformSiteType) {
      query.eq("platform_site_type", argPlatformSiteType);
    }

    if (siteUrl) {
      query.eq("site_url", siteUrl);
    }

    const { error, count } = await query;

    if (error || !count) return 0;
    return count;
  } catch (err) {
    throw new Error(`Failed to get platforms count: ${err}`);
  }
};

export const getPlatformById = async (id: string) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const { data, error } = await supabase
      .from("platforms")
      .select(
        `
        *,
        feeds(*,categories!inner(*))
      `
      )
      .eq("id", id)
      .single();

    if (error || !data) return;

    const platform = data;

    return convertDatabaseResponseToPlatformResponse(platform);
  } catch (err) {
    throw new Error(`Failed to get platform: ${err}`);
  }
};

type PlatformGetDatabaseResponseTypes =
  Database["public"]["Tables"]["platforms"]["Row"] & {
    feeds: Array<
      Database["public"]["Tables"]["feeds"]["Row"] & {
        categories: Database["public"]["Tables"]["categories"]["Row"];
      }
    >;
  };

const convertDatabaseResponseToPlatformResponse = (
  platform: PlatformGetDatabaseResponseTypes
): PlatformType => {
  return {
    id: platform.id,
    name: platform.name,
    siteUrl: platform.site_url,
    platformSiteType: platform.platform_site_type,
    faviconUrl: platform.favicon_url,
    isEng: platform.is_eng,
    createdAt: platform.created_at,
    updatedAt: platform.updated_at,
    deletedAt: platform?.deleted_at || undefined,
    feeds: platform.feeds.map((feed) => {
      return {
        id: feed.id,
        name: feed.name,
        description: feed.description,
        thumbnailUrl: feed.thumbnail_url,
        platformId: feed.platform_id,
        categoryId: feed.category_id,
        siteUrl: feed.site_url,
        rssUrl: feed.rss_url,
        apiQueryParam: feed?.api_query_param || undefined,
        trendPlatformType: feed.trend_platform_type,
        createdAt: feed.created_at,
        updatedAt: feed.updated_at,
        deletedAt: feed?.deleted_at || undefined,
        category: {
          id: feed.categories.id,
          name: feed.categories.name,
          type: feed.categories.type,
          createdAt: feed.categories.created_at,
          updatedAt: feed.categories.updated_at,
          deletedAt: feed.categories?.deleted_at || undefined,
        },
      };
    }),
  };
};

/**
 * ==========================================
 * Create
 * ==========================================
 */

type CreatePlatformDTO = {
  name: string;
  siteUrl: string;
  platformSiteType: number;
  faviconUrl: string;
  isEng: boolean;
};

export const createPlatform = async ({
  name,
  siteUrl,
  platformSiteType,
  faviconUrl,
  isEng,
}: CreatePlatformDTO) => {
  try {
    const uuid = uuidv4();
    const supabase = await createGetOnlyServerSideClient();
    const { data, error } = await supabase
      .from("platforms")
      .insert([
        {
          id: uuid,
          name,
          site_url: siteUrl,
          platform_site_type: platformSiteType,
          favicon_url: faviconUrl,
          is_eng: isEng,
        },
      ])
      .select();

    if (error || !data) return;

    return data[0].id;
  } catch (err) {
    throw new Error(`Failed to create platform: ${err}`);
  }
};

/**
 * ==========================================
 * Update
 * ==========================================
 */

export type UpdatePlatformDTO = {
  id: string;
  name: string;
  siteUrl: string;
  platformSiteType: number;
  faviconUrl: string;
  isEng: boolean;
  deletedAt?: string;
};

export const updatePlatform = async ({
  id,
  name,
  siteUrl,
  platformSiteType,
  faviconUrl,
  isEng,
  deletedAt,
}: UpdatePlatformDTO) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const { error } = await supabase
      .from("platforms")
      .update({
        name,
        site_url: siteUrl,
        platform_site_type: platformSiteType,
        favicon_url: faviconUrl,
        is_eng: isEng,
        deleted_at: deletedAt || null,
      })
      .eq("id", id);

    if (error) return;

    return id;
  } catch (err) {
    throw new Error(`Failed to update platform: ${err}`);
  }
};

export const bulkUpdatePlatform = async (platforms: UpdatePlatformDTO[]) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const { data, error } = await supabase
      .from("platforms")
      .upsert(
        platforms.map((platform) => {
          return {
            id: platform.id,
            name: platform.name,
            site_url: platform.siteUrl,
            platform_site_type: platform.platformSiteType,
            favicon_url: platform.faviconUrl,
            is_eng: platform.isEng,
            deleted_at: platform.deletedAt || null,
          };
        })
      )
      .select();

    if (error || !data) return [];

    return data.map((platform) => {
      return {
        id: platform.id,
        name: platform.name,
        siteUrl: platform.site_url,
        platformSiteType: platform.platform_site_type,
        faviconUrl: platform.favicon_url,
        isEng: platform.is_eng,
        createdAt: platform.created_at,
        updatedAt: platform.updated_at,
        deletedAt: platform?.deleted_at || undefined,
      };
    });
  } catch (err) {
    throw new Error(`Failed to bulk update platform: ${err}`);
  }
};

/**
 * ==========================================
 * Delete
 * ==========================================
 */
export const deletePlatform = async (id: string) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const { error } = await supabase.from("platforms").delete().eq("id", id);

    if (error) return;

    return id;
  } catch (err) {
    throw new Error(`Failed to delete platform: ${err}`);
  }
};
