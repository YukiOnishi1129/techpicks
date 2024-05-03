import { NextRequest, NextResponse } from "next/server";

import { getFavoriteArticleCountByFavoriteArticleFolderIdAndArticleId } from "@/features/favoriteArticles/repository/favoriteArticle";
import { getUser } from "@/features/users/actions/user";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const favoriteArticleFolderId = searchParams.get("favoriteArticleFolderId");
  const articleId = searchParams.get("articleId");

  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      {
        message: "unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const count =
    await getFavoriteArticleCountByFavoriteArticleFolderIdAndArticleId({
      articleId: articleId || "",
      favoriteArticleFolderId: favoriteArticleFolderId || "",
      userId: user.id,
    });

  return NextResponse.json(
    { count: count, message: "success" },
    {
      status: 200,
    }
  );
}
