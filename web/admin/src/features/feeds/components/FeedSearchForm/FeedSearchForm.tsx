"use client";

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

import { FeedSearchKeyword } from "./FeedSearchKeyword";
import { FeedSearchLanguageSelect } from "./FeedSearchLanguageSelect";
import { FeedSearchResetButton } from "./FeedSearchResetButton";
import { FeedSearchTrendPlatformTypeSelect } from "./FeedSearchTrendPlatformTypeSelect";
import { useRedirectPage } from "../../hooks/useRedirectPage";
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
  const { redirectPage } = useRedirectPage();
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
    if (platformId) {
      fetchPlatform(platformId);
    } else {
      setSelectedPlatform(undefined);
    }
    if (categoryId) {
      fetchCategory(categoryId);
    } else {
      setSelectedCategory(undefined);
    }
  }, [fetchPlatform, fetchCategory, platformId, categoryId]);

  return (
    <div className="grid grid-cols-4 gap-4 border-b px-4 py-2">
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
            variant="secondary"
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
            variant="secondary"
            selectedCategory={selectedCategory}
            handleSelectCategory={handleSearchCategory}
          />
        )}
      </div>
      {/* language */}
      <div className="ml-2">
        <FeedSearchLanguageSelect
          keyword={keyword}
          language={language}
          platformSiteType={platformSiteType}
          platformId={platformId}
          categoryId={categoryId}
          trendPlatformType={trendPlatformType}
        />
      </div>
      {/* site type */}
      <div className="ml-2"></div>
      {/* trend */}
      <div className="ml-2">
        <FeedSearchTrendPlatformTypeSelect
          keyword={keyword}
          language={language}
          platformId={platformId}
          categoryId={categoryId}
          platformSiteType={platformSiteType}
          trendPlatformType={trendPlatformType}
        />
      </div>
      {/* status */}
      <div className="ml-2"></div>
      {/* reset */}
      <div className="ml-2">
        <FeedSearchResetButton />
      </div>
    </div>
  );
};
