export type Platform = {
  id: string;
  name: string;
  categoryName: string;
  rssUrl: string;
  siteUrl: string;
  platformType: PlatformType;
  isEng: boolean;
  faviconUrl: string;
  thumbnailUrl: string;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
};

export type PlatformType = {
  PlatformTypeSite: 0;
  PlatformTypeCompany: 1;
};
