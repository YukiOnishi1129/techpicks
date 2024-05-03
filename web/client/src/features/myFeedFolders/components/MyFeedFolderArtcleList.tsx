"use client";
import { User } from "@supabase/supabase-js";
import { useCallback, useRef, useState, useEffect } from "react";

import { FetchArticlesAPIResponse } from "@/features/articles/actions/article";
import { ArticleCardWrapper } from "@/features/articles/components/ArticleCardWrapper";

import { NotFoundList } from "@/components/layout/NotFoundList";
import { Loader } from "@/components/ui/loader";

import { ArticleType } from "@/types/article";
import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

type MyFeedFolderArticleListProps = {
  user: User | undefined;
  initialArticles: Array<ArticleType>;
  keyword?: string;
  feedIdList: Array<string>;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
  fetchArticles: ({
    feedIds,
    keyword,
    offset,
  }: {
    feedIds: Array<string>;
    keyword?: string;
    offset?: string;
  }) => Promise<FetchArticlesAPIResponse>;
};

export function MyFeedFolderArticleList({
  user,
  initialArticles,
  keyword,
  feedIdList,
  favoriteArticleFolders,
  fetchArticles,
}: MyFeedFolderArticleListProps) {
  const observerTarget = useRef(null);

  const [articles, setArticles] = useState<ArticleType[]>(initialArticles);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);

  const flatArticles = articles ? articles.flatMap((article) => article) : [];

  const loadMore = useCallback(
    async (offset: number) => {
      const res = await fetchArticles({
        offset: offset.toString(),
        keyword: keyword,
        feedIds: feedIdList,
      });
      setArticles((prev) => [...prev, ...res.data.articles]);

      const count = res.data.articles.length;
      setHashMore(count > 0);
    },
    [fetchArticles, keyword, feedIdList]
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
    setArticles(initialArticles);
  }, [initialArticles]);

  useEffect(() => {
    if (offset > 1) {
      loadMore(offset);
    }
  }, [loadMore, offset, hashMore]);

  return (
    <>
      {flatArticles.length === 0 ? (
        <div className="h-[590px] md:h-[540px]">
          <NotFoundList message="No articles found" />
        </div>
      ) : (
        <div className="m-auto h-[590px] overflow-y-scroll md:h-[540px]">
          {flatArticles.map((article) => (
            <div key={article.id} className="mb-4">
              <ArticleCardWrapper
                article={article}
                user={user}
                tab="unknown"
                favoriteArticleFolders={favoriteArticleFolders}
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
