export type Platform = {
  id: string;
  name: string;
  rssUrl: string;
  siteUrl: string;
  platformType: PlatformType;
  isEng: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export type PlatformType = {
  PlatformTypeSite: 0;
  PlatformTypeCompany: 1;
};
