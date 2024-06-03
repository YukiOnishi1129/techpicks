"use server";

import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

import { FeedType } from "@/types/feed";

export type GetPlatformsDT0 = {
  offset?: number;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
};

export const getFeeds = async ({
  offset = 1,
  keyword,
  language,
  platformSiteType,
}: GetPlatformsDT0) => {
  try {
    const limit = 8;
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase.from("feeds").select(
      `
        *,
        categories!inner(*),
        platforms!inner(*)
      `
    );

    if (keyword) {
      query.like("title", `%${keyword}%`);
    }
    if (language) {
      query.eq("platforms.is_eng", language === "2");
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
      query.eq("platforms.platform_site_type", argPlatformSiteType);
    }
    query
      .order("trend_platform_type", {
        ascending: false,
      })
      .order("platforms(platform_site_type)", {
        ascending: true,
      })
      .order("platforms(is_eng)", {
        ascending: false,
      })
      .order("name", {
        ascending: true,
      })
      .order("categories(type)", {
        ascending: true,
      })
      .order("created_at", {
        ascending: true,
      })
      .range((offset - 1) * limit, offset * limit - 1);

    const { data, error } = await query;

    if (error || !data) return [];

    const resFeeds: Array<FeedType> = data.map((feed) => {
      return {
        id: feed.id,
        platformId: feed.platforms.id,
        categoryId: feed.categories.id,
        name: feed.name,
        description: feed.description,
        rssUrl: feed.rss_url,
        siteUrl: feed.site_url,
        thumbnailUrl: feed.thumbnail_url,
        trendPlatformType: feed.trend_platform_type,
        apiQueryParam: feed.api_query_param || undefined,
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
        platform: {
          id: feed.platforms.id,
          name: feed.platforms.name,
          siteUrl: feed.platforms.site_url,
          platformSiteType: feed.platforms.platform_site_type,
          faviconUrl: feed.platforms.favicon_url,
          isEng: feed.platforms.is_eng,
          createdAt: feed.platforms.created_at,
          updatedAt: feed.platforms.updated_at,
          deletedAt: feed.platforms?.deleted_at || undefined,
        },
      };
    });
    return resFeeds;
  } catch (err) {
    throw new Error(`Failed to get feeds: ${err}`);
  }
};

export type GetFeedsCountDT0 = {
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  siteUrl?: string;
};

export const getFeedsCount = async ({
  keyword,
  language,
  platformSiteType,
  siteUrl,
}: GetFeedsCountDT0) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase.from("feeds").select(`*`, { count: "exact" });

    if (keyword) {
      query.like("title", `%${keyword}%`);
    }
    if (language) {
      query.eq("platforms.is_eng", language === "2");
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
      query.eq("platforms.platform_site_type", argPlatformSiteType);
    }

    if (siteUrl) {
      query.eq("platforms.site_url", siteUrl);
    }

    const { error, count } = await query;

    if (error || !count) return 0;

    return count;
  } catch (err) {
    throw new Error(`Failed to get feeds count: ${err}`);
  }
};
