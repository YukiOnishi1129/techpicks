"use client";

import { FC } from "react";

import { PlatformLanguageSelect } from "./PlatformLangaugeSelect";
import { PlatformSearchKeyword } from "./PlatformSearchKeyword";
import { PlatformSiteTypeSelect } from "./PlatformSiteTypeSelect";

type PlatformSearchFormProps = {
  keyword?: string;
  language?: string;
  platformSiteType?: string;
};

export const PlatformSearchForm: FC<PlatformSearchFormProps> = ({
  keyword,
  language,
  platformSiteType,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 border-b px-4 py-2">
      <PlatformSearchKeyword
        keyword={keyword}
        language={language}
        platformSiteType={platformSiteType}
      />
      {/* language */}
      <PlatformLanguageSelect
        keyword={keyword}
        language={language}
        platformSiteType={platformSiteType}
      />
      {/* site type */}
      <PlatformSiteTypeSelect
        keyword={keyword}
        language={language}
        platformSiteType={platformSiteType}
      />
    </div>
  );
};
