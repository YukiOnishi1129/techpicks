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
    <div>
      <div className="fixed z-50 hidden w-[90%] bg-card md:block md:w-[70%] md:px-4">
        <h1 className="mt-4 text-2xl font-bold">Feed List</h1>
        <div className="mt-2 ">
          <FeedKeywordSearchInput keyword={keyword} />
        </div>
      </div>

      <div className="h-4 md:h-[120px]" />

      <FeedList
        user={user}
        keyword={keyword}
        initialFeeds={res.data.feeds}
        myFeedFolders={resMyFeedList.data.myFeedFolders}
        fetchFeedsAPI={fetchFeedsAPI}
      />
    </div>
  );
};
