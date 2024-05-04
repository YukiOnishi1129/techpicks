import { NextRequest, NextResponse } from "next/server";

import { getFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdAndArticleUrl } from "@/features/favoriteArticles/repository/favoriteArticle";
import { getUser } from "@/features/users/actions/user";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = req.nextUrl.searchParams;
  const { id } = params;
  const articleId = searchParams.get("articleId");
  const articleUrl = searchParams.get("articleUrl");

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
    await getFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdAndArticleUrl(
      {
        articleId: articleId,
        favoriteArticleFolderId: id,
        userId: user.id,
        articleUrl: articleUrl || "",
      }
    );

  return NextResponse.json(
    { count: count, message: "success" },
    {
      status: 200,
    }
  );
}
