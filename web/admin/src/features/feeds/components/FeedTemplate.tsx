import { FC } from "react";

import { FeedTable } from "./FeedTable";
import { fetchFeedsAPI, fetchFeedsCountAPI } from "../actions/feed";

type FeedTemplateProps = {
  offset?: number;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  platformId?: string;
  categoryId?: string;
  trendPlatformType?: string;
};

export const FeedTemplate: FC<FeedTemplateProps> = async ({
  offset,
  keyword,
  language,
  platformSiteType,
  platformId,
  categoryId,
  trendPlatformType,
}) => {
  const res = await fetchFeedsAPI({
    offset: offset?.toString(),
    keyword: keyword,
    language: language,
    platformSiteType: platformSiteType,
    platformId: platformId,
    categoryId: categoryId,
    trendPlatformType: trendPlatformType,
  });
  const resCount = await fetchFeedsCountAPI({
    keyword: keyword,
    language: language,
    platformSiteType: platformSiteType,
    platformId: platformId,
    categoryId: categoryId,
    trendPlatformType: trendPlatformType,
  });

  return (
    <FeedTable
      feeds={res.data.feeds}
      allCount={resCount.data.count}
      offset={offset}
      keyword={keyword}
      language={language}
      platformSiteType={platformSiteType}
      platformId={platformId}
      categoryId={categoryId}
      trendPlatformType={trendPlatformType}
    />
  );
};
