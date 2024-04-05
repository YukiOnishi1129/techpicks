export type Platform = {
  id: string;
  name: string;
  siteUrl: string;
  faviconUrl: string;
  platformType: number;
  isEng: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type PlatformType =
  | PlatformTypeUnknown
  | PlatformTypeSite
  | PlatformTypeCompany
  | PlatformTypeSummary;

type PlatformTypeUnknown = 0;
type PlatformTypeSite = 1;
type PlatformTypeCompany = 2;
type PlatformTypeSummary = 2;
