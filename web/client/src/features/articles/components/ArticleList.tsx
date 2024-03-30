"use client";
import { useCallback, useRef, useState, useEffect } from "react";

import { ArticleCard } from "@/features/articles/components/ArticleCard";
import { GetArticleParams } from "@/features/articles/repository/article";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";

import { Article } from "@/types/article";
import { LanguageStatus } from "@/types/language";

import { ArticleDetailDialog } from "./ArticleDetailDialog";

type Props = {
  initialArticles: Array<Article>;
  languageStatus: LanguageStatus;
  fetchArticles: ({
    platformId,
    languageStatus,
    offset,
    sort,
    sortColum,
  }: GetArticleParams) => Promise<Article[]>;
};

export function ArticleList({
  initialArticles,
  languageStatus,
  fetchArticles,
}: Props) {
  const observerTarget = useRef(null);

  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);

  const flatArticles = articles.flatMap((article) => article);

  const loadMore = useCallback(
    async (offset: number) => {
      const newArticles = await fetchArticles({ offset, languageStatus });
      setArticles((prev) => [...prev, ...newArticles]);

      const count = newArticles.length;
      setHashMore(count > 0);
    },
    [fetchArticles, languageStatus]
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
    if (offset > 1) {
      loadMore(offset);
    }
  }, [loadMore, offset, hashMore]);

  return (
    <div className="w-auto">
      <div className="bg-white w-full py-4 border-b-2">
        <div className="flex justify-around">
          <Button className="block w-5/12">日本語記事</Button>
          <Button className="block ml-4 w-5/12">英語記事</Button>
        </div>
      </div>
      {flatArticles.map((article) => (
        <div key={article.id} className="border-t-2 py-8">
          <ArticleDetailDialog article={article}>
            <ArticleCard article={article} />
          </ArticleDetailDialog>
        </div>
      ))}
      <div ref={observerTarget}>{hashMore && <Loader />}</div>
    </div>
  );
}
