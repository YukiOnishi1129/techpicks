import { NextRequest, NextResponse } from "next/server";

import { getBookmarkCountByArticleUrl } from "@/features/bookmarks/repository/bookmark";
import { getUser } from "@/features/users/actions/user";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
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

  const count = await getBookmarkCountByArticleUrl({
    articleUrl: articleUrl || "",
    userId: user?.id || "",
  });

  return NextResponse.json(
    { count: count, message: "success" },
    {
      status: 200,
    }
  );
}
