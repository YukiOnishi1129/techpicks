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
  "use server";

  let where = {};

  if (platformType) {
    where = {
      platformType: platformType,
      isEng: languageStatus === 2,
    };
  } else if (platformIdList && platformType) {
    where = {
      platformType: platformType,
      isEng: languageStatus === 2,
      id: {
        in: [...platformIdList],
      },
    };
  } else {
    where = {
      isEng: languageStatus === 2,
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
