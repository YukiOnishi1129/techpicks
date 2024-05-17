import { FC } from "react";

import { PlatformTable } from "./PlatformTable";
import { fetchPlatformsAPI, fetchPlatformsCountAPI } from "../actions/platform";

type PlatformTemplateProps = {
  offset?: number;
  keyword?: string;
};

export const PlatformTemplate: FC<PlatformTemplateProps> = async ({
  offset,
  keyword,
}) => {
  const res = await fetchPlatformsAPI({
    offset: offset?.toString(),
    keyword: keyword,
  });
  const resCount = await fetchPlatformsCountAPI({
    keyword: keyword,
  });

  return (
    <PlatformTable
      platforms={res.data.platforms}
      allCount={resCount.data.count}
      offset={offset}
      keyword={keyword}
    />
  );
};
