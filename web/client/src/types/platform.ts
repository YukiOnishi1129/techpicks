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

export type PlatformType = 0 | 1 | 2;
