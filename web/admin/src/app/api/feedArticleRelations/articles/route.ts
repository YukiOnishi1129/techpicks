import { NextRequest, NextResponse } from "next/server";

import { getFeedArticleRelationsToArticles } from "@/features/feedArticleRelations/repository/feedArticleRelation";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get("keyword") || undefined;
  const offset = searchParams.get("offset");
  const language = searchParams.get("language") || undefined;
  const feedId = searchParams.get("feedId") || undefined;
  const articles = await getFeedArticleRelationsToArticles({
    keyword: keyword,
    offset: parseInt(offset || "1"),
    language: language,
    feedId: feedId,
  });
  return NextResponse.json(
    {
      articles: articles,
      message: "Success",
    },
    {
      status: 200,
    }
  );
}
