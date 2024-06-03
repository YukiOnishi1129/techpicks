import { FC } from "react";

import { PlatformTable } from "./PlatformTable";
import { fetchPlatformsAPI, fetchPlatformsCountAPI } from "../actions/platform";

type PlatformTemplateProps = {
  offset?: number;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
};

export const PlatformTemplate: FC<PlatformTemplateProps> = async ({
  offset,
  keyword,
  language,
  platformSiteType,
}) => {
  const res = await fetchPlatformsAPI({
    offset: offset?.toString(),
    keyword: keyword,
    language: language,
    platformSiteType: platformSiteType,
  });
  const resCount = await fetchPlatformsCountAPI({
    keyword: keyword,
    language: language,
    platformSiteType: platformSiteType,
  });

  return (
    <PlatformTable
      platforms={res.data.platforms}
      allCount={resCount.data.count}
      offset={offset}
      keyword={keyword}
      language={language}
      platformSiteType={platformSiteType}
    />
  );
};
