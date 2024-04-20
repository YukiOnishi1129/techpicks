"use client";

import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";

import { LanguageSwitch } from "@/components/ui/switch";

import { ArticleTabType } from "@/types/article";
import { LanguageStatus } from "@/types/language";

type ArticleLanguageSwitchProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  tab: ArticleTabType;
};

export const ArticleLanguageSwitch: FC<ArticleLanguageSwitchProps> = ({
  languageStatus,
  keyword,
  tab,
}: ArticleLanguageSwitchProps) => {
  const switchLabel = languageStatus === 1 ? "Japanese" : "English";
  const [isEng, setIsEng] = useState(switchLabel === "English");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onChange = useCallback(
    (checked: boolean) => {
      setIsLoading(true);
      const language = checked ? 2 : 1;
      setIsEng(checked);
      let path = `/?languageStatus=${language}?tab=${tab}`;
      if (keyword) {
        path += `&keyword=${keyword}`;
      }
      setIsLoading(false);
      router.replace(path);
    },
    [keyword, tab, router]
  );

  return (
    <LanguageSwitch
      isEng={isEng}
      isLoading={isLoading}
      label={switchLabel}
      onCheckedChange={onChange}
    />
  );
};