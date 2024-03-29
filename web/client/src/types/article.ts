import { PlatformType } from "./platform";

export type Article = {
  id: string;
  title: string;
  description: string;
  thumbnailURL: string;
  articleUrl: string;
  publishedAt: number;
  platform: ArticlePlatform;
  isEng: boolean;
  isPrivate: boolean;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
};

export type ArticlePlatform = {
  id: string;
  name: string;
  platformType: PlatformType;
  siteUrl: string;
};
