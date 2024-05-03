import { NextRequest, NextResponse } from "next/server";

import { getFavoriteArticleFolders } from "@/features/favoriteArticleFolders/repository/favoriteArticleFolder";
import { getUser } from "@/features/users/actions/user";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      {
        favoriteArticleFolders: [],
        message: "User not found",
      },
      {
        status: 401,
      }
    );
  }

  const favoriteArticleFolders = await getFavoriteArticleFolders({
    userId: user?.id || "",
  });

  if (favoriteArticleFolders.length === 0) {
    return NextResponse.json(
      {
        favoriteArticleFolders: [],
        message: "No articles found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      favoriteArticleFolders: favoriteArticleFolders,
      message: "success",
    },
    {
      status: 200,
    }
  );
}
