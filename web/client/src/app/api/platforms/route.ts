import { NextRequest } from "next/server";

import { getPlatforms } from "@/features/platforms/repository/platform";

import { LanguageStatus } from "@/types/language";
import { PlatformType } from "@/types/platform";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const languageStatus = searchParams.get("languageStatus");
  const platformType = searchParams.get("platformType");

  const status =
    typeof languageStatus === "string"
      ? (parseInt(languageStatus) as LanguageStatus)
      : 1;

  const type = platformType
    ? (parseInt(platformType) as PlatformType)
    : undefined;

  const platforms = await getPlatforms({
    languageStatus: status,
    platformType: type,
  });

  return Response.json(
    { platforms: platforms, message: "success" },
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
