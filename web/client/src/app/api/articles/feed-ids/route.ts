import { NextRequest, NextResponse } from "next/server";

import { getArticlesByFeedIds } from "@/features/articles/repository/article";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const feedIds = searchParams.getAll("feedId");
  const keyword = searchParams.get("keyword") || undefined;
  const offset = searchParams.get("offset");

  const articles = await getArticlesByFeedIds({
    keyword: keyword,
    offset: parseInt(offset || "1"),
    feedIds: feedIds,
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
