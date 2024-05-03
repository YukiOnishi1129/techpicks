import { NextRequest, NextResponse } from "next/server";

import { getFavoriteArticleById } from "@/features/favoriteArticles/repository/favoriteArticle";
import { getUser } from "@/features/users/actions/user";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
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

  const favoriteArticle = await getFavoriteArticleById({
    id,
    userId: user.id,
  });

  return NextResponse.json(
    {
      favoriteArticle: favoriteArticle,
      message: "success",
    },
    {
      status: 200,
    }
  );
}
