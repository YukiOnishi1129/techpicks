import { FC } from "react";

import { fetchPlatformsAPI } from "../actions/platform";

type PlatformTemplateProps = {};

export const PlatformTemplate: FC<PlatformTemplateProps> = async () => {
  const res = await fetchPlatformsAPI();
  console.log("🔥");
  console.log(res.data.platforms);
  return (
    <div>
      <h1>Platform Template</h1>
    </div>
  );
};
