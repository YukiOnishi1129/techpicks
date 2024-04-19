import { FeedList } from "./FeedList";
import { fetchFeedsAPI } from "../actions/feed";

export const FeedTemplate = async () => {
  const res = await fetchFeedsAPI({});
  return (
    <div className="w-auto">
      <h1 className="mb-4 mt-8 text-2xl font-bold text-gray-800">Feed List</h1>
      <div className="w-full border-b-2 bg-white py-4"></div>

      <FeedList initialFeeds={res.data.feeds} fetchFeedsAPI={fetchFeedsAPI} />
    </div>
  );
};
