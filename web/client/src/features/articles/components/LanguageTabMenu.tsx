"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback } from "react";

import { Button } from "@/components/ui/button";

import { LanguageStatus } from "@/types/language";

import { serverRevalidateTag } from "../actions/serverActions";

type LanguageTabMenuProps = {
  languageStatus: LanguageStatus;
};
export const LanguageTabMenu: FC<LanguageTabMenuProps> = ({
  languageStatus,
}: LanguageTabMenuProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = useCallback(
    async (language: LanguageStatus) => {
      //   const lang = language as number;
      //   const params = new URLSearchParams(searchParams);
      //   params.set("languageStatus", lang.toString());
      //   router.replace(`/?${params.toString()}`);
      await serverRevalidateTag();
      router.push(`/?languageStatus=${language}`);
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
