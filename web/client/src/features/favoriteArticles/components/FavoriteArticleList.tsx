"use client";

import { User } from "@supabase/supabase-js";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { NotFoundList } from "@/components/layout/NotFoundList";
import { Loader } from "@/components/ui/loader";

import { FavoriteArticleType } from "@/types/favoriteArticle";
import {
  FetchFavoriteArticlesByFavoriteArticleFolderIdAPIArg,
  FetchFavoriteArticlesAPIResponse,
  FavoriteArticleFolderType,
} from "@/types/favoriteArticleFolder";

import { FavoriteArticleCardWrapper } from "./FavoriteArticleCardWrapper";

type FavoriteArticleListProps = {
  user?: User;
  favoriteArticleFolderId: string;
  initialFavoriteArticles: Array<FavoriteArticleType>;
  otherFavoriteArticleFolders: Array<FavoriteArticleFolderType>;
  keyword?: string;
  fetchFavoriteArticles: ({
    favoriteArticleFolderId,
  }: FetchFavoriteArticlesByFavoriteArticleFolderIdAPIArg) => Promise<FetchFavoriteArticlesAPIResponse>;
};

export const FavoriteArticleList: FC<FavoriteArticleListProps> = ({
  user,
  favoriteArticleFolderId,
  initialFavoriteArticles,
  otherFavoriteArticleFolders,
  keyword,
  fetchFavoriteArticles,
}) => {
  const observerTarget = useRef(null);

  const [favoriteArticles, setFavoriteArticles] = useState<
    Array<FavoriteArticleType>
  >(initialFavoriteArticles);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);

  const flatFavoriteArticles = favoriteArticles
    ? favoriteArticles.flatMap((favoriteArticle) => favoriteArticle)
    : [];

  const loadMore = useCallback(
    async (offset: number) => {
      const res = await fetchFavoriteArticles({
        offset: offset.toString(),
        keyword: keyword,
        favoriteArticleFolderId: favoriteArticleFolderId,
      });
      setFavoriteArticles((prev) => [...prev, ...res.data.favoriteArticles]);

      const count = res.data.favoriteArticles.length;
      setHashMore(count > 0);
    },
    [fetchFavoriteArticles, favoriteArticleFolderId, keyword]
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
    setFavoriteArticles(initialFavoriteArticles);
  }, [initialFavoriteArticles]);

  useEffect(() => {
    if (offset > 1) {
      loadMore(offset);
    }
  }, [loadMore, offset, hashMore]);

  return (
    <div className="m-auto h-[590px]  overflow-y-scroll md:h-[540px]">
      {flatFavoriteArticles.length === 0 ? (
        <NotFoundList message="No favorite Article" />
      ) : (
        <>
          {flatFavoriteArticles.map((favoriteArticle) => (
            <div key={favoriteArticle.id} className="mb-8">
              <FavoriteArticleCardWrapper
                user={user}
                favoriteArticleFolderId={favoriteArticleFolderId}
                favoriteArticle={favoriteArticle}
                otherFavoriteArticleFolders={otherFavoriteArticleFolders}
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
        </>
      )}
    </div>
  );
};
