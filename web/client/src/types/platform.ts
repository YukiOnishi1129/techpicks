export type Platform = {
  id: string;
  name: string;
  rssUrl: string;
  siteUrl: string;
  platformType: PlatformType;
  isEng: boolean;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
};

export type PlatformType = {
  PlatformTypeSite: 0;
  PlatformTypeCompany: 1;
};
