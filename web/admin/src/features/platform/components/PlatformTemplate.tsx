import { FC } from "react";

import { PlatformTable } from "./PlatformTable";
import { fetchPlatformsAPI } from "../actions/platform";

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
  return (
    <div>
      <h1 className="mb-16">Platform Template</h1>
      <div>
        <PlatformTable
          platforms={res.data.platforms}
          offset={offset}
          keyword={keyword}
        />
      </div>
    </div>
  );
};
