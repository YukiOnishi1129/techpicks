import { NextRequest } from "next/server";

import { getBookmarkList } from "@/features/bookmarks/repository/bookmark";

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

  const bookmarks = await getBookmarkList({
    languageStatus: status,
    keyword: keyword,
    platformIdList: platformIdList,
    offset: parseInt(offset || "1"),
  });
  return Response.json(
    { bookmarks: bookmarks, message: "success" },
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
