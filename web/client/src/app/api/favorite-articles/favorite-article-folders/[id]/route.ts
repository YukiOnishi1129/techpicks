import { NextRequest, NextResponse } from "next/server";

import { getFavoriteArticlesByFavoriteArticleFolderId } from "@/features/favoriteArticles/repository/favoriteArticle";
import { getUser } from "@/features/users/actions/user";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get("keyword") || undefined;
  const offset = searchParams.get("offset");
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      {
        favoriteArticleFolderId: [],
        message: "unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const favoriteArticles = await getFavoriteArticlesByFavoriteArticleFolderId({
    favoriteArticleFolderId: id,
    userId: user.id,
    keyword: keyword,
    offset: parseInt(offset || "1"),
  });

  return NextResponse.json(
    {
      favoriteArticles: favoriteArticles,
      message: "success",
    },
    {
      status: 200,
    }
  );
}
