"use server";

import { getFetch } from "@/lib/fetch";

import { ArticleType } from "@/types/article";

type FetchFeedArticleRelationsToArticlesAPIRequest = {
  offset?: string;
  keyword?: string;
  language?: string;
  feedId?: string;
};

export const fetchFeedArticleRelationsToArticlesAPI = async ({
  offset = "1",
  keyword,
  language,
  feedId,
}: FetchFeedArticleRelationsToArticlesAPIRequest) => {
  let url = `${process.env.WEB_DOMAIN}/api/feedArticleRelations/articles/?offset=${offset}`;

  if (keyword) {
    url += `&keyword=${keyword}`;
  }
  if (language) {
    url += `&language=${language}`;
  }
  if (feedId) {
    url += `&feedId=${feedId}`;
  }

  const res = await getFetch({
    url: url,
    tagName: "feedArticleRelations/articles",
    cacheType: "no-store",
  });
  const data = await res.json();
  const status = res.status;
  return {
    data: {
      articles: data.articles as Array<ArticleType>,
      message: "success",
    },
    status,
  };
};
