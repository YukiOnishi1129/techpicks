import { FC } from "react";

import { MyFeedFolderType } from "@/types/myFeedFolder";

type MyFeedFolderCardProps = {
  myFeedFolder: MyFeedFolderType;
};

export const MyFeedFolderCard: FC<MyFeedFolderCardProps> = ({
  myFeedFolder,
}) => {
  return (
    <div className="mb-4">
      <div className="h-[340px] w-full cursor-pointer rounded border-2 px-4 py-2">
        <h3 className="h-[48px] truncate text-left text-base font-bold tracking-wide md:text-xl">
          {myFeedFolder.title}
        </h3>
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
