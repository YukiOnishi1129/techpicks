import { FC } from "react";

import { PlatformTable } from "./PlatformDataTable";
import { fetchPlatformsAPI } from "../actions/platform";

type PlatformTemplateProps = {};

export const PlatformTemplate: FC<PlatformTemplateProps> = async () => {
  const res = await fetchPlatformsAPI();
  return (
    <div>
      <h1 className="mb-16">Platform Template</h1>
      <div>
        <PlatformTable platforms={res.data.platforms} />
      </div>
    </div>
  );
};
