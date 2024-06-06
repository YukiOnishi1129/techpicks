import { OriginArticleType } from "./article";
import { OriginCategoryType } from "./category";
import { OriginPlatformType } from "./platform";

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

export type FeedType = OriginFeedType & {
  category: OriginCategoryType;
  platform: OriginPlatformType;
  articles: Array<OriginArticleType>;
};

export type FetchFeedsAPIResponse = {
  data: {
    feeds: Array<FeedType>;
    message: string;
  };
  status: number;
};
