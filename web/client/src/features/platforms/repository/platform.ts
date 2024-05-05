"use server";

import prisma from "@/lib/prisma";

import { LanguageStatus } from "@/types/language";
import { PlatformType, PlatformSiteType } from "@/types/platform";

export type GetPlatformParams = {
  languageStatus?: LanguageStatus;
  platformSiteType?: PlatformSiteType;
  platformIdList?: Array<string>;
};

export const getPlatforms = async ({
  languageStatus = 1,
  platformSiteType,
  platformIdList,
}: GetPlatformParams) => {
  let where = {};
  where = {
    ...where,
    deletedAt: null,
  };
  if (languageStatus === 1 || languageStatus === 2) {
    where = {
      ...where,
      isEng: languageStatus === 2,
    };
  }

  if (platformSiteType) {
    where = {
      ...where,
      platformSiteType: platformSiteType,
    };
  }

  if (platformIdList?.length) {
    where = {
      ...where,
      id: {
        in: [...platformIdList],
      },
    };
  }

  const res = await prisma.platform.findMany({
    where,
    select: {
      id: true,
      name: true,
      isEng: true,
      platformSiteType: true,
      siteUrl: true,
      faviconUrl: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: [{ platformSiteType: "asc" }, { name: "asc" }],
  });

  const platforms: Array<PlatformType> = res.map((platform) => {
    return {
      id: platform.id,
      name: platform.name,
      siteUrl: platform.siteUrl,
      faviconUrl: platform.faviconUrl,
      platformSiteType: platform.platformSiteType,
      isEng: platform.isEng,
      createdAt: platform.createdAt,
      updatedAt: platform.updatedAt,
    };
  });

  return platforms;
};
