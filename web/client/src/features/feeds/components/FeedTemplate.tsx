import { fetchMyFeedListAPI } from "@/features/myFeedLists/actions/myFeedList";

import { FeedList } from "./FeedList";
import { fetchFeedsAPI } from "../actions/feed";

export const FeedTemplate = async () => {
  const res = await fetchFeedsAPI({});
  const resMyFeedList = await fetchMyFeedListAPI();
  return (
    <div className="w-auto">
      <h1 className="mb-4 mt-8 text-2xl font-bold text-gray-800">Feed List</h1>
      <div className="w-full border-b-2 bg-white py-4"></div>

      {res.data.feeds.length === 0 && <div />}
      {res.data.feeds.length > 0 && (
        <FeedList
          initialFeeds={res.data.feeds}
          myFeedLists={resMyFeedList.data.myFeedLists}
          fetchFeedsAPI={fetchFeedsAPI}
        />
      )}
    </div>
  );
};
