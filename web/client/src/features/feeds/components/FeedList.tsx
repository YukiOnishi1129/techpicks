"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import { Loader } from "@/components/ui/loader";

import { FeedType } from "@/types/feed";

import { FeedCardWrapper } from "./FeedCardWrapper";
import { FetchFeedsAPIResponse } from "../actions/feed";

type FeedListProps = {
  initialFeeds: Array<FeedType>;
  fetchFeedsAPI: ({
    offset,
  }: {
    offset?: string;
  }) => Promise<FetchFeedsAPIResponse>;
};

export function FeedList({ initialFeeds, fetchFeedsAPI }: FeedListProps) {
  const observerTarget = useRef(null);

  const [feeds, setFeeds] = useState<FeedType[]>(initialFeeds);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);

  const flatFeeds = feeds ? feeds.flatMap((feeds) => feeds) : [];

  const loadMore = useCallback(
    async (offset: number) => {
      const res = await fetchFeedsAPI({ offset: offset.toString() });
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
    <>
      {flatFeeds.length === 0 ? (
        <div className="flex h-[700px] flex-col items-center justify-center md:h-[600px]">
          <p className="text-center text-lg font-bold text-gray-500 md:text-xl">
            Sorry, no article.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="mt-8 h-1/2" src="/sorry.png" alt="" />
        </div>
      ) : (
        <div className="m-auto h-[700px] overflow-y-scroll md:h-[600px]">
          {flatFeeds.map((feed) => (
            <div key={feed.id} className="mb-4">
              <FeedCardWrapper feed={feed} />
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
