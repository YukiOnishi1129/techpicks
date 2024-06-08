import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { serverRevalidatePage } from "@/actions/serverAction";

type PlatformRedirectPageParams = {
  offset?: number;
  targetKeyword?: string;
  targetLanguage?: string;
  targetPlatformSiteType?: string;
  targetStatus?: string;
};

export const usePlatformRedirectPage = () => {
  const router = useRouter();

  const redirectPage = useCallback(
    async ({
      offset,
      targetKeyword,
      targetLanguage,
      targetPlatformSiteType,
      targetStatus,
    }: PlatformRedirectPageParams) => {
      let offsetPath = `offset=1`;
      if (offset) {
        offsetPath = `offset=${offset}`;
      }
      let keywordPath = "";
      if (!!targetKeyword && targetKeyword.trim() !== "") {
        keywordPath = `&keyword=${targetKeyword}`;
      }
      let languagePath = "";
      if (targetLanguage) {
        languagePath = `&language=${targetLanguage}`;
      }
      let platformSiteTypePath = "";
      if (targetPlatformSiteType) {
        platformSiteTypePath = `&platformSiteType=${targetPlatformSiteType}`;
      }

      let statusPath = "";
      if (targetStatus) {
        statusPath = `&status=${targetStatus}`;
      }

      await serverRevalidatePage(
        `/platform?${offsetPath}${keywordPath}${languagePath}${platformSiteTypePath}${statusPath}`
      );
      router.replace(
        `/platform?${offsetPath}${keywordPath}${languagePath}${platformSiteTypePath}${statusPath}`
      );
    },
    [router]
  );

  return { redirectPage };
};
