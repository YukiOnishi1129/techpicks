import { CreateMyFeedListDialog } from "./Dialog";
import { fetchMyFeedListAPI } from "../actions/myFeedList";

export const MyFeedListTemplate = async () => {
  const res = await fetchMyFeedListAPI();
  const myFeedLists = res.data.myFeedLists;
  return (
    <div className="w-auto">
      <h1 className="0 mb-4 mt-8 text-2xl font-bold">Personal Feed List</h1>
      <div>
        <CreateMyFeedListDialog />
      </div>

      {/* Create New Feed Folder */}
      <div className="w-full border-b-2  py-4">
        {myFeedLists.length ? (
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
          <div>
            <CreateMyFeedListDialog />
          </div>
        )}
      </div>
    </div>
  );
};
