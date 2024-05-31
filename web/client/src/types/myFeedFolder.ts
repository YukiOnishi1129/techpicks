import { OriginCategoryType } from "./category";
import { OriginFeedType } from "./feed";
import { OriginPlatformType } from "./platform";
import { OriginProfileType } from "./profile";

export type OriginMyFeedFolderType = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type MyFeedFolderType = OriginMyFeedFolderType & {
  feeds: Array<
    OriginFeedType & {
      category: OriginCategoryType;
      platform: OriginPlatformType;
      myFeedId: string;
    }
  >;
  profile: OriginProfileType;
};

export type FetchMyFeedFolderAPIResponse = {
  data: {
    myFeedFolders: MyFeedFolderType[];
    message: string;
  };
  status: number;
};

export type FetchMyFeedFolderByIdAPIResponse = {
  data: {
    myFeedFolders?: MyFeedFolderType;
    message: string;
  };
  status: number;
};
