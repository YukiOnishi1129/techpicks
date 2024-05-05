"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import { NotFoundList } from "@/components/layout/NotFoundList";
import { Loader } from "@/components/ui/loader";

import { FeedType } from "@/types/feed";
import { MyFeedFolderType } from "@/types/myFeedFolder";

import { FeedCardWrapper } from "./FeedCardWrapper";
import { FetchFeedsAPIResponse } from "../actions/feed";

type FeedListProps = {
  keyword?: string;
  initialFeeds: Array<FeedType>;
  myFeedFolders: Array<MyFeedFolderType>;
  fetchFeedsAPI: ({
    keyword,
    offset,
  }: {
    offset?: string;
    keyword?: string;
  }) => Promise<FetchFeedsAPIResponse>;
};

export function FeedList({
  keyword,
  initialFeeds,
  myFeedFolders,
  fetchFeedsAPI,
}: FeedListProps) {
  const observerTarget = useRef(null);

  const [feeds, setFeeds] = useState<FeedType[]>(initialFeeds);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);

  const flatFeeds = feeds ? feeds.flatMap((feeds) => feeds) : [];

  const loadMore = useCallback(
    async (offset: number) => {
      const res = await fetchFeedsAPI({
        offset: offset.toString(),
        keyword: keyword,
      });
      setFeeds((prev) => [...prev, ...res.data.feeds]);

      const count = res.data.feeds.length;
      setHashMore(count > 0);
    },
    [fetchFeedsAPI]
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
    setFeeds(initialFeeds);
  }, [initialFeeds]);

  useEffect(() => {
    if (offset > 1) {
      loadMore(offset);
    }
  }, [loadMore, offset, hashMore]);

  return (
    <div className="m-auto h-[590px] overflow-y-scroll md:h-[550px]">
      {flatFeeds.length === 0 ? (
        <NotFoundList message="No feeds found." />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5">
          {flatFeeds.map((feed) => (
            <div key={feed.id} className="mb-4">
              <FeedCardWrapper feed={feed} myFeedFolders={myFeedFolders} />
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
    </div>
  );
}
