"use client";

import { FC } from "react";

import { useCheckImageExist } from "@/hooks/useCheckImageExist";

type Props = {
  imageUrl: string;
  alt: string;
};

export const ZoomableImage: FC<Props> = ({ imageUrl, alt }) => {
  const thumbnailUrl = useCheckImageExist(imageUrl);
  return (
    <div className="inline-block overflow-hidden rounded-lg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-full cursor-pointer rounded-lg border object-cover object-center shadow-md transition-transform duration-300 ease-in-out hover:scale-110 md:h-full"
        src={thumbnailUrl}
        alt={alt}
      />
    </div>
  );
};
