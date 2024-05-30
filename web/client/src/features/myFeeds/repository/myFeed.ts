"use server";
// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

import { Database } from "@/types/database.types";
import { MyFeedType } from "@/types/myFeed";

type GetMyFeedById = {
  id: string;
  userId: string;
};

export const getMyFeedById = async ({ id, userId }: GetMyFeedById) => {
  try {
    const supabase = await createGetOnlyServerSideClient();

    const query = supabase
      .from("my_feeds")
      .select(
        `
          *,
          feeds!inner (
            *
          ),
          my_feed_folders!inner (
            *
          )
        `
      )
      .eq("id", id)
      .eq("user_id", userId);

    const { data, error } = await query.single();

    if (error || !data) return;

    return convertDatabaseResponseToMyFeedResponse(data);
  } catch (err) {
    throw new Error(`Failed to get my feed: ${err}`);
  }
};

type GetMyFeedsByMyFeedFolderId = {
  myFeedFolderId: string;
  userId: string;
};

export const getMyFeedsByMyFeedFolderId = async ({
  myFeedFolderId,
  userId,
}: GetMyFeedsByMyFeedFolderId) => {
  try {
    const supabase = await createGetOnlyServerSideClient();

    const query = supabase
      .from("my_feeds")
      .select(
        `
          *,
          feeds!inner (
            *
          ),
          my_feed_folders!inner (
            *
          ),
          feed_article_relations!inner(articles!inner(*))
        `
      )
      .eq("my_feed_folder_id", myFeedFolderId)
      .eq("user_id", userId);

    const { data, error } = await query;

    if (error || !data) return [];

    return data.map((myFeed) => {
      convertDatabaseResponseToMyFeedResponse(myFeed);
    });
  } catch (err) {
    throw new Error(`Failed to get my feeds: ${err}`);
  }
};

export const getMyFeedCountByMyFeedFolderIdAndFeedId = async ({
  feedId,
  myFeedFolderId,
  userId,
}: {
  feedId: string;
  myFeedFolderId: string;
  userId: string;
}) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase
      .from("my_feeds")
      .select("*", { count: "exact" })
      .eq("feed_id", feedId)
      .eq("my_feed_folder_id", myFeedFolderId)
      .eq("user_id", userId);

    const { error, count } = await query;

    if (error || !count) return 0;

    return count;
  } catch (err) {
    throw new Error(`Failed to get my feed count: ${err}`);
  }
};

type MyFeedGetDatabaseResponseType =
  Database["public"]["Tables"]["my_feeds"]["Row"] & {
    feeds: Database["public"]["Tables"]["feeds"]["Row"];
    my_feed_folders: Database["public"]["Tables"]["my_feed_folders"]["Row"];
    feed_article_relations?: Array<{
      articles: Database["public"]["Tables"]["articles"]["Row"];
    }>;
  };

const convertDatabaseResponseToMyFeedResponse = (
  myFeeds: MyFeedGetDatabaseResponseType
): MyFeedType => {
  return {
    id: myFeeds.id,
    userId: myFeeds.user_id,
    myFeedFolderId: myFeeds.my_feed_folder_id,
    feedId: myFeeds.feed_id,
    createdAt: myFeeds.created_at,
    updatedAt: myFeeds.updated_at,
    feed: {
      id: myFeeds.feeds.id,
      name: myFeeds.feeds.name,
      description: myFeeds.feeds.description,
      thumbnailUrl: myFeeds.feeds.thumbnail_url,
      platformId: myFeeds.feeds.platform_id,
      categoryId: myFeeds.feeds.category_id,
      siteUrl: myFeeds.feeds.site_url,
      rssUrl: myFeeds.feeds.rss_url,
      apiQueryParam: myFeeds.feeds.api_query_param || undefined,
      trendPlatformType: myFeeds.feeds.trend_platform_type,
      createdAt: myFeeds.feeds.created_at,
      updatedAt: myFeeds.feeds.updated_at,
    },
    myFeedFolder: {
      id: myFeeds.my_feed_folders.id,
      user_id: myFeeds.my_feed_folders.user_id,
      title: myFeeds.my_feed_folders.title,
      description: myFeeds.my_feed_folders.description || undefined,
      createdAt: myFeeds.my_feed_folders.created_at,
      updatedAt: myFeeds.my_feed_folders.updated_at,
    },
    articles: myFeeds.feed_article_relations
      ? myFeeds.feed_article_relations.map((feedArticle) => {
          return {
            id: feedArticle.articles.id,
            platformId: feedArticle.articles.platform_id || undefined,
            title: feedArticle.articles.title,
            description: feedArticle.articles.description,
            thumbnailUrl: feedArticle.articles.thumbnail_url,
            articleUrl: feedArticle.articles.article_url,
            publishedAt: feedArticle.articles.published_at || undefined,
            authorName: feedArticle.articles.author_name || undefined,
            tags: feedArticle.articles.tags || undefined,
            isEng: feedArticle.articles.is_eng,
            isPrivate: feedArticle.articles.is_private,
            createdAt: feedArticle.articles.created_at,
            updatedAt: feedArticle.articles.updated_at,
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

export type CreateMyFeedDTO = {
  userId: string;
  myFeedFolderId: string;
  feedId: string;
};

export const createMyFeed = async (dto: CreateMyFeedDTO) => {
  try {
    const uuid = uuidv4();
    const supabase = await createGetOnlyServerSideClient();

    const { data, error } = await supabase
      .from("my_feeds")
      .insert({
        id: uuid,
        user_id: dto.userId,
        my_feed_folder_id: dto.myFeedFolderId,
        feed_id: dto.feedId,
      })
      .select();

    if (error || !data) return;

    return {
      id: data[0].id,
      userId: data[0].user_id,
      myFeedFolderId: data[0].my_feed_folder_id,
      feedId: data[0].feed_id,
      createdAt: data[0].created_at,
      updatedAt: data[0].updated_at,
    };
  } catch (err) {
    throw new Error(`Failed to create my feed list: ${err}`);
  }
};

export const bulkCreateMyFeed = async (myFeedList: CreateMyFeedDTO[]) => {
  try {
    const supabase = await createGetOnlyServerSideClient();

    const { data, error } = await supabase
      .from("my_feeds")
      .insert(
        myFeedList.map((myFeed) => {
          return {
            id: uuidv4(),
            user_id: myFeed.userId,
            my_feed_folder_id: myFeed.myFeedFolderId,
            feed_id: myFeed.feedId,
          };
        })
      )
      .select();

    if (error || !data) return [];

    return data.map((myFeed) => {
      return {
        id: myFeed.id,
        userId: myFeed.user_id,
        myFeedFolderId: myFeed.my_feed_folder_id,
        feedId: myFeed.feed_id,
        createdAt: myFeed.created_at,
        updatedAt: myFeed.updated_at,
      };
    });
  } catch (err) {
    throw new Error(`Failed to bulk create my feed list: ${err}`);
  }
};

/**
 * ==========================================
 * Delete
 * ==========================================
 */

type deleteMyFeedDTO = {
  id: string;
  userId: string;
};

export const deleteMyFeed = async ({ id, userId }: deleteMyFeedDTO) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const { error } = await supabase
      .from("my_feeds")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) return;
    return id;
  } catch (err) {
    throw new Error(`Failed to delete my feed: ${err}`);
  }
};

export const bulkDeleteMyFeed = async (myFeedIds: string[]) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const { error } = await supabase
      .from("my_feeds")
      .delete()
      .in("id", myFeedIds);

    if (error) return 0;

    return myFeedIds.length;
  } catch (err) {
    throw new Error(`Failed to bulk delete my feed: ${err}`);
  }
};
