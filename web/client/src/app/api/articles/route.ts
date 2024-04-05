import { NextRequest } from "next/server";

import { getArticles } from "@/features/articles/repository/article";

import { LanguageStatus } from "@/types/language";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const languageStatus = searchParams.get("languageStatus");
  const keyword = searchParams.get("keyword") || undefined;
  const offset = searchParams.get("offset");
  const platformIdList = searchParams.getAll("platformId");
  const status =
    typeof languageStatus === "string"
      ? (parseInt(languageStatus) as LanguageStatus)
      : 1;

  const articles = await getArticles({
    languageStatus: status,
    keyword: keyword,
    platformIdList: platformIdList,
    offset: parseInt(offset || "1"),
  });
  return Response.json(
    { articles: articles, message: "success" },
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
