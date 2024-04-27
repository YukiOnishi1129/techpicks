import { User } from "@supabase/supabase-js";
import { FC } from "react";

import { ArticleTabType } from "@/types/article";
import { LanguageStatus } from "@/types/language";

import { ArticleList } from "./ArticleList";
import { ArticleLanguageSwitch } from "./Switch";
import { fetchArticlesAPI } from "../actions/article";

type ArticleTemplateContentProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
  user: User | undefined;
  tab: ArticleTabType;
};

export const ArticleTemplateContent: FC<ArticleTemplateContentProps> = async ({
  languageStatus,
  keyword,
  platformIdList,
  user,
  tab,
}: ArticleTemplateContentProps) => {
  const res = await fetchArticlesAPI({
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

      <ArticleList
        user={user}
        initialArticles={res.data.articles}
        languageStatus={languageStatus}
        keyword={keyword}
        platformIdList={platformIdList}
        tab={tab}
        fetchArticles={fetchArticlesAPI}
      />
    </>
  );
};
