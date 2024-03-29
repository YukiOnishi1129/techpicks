"use client";
import { useCallback, useRef, useState, useEffect } from "react";

import { Loader } from "@/components/ui/loader";
import { ArticleCard } from "@/features/articles/components/ArticleCard";
import { GetArticleParams } from "@/features/articles/repository/article";
import { Article } from "@/types/article";

type Props = {
  initialArticles: Array<Article>;
  fetchArticles: ({
    platformId,
    offset,
    sort,
    sortColum,
  }: GetArticleParams) => Promise<Article[]>;
};

export function ArticleList({ initialArticles, fetchArticles }: Props) {
  const observerTarget = useRef(null);

  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);

  const flatArticles = articles.flatMap((article) => article);

  const loadMore = useCallback(
    async (offset: number) => {
      const newArticles = await fetchArticles({ offset });
      setArticles((prev) => [...prev, ...newArticles]);

      const count = newArticles.length;
      setHashMore(count > 0);
    },
    [fetchArticles]
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
  }, [loadMore, offset]);

  return (
    <div className="w-[90%] h-auto mt-4 mx-auto md:grid grid-cols-3 gap-4">
      {flatArticles.map((article) => (
        <div key={article.id} className="mb-4">
          <ArticleCard article={article} />
        </div>
      ))}
      <div ref={observerTarget}>{hashMore && <Loader />}</div>
    </div>
  );
}
