import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { serverRevalidatePage } from "@/actions/serverAction";

export const useRedirectPage = () => {
  const router = useRouter();

  const redirectPage = useCallback(
    async (
      targetKeyword?: string,
      targetLanguage?: string,
      targetPlatformSiteType?: string,
      targetPlatformId?: string,
      targetCategoryId?: string,
      targetTrendPlatformTypePath?: string,
      targetStatus?: string
    ) => {
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
      if (targetTrendPlatformTypePath) {
        trendPlatformTypePath = `&trendPlatformType=${targetTrendPlatformTypePath}`;
      }
      let statusPath = "";
      if (targetStatus) {
        statusPath = `&status=${targetStatus}`;
      }

      await serverRevalidatePage(
        `/feed?$offset=1${keywordPath}${languagePath}${platformSiteTypePath}${platformIdPath}${categoryIdPath}${trendPlatformTypePath}${statusPath}`
      );
      router.replace(
        `/feed?$offset=1${keywordPath}${languagePath}${platformSiteTypePath}${platformIdPath}${categoryIdPath}${trendPlatformTypePath}${statusPath}`
      );
    },
    [router]
  );

  return { redirectPage };
};
