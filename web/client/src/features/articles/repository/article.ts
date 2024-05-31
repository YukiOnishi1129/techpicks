"use server";
// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import { createGetOnlyServerSideClient } from "@/lib/supabase/client/serverClient";

import { ArticleTabType, ArticleType } from "@/types/article";
import { Database } from "@/types/database.types";
import { LanguageStatus } from "@/types/language";

const LIMIT = 20;

export type GetArticleParams = {
  userId?: string;
  platformId?: string;
  keyword?: string;
  languageStatus?: LanguageStatus;
  platformIdList: Array<string>;
  tab: ArticleTabType;
  offset?: number;
  sort?: "asc" | "desc";
  sortColum?: string;
};

export const getArticles = async ({
  userId,
  keyword,
  languageStatus = 1,
  platformIdList,
  tab,
  offset = 1,
}: GetArticleParams): Promise<Array<ArticleType>> => {
  try {
    const supabase = await createGetOnlyServerSideClient();

    const query = supabase
      .from("articles")
      .select(
        `
        *,
        platforms!fk_article_platform_id!inner (
          *
        ),
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
      `
      )
      .eq("is_private", false);

    if (userId) {
      query.eq("bookmarks.user_id", userId);
      query.eq("favorite_articles.user_id", userId);
    } else {
      query.is("bookmarks.user_id", null);
      query.is("favorite_articles.user_id", null);
    }

    if (languageStatus) {
      query.eq("is_eng", languageStatus === 2);
    }

    switch (tab) {
      case "trend":
        query.eq("feed_article_relations.feeds.trend_platform_type", 0);
        break;
      case "site":
        query.eq("platforms.platform_site_type", 1);
        break;
      case "company":
        query.eq("platforms.platform_site_type", 2);
        break;
      case "summary":
        query.eq("platforms.platform_site_type", 3);
        break;
    }

    if (keyword) {
      query.or(
        `title.ilike.%${keyword}%,description.ilike.%${keyword}%,tags.ilike.%${keyword}%`
      );
    }

    if (platformIdList.length) {
      query.in("platform_id", platformIdList);
    }

    const { data, error } = await query
      .order("published_at", { ascending: false })
      .range((offset - 1) * LIMIT + 1, offset * LIMIT);

    if (error) return [];

    const articleList: Array<ArticleType> = data.map((article) => {
      return convertDatabaseResponseToArticleResponse(article);
    });

    return articleList;
  } catch (err) {
    throw new Error(`Failed to fetch articles: ${err}`);
  }
};

export type GetArticleByFeedIdsParams = {
  userId?: string;
  feedIds: Array<string>;
  keyword?: string;
  offset?: number;
};

export const getArticlesByFeedIds = async ({
  userId,
  feedIds,
  keyword,
  offset = 1,
}: GetArticleByFeedIdsParams) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase
      .from("feed_article_relations")
      .select(
        `
        *,
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
          platforms!fk_article_platform_id!inner (
            *
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
      .eq("articles.is_private", false);

    if (userId) {
      query.eq("articles.bookmarks.user_id", userId);
      query.eq("articles.favorite_articles.user_id", userId);
    } else {
      query.is("articles.bookmarks.user_id", null);
      query.is("articles.favorite_articles.user_id", null);
    }

    if (feedIds.length) {
      query.in("feed_id", feedIds);
    }

    if (keyword) {
      query.or(
        `articles.title.ilike.%${keyword}%,articles.description.ilike.%${keyword}%,articles.tags.ilike.%${keyword}%`
      );
    }

    const { data, error } = await query
      .order("articles(published_at)", { ascending: false })
      .range((offset - 1) * LIMIT + 1, offset * LIMIT);

    if (error) return [];

    const articles = data.map((feedArticle) => feedArticle.articles);
    const articleList: Array<ArticleType> = articles.map((article) => {
      return convertDatabaseResponseToArticleResponse(article);
    });
    return articleList;
  } catch (err) {
    throw new Error(`Failed to fetch articles: ${err}`);
  }
};

type GetPrivateArticlesByArticleUrlDTO = {
  articleUrl: string;
};

export const getPrivateArticlesByArticleUrl = async ({
  articleUrl,
}: GetPrivateArticlesByArticleUrlDTO) => {
  try {
    const supabase = await createGetOnlyServerSideClient();

    const query = supabase
      .from("articles")
      .select("*")
      .eq("article_url", articleUrl)
      .eq("is_private", true);

    const { data, error } = await query;

    if (error) return [];

    const articleList: Array<ArticleType> = data.map((article) => {
      return {
        id: article.id,
        title: article.title,
        description: article.description,
        thumbnailUrl: article.thumbnail_url,
        articleUrl: article.article_url,
        publishedAt: article.published_at || undefined,
        authorName: article.author_name || undefined,
        tags: article.tags || undefined,
        isEng: article.is_eng,
        isPrivate: article.is_private,
        createdAt: article.created_at,
        updatedAt: article.updated_at,
        feeds: [],
        isBookmarked: false,
      };
    });

    return articleList;
  } catch (err) {
    throw new Error(`Failed to fetch articles: ${err}`);
  }
};

type GetArticleByIdParam = {
  id: string;
  userId?: string;
};

export const getArticleById = async ({ id, userId }: GetArticleByIdParam) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase
      .from("articles")
      .select(
        `
        *,
        feed_article_relations!inner (
          feeds!inner (
            *,
            categories!inner (
              *
            )
          )
        ),
        platforms!fk_article_platform_id!inner (
          *
        ),
        bookmarks (
          id,
          user_id
        ),
        favorite_articles (
          *
        )
      `
      )
      .eq("id", id);

    if (userId) {
      query.eq("bookmarks.user_id", userId);
      query.eq("favorite_articles.user_id", userId);
    } else {
      query.is("bookmarks.user_id", null);
      query.is("favorite_articles.user_id", null);
    }

    const { data, error } = await query.single();
    if (error || !data) return;

    return convertDatabaseResponseToArticleResponse(data);
  } catch (err) {
    throw new Error(`Failed to fetch article: ${err}`);
  }
};

export const getPrivateArticlesById = async (id: string) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase
      .from("articles")
      .select(
        `
          *,
          bookmarks (
            id
          ),
          favorite_articles (
            *
          )
        `
      )
      .eq("id", id)
      .eq("is_private", true);

    const { data, error } = await query.single();

    if (error || !data) return;

    const resArticle: ArticleType = {
      id: data.id,
      title: data.title,
      description: data.description,
      thumbnailUrl: data.thumbnail_url,
      articleUrl: data.article_url,
      publishedAt: data.published_at || undefined,
      authorName: data.author_name || undefined,
      tags: data.tags || undefined,
      isEng: data.is_eng,
      isPrivate: data.is_private,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      feeds: [],
      isBookmarked: data.bookmarks.length > 0,
      bookmarkId: data.bookmarks.length > 0 ? data.bookmarks[0].id : undefined,
      isFollowing: data.favorite_articles.length > 0,
      favoriteArticles: data.favorite_articles.map((favorite) => {
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
      }),
    };
    return resArticle;
  } catch (err) {
    throw new Error(`Failed to fetch articles: ${err}`);
  }
};

type GetArticleByArticleUrlParam = {
  articleUrl: string;
  platformUrl: string;
  userId?: string;
};

export const getArticleByArticleAndPlatformUrl = async ({
  articleUrl,
  platformUrl,
  userId,
}: GetArticleByArticleUrlParam) => {
  try {
    const supabase = await createGetOnlyServerSideClient();
    const query = supabase
      .from("articles")
      .select(
        `
          *,
          feed_article_relations!inner (
            feeds!inner (
              *,
              categories!inner (
                *
              )
            )
          ),
          platforms!fk_article_platform_id!inner (
            *
          ),
          bookmarks (
            id,
            user_id
          ),
          favorite_articles (
            *
          )
        `
      )
      .eq("article_url", articleUrl)
      .eq("platform.site_url", platformUrl);

    if (userId) {
      query.eq("bookmarks.user_id", userId);
      query.eq("favorite_articles.user_id", userId);
    } else {
      query.is("bookmarks.user_id", null);
      query.is("favorite_articles.user_id", null);
    }

    const { data, error } = await query.single();
    if (error || !data) return;

    return convertDatabaseResponseToArticleResponse(data);
  } catch (err) {
    throw new Error(`Failed to fetch article: ${err}`);
  }
};

type ArticleGetDatabaseResponseType =
  Database["public"]["Tables"]["articles"]["Row"] & {
    feed_article_relations: Array<{
      feeds: Database["public"]["Tables"]["feeds"]["Row"] & {
        categories: Database["public"]["Tables"]["categories"]["Row"];
      };
    }>;
    platforms: Database["public"]["Tables"]["platforms"]["Row"] | null;
    bookmarks: Array<
      Pick<Database["public"]["Tables"]["bookmarks"]["Row"], "id" | "user_id">
    >;
    favorite_articles: Array<
      Database["public"]["Tables"]["favorite_articles"]["Row"]
    >;
  };

const convertDatabaseResponseToArticleResponse = (
  article: ArticleGetDatabaseResponseType
): ArticleType => {
  const isBookmarked = article.bookmarks.length > 0;
  const resArticle: ArticleType = {
    id: article.id,
    title: article.title,
    description: article.description,
    thumbnailUrl: article.thumbnail_url,
    articleUrl: article.article_url,
    publishedAt: article.published_at || undefined,
    authorName: article.author_name || undefined,
    tags: article.tags || undefined,
    isEng: article.is_eng,
    isPrivate: article.is_private,
    createdAt: article.created_at,
    updatedAt: article.updated_at,
    isBookmarked: isBookmarked,
    bookmarkId: isBookmarked ? article.bookmarks[0].id : undefined,
    feeds: article.feed_article_relations.map((far) => {
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
    isFollowing: article.favorite_articles.length > 0,
    favoriteArticles: article.favorite_articles.map((favorite) => {
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
    }),
  };
  if (article.platforms) {
    resArticle.platform = {
      id: article.platforms.id,
      name: article.platforms.name,
      platformSiteType: article.platforms.platform_site_type,
      siteUrl: article.platforms.site_url,
      faviconUrl: article.platforms.favicon_url,
      isEng: article.platforms.is_eng,
      createdAt: article.platforms.created_at,
      updatedAt: article.platforms.updated_at,
    };
  }
  return resArticle;
};

/**
 * ==========================================
 * Create
 * ==========================================
 */

type CreateArticleDTO = {
  platformId?: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  articleUrl: string;
  publishedAt?: string;
  authorName?: string;
  tags?: string;
  isEng: boolean;
  isPrivate: boolean;
};

export const createArticle = async (dto: CreateArticleDTO) => {
  try {
    const uuid = uuidv4();

    const supabase = await createGetOnlyServerSideClient();
    const { data, error } = await supabase
      .from("articles")
      .insert({
        id: uuid,
        platform_id: dto.platformId,
        title: dto.title,
        description: dto.description,
        thumbnail_url: dto.thumbnailUrl,
        article_url: dto.articleUrl,
        published_at: dto.publishedAt,
        author_name: dto.authorName,
        tags: dto.tags,
        is_eng: dto.isEng,
        is_private: dto.isPrivate,
      })
      .select();

    if (error || !data) return;

    return data[0].id;
  } catch (err) {
    throw new Error(`Failed to create article: ${err}`);
  }
};
