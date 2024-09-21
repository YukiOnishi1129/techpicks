"use client";

import { User } from "@supabase/supabase-js";
import { FragmentOf, readFragment } from "gql.tada";
import { useCallback, useRef, useState, useEffect } from "react";

import { NotFoundList } from "@/components/layout/NotFoundList";
import { Loader } from "@/components/ui/loader";

import { getFavoriteArticleListQuery } from "./actGetFavoriteArticleListQuery";
import { FavoriteArticleListFragment } from "./FavoriteArticleListFragment";
import { FavoriteFolderFavoriteArticleCardWrapperFragment } from "../../Card/FavoriteArticleCardWrapper/FavoriteArticleCardWrapperFragment";

type FavoriteArticleListProps = {
  user: User;
  data: FragmentOf<typeof FavoriteArticleListFragment>;
  folderId: string;
  favoriteArticleFolders: FragmentOf<
    typeof FavoriteFolderFavoriteArticleCardWrapperFragment
  >;
  keyword?: string;
  after?: string | null;
};

export function FavoriteArticleList({
  user,
  data,
  folderId,
  favoriteArticleFolders,
  keyword,
  after,
}: FavoriteArticleListProps) {
  const observerTarget = useRef(null);

  const fragment = readFragment(FavoriteArticleListFragment, data);

  const [edges, setEdges] = useState(fragment.edges);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);
  const [endCursor, setEndCursor] = useState(fragment.pageInfo.endCursor);
  const [isNextPage, setIsNextPage] = useState(true);

  const flatArticles = edges ? edges.flatMap((edge) => edge.node) : [];

  const loadMore = useCallback(async () => {
    if (!isNextPage) return;
    const { data: res, error } = await getFavoriteArticleListQuery({
      first: 20,
      after: endCursor,
      keyword,
      folderId,
    });
    if (error) return;

    const newArticles = readFragment(
      FavoriteArticleListFragment,
      res.favoriteArticles
    );
    if (newArticles.pageInfo.hasNextPage) {
      const endCursor = newArticles.pageInfo?.endCursor || null;
      setEndCursor(endCursor);
    }
    if (!newArticles.pageInfo.hasNextPage) setIsNextPage(false);

    if (newArticles.edges.length > 0) {
      setEdges((prev) => [...prev, ...newArticles.edges]);
      setHashMore(newArticles.edges.length > 0);
    }
  }, [endCursor, isNextPage, folderId, keyword]);

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
    setEdges(fragment.edges);
  }, [fragment.edges]);

  useEffect(() => {
    if (offset > 1) {
      loadMore();
    }
  }, [offset, hashMore]); // eslint-disable-line

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
              {/* <ArticleCardWrapper
                data={article}
                favoriteArticleFolders={favoriteArticleFolders}
                user={user}
                tab={tab}
              /> */}
            </div>
          ))}
          <div ref={observerTarget}>
            {hashMore && isNextPage && (
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
