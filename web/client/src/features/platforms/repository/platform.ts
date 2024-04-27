"use server";

import prisma from "@/lib/prisma";

import { LanguageStatus } from "@/types/language";
import { Platform, PlatformType } from "@/types/platform";

export type GetPlatformParams = {
  languageStatus?: LanguageStatus;
  platformType?: PlatformType;
  platformIdList?: Array<string>;
};

export const getPlatforms = async ({
  languageStatus = 1,
  platformType,
  platformIdList,
}: GetPlatformParams) => {
  let where = {};
  if (languageStatus === 1 || languageStatus === 2) {
    where = {
      ...where,
      isEng: languageStatus === 2,
    };
  }

  if (platformType) {
    where = {
      ...where,
      platformType: platformType,
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
      platformType: true,
      siteUrl: true,
      faviconUrl: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: [{ platformType: "asc" }, { name: "asc" }],
  });

  const platforms: Array<Platform> = res.map((platform) => {
    return {
      id: platform.id,
      name: platform.name,
      siteUrl: platform.siteUrl,
      faviconUrl: platform.faviconUrl,
      platformType: platform.platformType,
      isEng: platform.isEng,
      createdAt: platform.createdAt,
      updatedAt: platform.updatedAt,
    };
  });

  return platforms;
};
