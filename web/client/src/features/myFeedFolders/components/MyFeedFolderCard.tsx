import { FC } from "react";

import { MyFeedFolderType } from "@/types/myFeedFolder";

import { UpdateMyFeedFolderDialog } from "./Dialog/UpdateMyFeedFolderDialog";

type MyFeedFolderCardProps = {
  myFeedFolder: MyFeedFolderType;
  handleUpdateMyFeedFolder: ({
    id,
    title,
    description,
    feedIdList,
  }: {
    id: string;
    title: string;
    description: string;
    feedIdList: Array<string>;
  }) => Promise<void>;
  handleDeleteMyFeedFolder: (id: string) => Promise<void>;
};

export const MyFeedFolderCard: FC<MyFeedFolderCardProps> = ({
  myFeedFolder,
  handleUpdateMyFeedFolder,
  handleDeleteMyFeedFolder,
}) => {
  return (
    <div className="mb-4">
      <div className="h-[340px] w-full cursor-pointer rounded border-2 px-4 py-2">
        <div className="mb-2 flex h-[48px] w-full items-center justify-between border-b-2 pb-2">
          <h3 className="truncate px-2 text-left text-base font-bold tracking-wide md:text-xl">
            {myFeedFolder.title}
          </h3>
          <UpdateMyFeedFolderDialog
            myFeedFolderId={myFeedFolder.id}
            title={myFeedFolder.title}
            description={myFeedFolder?.description || ""}
            feedIdList={[...myFeedFolder.feeds.map((feed) => feed.id)]}
            handleUpdateMyFeedFolder={handleUpdateMyFeedFolder}
            handleDeleteMyFeedFolder={handleDeleteMyFeedFolder}
          />
        </div>

        <p className="line-clamp-3 h-[62px] w-full text-sm">
          {myFeedFolder.description}
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {myFeedFolder.feeds.map((feed, i) => {
            return (
              <div key={`${myFeedFolder}-${feed.id}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-8"
                  src={feed.platform.faviconUrl}
                  alt={feed.name}
                />
                <span>{feed.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
