"use client";

import { FragmentOf, readFragment } from "gql.tada";
import { FC } from "react";

import { useCheckImageExist } from "@/shared/hooks/useImage";

import { ShowMyFeedListDialogContentFragment } from "./ShowMyFeedListDialogContentFragment";

type ShowMyFeedListDialogContentProps = {
  data: FragmentOf<typeof ShowMyFeedListDialogContentFragment>;
};

export const ShowMyFeedListDialogContent: FC<
  ShowMyFeedListDialogContentProps
> = ({ data }) => {
  const fragment = readFragment(ShowMyFeedListDialogContentFragment, data);
  const imageUrl = useCheckImageExist(fragment.thumbnailUrl);
  const faviconUrl = useCheckImageExist(fragment.platform.faviconUrl);

  return (
    <div className="relative h-[450px] w-full cursor-pointer rounded border-2 bg-primary-foreground px-4 py-2 md:h-[210px]">
      <div className="mt-2 flex h-10 md:mt-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="inline-block size-8 rounded-full shadow-md"
          src={faviconUrl}
          alt=""
        />
      </div>

      <div>
        <div className="mt-0 md:mt-4">
          <h3 className="line-clamp-2 h-[48px] text-left text-lg font-bold tracking-wide md:h-full md:text-xl">
            {fragment.name}
          </h3>

          <div className="mt-2 flex justify-center md:hidden md:w-[30%]">
            <div className="max-h-[200px] w-full md:h-36 md:max-h-[70px] md:w-48">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="mx-auto h-full rounded-lg border-2 object-cover object-center shadow-md"
                src={imageUrl}
                alt=""
              />
            </div>
          </div>

          <div className="mt-2">
            <p className="line-clamp-3 h-[62px] text-sm">
              {fragment.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
