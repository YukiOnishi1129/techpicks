import { PlatformType } from "./platform";

export type Article = {
  id: string;
  title: string;
  description: string;
  thumbnailURL: string;
  articleUrl: string;
  publishedAt: string;
  platform: ArticlePlatform;
  isEng: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export type ArticlePlatform = {
  id: string;
  name: string;
  platformType: PlatformType;
  siteUrl: string;
};
