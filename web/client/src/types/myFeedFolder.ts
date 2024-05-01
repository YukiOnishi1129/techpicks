import {
  myFeedFolder as PrismaMMyFeedFolder,
  Platform as PrismaPlatform,
  Feed as PrismaFeed,
  Category as PrismaCategory,
} from "@prisma/client";

export type MyFeedFolderType = Omit<PrismaMMyFeedFolder, "userId"> & {
  feeds: Array<
    Omit<
      PrismaFeed,
      | "platformId"
      | "categoryId"
      | "rssUrl"
      | "createdAt"
      | "updatedAt"
      | "deletedAt"
    > & {
      category: Omit<PrismaCategory, "createdAt" | "updatedAt" | "deletedAt">;
      platform: Omit<PrismaPlatform, "createdAt" | "updatedAt" | "deletedAt">;
      myFeedId: string;
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