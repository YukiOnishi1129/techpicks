"use server";

import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

import { ArticleType } from "@/types/article";

export type GetFeedArticleRelationsDTO = {
  offset?: number;
  keyword?: string;
  language?: string;
  feedId?: string;
};

export const getFeedArticleRelationsToArticles = async ({
  offset = 1,
  keyword,
  language,
  feedId,
}: GetFeedArticleRelationsDTO): Promise<Array<ArticleType>> => {
  try {
    const limit = 8;
    const supabase = await createGetOnlyServerSideClient();

    const query = supabase.from("feed_article_relations").select(
      `
        *,
        articles!inner(
            *,
            platforms!fk_article_platform_id!inner(
                *
            ),
            feed_article_relations(
                feeds!inner(
                    *,
                    categories!inner(
                        *
                    )
                )
            )
        )
      `
    );

    if (keyword) {
      query.like("articles.title", `%${keyword}%`);
    }

    if (language) {
      query.eq("articles.is_eng", language === "2");
    }

    if (feedId) {
      query.eq("feed_id", feedId);
    }
    const { data, error } = await query
      .order("created_at", {
        ascending: false,
      })
      .range((offset - 1) * limit, offset * limit - 1);
    if (error || !data) return [];

    return data.map((relation) => {
      return {
        id: relation.articles.id,
        platformId: relation.articles.platform_id || undefined,
        title: relation.articles.title,
        description: relation.articles.description,
        articleUrl: relation.articles.article_url,
        publishedAt: relation.articles.published_at || undefined,
        thumbnailUrl: relation.articles.thumbnail_url,
        authorName: relation.articles.author_name || undefined,
        tags: relation.articles.tags || undefined,
        isEng: relation.articles.is_eng,
        isPrivate: relation.articles.is_private,
        createdAt: relation.articles.created_at,
        updatedAt: relation.articles.updated_at,
        platform: {
          id: relation.articles.platforms.id,
          name: relation.articles.platforms.name,
          siteUrl: relation.articles.platforms.site_url,
          faviconUrl: relation.articles.platforms.favicon_url,
          isEng: relation.articles.platforms.is_eng,
          platformSiteType: relation.articles.platforms.platform_site_type,
          createdAt: relation.articles.platforms.created_at,
          updatedAt: relation.articles.platforms.updated_at,
          deletedAt: relation.articles.platforms?.deleted_at || undefined,
        },
        feeds: relation.articles.feed_article_relations.map((relation) => {
          return {
            id: relation.feeds.id,
            platformId: relation.feeds.platform_id,
            categoryId: relation.feeds.category_id,
            name: relation.feeds.name,
            description: relation.feeds.description,
            rssUrl: relation.feeds.rss_url,
            siteUrl: relation.feeds.site_url,
            thumbnailUrl: relation.feeds.thumbnail_url,
            trendPlatformType: relation.feeds.trend_platform_type,
            apiQueryParam: relation.feeds.api_query_param || undefined,
            createdAt: relation.feeds.created_at,
            updatedAt: relation.feeds.updated_at,
            deletedAt: relation.feeds?.deleted_at || undefined,
            category: {
              id: relation.feeds.categories.id,
              name: relation.feeds.categories.name,
              type: relation.feeds.categories.type,
              createdAt: relation.feeds.categories.created_at,
              updatedAt: relation.feeds.categories.updated_at,
              deletedAt: relation.feeds.categories?.deleted_at || undefined,
            },
          };
        }),
      };
    });
  } catch (error) {
    throw new Error(`Failed to get feed article relations: ${error}`);
  }
};
