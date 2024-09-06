"use client";

import { User } from "@supabase/supabase-js";
import { FragmentOf, readFragment } from "gql.tada";
import { useCallback, useRef, useState, useEffect } from "react";

// import { FetchArticlesAPIResponse } from "@/features/articles/actions/article";

// import { NotFoundList } from "@/components/layout/NotFoundList";
import { Loader } from "@/components/ui/loader";

import { ArticleTabType } from "@/types/article";
// import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";
import { LanguageStatus } from "@/types/language";

import { ArticleListFragment } from "./ArticleListFragment";
import { getArticleListQuery } from "../../actions/getArticleListQuery";
import { ArticleCardWrapper } from "../Card/ArticleCardWrapper/ArticleCardWrapper";

type Props = {
  user?: User;
  data: FragmentOf<typeof ArticleListFragment>;
  // favoriteArticleFolders: Array<FavoriteArticleFolderType>;
  languageStatus: LanguageStatus;
  keyword?: string;
  feedIdList: Array<string>;
  tab: ArticleTabType;
  after?: string | null;
};

export function ArticleList({
  user,
  data,
  languageStatus,
  keyword,
  feedIdList,
  tab,
  after,
}: Props) {
  const observerTarget = useRef(null);

  const fragment = readFragment(ArticleListFragment, data);

  const [edges, setEdges] = useState(fragment.edges);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);
  const [endCursor, setEndCursor] = useState(fragment.pageInfo.endCursor);

  const flatArticles = edges ? edges.flatMap((edge) => edge.node) : [];

  const loadMore = useCallback(async () => {
    const { data: res, error } = await getArticleListQuery({
      first: 20,
      after: endCursor,
      languageStatus,
      tab,
    });
    if (error) return;

    const newArticles = readFragment(ArticleListFragment, res.articles);
    if (newArticles.pageInfo.hasNextPage) {
      const endCursor = newArticles.pageInfo?.endCursor || null;
      setEndCursor(endCursor);
    }

    if (newArticles.edges.length > 0) {
      setEdges((prev) => [...prev, ...newArticles.edges]);
      setHashMore(newArticles.edges.length > 0);
    }
  }, [languageStatus, tab, endCursor]);

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

  // useEffect(() => {
  //   // setArticles();
  // }, []);

  useEffect(() => {
    if (offset > 1) {
      loadMore();
    }
  }, [loadMore, offset, hashMore]);

  return (
    <>
      {flatArticles.length === 0 ? (
        <div className="flex flex-col items-center justify-center ">
          {/* <NotFoundList message="No articles found" /> */}
          Not Found
        </div>
      ) : (
        <div className="m-auto">
          {flatArticles.map((article) => (
            <div key={article.id} className="mb-4">
              <ArticleCardWrapper data={article} user={user} tab={tab} />
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
