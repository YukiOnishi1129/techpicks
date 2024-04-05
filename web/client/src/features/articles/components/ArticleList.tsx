"use client";
import { useCallback, useRef, useState, useEffect } from "react";

import { ArticleCard } from "@/features/articles/components/ArticleCard";

import { Loader } from "@/components/ui/loader";

import { ArticleType } from "@/types/article";
import { LanguageStatus } from "@/types/language";

import { ArticleDetailDialog } from "./ArticleDetailDialog";
import { LanguageTabMenu } from "./LanguageTabMenu";

type Props = {
  initialArticles: Array<ArticleType>;
  languageStatus: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
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
  }) => Promise<ArticleType[]>;
};

export function ArticleList({
  initialArticles,
  languageStatus,
  keyword,
  platformIdList,
  fetchArticles,
}: Props) {
  const observerTarget = useRef(null);

  const [articles, setArticles] = useState<ArticleType[]>(initialArticles);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);

  const flatArticles = articles ? articles.flatMap((article) => article) : [];

  const loadMore = useCallback(
    async (offset: number) => {
      const newArticles = await fetchArticles({
        offset: offset.toString(),
        keyword: keyword,
        languageStatus: languageStatus.toString(),
        platformIdList: platformIdList,
      });
      setArticles((prev) => [...prev, ...newArticles]);

      const count = newArticles.length;
      setHashMore(count > 0);
    },
    [fetchArticles, languageStatus, keyword, platformIdList]
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
      <div className="w-full border-b-2 bg-white py-4">
        <LanguageTabMenu languageStatus={languageStatus} keyword={keyword} />
      </div>
      <div className="m-auto h-[700px] overflow-y-scroll md:h-[600px]">
        {flatArticles.map((article) => (
          <div key={article.id} className="border-t-2 py-8">
            <ArticleDetailDialog article={article}>
              <ArticleCard article={article} />
            </ArticleDetailDialog>
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
    </div>
  );
}
