import { NextRequest } from "next/server";

import { getPlatforms } from "@/features/platforms/repository/platform";

import { LanguageStatus } from "@/types/language";
import { PlatformSiteType } from "@/types/platform";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const languageStatus = searchParams.get("languageStatus");
  const platformSiteType = searchParams.get("platformSiteType");
  const platformIdList = searchParams.getAll("platformId");

  const status =
    typeof languageStatus === "string"
      ? (parseInt(languageStatus) as LanguageStatus)
      : 1;
  const type = platformSiteType
    ? (parseInt(platformSiteType) as PlatformSiteType)
    : undefined;

  const platforms = await getPlatforms({
    languageStatus: status,
    platformSiteType: type,
    platformIdList: platformIdList,
  });

  return Response.json(
    { platforms: platforms, message: "success" },
    {
      status: 200,
    }
  );
}
