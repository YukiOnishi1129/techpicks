import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { serverRevalidatePage } from "@/actions/serverAction";

type RedirectPageParams = {
  offset?: number;
  targetKeyword?: string;
  targetLanguage?: string;
  targetPlatformSiteType?: string;
  targetPlatformId?: string;
  targetCategoryId?: string;
  targetTrendPlatformType?: string;
  targetStatus?: string;
};

export const useRedirectPage = () => {
  const router = useRouter();

  const redirectPage = useCallback(
    async ({
      offset,
      targetKeyword,
      targetLanguage,
      targetPlatformSiteType,
      targetPlatformId,
      targetCategoryId,
      targetTrendPlatformType,
      targetStatus,
    }: RedirectPageParams) => {
      let offsetPath = `offset=1`;
      if (offset) {
        offsetPath = `offset=${offset}
        `;
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
      let platformIdPath = "";
      if (targetPlatformId) {
        platformIdPath = `&platformId=${targetPlatformId}`;
      }
      let categoryIdPath = "";
      if (targetCategoryId) {
        categoryIdPath = `&categoryId=${targetCategoryId}`;
      }
      let trendPlatformTypePath = "";
      if (targetTrendPlatformType) {
        trendPlatformTypePath = `&trendPlatformType=${targetTrendPlatformType}`;
      }
      let statusPath = "";
      if (targetStatus) {
        statusPath = `&status=${targetStatus}`;
      }

      await serverRevalidatePage(
        `/feed?${offsetPath}${keywordPath}${languagePath}${platformSiteTypePath}${platformIdPath}${categoryIdPath}${trendPlatformTypePath}${statusPath}`
      );
      router.replace(
        `/feed?${offsetPath}${keywordPath}${languagePath}${platformSiteTypePath}${platformIdPath}${categoryIdPath}${trendPlatformTypePath}${statusPath}`
      );
    },
    [router]
  );

  return { redirectPage };
};
