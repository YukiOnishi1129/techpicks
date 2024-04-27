import { User } from "@supabase/supabase-js";
import { FC } from "react";

import { ArticleTabType } from "@/types/article";
import { LanguageStatus } from "@/types/language";

import { ArticleList } from "./ArticleList";
import { fetchArticlesAPI } from "../actions/article";

type ArticleTemplateContentProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
  user: User | undefined;
  tab: ArticleTabType;
};

export const ArticleTemplateContent: FC<ArticleTemplateContentProps> = async ({
  languageStatus = 1,
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
    <ArticleList
      user={user}
      initialArticles={res.data.articles}
      languageStatus={languageStatus}
      keyword={keyword}
      platformIdList={platformIdList}
      tab={tab}
      fetchArticles={fetchArticlesAPI}
    />
  );
};
