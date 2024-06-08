"use client";

import { FC } from "react";

import { PlatformLanguageSelect } from "./PlatformLangaugeSelect";
import { PlatformSearchKeyword } from "./PlatformSearchKeyword";
import { PlatformSearchResetButton } from "./PlatformSearchResetButton";
import { PlatformSearchStatusSelect } from "./PlatformSearchStatusSelect";
import { PlatformSiteTypeSelect } from "./PlatformSiteTypeSelect";

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
    <div className="grid grid-cols-4 gap-4 border-b px-4 py-2">
      <PlatformSearchKeyword
        keyword={keyword}
        language={language}
        platformSiteType={platformSiteType}
        status={status}
      />
      {/* language */}
      <PlatformLanguageSelect
        keyword={keyword}
        language={language}
        platformSiteType={platformSiteType}
        status={status}
      />
      {/* site type */}
      <PlatformSiteTypeSelect
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
