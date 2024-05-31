"use server";

import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

import { Database } from "@/types/database.types";
import { FeedType } from "@/types/feed";

const LIMIT = 20;

export type GetFeedParams = {
  userId?: string;
  offset?: number;
  keyword?: string;
};

export const getFeed = async ({
  userId,
  offset = 1,
  keyword,
}: GetFeedParams) => {
  try {
    const supabase = await createGetOnlyServerSideClient();

    const query = supabase
      .from("feeds")
      .select(
        `
          *,
          categories!inner(*),
          platforms!inner(*),
          my_feeds(*),
          feed_article_relations(articles!inner(*))
        `
      )
      .is("deleted_at", null)
      .eq("my_feeds.user_id", userId || "null");

    if (keyword) {
      query.or(`name.ilike.%${keyword}%,description.ilike.%${keyword}%`);
    }

    const { data, error } = await query
      .order("platforms(platform_site_type)", {
        ascending: true,
      })
      .order("platforms(is_eng)", {
        ascending: false,
      })
      .order("platforms(name)", {
        ascending: true,
      })
      .order("name", {
        ascending: true,
      })
      .order("categories(type)", {
        ascending: true,
      })
      .order("categories(name)", {
        ascending: true,
      })
      .range((offset - 1) * LIMIT, offset * LIMIT);

    if (error || !data) return [];

    return data.map((feed) => convertDatabaseResponseToFeedResponse(feed));
  } catch (err) {
    throw new Error("Failed to get feed");
  }
};

export type GetAllFeedType = {
  userId?: string;
};

export const getAllFeed = async ({ userId }: GetAllFeedType) => {
  try {
    const supabase = await createGetOnlyServerSideClient();

    const query = supabase
      .from("feeds")
      .select(
        `
          *,
          categories!inner(*),
          platforms!inner(*),
          my_feeds(*),
          feed_article_relations!inner(articles!inner(*))
        `
      )
      .is("deleted_at", null)
      .order("platforms(platform_site_type)", {
        ascending: true,
      })
      .order("platforms(is_eng)", {
        ascending: false,
      })
      .order("platforms(name)", {
        ascending: true,
      })
      .order("name", {
        ascending: true,
      })
      .order("categories(type)", {
        ascending: true,
      })
      .order("categories(name)", {
        ascending: true,
      });

    if (userId) {
      query.eq("my_feeds.user_id", userId);
    } else {
      query.is("my_feeds.user_id", null);
    }

    const { data, error } = await query;
    if (error || !data) return [];

    return data.map((feed) => convertDatabaseResponseToFeedResponse(feed));
  } catch (err) {
    throw new Error("Failed to get feed");
  }
};

type GetFeedByIdDTO = {
  id: string;
  userId?: string;
};

export const getFeedById = async ({ id, userId }: GetFeedByIdDTO) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase
      .from("feeds")
      .select(
        `
          *,
          categories!inner(*),
          platforms!inner(*),
          my_feeds(*),
          feed_article_relations!inner(articles!inner(*))
        `
      )
      .eq("id", id);

    if (userId) {
      query.eq("my_feeds.user_id", userId);
    } else {
      query.is("my_feeds.user_id", null);
    }

    const { data, error } = await query.single();

    if (error || !data) return;

    return convertDatabaseResponseToFeedResponse(data);
  } catch (err) {
    throw new Error(`Failed to get feed by id: ${err}`);
  }
};

type FeedGetDatabaseResponseType =
  Database["public"]["Tables"]["feeds"]["Row"] & {
    categories: Database["public"]["Tables"]["categories"]["Row"];
    platforms: Database["public"]["Tables"]["platforms"]["Row"];
    my_feeds: Array<Database["public"]["Tables"]["my_feeds"]["Row"]>;
    feed_article_relations: Array<{
      articles: Database["public"]["Tables"]["articles"]["Row"];
    }>;
  };

const convertDatabaseResponseToFeedResponse = (
  feed: FeedGetDatabaseResponseType
): FeedType => {
  return {
    id: feed.id,
    platformId: feed.platform_id,
    categoryId: feed.category_id,
    name: feed.name,
    description: feed.description,
    thumbnailUrl: feed.thumbnail_url,
    siteUrl: feed.site_url,
    rssUrl: feed.rss_url,
    apiQueryParam: feed.api_query_param || undefined,
    trendPlatformType: feed.trend_platform_type,
    createdAt: feed.created_at,
    updatedAt: feed.updated_at,
    category: {
      id: feed.categories.id,
      type: feed.categories.type,
      name: feed.categories.name,
      createdAt: feed.categories.created_at,
      updatedAt: feed.categories.updated_at,
    },
    platform: {
      id: feed.platforms.id,
      name: feed.platforms.name,
      siteUrl: feed.platforms.site_url,
      faviconUrl: feed.platforms.favicon_url,
      platformSiteType: feed.platforms.platform_site_type,
      isEng: feed.platforms.is_eng,
      createdAt: feed.platforms.created_at,
      updatedAt: feed.platforms.updated_at,
    },
    isFollowing: feed.my_feeds.length > 0,
    myFeeds: feed.my_feeds.map((myFeed) => {
      return {
        id: myFeed.id,
        userId: myFeed.user_id,
        feedId: myFeed.feed_id,
        myFeedFolderId: myFeed.my_feed_folder_id,
        createdAt: myFeed.created_at,
        updatedAt: myFeed.updated_at,
      };
    }),
    articles: feed.feed_article_relations.map((far) => {
      return {
        id: far.articles.id,
        title: far.articles.title,
        description: far.articles.description,
        articleUrl: far.articles.article_url,
        publishedAt: far.articles.published_at || undefined,
        thumbnailUrl: far.articles.thumbnail_url,
        authorName: far.articles.author_name || undefined,
        tags: far.articles.tags || undefined,
        isEng: far.articles.is_eng,
        isPrivate: far.articles.is_private,
        createdAt: far.articles.created_at,
        updatedAt: far.articles.updated_at,
      };
    }),
  };
};
