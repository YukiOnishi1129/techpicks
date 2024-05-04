import { NextRequest, NextResponse } from "next/server";

import { getFavoriteArticleCountByFolderIdAndArticleUrl } from "@/features/favoriteArticles/repository/favoriteArticle";
import { getUser } from "@/features/users/actions/user";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const searchParams = req.nextUrl.searchParams;
  const articleUrl = searchParams.get("articleUrl") || undefined;
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

  const favoriteArticleCount =
    await getFavoriteArticleCountByFolderIdAndArticleUrl({
      favoriteArticleFolderId: id,
      userId: user.id,
      articleUrl: articleUrl || "",
    });

  return NextResponse.json(
    {
      count: favoriteArticleCount,
      message: "success",
    },
    {
      status: 200,
    }
  );
}
