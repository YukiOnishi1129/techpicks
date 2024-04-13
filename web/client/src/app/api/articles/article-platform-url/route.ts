import { NextRequest } from "next/server";

import { getArticleByArticleAndPlatformUrl } from "@/features/articles/repository/article";
import { getUser } from "@/features/users/actions/user";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const articleUrl = searchParams.get("articleUrl");
  const platformUrl = searchParams.get("platformUrl");

  const user = await getUser();

  const article = await getArticleByArticleAndPlatformUrl({
    articleUrl: articleUrl || "",
    platformUrl: platformUrl || "",
    userId: user?.id,
  });

  return Response.json(
    { article: article, message: "success" },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
