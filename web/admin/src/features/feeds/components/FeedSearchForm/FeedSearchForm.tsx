"use client";

import { FC } from "react";

import { FeedSearchKeyword } from "./FeedSearchKeyword";

type FeedSearchFormProps = {
  keyword?: string;
  language?: string;
  platformId?: string;
  categoryId?: string;
  platformSiteType?: string;
};

export const FeedSearchForm: FC<FeedSearchFormProps> = ({
  keyword,
  language,
  platformId,
  categoryId,
  platformSiteType,
}) => {
  return (
    <div className="flex items-center justify-between border-b px-4 py-2">
      <FeedSearchKeyword
        keyword={keyword}
        language={language}
        platformId={platformId}
        categoryId={categoryId}
        platformSiteType={platformSiteType}
      />
    </div>
  );
};
