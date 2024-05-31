import { OriginArticleType } from "./article";
import { OriginFeedType } from "./feed";
import { OriginMyFeedFolderType } from "./myFeedFolder";

export type OriginMyFeedType = {
  id: string;
  userId: string;
  feedId: string;
  myFeedFolderId: string;
  createdAt: string;
  updatedAt: string;
};

export type MyFeedType = OriginMyFeedType & {
  feed: OriginFeedType;
  myFeedFolder: OriginMyFeedFolderType;
  articles: Array<OriginArticleType>;
};
