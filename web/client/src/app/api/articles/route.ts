import { NextRequest, NextResponse } from "next/server";

import { getArticles } from "@/features/articles/repository/article";
import { getUser } from "@/features/users/actions/user";

import { ArticleTabType } from "@/types/article";
import { LanguageStatus } from "@/types/language";

export async function GET(req: NextRequest) {
  const user = await getUser();
  const searchParams = req.nextUrl.searchParams;
  const languageStatus = searchParams.get("languageStatus");
  const keyword = searchParams.get("keyword") || undefined;
  const offset = searchParams.get("offset");
  const feedIdList = searchParams.getAll("feedId");
  const status =
    typeof languageStatus === "string"
      ? (parseInt(languageStatus) as LanguageStatus)
      : 1;
  const tab = searchParams.get("tab") as ArticleTabType;

  const articles = await getArticles({
    userId: user?.id,
    languageStatus: status,
    keyword: keyword,
    feedIdList: feedIdList,
    offset: parseInt(offset || "1"),
    tab: tab,
  });

  if (articles.length === 0) {
    return NextResponse.json(
      {
        articles: [],
        message: "No articles found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      articles: articles,
      message: "success",
    },
    {
      status: 200,
    }
  );
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   const languageStatus =
//     typeof req.query?.languageStatus === "string"
//       ? (parseInt(req.query.languageStatus) as LanguageStatus)
//       : 1;
//   const articles = await getArticles({ languageStatus });
//   res.status(200).json({ data: articles, message: "success" });
// }
