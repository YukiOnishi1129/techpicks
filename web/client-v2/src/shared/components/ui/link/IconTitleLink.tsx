"use client";

import { FC, HTMLAttributeAnchorTarget } from "react";

import { Link } from "@/shared/components/ui/link";
import { useCheckImageExist } from "@/shared/hooks/useCheckImageExist";

type Props = {
  url: string;
  iconImageUrl: string;
  title: string;
  target?: HTMLAttributeAnchorTarget;
  iconSize?: number;
};

export const IconTitleLink: FC<Props> = ({
  url,
  iconImageUrl,
  title,
  target,
  iconSize = 36,
}) => {
  const faviconImageUrl = useCheckImageExist(iconImageUrl);

  return (
    <div className="flex w-full items-center hover:text-emerald-600">
      <Link className="flex items-center" url={url} target={target}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="mr-2 inline-block"
          src={faviconImageUrl}
          alt={title}
          width={`${iconSize}`}
          height={`${iconSize}`}
        />
        <h2 className="line-clamp-1 w-full font-bold">{title}</h2>
      </Link>
    </div>
  );
};
