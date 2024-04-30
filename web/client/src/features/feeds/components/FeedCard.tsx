"use client";

import { FC } from "react";

import { useCheckImageExist } from "@/hooks/useImage";

import { showDiffDateToCurrentDate } from "@/lib/date";

import { FeedType } from "@/types/feed";

type FeedCardProps = {
  feed: FeedType;
};

export const FeedCard: FC<FeedCardProps> = ({ feed }: FeedCardProps) => {
  // const imageUrl = useCheckImageExist(feed.thumbnailUrl);
  const faviconUrl = useCheckImageExist(feed.platform.faviconUrl);
  const latestPublishedAt = feed.articles?.[0]?.publishedAt;
  return (
    <div className="relative h-[230px] w-full cursor-pointer rounded px-4 py-2 md:h-[210px]">
      <div className="flex h-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="inline-block size-8 rounded-full shadow-md"
          src={faviconUrl}
          alt=""
        />
      </div>

      <div className="">
        <div className="mt-4 md:mt-0 ">
          <h3 className="line-clamp-2 text-left text-base font-bold tracking-wide md:text-xl">
            {feed.name}
          </h3>

          {/* <div className="flex w-full items-center pt-2 md:w-4/5">
            <div>
              <PlatformTypeBadge platformType={feed.platform.platformType} />
            </div>
            <div className="ml-2">
              <LanguageBadge isEng={feed.platform.isEng} />
            </div>
          </div> */}

          {/* TODO: description */}
          <div className="mt-2">
            <p
              className="line-clamp-3 h-[62px]
            text-sm
            "
            >
              {feed.description}
            </p>
          </div>
        </div>
        {/* <div className="flex justify-center md:w-[30%]">
          <div className="w-full md:h-36 md:w-48">
            <img
              className="mx-auto h-full rounded-lg border-2 object-cover object-center shadow-md"
              src={imageUrl}
              alt=""
            />
          </div>
        </div> */}
        <div className="absolute bottom-0 mt-2 h-[30px]">
          {latestPublishedAt && (
            <p className="text-sm">
              latest: {showDiffDateToCurrentDate(latestPublishedAt)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
