import { NextRequest, NextResponse } from "next/server";

import {
  createBookmark,
  getBookmarkList,
} from "@/features/bookmarks/repository/bookmark";
import { getUser } from "@/features/users/actions/user";

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

  return NextResponse.json(
    {
      bookmarks: bookmarks,
      message: "success",
    },
    {
      status: 200,
    }
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    title,
    description,
    articleId,
    articleUrl,
    publishedAt,
    thumbnailURL,
    platformId,
    platformName,
    platformUrl,
    platformFaviconUrl,
    isEng,
  } = body;

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

  const bookmarkId = await createBookmark({
    title: title,
    description: description,
    articleId: articleId,
    articleUrl: articleUrl,
    publishedAt: publishedAt,
    thumbnailURL: thumbnailURL,
    isRead: false,
    userId: user.id,
    platformId: platformId,
    platformName: platformName,
    platformUrl: platformUrl,
    platformFaviconUrl: platformFaviconUrl,
    isEng: isEng,
  });

  return NextResponse.json(
    {
      id: bookmarkId,
      message: "success",
    },
    {
      status: 201,
    }
  );
}
