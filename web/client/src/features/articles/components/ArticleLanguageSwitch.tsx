"use client";
import { Label } from "@radix-ui/react-label";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { z } from "zod";

import { Switch } from "@/components/ui/switch";

import { ArticleTabType } from "@/types/article";
import { LanguageStatus } from "@/types/language";

type ArticleLanguageSwitchProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  tab: ArticleTabType;
};

const FormSchema = z.object({
  is_eng: z.boolean(),
});

export const ArticleLanguageSwitch: FC<ArticleLanguageSwitchProps> = ({
  languageStatus,
  keyword,
  tab,
}: ArticleLanguageSwitchProps) => {
  const switchLabel = languageStatus === 1 ? "Japanese" : "English";
  const [isEng, setIsEng] = useState(languageStatus === 2);
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
    <div className="flex items-center justify-end space-x-2">
      {isLoading ? (
        <Loader />
      ) : (
        <Switch id="airplane-mode" checked={isEng} onCheckedChange={onChange} />
      )}

      <Label htmlFor="airplane-mode">{switchLabel}</Label>
    </div>
  );
};
