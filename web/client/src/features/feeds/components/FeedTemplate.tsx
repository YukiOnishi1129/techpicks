import { fetchMyFeedFoldersAPI } from "@/features/myFeedFolders/actions/myFeedFolder";

import { FeedList } from "./FeedList";
import { fetchFeedsAPI } from "../actions/feed";

export const FeedTemplate = async () => {
  const res = await fetchFeedsAPI({});
  const resMyFeedList = await fetchMyFeedFoldersAPI();
  return (
    <div className="w-auto">
      <h1 className="hidden text-2xl font-bold md:mb-4 md:mt-8 md:block">
        Feed List
      </h1>

      <div className="mt-4 md:mt-0">
        <FeedList
          initialFeeds={res.data.feeds}
          myFeedFolders={resMyFeedList.data.myFeedFolders}
          fetchFeedsAPI={fetchFeedsAPI}
        />
      </div>
    </div>
  );
};
