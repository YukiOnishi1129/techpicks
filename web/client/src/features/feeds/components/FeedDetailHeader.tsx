"use client";

import { FC } from "react";

import { useCheckImageExist } from "@/hooks/useImage";

type FeedDetailHeaderProps = {
  title: string;
  description?: string;
  imageUrl?: string;
};

export const FeedDetailHeader: FC<FeedDetailHeaderProps> = ({
  title,
  description,
  imageUrl,
}) => {
  const image = useCheckImageExist(imageUrl);
  return (
    <div className="flex w-auto items-center space-x-4 space-y-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ml-2 size-12" src={image} alt="" />
      <div className="w-3/4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="mt-2">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};
