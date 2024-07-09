import { FC } from "react";

import { fetchArticleByIdAPI } from "@/features/articles/actions/article";
import { getUser } from "@/features/users/actions/user";

import { NotFoundList } from "@/components/layout/NotFoundList";

import { ArticleDetail } from "../Detail";

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
