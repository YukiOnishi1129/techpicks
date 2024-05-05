"use client";

import { useRouter, usePathname } from "next/navigation";
import { FC, useCallback } from "react";

import { Button } from "@/components/ui/button";

import { LanguageStatus } from "@/types/language";

type BookmarkLanguageTabMenuProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
};
export const BookmarkLanguageTabMenu: FC<BookmarkLanguageTabMenuProps> = ({
  languageStatus,
  keyword,
}: BookmarkLanguageTabMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = useCallback(
    async (language: LanguageStatus) => {
      let query = "";
      if (keyword) {
        query += `&keyword=${keyword}`;
      }
      router.push(`/?languageStatus=${language}${pathname}${query}`);
    },
    [router, keyword, pathname]
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
