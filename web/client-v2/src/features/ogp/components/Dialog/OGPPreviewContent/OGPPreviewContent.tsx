"use client";

import { FragmentOf, readFragment } from "gql.tada";
import Link from "next/link";
import { FC } from "react";

import { OGPPreviewContentFragment } from "./OGPPreviewContentFragment";

type OGPPreviewContentProps = {
  data: FragmentOf<typeof OGPPreviewContentFragment>;
};

export const OGPPreviewContent: FC<OGPPreviewContentProps> = ({ data }) => {
  const fragment = readFragment(OGPPreviewContentFragment, data);
  return (
    <div className="mt-4 w-full">
      <h3 className="text-lg font-bold">PREVIEW</h3>
      <div className="mt-4 flex  w-full justify-around overflow-y-scroll">
        <div className="w-1/3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fragment.thumbnailUrl} alt="" />
        </div>
        <div className="w-3/5">
          <h3 className="line-clamp-2 h-12 w-full text-base font-bold leading-6">
            {fragment.title}
          </h3>

          <div className="mt-4 flex cursor-pointer items-center space-x-2 hover:underline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="size-6" src={fragment.faviconUrl} alt="" />

            <span className="text-sm">
              <Link href={new URL(fragment.articleUrl)} target="_blank">
                {fragment.siteName}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
