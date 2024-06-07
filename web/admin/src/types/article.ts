import { OriginCategoryType } from "./category";
import { OriginFeedType } from "./feed";
import { OriginPlatformType } from "./platform";

export type OriginArticleType = {
  id: string;
  platformId?: string;
  title: string;
  description: string;
  articleUrl: string;
  publishedAt?: string;
  thumbnailUrl: string;
  authorName?: string;
  tags?: string;
  isEng: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ArticleType = OriginArticleType & {
  platform: OriginPlatformType;
  feeds: Array<
    OriginFeedType & {
      category: OriginCategoryType;
    }
  >;
};
