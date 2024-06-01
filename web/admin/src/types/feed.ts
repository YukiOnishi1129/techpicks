export type OriginFeedType = {
  id: string;
  platformId: string;
  categoryId: string;
  name: string;
  description: string;
  rssUrl: string;
  siteUrl: string;
  thumbnailUrl: string;
  trendPlatformType: number;
  apiQueryParam?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};
