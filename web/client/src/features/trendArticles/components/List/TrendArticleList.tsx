"use client";
import { User } from "@supabase/supabase-js";
import { useCallback, useRef, useState, useEffect } from "react";

import { ArticleCardWrapper } from "@/features/articles/components/Card";

import { NotFoundList } from "@/components/layout/NotFoundList";
import { Loader } from "@/components/ui/loader";

import { ArticleTabType, ArticleType } from "@/types/article";
import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";
import { LanguageStatus } from "@/types/language";
import { TrendArticleType } from "@/types/trendArticle";

import { FetchTrendArticlesAPIResponse } from "../../actions/trendArticles";

type Props = {
  user?: User;
  initialTrendArticles: Array<TrendArticleType>;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
  languageStatus: LanguageStatus;
  keyword?: string;
  feedIdList: Array<string>;
  tab: ArticleTabType;
  fetchTrendArticles: ({
    languageStatus,
    keyword,
    offset,
    feedIdList,
  }: {
    languageStatus: string;
    keyword?: string;
    offset: string;
    feedIdList: Array<string>;
    tab: ArticleTabType;
  }) => Promise<FetchTrendArticlesAPIResponse>;
};

export function TrendArticleList({
  user,
  initialTrendArticles,
  favoriteArticleFolders,
  languageStatus,
  keyword,
  feedIdList,
  tab,
  fetchTrendArticles,
}: Props) {
  const observerTarget = useRef(null);

  const [trendArticles, setTrendArticles] =
    useState<TrendArticleType[]>(initialTrendArticles);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);

  const flatTrendArticles = trendArticles
    ? trendArticles.flatMap((article) => article)
    : [];

  const loadMore = useCallback(
    async (offset: number) => {
      const res = await fetchTrendArticles({
        offset: offset.toString(),
        keyword: keyword,
        languageStatus: languageStatus.toString(),
        feedIdList: feedIdList,
        tab: tab,
      });
      setTrendArticles((prev) => [...prev, ...res.data.trendArticles]);

      const count = res.data.trendArticles.length;
      setHashMore(count > 0);
    },
    [fetchTrendArticles, languageStatus, keyword, feedIdList, tab]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hashMore) {
            setOffset((prev) => prev + 1);
          }
        });
      },
      { threshold: 1 }
    );

    let observerRefValue: null = null;

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
      observerRefValue = observerTarget.current;
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [hashMore]);

  useEffect(() => {
    setTrendArticles(initialTrendArticles);
  }, [initialTrendArticles]);

  useEffect(() => {
    if (offset > 1) {
      loadMore(offset);
    }
  }, [loadMore, offset, hashMore]);

  return (
    <>
      {flatTrendArticles.length === 0 ? (
        <div className="flex flex-col items-center justify-center ">
          <NotFoundList message="No articles found" />
        </div>
      ) : (
        <div className="m-auto">
          {flatTrendArticles.map((trendArticle) => (
            <div key={trendArticle.id} className="mb-4">
              <ArticleCardWrapper
                article={convertTrendArticleToArticle(trendArticle)}
                favoriteArticleFolders={favoriteArticleFolders}
                user={user}
                tab={tab}
              />
            </div>
          ))}
          <div ref={observerTarget}>
            {hashMore && (
              <div className="flex justify-center py-4">
                <Loader />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const convertTrendArticleToArticle = (
  trendArticle: TrendArticleType
): ArticleType => {
  return {
    id: trendArticle.article.id,
    platformId: trendArticle.article.platformId,
    title: trendArticle.article.title,
    description: trendArticle.article.description,
    thumbnailUrl: trendArticle.article.thumbnailUrl,
    articleUrl: trendArticle.article.articleUrl,
    publishedAt: trendArticle.article.publishedAt,
    authorName: trendArticle.article.authorName,
    tags: trendArticle.article.tags,
    isEng: trendArticle.article.isEng,
    isPrivate: trendArticle.article.isPrivate,
    likeCount: trendArticle.likeCount,
    createdAt: trendArticle.article.createdAt,
    updatedAt: trendArticle.article.updatedAt,
    platform: {
      id: trendArticle.platform.id,
      name: trendArticle.platform.name,
      platformSiteType: trendArticle.platform.platformSiteType,
      siteUrl: trendArticle.platform.siteUrl,
      faviconUrl: trendArticle.platform.faviconUrl,
      isEng: trendArticle.platform.isEng,
      createdAt: trendArticle.platform.createdAt,
      updatedAt: trendArticle.platform.updatedAt,
    },
    isBookmarked: trendArticle.isBookmarked,
    bookmarkId: trendArticle.bookmarkId,
    feeds: trendArticle.feeds.map((feed) => {
      return {
        id: feed.id,
        platformId: feed.platformId,
        categoryId: feed.categoryId,
        name: feed.name,
        description: feed.description,
        thumbnailUrl: feed.thumbnailUrl,
        siteUrl: feed.siteUrl,
        rssUrl: feed.rssUrl,
        apiQueryParam: feed.apiQueryParam,
        trendPlatformType: feed.trendPlatformType,
        createdAt: feed.createdAt,
        updatedAt: feed.updatedAt,
        category: {
          id: feed.category.id,
          name: feed.category.name,
          type: feed.category.type,
          createdAt: feed.category.createdAt,
          updatedAt: feed.category.updatedAt,
        },
      };
    }),
    favoriteArticles: trendArticle.favoriteArticles,
    isFollowing: trendArticle.isFollowing,
  };
};
