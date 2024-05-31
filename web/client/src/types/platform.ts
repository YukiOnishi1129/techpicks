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

export type PlatformType = OriginPlatformType;

export type PlatformSiteType =
  | PlatformTypeUnknown
  | PlatformTypeSite
  | PlatformTypeCompany
  | PlatformTypeSummary;

type PlatformTypeUnknown = 0;
type PlatformTypeSite = 1;
type PlatformTypeCompany = 2;
type PlatformTypeSummary = 3;
