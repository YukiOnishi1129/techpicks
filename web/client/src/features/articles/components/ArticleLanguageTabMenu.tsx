"use client";

import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";

import { Button } from "@/components/ui/button";

import { LanguageStatus } from "@/types/language";

type ArticleLanguageTabMenuProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
};
export const ArticleLanguageTabMenu: FC<ArticleLanguageTabMenuProps> = ({
  languageStatus,
  keyword,
}: ArticleLanguageTabMenuProps) => {
  const router = useRouter();

  const onClick = useCallback(
    async (language: LanguageStatus) => {
      let path = `/?languageStatus=${language}`;
      if (keyword) {
        path += `&keyword=${keyword}`;
      }
      router.replace(path);
    },
    [router, keyword]
  );

  return (
    <div className="flex justify-around">
      <Button
        className="block w-5/12"
        disabled={languageStatus === 1}
        onClick={() => onClick(1)}
      >
        日本語記事
      </Button>

      <Button
        className="ml-4 block w-5/12"
        disabled={languageStatus === 2}
        onClick={() => onClick(2)}
      >
        英語語記事
      </Button>
    </div>
  );
};
