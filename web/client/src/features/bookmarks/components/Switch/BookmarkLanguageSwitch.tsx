"use client";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { LanguageStatus } from "@/types/language";

type BookmarkLanguageSwitchProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
};

export const BookmarkLanguageSwitch: FC<BookmarkLanguageSwitchProps> = ({
  languageStatus,
  keyword,
}: BookmarkLanguageSwitchProps) => {
  const switchLabel = languageStatus === 1 ? "Japanese" : "English";
  const [isEng, setIsEng] = useState(switchLabel === "English");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onChange = useCallback(
    (checked: boolean) => {
      setIsLoading(true);
      const language = checked ? 2 : 1;
      setIsEng(checked);
      let path = `/bookmark/?languageStatus=${language}?`;
      if (keyword) {
        path += `&keyword=${keyword}`;
      }
      setIsLoading(false);
      router.replace(path);
    },
    [keyword, router]
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
