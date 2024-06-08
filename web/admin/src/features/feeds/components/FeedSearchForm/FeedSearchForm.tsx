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

import { fetchCategoryByIdAPI } from "@/features/categories/actions/category";
import { fetchPlatformByIdAPI } from "@/features/platforms/actions/platform";

import { SyncLoaderComponent } from "@/components/ui/loader";

import { CategoryType } from "@/types/category";
import { PlatformType } from "@/types/platform";

import { serverRevalidatePage } from "@/actions/serverAction";

import { FeedSearchKeyword } from "./FeedSearchKeyword";
import { SelectCategoryDialog } from "../SelectCategoryDialog";
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
  const [isCategoryPending, startCategoryTransition] = useTransition();

  const [selectedPlatform, setSelectedPlatform] = useState<
    PlatformType | undefined
  >(undefined);

  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | undefined
  >(undefined);

  const selectPlatformLabelName = useMemo(() => {
    return selectedPlatform?.name || "Platform";
  }, [selectedPlatform]);

  const selectCategoryName = useMemo(() => {
    return selectedCategory?.name || "Category";
  }, [selectedCategory]);

  const fetchPlatform = useCallback(async (targetPlatformId: string) => {
    startPlatformTransition(async () => {
      const resPlatform = await fetchPlatformByIdAPI(targetPlatformId);
      if (!resPlatform.data.platform) return;
      setSelectedPlatform(resPlatform.data.platform);
    });
  }, []);

  const fetchCategory = useCallback(async (targetCategoryId: string) => {
    startCategoryTransition(async () => {
      const resCategory = await fetchCategoryByIdAPI(targetCategoryId);
      if (!resCategory.data.category) return;
      setSelectedCategory(resCategory.data.category);
    });
  }, []);

  const redirectPage = useCallback(
    async (
      targetKeyword?: string,
      targetLanguage?: string,
      targetPlatformSiteType?: string,
      targetPlatformId?: string,
      targetCategoryId?: string,
      targetTrendPlatformTypePath?: string
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

      await serverRevalidatePage(
        `/feed?$offset=1${keywordPath}${languagePath}${platformSiteTypePath}${platformIdPath}${categoryIdPath}${trendPlatformTypePath}`
      );
      router.replace(
        `/feed?$offset=1${keywordPath}${languagePath}${platformSiteTypePath}${platformIdPath}${categoryIdPath}${trendPlatformTypePath}`
      );
    },
    []
  );

  const handleSearchPlatform = useCallback(
    async (targetPlatformId: string) => {
      await redirectPage(
        keyword,
        language,
        platformSiteType,
        targetPlatformId,
        categoryId,
        trendPlatformType
      );
    },
    [
      keyword,
      language,
      platformSiteType,
      categoryId,
      trendPlatformType,
      redirectPage,
    ]
  );

  const handleSearchCategory = useCallback(
    async (targetCategoryId: string) => {
      await redirectPage(
        keyword,
        language,
        platformSiteType,
        platformId,
        targetCategoryId,
        trendPlatformType
      );
    },
    [
      keyword,
      language,
      platformSiteType,
      platformId,
      trendPlatformType,
      redirectPage,
    ]
  );

  useEffect(() => {
    if (platformId) fetchPlatform(platformId);
    if (categoryId) fetchCategory(categoryId);
  }, [fetchPlatform, fetchCategory, platformId, categoryId]);

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
      <div className="ml-2">
        {isCategoryPending ? (
          <div className="size-12">
            <SyncLoaderComponent size={10} />
          </div>
        ) : (
          <SelectCategoryDialog
            label={selectCategoryName}
            variant="ghost"
            selectedCategory={selectedCategory}
            handleSelectCategory={handleSearchCategory}
          />
        )}
      </div>
      {/* language */}
      {/* site type */}
      {/* trend */}
      {/* status */}
    </div>
  );
};
