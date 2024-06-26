import { OriginFeedType } from "./feed";
import { OriginPlatformType } from "./platform";

export type OriginCategoryType = {
  id: string;
  name: string;
  type: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export type CategoryType = OriginCategoryType & {
  feeds: Array<
    OriginFeedType & {
      platform: OriginPlatformType;
    }
  >;
};

export type FetchCategoriesAPIResponse = {
  data: {
    categories: Array<CategoryType>;
    message: string;
  };
  status: number;
};

export type FetchCategoryAPIResponse = {
  data: {
    category: CategoryType;
    message: string;
  };
  status: number;
};
