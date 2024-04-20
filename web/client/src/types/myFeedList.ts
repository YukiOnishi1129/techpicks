import {
  MyFeedList as PrismaMyFeedList,
  Platform as PrismaPlatform,
  Feed as PrismaFeed,
  Category as PrismaCategory,
} from "@prisma/client";

export type MyFeedListType = Omit<PrismaMyFeedList, "userId"> & {
  feeds: Array<
    Omit<PrismaFeed, "platformId" | "categoryId" | "rssUrl" | "deletedAt"> & {
      category: PrismaCategory;
      platform: Omit<PrismaPlatform, "deletedAt">;
    }
  >;
  profile: {
    id: string;
    name: string;
    email: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type FetchMyFeedListAPIResponse = {
  data: {
    myFeedLists: MyFeedListType[];
    message: string;
  };
  status: number;
};

export type FetchMyFeedListByIdAPIResponse = {
  data: {
    myFeedList?: MyFeedListType;
    message: string;
  };
  status: number;
};
