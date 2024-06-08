import { FC } from "react";

import { PlatformTable } from "./PlatformTable";
import { fetchPlatformsAPI, fetchPlatformsCountAPI } from "../actions/platform";

type PlatformTemplateProps = {
  offset?: number;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  status?: string;
};

export const PlatformTemplate: FC<PlatformTemplateProps> = async ({
  offset,
  keyword,
  language,
  platformSiteType,
  status,
}) => {
  const res = await fetchPlatformsAPI({
    offset: offset?.toString(),
    keyword: keyword,
    language: language,
    platformSiteType: platformSiteType,
    operationStatus: status,
  });
  const resCount = await fetchPlatformsCountAPI({
    keyword: keyword,
    language: language,
    platformSiteType: platformSiteType,
    operationStatus: status,
  });

  return (
    <PlatformTable
      platforms={res.data.platforms}
      allCount={resCount.data.count}
      offset={offset}
      keyword={keyword}
      language={language}
      platformSiteType={platformSiteType}
      status={status}
    />
  );
};
