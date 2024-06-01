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
            *,
            feed_article_relations!inner (
              feeds!inner (
                *,
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
      .eq("articles.is_private", false);

    if (userId) {
      query.eq("articles.bookmarks.user_id", userId);
      query.eq("articles.favorite_articles.user_id", userId);
    } else {
      query.is("articles.bookmarks.user_id", null);
      query.is("articles.favorite_articles.user_id", null);
    }

    if (keyword) {
      query.or(
        `articles.title.ilike.%${keyword}%,articles.description.ilike.%${keyword}%,articles.tags.ilike.%${keyword}%`
      );
    }

    if (platformIdList.length) {
      query.in("platforms.id", platformIdList);
    }

    const { data, error } = await query
      .gte("updated_at", startTime)
      .lte("updated_at", endTime)
      .order("like_count", { ascending: false })
      .order("updated_at", { ascending: false })
      .range((offset - 1) * LIMIT, offset * LIMIT - 1);

    if (error) return [];

    const trendArticleList: Array<TrendArticleType> = data.map(
      (trendArticle) => {
        const isBookmarked = !!trendArticle.articles.bookmarks.length;

        let bookmarkId: string | undefined = "";
        if (trendArticle.articles.bookmarks.length > 0) {
          bookmarkId = trendArticle.articles.bookmarks[0].id;
        }

        return {
          id: trendArticle.id,
          articleId: trendArticle.article_id,
          platformId: trendArticle.platform_id,
          likeCount: trendArticle.like_count,
          createdAt: trendArticle.created_at,
          updatedAt: trendArticle.updated_at,
          article: {
            id: trendArticle.articles.id,
            platformId: trendArticle.articles.platform_id || "",
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
            createdAt: trendArticle.platforms?.created_at || "",
            updatedAt: trendArticle.platforms?.updated_at || "",
          },
          feeds: trendArticle.articles.feed_article_relations.map((far) => {
            return {
              id: far.feeds.id,
              platformId: far.feeds.platform_id,
              categoryId: far.feeds.category_id,
              name: far.feeds.name,
              description: far.feeds.description,
              thumbnailUrl: far.feeds.thumbnail_url,
              siteUrl: far.feeds.site_url,
              rssUrl: far.feeds.rss_url,
              apiQueryParam: far.feeds.api_query_param || undefined,
              trendPlatformType: far.feeds.trend_platform_type,
              createdAt: far.feeds.created_at,
              updatedAt: far.feeds.updated_at,
              category: {
                id: far.feeds.categories.id,
                name: far.feeds.categories.name,
                type: far.feeds.categories.type,
                createdAt: far.feeds.categories.created_at,
                updatedAt: far.feeds.categories.updated_at,
              },
            };
          }),
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
      }
    );
    return trendArticleList;
  } catch (err) {
    throw new Error(`Failed to fetch articles: ${err}`);
  }
};
