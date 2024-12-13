"use client";

import { FragmentOf, readFragment } from "gql.tada";
import Link from "next/link";
import { FC } from "react";

import { useCheckImageExist } from "@/hooks/useCheckImageExist";

import { FeedCardItemFragment } from "./FeedCardItemFragment";

type FeedCardItemProps = {
  data: FragmentOf<typeof FeedCardItemFragment>;
};

export const FeedCardItem: FC<FeedCardItemProps> = ({ data }) => {
  const fragment = readFragment(FeedCardItemFragment, data);
  const imageUrl = useCheckImageExist(fragment.thumbnailUrl);
  const faviconUrl = useCheckImageExist(fragment.platform.faviconUrl);

  return (
    <div className="relative h-[450px] w-full cursor-pointer rounded px-4 py-2 md:h-[210px]">
      <div className="mt-2 flex h-10 md:mt-0">
        <Link href={`/feed/${fragment.id}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="inline-block size-8 rounded-full shadow-md"
            src={faviconUrl}
            alt=""
          />
        </Link>
      </div>

      <div>
        <div className="mt-0 md:mt-4">
          <Link href={`/feed/${fragment.id}`}>
            <h3 className="line-clamp-2 h-[48px] text-left text-lg font-bold tracking-wide md:h-full md:text-xl">
              {fragment.name}
            </h3>
          </Link>

          <div className="mt-2 flex justify-center md:hidden md:w-[30%]">
            <Link href={`/feed/${fragment.id}`}>
              <div className="max-h-[200px] w-full md:h-36 md:max-h-[70px] md:w-48">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="mx-auto max-h-[170px] rounded-lg border-2 object-cover object-center shadow-md md:h-full"
                  src={imageUrl}
                  alt=""
                />
              </div>
            </Link>
          </div>

          <div className="mt-2">
            <Link href={`/feed/${fragment.id}`}>
              <p className="line-clamp-3 h-[62px] text-sm">
                {fragment.description}
              </p>
            </Link>
          </div>
        </div>

        {/* <div className="absolute bottom-4 mt-2 h-[30px] pr-2 md:bottom-0">
          {latestPublishedAt && (
            <p className="text-xs">
              latest: {showDiffDateToCurrentDate(latestPublishedAt)}
            </p>
          )}
        </div> */}
      </div>
    </div>
  );
};
