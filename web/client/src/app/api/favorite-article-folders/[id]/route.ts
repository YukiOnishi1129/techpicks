import { NextRequest, NextResponse } from "next/server";

import { getFavoriteArticleFolderById } from "@/features/favoriteArticleFolders/repository/favoriteArticleFolder";
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

  const favoriteArticleFolder = await getFavoriteArticleFolderById({
    id,
    userId: user.id,
  });

  return NextResponse.json(
    {
      favoriteArticleFolder: favoriteArticleFolder,
      message: "success",
    },
    {
      status: 200,
    }
  );
}
