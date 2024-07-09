"use client";

import { User } from "@supabase/supabase-js";
import { useCallback, useRef, useState, useEffect } from "react";

import { NotFoundList } from "@/components/layout/NotFoundList";
import { Loader } from "@/components/ui/loader";

import { ArticleTabType, ArticleType } from "@/types/article";
import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";
import { LanguageStatus } from "@/types/language";

import { ArticleCardWrapper } from "./ArticleCardWrapper";
import { FetchArticlesAPIResponse } from "../actions/article";

type Props = {
  user: User | undefined;
  initialArticles: Array<ArticleType>;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
  languageStatus: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
  tab: ArticleTabType;
  fetchArticles: ({
    languageStatus,
    keyword,
    offset,
    platformIdList,
  }: {
    languageStatus: string;
    keyword?: string;
    offset: string;
    platformIdList: Array<string>;
    tab: ArticleTabType;
  }) => Promise<FetchArticlesAPIResponse>;
};

export function ArticleList({
  user,
  initialArticles,
  favoriteArticleFolders,
  languageStatus,
  keyword,
  platformIdList,
  tab,
  fetchArticles,
}: Props) {
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
        languageStatus: languageStatus.toString(),
        platformIdList: platformIdList,
        tab: tab,
      });
      setArticles((prev) => [...prev, ...res.data.articles]);

      const count = res.data.articles.length;
      setHashMore(count > 0);
    },
    [fetchArticles, languageStatus, keyword, platformIdList, tab]
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
        <div className="flex flex-col items-center justify-center ">
          <NotFoundList message="No articles found" />
        </div>
      ) : (
        <div className="m-auto">
          {flatArticles.map((article) => (
            <div key={article.id} className="mb-4">
              <ArticleCardWrapper
                article={article}
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
