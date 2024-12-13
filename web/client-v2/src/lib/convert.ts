import { PlatformSiteType } from "@/types/platform";

export const convertPlatformSiteType = (siteType: string): PlatformSiteType => {
  switch (Number(siteType)) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    default:
      return 0;
  }
};
