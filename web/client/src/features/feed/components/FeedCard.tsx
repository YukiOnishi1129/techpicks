"use client";

import { FC } from "react";

import { LanguageBadge } from "@/components/ui/badge/LangaugeBadge";
import { PlatformTypeBadge } from "@/components/ui/badge/PlatformTypeBadge";

import { useCheckImageExist } from "@/hooks/useImage";

import { FeedType } from "@/types/feed";

type FeedCardProps = {
  feed: FeedType;
};

export const FeedCard: FC<FeedCardProps> = ({ feed }: FeedCardProps) => {
  const imageUrl = useCheckImageExist(feed.platform.faviconUrl);
  return (
    <div className="relative w-full cursor-pointer rounded">
      <div className="justify-around md:flex">
        <div className="flex justify-center md:w-[30%]">
          <div className="w-full  md:h-36 md:w-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full rounded-lg border-2 object-cover object-center shadow-md"
              src={imageUrl}
              alt=""
            />
          </div>
        </div>

        <div className="mt-4 md:mt-0 md:w-[65%]">
          <h3 className="line-clamp-3 text-left text-lg font-bold tracking-wide md:w-full md:text-xl">
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
        </div>
      </div>
    </div>
  );
};
