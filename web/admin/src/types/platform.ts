import { OriginCategoryType } from "./category";
import { OriginFeedType } from "./feed";

export type OriginPlatformType = {
  id: string;
  name: string;
  siteUrl: string;
  platformSiteType: number;
  faviconUrl: string;
  isEng: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export type PlatformType = OriginPlatformType & {
  feeds: Array<
    OriginFeedType & {
      category: OriginCategoryType;
    }
  >;
};

export type FetchPlatformsAPIResponse = {
  data: {
    platforms: Array<PlatformType>;
    message: string;
  };
  status: number;
};
