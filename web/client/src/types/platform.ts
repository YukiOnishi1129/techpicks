export type Platform = {
  id: string;
  name: string;
  siteUrl: string;
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
