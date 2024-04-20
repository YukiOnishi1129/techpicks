"use client";

import { FC } from "react";

import { LanguageBadge, PlatformTypeBadge } from "@/components/ui/badge";

import { useCheckImageExist } from "@/hooks/useImage";

import { FeedType } from "@/types/feed";

type FeedCardProps = {
  feed: FeedType;
};

export const FeedCard: FC<FeedCardProps> = ({ feed }: FeedCardProps) => {
  const imageUrl = useCheckImageExist(feed.thumbnailUrl);
  const faviconUrl = useCheckImageExist(feed.platform.faviconUrl);
  return (
    <div className="relative w-full cursor-pointer rounded">
      <div className="justify-around md:flex">
        <div className="flex justify-center md:w-[30%]">
          <div className="w-full md:h-36 md:w-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="mx-auto h-full rounded-lg border-2 object-cover object-center shadow-md"
              src={imageUrl}
              alt=""
            />
          </div>
        </div>

        <div className="mt-4 md:mt-0 md:w-[65%]">
          <h3 className="line-clamp-3 text-left text-lg font-bold tracking-wide md:w-full md:text-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="mr-2 inline-block size-[24px]"
              src={faviconUrl}
              alt=""
            />
            {feed.name}
          </h3>

          <div className="flex w-full items-center pt-2 md:w-4/5">
            <div>
              <PlatformTypeBadge platformType={feed.platform.platformType} />
            </div>
            <div className="ml-2">
              <LanguageBadge isEng={feed.platform.isEng} />
            </div>
          </div>

          {/* TODO: description */}
          <div className="mt-2">
            <p className="text-sm">{feed.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
