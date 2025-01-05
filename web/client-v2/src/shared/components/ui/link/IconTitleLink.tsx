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
    <div className="flex items-center hover:text-emerald-600">
      <Link url={url} target={target}>
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="mr-2 inline-block"
            src={faviconImageUrl}
            alt={title}
            width={`${iconSize}`}
            height={`${iconSize}`}
          />
          <span className="hidden font-bold  md:inline-block">{title}</span>
        </>
      </Link>
    </div>
  );
};
