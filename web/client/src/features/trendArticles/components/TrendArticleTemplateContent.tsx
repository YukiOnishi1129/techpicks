import { User } from "@supabase/supabase-js";

import { ArticleLanguageSwitch } from "@/features/articles/components/Switch";

import { LanguageStatus } from "@/types/language";

import { TrendArticleList } from "./TrendArticleList";
import { fetchTrendArticlesAPI } from "../actions/trendArticles";

type TrendArticleListContentProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
  user: User | undefined;
};

export const TrendArticleTemplateContent = async ({
  languageStatus,
  keyword,
  platformIdList,
  user,
}: TrendArticleListContentProps) => {
  const tab = "trend";
  const res = await fetchTrendArticlesAPI({
    languageStatus: languageStatus.toString(),
    keyword,
    platformIdList,
    tab,
  });

  return (
    <>
      <div className="w-full border-b-2 bg-white py-4">
        <ArticleLanguageSwitch
          languageStatus={languageStatus}
          keyword={keyword}
          tab={tab}
        />
      </div>

      <TrendArticleList
        user={user}
        initialTrendArticles={res.data.trendArticles}
        languageStatus={languageStatus}
        keyword={keyword}
        platformIdList={platformIdList}
        tab={tab}
        fetchTrendArticles={fetchTrendArticlesAPI}
      />
    </>
  );
};
