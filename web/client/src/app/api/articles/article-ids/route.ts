import { NextRequest, NextResponse } from "next/server";

import { getArticlesByIds } from "@/features/articles/repository/article";

import { ArticleTabType } from "@/types/article";
import { LanguageStatus } from "@/types/language";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const articleIds = searchParams.getAll("articleId");
  const languageStatus = searchParams.get("languageStatus");
  const keyword = searchParams.get("keyword") || undefined;
  const offset = searchParams.get("offset");
  const platformIdList = searchParams.getAll("platformId");
  const status =
    typeof languageStatus === "string"
      ? (parseInt(languageStatus) as LanguageStatus)
      : 1;
  const tab = searchParams.get("tab") as ArticleTabType;

  const articles = await getArticlesByIds({
    articleIds: articleIds,
    languageStatus: status,
    keyword: keyword,
    platformIdList: platformIdList,
    offset: parseInt(offset || "1"),
    tab: tab,
  });

  if (articles.length === 0) {
    return NextResponse.json(
      {
        articles: [],
        message: "No articles found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      articles: articles,
      message: "success",
    },
    {
      status: 200,
    }
  );
}
