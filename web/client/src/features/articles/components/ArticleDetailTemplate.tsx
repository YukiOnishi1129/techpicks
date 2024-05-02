import { FC } from "react";

import { getUser } from "@/features/users/actions/user";

import { NotFoundList } from "@/components/layout/NotFoundList";

import { ArticleDetail } from "./ArticleDetail";
import { fetchArticleByIdAPI } from "../actions/article";

type ArticleDetailTemplateProps = {
  id: string;
};

export const ArticleDetailTemplate: FC<ArticleDetailTemplateProps> = async ({
  id,
}) => {
  const res = await fetchArticleByIdAPI(id);
  const user = await getUser();

  const article = res.data.article;
  return (
    <>
      {article ? (
        <ArticleDetail article={article} user={user} />
      ) : (
        <NotFoundList message="" />
      )}
    </>
  );
};
