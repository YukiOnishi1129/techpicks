"use client";

import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";

import { Button } from "@/components/ui/button";

import { LanguageStatus } from "@/types/language";

type LanguageTabMenuProps = {
  languageStatus: LanguageStatus;
};
export const LanguageTabMenu: FC<LanguageTabMenuProps> = ({
  languageStatus,
}: LanguageTabMenuProps) => {
  const router = useRouter();

  const onClick = useCallback(
    async (language: LanguageStatus) => {
      router.replace(`/?languageStatus=${language}`);
    },
    [router]
  );

  return (
    <div className="flex justify-around">
      <Button
        className="block w-5/12"
        disabled={languageStatus === 1}
        onClick={() => onClick(1)}
      >
        日本語記事
        {/* <Link href={`/?languageStatus=1`}></Link> */}
      </Button>

      <Button
        className="block ml-4 w-5/12"
        disabled={languageStatus === 2}
        onClick={() => onClick(2)}
      >
        英語語記事
        {/* <Link href={`/?languageStatus=2`}></Link> */}
      </Button>
    </div>
  );
};
