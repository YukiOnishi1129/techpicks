"use client";

import { FC } from "react";

import { PlatformSearchKeyword } from "./PlatformSearchKeyword";
import { PlatformSearchLanguageSelect } from "./PlatformSearchLanguageSelect";
import { PlatformSearchPlatformSiteTypeSelect } from "./PlatformSearchPlatformSiteTypeSelect";
import { PlatformSearchResetButton } from "./PlatformSearchResetButton";
import { PlatformSearchStatusSelect } from "./PlatformSearchStatusSelect";

type PlatformSearchFormProps = {
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  status?: string;
};

export const PlatformSearchForm: FC<PlatformSearchFormProps> = ({
  keyword,
  language,
  platformSiteType,
  status,
}) => {
  return (
    <div className="grid grid-cols-5 gap-5 border-b px-4 py-2">
      <PlatformSearchKeyword
        keyword={keyword}
        language={language}
        platformSiteType={platformSiteType}
        status={status}
      />
      {/* language */}
      <PlatformSearchLanguageSelect
        keyword={keyword}
        language={language}
        platformSiteType={platformSiteType}
        status={status}
      />
      {/* site type */}
      <PlatformSearchPlatformSiteTypeSelect
        keyword={keyword}
        language={language}
        platformSiteType={platformSiteType}
        status={status}
      />
      {/* status */}
      <PlatformSearchStatusSelect
        keyword={keyword}
        language={language}
        platformSiteType={platformSiteType}
        status={status}
      />
      {/* reset */}
      <PlatformSearchResetButton />
    </div>
  );
};
