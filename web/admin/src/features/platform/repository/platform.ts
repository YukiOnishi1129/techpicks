"use server";
// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

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
        feeds!inner(*,categories!inner(*))
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

    const resPlatforms: Array<PlatformType> = data.map((platform) => {
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
    });

    return resPlatforms;
  } catch (err) {
    throw new Error(`Failed to get platforms: ${err}`);
  }
};

export type GetPlatformsCountDT0 = {
  keyword?: string;
  language?: string;
  platformSiteType?: string;
};

export const getPlatformsCount = async ({
  keyword,
  language,
  platformSiteType,
}: GetPlatformsCountDT0) => {
  try {
    const uuid = uuidv4();
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

    const { error, count } = await query;

    if (error || !count) return 0;
    return count;
  } catch (err) {
    throw new Error(`Failed to get platforms count: ${err}`);
  }
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

type UpdatePlatformDTO = {
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
