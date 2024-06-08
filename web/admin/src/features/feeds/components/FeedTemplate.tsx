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
  status?: string;
};

export const FeedTemplate: FC<FeedTemplateProps> = async ({
  offset,
  keyword,
  language,
  platformSiteType,
  platformId,
  categoryId,
  trendPlatformType,
  status,
}) => {
  const res = await fetchFeedsAPI({
    offset: offset?.toString(),
    keyword: keyword,
    language: language,
    platformSiteType: platformSiteType,
    platformId: platformId,
    categoryId: categoryId,
    trendPlatformType: trendPlatformType,
    operationStatus: status,
  });
  const resCount = await fetchFeedsCountAPI({
    keyword: keyword,
    language: language,
    platformSiteType: platformSiteType,
    platformId: platformId,
    categoryId: categoryId,
    trendPlatformType: trendPlatformType,
    operationStatus: status,
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
      status={status}
    />
  );
};
