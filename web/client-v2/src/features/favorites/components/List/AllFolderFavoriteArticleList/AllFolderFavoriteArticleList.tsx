"use client";
import { User } from "@supabase/supabase-js";
import { FragmentOf, readFragment } from "gql.tada";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { NotFoundList } from "@/components/layout/NotFoundList";
import { Loader } from "@/components/ui/loader";

import { getAllFolderFavoriteArticleListQuery } from "./actGetAllFolderFavoriteArticleListQuery";
import { AllFolderFavoriteArticleListFragment } from "./AllFolderFavoriteArticleListFragment";
import { AllFolderFavoriteArticleCardWrapper } from "../../Card";
import { FavoriteFolderAllFolderArticleCardWrapperFragment } from "../../Card/AllFolderFavoriteArticleCardWrapper/AllFolderFavoriteArticleCardWrapperFragment";

type AllFolderFavoriteArticleListFragmentProps = {
  user: User;
  data: FragmentOf<typeof AllFolderFavoriteArticleListFragment>;
  favoriteArticleFolders: FragmentOf<
    typeof FavoriteFolderAllFolderArticleCardWrapperFragment
  >;
  keyword?: string;
};

export const AllFolderFavoriteArticleList: FC<
  AllFolderFavoriteArticleListFragmentProps
> = ({ user, data, favoriteArticleFolders, keyword }) => {
  const observerTarget = useRef(null);

  const fragment = readFragment(AllFolderFavoriteArticleListFragment, data);

  const [edges, setEdges] = useState(fragment.edges);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);
  const [endCursor, setEndCursor] = useState(fragment.pageInfo.endCursor);
  const [isNextPage, setIsNextPage] = useState(true);

  const flatArticles = edges ? edges.flatMap((edge) => edge) : [];

  const loadMore = useCallback(async () => {
    if (!isNextPage) return;
    const { data: res, error } = await getAllFolderFavoriteArticleListQuery({
      first: 20,
      after: endCursor,
      keyword,
    });
    if (error) return;

    const newArticles = readFragment(
      AllFolderFavoriteArticleListFragment,
      res.favoriteAllFolderArticles
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
  }, [endCursor, isNextPage, keyword]);

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
            <div key={article.node.id} className="mb-4">
              <AllFolderFavoriteArticleCardWrapper
                data={article}
                favoriteArticleFolders={favoriteArticleFolders}
                user={user}
                // favoriteArticleFolderId={folderId}
              />
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
};
