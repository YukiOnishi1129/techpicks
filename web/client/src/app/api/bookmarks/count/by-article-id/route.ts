import { NextRequest, NextResponse } from "next/server";

import { getBookmarkCountByArticleId } from "@/features/bookmarks/repository/bookmark";
import { getUser } from "@/features/users/actions/user";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
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

  const count = await getBookmarkCountByArticleId({
    articleId: articleId || "",
    userId: user.id,
  });

  return NextResponse.json(
    { count: count, message: "success" },
    {
      status: 200,
    }
  );
}
