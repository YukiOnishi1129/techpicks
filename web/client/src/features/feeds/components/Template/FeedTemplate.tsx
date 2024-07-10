import { FC } from "react";

import { fetchMyFeedFoldersAPI } from "@/features/myFeedFolders/actions/myFeedFolder";
import { FeedKeywordSearchInput } from "@/features/search/components/feeds/FeedKeywordSearchInput";
import { getUser } from "@/features/users/actions/user";

import { fetchFeedsAPI } from "../../actions/feed";
import { FeedList } from "../List/FeedList";

type FeedTemplateProps = {
  keyword?: string;
};

export const FeedTemplate: FC<FeedTemplateProps> = async ({ keyword }) => {
  const res = await fetchFeedsAPI({ keyword: keyword });
  const resMyFeedList = await fetchMyFeedFoldersAPI({});
  const user = await getUser();
  return (
    <div className="w-auto">
      <h1 className="hidden text-2xl font-bold md:mb-4 md:mt-8 md:block">
        Feed List
      </h1>
      <div className="mt-4 md:mt-0">
        <FeedKeywordSearchInput />
      </div>

      <div className="mt-4 md:mt-0">
        <FeedList
          user={user}
          keyword={keyword}
          initialFeeds={res.data.feeds}
          myFeedFolders={resMyFeedList.data.myFeedFolders}
          fetchFeedsAPI={fetchFeedsAPI}
        />
      </div>
    </div>
  );
};
