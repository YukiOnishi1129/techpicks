import { fetchMyFeedListAPI } from "../actions/myFeedList";

export const MyFeedListTemplate = async () => {
  const res = await fetchMyFeedListAPI();
  const myFeedLists = res.data.myFeedLists;
  return (
    <div className="w-auto">
      <h1 className="mb-4 mt-8 text-2xl font-bold text-gray-800">
        Personal Feed List
      </h1>

      {/* Create New Feed Folder */}
      <div className="w-full border-b-2 bg-white py-4">
        {myFeedLists ? (
          <div>
            {myFeedLists.map((myFeedList) => {
              return (
                <div key={myFeedList.id}>
                  <div>{myFeedList.title}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>{/* TODO: create new feed */}</div>
        )}
      </div>
    </div>
  );
};
