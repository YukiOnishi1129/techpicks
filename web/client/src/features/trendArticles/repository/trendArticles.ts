"use server";

import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

import { ArticleTabType } from "@/types/article";
import { LanguageStatus } from "@/types/language";
import { TrendArticleType } from "@/types/trendArticle";

const LIMIT = 20;

export type GetTrendArticlesParams = {
  userId?: string;
  platformId?: string;
  keyword?: string;
  languageStatus?: LanguageStatus;
  platformIdList: Array<string>;
  tab: ArticleTabType;
  offset?: number;
  sort?: "asc" | "desc";
  sortColum?: string;
  startTime: string;
  endTime: string;
};

export const getTrendArticles = async ({
  userId,
  keyword,
  languageStatus = 1,
  platformIdList,
  offset = 1,
  sort = "desc",
  sortColum = "publishedAt",
  startTime,
  endTime,
}: GetTrendArticlesParams): Promise<TrendArticleType[]> => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase
      .from("trend_articles")
      .select(
        `
          *,
          platforms (
            *
          ),
          articles!inner (
            id,
            title,
            description,
            article_url,
            published_at,
            author_name,
            tags,
            thumbnail_url,
            is_eng,
            is_private,
            created_at,
            updated_at,
            feed_article_relations!inner (
              feeds!inner (
                id,
                name,
                description,
                thumbnail_url,
                site_url,
                api_query_param,
                trend_platform_type,
                categories!inner (
                  *
                )
              )
            ),
            bookmarks (
              id,
              user_id
            ),
            favorite_articles (
              *
            )
          )
          `
      )
      .eq("articles.is_eng", languageStatus === 2)
      .eq("articles.is_private", false)
      .eq("articles.bookmarks.user_id", userId || "")
      .eq("articles.favorite_articles.user_id", userId || "");

    if (keyword) {
      query.or(`articles.title.ilike.*${keyword}*`);
      query.or(`articles.description.ilike.*${keyword}*`);
      query.or(`articles.tags.ilike.*${keyword}*`);
    }

    if (platformIdList.length) {
      query.in("platforms.id", platformIdList);
    }

    const { data, error } = await query
      .gte("updated_at", startTime)
      .lte("updated_at", endTime)
      .order("like_count", { ascending: false })
      .order("updated_at", { ascending: false })
      .range((offset - 1) * LIMIT + 1, offset * LIMIT);

    if (error) return [];

    const trendArticleList: Array<TrendArticleType> = data.map(
      (trendArticle) => {
        const isBookmarked = !!trendArticle.articles.bookmarks.length;

        let bookmarkId: string | undefined = "";
        if (trendArticle.articles.bookmarks.length > 0) {
          bookmarkId = trendArticle.articles.bookmarks[0].id;
        }

        const resTrendArticle: TrendArticleType = {
          id: trendArticle.id,
          articleId: trendArticle.article_id,
          likeCount: trendArticle.like_count,
          createdAt: trendArticle.created_at,
          updatedAt: trendArticle.updated_at,
          article: {
            id: trendArticle.articles.id,
            title: trendArticle.articles.title,
            description: trendArticle.articles.description,
            articleUrl: trendArticle.articles.article_url,
            publishedAt: trendArticle.articles.published_at || undefined,
            authorName: trendArticle.articles.author_name || undefined,
            tags: trendArticle.articles.tags || undefined,
            thumbnailUrl: trendArticle.articles.thumbnail_url,
            isEng: trendArticle.articles.is_eng,
            isPrivate: trendArticle.articles.is_private,
            createdAt: trendArticle.articles.created_at,
            updatedAt: trendArticle.articles.updated_at,
          },
          platform: {
            id: trendArticle.platforms?.id || "",
            name: trendArticle.platforms?.name || "",
            siteUrl: trendArticle.platforms?.site_url || "",
            faviconUrl: trendArticle.platforms?.favicon_url || "",
            platformSiteType: trendArticle.platforms?.platform_site_type || 0,
            isEng: trendArticle.platforms?.is_eng || false,
          },
          feeds: trendArticle.articles.feed_article_relations.map(
            (feedArticleRelatoins) => {
              return {
                id: feedArticleRelatoins.feeds.id,
                name: feedArticleRelatoins.feeds.name,
                description: feedArticleRelatoins.feeds.description,
                thumbnailUrl: feedArticleRelatoins.feeds.thumbnail_url,
                siteUrl: feedArticleRelatoins.feeds.site_url,
                apiQueryParam:
                  feedArticleRelatoins.feeds.api_query_param || undefined,
                trendPlatformType:
                  feedArticleRelatoins.feeds.trend_platform_type,
                category: {
                  id: feedArticleRelatoins.feeds.categories.id,
                  name: feedArticleRelatoins.feeds.categories.name,
                  type: feedArticleRelatoins.feeds.categories.type,
                  createdAt: feedArticleRelatoins.feeds.categories.created_at,
                  updatedAt: feedArticleRelatoins.feeds.categories.updated_at,
                },
              };
            }
          ),
          isBookmarked: isBookmarked,
          bookmarkId: bookmarkId,
          favoriteArticles: trendArticle.articles.favorite_articles.map(
            (favorite) => {
              return {
                id: favorite.id,
                favoriteArticleFolderId: favorite.favorite_article_folder_id,
                articleId: favorite.article_id,
                platformId: favorite.platform_id || undefined,
                userId: favorite.user_id,
                title: favorite.title,
                description: favorite.description,
                thumbnailUrl: favorite.thumbnail_url,
                articleUrl: favorite.article_url,
                platformFaviconUrl: favorite.platform_favicon_url,
                publishedAt: favorite.published_at || undefined,
                authorName: favorite.author_name || undefined,
                tags: favorite.tags || undefined,
                platformName: favorite.platform_name,
                platformUrl: favorite.platform_url,
                isEng: favorite.is_eng,
                isPrivate: favorite.is_private,
                isRead: favorite.is_read,
                createdAt: favorite.created_at,
                updatedAt: favorite.updated_at,
              };
            }
          ),
          isFollowing: trendArticle.articles.favorite_articles.length > 0,
        };

        return resTrendArticle;
      }
    );
    return trendArticleList;
  } catch (err) {
    throw new Error(`Failed to fetch articles: ${err}`);
  }
};
