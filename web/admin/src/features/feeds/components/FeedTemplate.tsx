import { FC } from "react";

import { FeedTable } from "./FeedTable/FeedTable";
import { fetchFeedsAPI, fetchFeedsCountAPI } from "../actions/feed";

type FeedTemplateProps = {
  offset?: number;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
};

export const FeedTemplate: FC<FeedTemplateProps> = async ({
  offset,
  keyword,
  language,
  platformSiteType,
}) => {
  const res = await fetchFeedsAPI({
    offset: offset?.toString(),
    keyword: keyword,
    language: language,
    platformSiteType: platformSiteType,
  });
  const resCount = await fetchFeedsCountAPI({
    keyword: keyword,
    language: language,
    platformSiteType: platformSiteType,
  });

  return (
    <FeedTable
      feeds={res.data.feeds}
      allCount={resCount.data.count}
      offset={offset}
      keyword={keyword}
      language={language}
      platformSiteType={platformSiteType}
    />
  );
};
