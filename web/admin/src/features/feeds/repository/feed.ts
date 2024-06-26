"use server";
// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

import { Database } from "@/types/database.types";
import { FeedType } from "@/types/feed";

import { STATUS_LIST } from "@/constants/status";

export type GetPlatformsDTO = {
  offset?: number;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  siteUrl?: string;
  rssUrl?: string;
  platformId?: string;
  categoryId?: string;
  trendPlatformType?: string;
  status?: string;
};

export const getFeeds = async ({
  offset = 1,
  keyword,
  language,
  platformSiteType,
  siteUrl,
  rssUrl,
  platformId,
  categoryId,
  trendPlatformType,
  status,
}: GetPlatformsDTO) => {
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
      query.or(`name.ilike.%${keyword}%,description.ilike.%${keyword}%`);
    }
    if (language === "1" || language === "2") {
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

    if (rssUrl) {
      query.like("rss_url", `%${rssUrl}%`);
    }

    if (platformId) {
      query.eq("platform_id", platformId);
    }

    if (categoryId) {
      query.eq("category_id", categoryId);
    }

    let argTrendPlatformType;
    switch (trendPlatformType) {
      case "1":
        argTrendPlatformType = 1;
        break;
      case "2":
        argTrendPlatformType = 2;
        break;
      case "3":
        argTrendPlatformType = 3;
        break;
      case "4":
        argTrendPlatformType = 4;
        break;
      case "5":
        argTrendPlatformType = 5;
        break;
      case "0":
        argTrendPlatformType = 0;
        break;
    }

    if (argTrendPlatformType !== undefined) {
      query.eq("trend_platform_type", argTrendPlatformType);
    }

    switch (status) {
      case String(STATUS_LIST[1].value):
        query.is("deleted_at", null);
        break;
      case String(STATUS_LIST[2].value):
        query.not("deleted_at", "is", null);
        break;
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

    return data.map((feed) => convertDatabaseResponseToFeedResponse(feed));
  } catch (err) {
    throw new Error(`Failed to get feeds: ${err}`);
  }
};

export type GetFeedsCountDTO = {
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  siteUrl?: string;
  rssUrl?: string;
  platformId?: string;
  categoryId?: string;
  trendPlatformType?: string;
  status?: string;
};

export const getFeedsCount = async ({
  keyword,
  language,
  platformSiteType,
  siteUrl,
  rssUrl,
  platformId,
  categoryId,
  trendPlatformType,
  status,
}: GetFeedsCountDTO) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase.from("feeds").select(
      `
        *,
        categories!inner(*),
        platforms!inner(*)
      `,
      { count: "exact" }
    );

    if (keyword) {
      query.or(`name.ilike.%${keyword}%,description.ilike.%${keyword}%`);
    }
    if (language === "1" || language === "2") {
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

    if (rssUrl) {
      query.like("rss_url", `%${rssUrl}%`);
    }

    if (platformId) {
      query.eq("platform_id", platformId);
    }

    if (categoryId) {
      query.eq("category_id", categoryId);
    }

    let argTrendPlatformType;
    switch (trendPlatformType) {
      case "1":
        argTrendPlatformType = 1;
        break;
      case "2":
        argTrendPlatformType = 2;
        break;
      case "3":
        argTrendPlatformType = 3;
        break;
      case "4":
        argTrendPlatformType = 4;
        break;
      case "5":
        argTrendPlatformType = 5;
        break;
      case "0":
        argTrendPlatformType = 0;
        break;
    }

    if (argTrendPlatformType !== undefined) {
      query.eq("trend_platform_type", argTrendPlatformType);
    }

    switch (status) {
      case String(STATUS_LIST[1].value):
        query.is("deleted_at", null);
        break;
      case String(STATUS_LIST[2].value):
        query.not("deleted_at", "is", null);
        break;
    }

    const { error, count } = await query;

    if (error || !count) return 0;

    return count;
  } catch (err) {
    throw new Error(`Failed to get feeds count: ${err}`);
  }
};

export const getFeedById = async (id: string) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const { data, error } = await supabase
      .from("feeds")
      .select(
        `
        *,
        categories!inner(*),
        platforms!inner(*),
        feed_article_relations(articles!inner(*))
      `
      )
      .eq("id", id)
      .single();

    if (error || !data) return;

    return convertDatabaseResponseToFeedResponse(data);
  } catch (err) {
    throw new Error(`Failed to get feed by id: ${err}`);
  }
};

type FeedGetDatabaseResponseTypes =
  Database["public"]["Tables"]["feeds"]["Row"] & {
    categories: Database["public"]["Tables"]["categories"]["Row"];
    platforms: Database["public"]["Tables"]["platforms"]["Row"];
    feed_article_relations?: Array<{
      articles: Database["public"]["Tables"]["articles"]["Row"];
    }>;
  };

const convertDatabaseResponseToFeedResponse = (
  feed: FeedGetDatabaseResponseTypes
): FeedType => {
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
    articles:
      feed.feed_article_relations && feed.feed_article_relations.length > 0
        ? feed.feed_article_relations.map((relation) => {
            return {
              id: relation.articles.id,
              platformId: relation.articles.platform_id || undefined,
              title: relation.articles.title,
              description: relation.articles.description,
              articleUrl: relation.articles.article_url,
              thumbnailUrl: relation.articles.thumbnail_url,
              publishedAt: relation.articles.published_at || undefined,
              authorName: relation.articles.author_name || undefined,
              tags: relation.articles.tags || undefined,
              isEng: relation.articles.is_eng,
              isPrivate: relation.articles.is_private,
              createdAt: relation.articles.created_at,
              updatedAt: relation.articles.updated_at,
            };
          })
        : [],
  };
};

/**
 * ==========================================
 * Create
 * ==========================================
 */

export type CreateFeedDTO = {
  platformId: string;
  categoryId: string;
  name: string;
  description: string;
  rssUrl: string;
  siteUrl: string;
  thumbnailUrl: string;
  trendPlatformType: number;
  apiQueryParam?: string;
};

export const createFeed = async ({
  platformId,
  categoryId,
  name,
  description,
  rssUrl,
  siteUrl,
  thumbnailUrl,
  trendPlatformType,
  apiQueryParam,
}: CreateFeedDTO) => {
  try {
    const uuid = uuidv4();
    const supabase = await createGetOnlyServerSideClient();
    const { data, error } = await supabase
      .from("feeds")
      .insert([
        {
          id: uuid,
          platform_id: platformId,
          category_id: categoryId,
          name,
          description,
          rss_url: rssUrl,
          site_url: siteUrl,
          thumbnail_url: thumbnailUrl,
          trend_platform_type: trendPlatformType,
          api_query_param: apiQueryParam,
        },
      ])
      .select();

    if (error || !data) return;

    return data[0].id;
  } catch (err) {
    throw new Error(`Failed to create feed: ${err}`);
  }
};

/**
 * ==========================================
 * Update
 * ==========================================
 */

export type UpdateFeedDTO = {
  id: string;
  platformId: string;
  categoryId: string;
  name: string;
  description: string;
  rssUrl: string;
  siteUrl: string;
  thumbnailUrl: string;
  trendPlatformType: number;
  apiQueryParam?: string;
  deletedAt?: string;
};

export const updateFeed = async ({
  id,
  platformId,
  categoryId,
  name,
  description,
  rssUrl,
  siteUrl,
  thumbnailUrl,
  trendPlatformType,
  apiQueryParam,
  deletedAt,
}: UpdateFeedDTO) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const { error } = await supabase
      .from("feeds")
      .update({
        platform_id: platformId,
        category_id: categoryId,
        name,
        description,
        rss_url: rssUrl,
        site_url: siteUrl,
        thumbnail_url: thumbnailUrl,
        trend_platform_type: trendPlatformType,
        api_query_param: apiQueryParam,
        deleted_at: deletedAt || null,
      })
      .eq("id", id);

    if (error) return;

    return id;
  } catch (err) {
    throw new Error(`Failed to update feed: ${err}`);
  }
};

export const bulkUpdateFeed = async (feeds: Array<UpdateFeedDTO>) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const { data, error } = await supabase
      .from("feeds")
      .upsert(
        feeds.map((feed) => {
          return {
            id: feed.id,
            platform_id: feed.platformId,
            category_id: feed.categoryId,
            name: feed.name,
            description: feed.description,
            rss_url: feed.rssUrl,
            site_url: feed.siteUrl,
            thumbnail_url: feed.thumbnailUrl,
            trend_platform_type: feed.trendPlatformType,
            api_query_param: feed.apiQueryParam,
            deleted_at: feed.deletedAt || null,
          };
        })
      )
      .select();

    if (error || !data) return;

    return data.map((feed) => {
      return {
        id: feed.id,
        platformId: feed.platform_id,
        categoryId: feed.category_id,
        name: feed.name,
        description: feed.description,
        rssUrl: feed.rss_url,
        siteUrl: feed.site_url,
        thumbnailUrl: feed.thumbnail_url,
        trendPlatformType: feed.trend_platform_type,
        apiQueryParam: feed.api_query_param || undefined,
        createdAt: feed.created_at,
        updatedAt: feed.updated_at,
        deletedAt: feed.deleted_at || undefined,
      };
    });
  } catch (err) {
    throw new Error(`Failed to bulk update feed: ${err}`);
  }
};
/**
 * ==========================================
 * Delete
 * ==========================================
 */
export const deleteFeed = async (id: string) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const { error } = await supabase.from("feeds").delete().eq("id", id);

    if (error) return;

    return id;
  } catch (err) {
    throw new Error(`Failed to delete feed: ${err}`);
  }
};
