"use client";

import { User } from "@supabase/supabase-js";
import { FragmentOf, readFragment } from "gql.tada";
import { FC } from "react";

import { FeedNameBadge } from "@/components/ui/badge";

import { useCheckImageExist } from "@/hooks/useCheckImageExist";

import { showDiffDateToCurrentDate } from "@/lib/date";

import { ArticleTabType } from "@/types/article";

import { ArticleCardItemFragment } from "./ArticleCardItemFragment";

type ArticleCardItemProps = {
  data: FragmentOf<typeof ArticleCardItemFragment>;
  user: User;
  tab: ArticleTabType;
};

export const ArticleCardItem: FC<ArticleCardItemProps> = ({ data }) => {
  const fragment = readFragment(ArticleCardItemFragment, data);
  const imageUrl = useCheckImageExist(fragment.thumbnailUrl);

  return (
    <div className="relative w-full cursor-pointer rounded">
      <div className="justify-around md:flex">
        <div className="md:w-[30%]">
          <h3 className="mb-4 line-clamp-3 block text-left text-lg font-bold tracking-wide md:hidden md:w-full md:text-xl">
            {fragment.title}
          </h3>
          <div className="flex w-full justify-center md:h-36 md:w-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="max-h-[170px] rounded-lg border-2 object-cover object-center shadow-md md:h-full"
              src={imageUrl}
              alt=""
            />
          </div>
        </div>

        <div className="mt-4 md:mt-0 md:w-[65%]">
          <h3 className="line-clamp-3 hidden text-left text-lg font-bold tracking-wide md:block md:w-full md:text-xl">
            {fragment.title}
          </h3>

          {fragment?.publishedAt && (
            <p className="flex pt-2 text-sm">
              {showDiffDateToCurrentDate(fragment.publishedAt)}
            </p>
          )}

          <div className="flex w-full flex-wrap items-center justify-start pt-2 md:w-4/5">
            {fragment?.feeds &&
              fragment.feeds.length > 0 &&
              fragment.feeds.map((feed) => (
                <div key={`${fragment.id}-${feed.id}`} className="my-2 mr-2">
                  <div className="">
                    <FeedNameBadge name={feed.name} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
