import { NextRequest, NextResponse } from "next/server";

import { getPrivateArticlesByArticleUrl } from "@/features/articles/repository/article";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const articleUrl = searchParams.get("articleUrl") || undefined;

  const articles = await getPrivateArticlesByArticleUrl({
    articleUrl: articleUrl || "",
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
