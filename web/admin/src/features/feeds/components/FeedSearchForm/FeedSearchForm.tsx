"use client";

import { useRouter } from "next/navigation";
import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

import { fetchPlatformByIdAPI } from "@/features/platforms/actions/platform";

import { SyncLoaderComponent } from "@/components/ui/loader";

import { PlatformType } from "@/types/platform";

import { serverRevalidatePage } from "@/actions/serverAction";

import { FeedSearchKeyword } from "./FeedSearchKeyword";
import { SelectPlatformDialog } from "../SelectPlatformDialog";

type FeedSearchFormProps = {
  keyword?: string;
  language?: string;
  platformId?: string;
  categoryId?: string;
  platformSiteType?: string;
  trendPlatformType?: string;
};

export const FeedSearchForm: FC<FeedSearchFormProps> = ({
  keyword,
  language,
  platformId,
  categoryId,
  platformSiteType,
  trendPlatformType,
}) => {
  const router = useRouter();
  const [isPlatformPending, startPlatformTransition] = useTransition();

  const [selectedPlatform, setSelectedPlatform] = useState<
    PlatformType | undefined
  >(undefined);

  const selectPlatformLabelName = useMemo(() => {
    return selectedPlatform?.name || "Platform";
  }, [selectedPlatform]);

  const fetchPlatform = useCallback(async (targetPlatformId: string) => {
    startPlatformTransition(async () => {
      const res = await fetchPlatformByIdAPI(targetPlatformId);
      if (!res.data.platform) return;
      setSelectedPlatform(res.data.platform);
    });
  }, []);

  const handleSearchPlatform = useCallback(
    async (targetPlatformId: string) => {
      let keywordPath = "";
      if (!!keyword && keyword.trim() !== "") {
        keywordPath = `&keyword=${keyword}`;
      }
      let languagePath = "";
      if (language) {
        languagePath = `&language=${language}`;
      }
      let platformSiteTypePath = "";
      if (platformSiteType) {
        platformSiteTypePath = `&platformSiteType=${platformSiteType}`;
      }
      let platformIdPath = "";
      if (targetPlatformId) {
        platformIdPath = `&platformId=${targetPlatformId}`;
      }
      let categoryIdPath = "";
      if (categoryId) {
        categoryIdPath = `&categoryId=${categoryId}`;
      }
      let trendPlatformTypePath = "";
      if (trendPlatformType) {
        trendPlatformTypePath = `&trendPlatformType=${trendPlatformType}`;
      }

      await serverRevalidatePage(
        `/feed?$offset=1${keywordPath}${languagePath}${platformSiteTypePath}${platformIdPath}${categoryIdPath}${trendPlatformTypePath}`
      );
      router.replace(
        `/feed?$offset=1${keywordPath}${languagePath}${platformSiteTypePath}${platformIdPath}${categoryIdPath}${trendPlatformTypePath}`
      );
    },
    [keyword, language, platformSiteType, categoryId, trendPlatformType, router]
  );

  useEffect(() => {
    if (platformId) fetchPlatform(platformId);
  }, [fetchPlatform, platformId]);

  return (
    <div className="flex items-center border-b px-4 py-2">
      <FeedSearchKeyword
        keyword={keyword}
        language={language}
        platformId={platformId}
        categoryId={categoryId}
        platformSiteType={platformSiteType}
        trendPlatformType={trendPlatformType}
      />

      <div className="ml-2 flex justify-center">
        {/* platform */}
        {isPlatformPending ? (
          <div className="size-12">
            <SyncLoaderComponent size={10} />
          </div>
        ) : (
          <SelectPlatformDialog
            label={selectPlatformLabelName}
            variant="ghost"
            selectedPlatform={selectedPlatform}
            handleSelectPlatform={handleSearchPlatform}
          />
        )}
      </div>

      {/* category */}
      {/* language */}
      {/* site type */}
      {/* trend */}
      {/* status */}
    </div>
  );
};
