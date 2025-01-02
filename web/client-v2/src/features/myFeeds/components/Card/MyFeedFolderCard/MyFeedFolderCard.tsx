"use client";
import { FragmentOf, readFragment } from "gql.tada";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

// import { ShowMyFeedListDialog } from "@/features/myFeeds/components/Dialog";
// import {
//   CreateMyFeedDTO,
//   bulkCreateMyFeed,
//   bulkDeleteMyFeed,
// } from "@/features/myFeeds/repository/myFeed";

import { useStatusToast } from "@/hooks/useStatusToast";

import { MyFeedFolderCardFragment } from "./MyFeedFolderCardFragment";
import { UpdateMyFeedFolderDialog } from "../../Dialog";

// import { diffStringArray } from "@/lib/convert";

// import { FeedType } from "@/types/feed";
// import { MyFeedType } from "@/types/myFeed";
// import { MyFeedFolderType } from "@/types/myFeedFolder";

// import { serverRevalidatePage } from "@/actions/serverAction";

// import { UpdateMyFeedFolderDialog } from "../Dialog";

const SHOW_FEED_LIST_COUNT = 3;

type MyFeedFolderCardProps = {
  data: FragmentOf<typeof MyFeedFolderCardFragment>;
};

export const MyFeedFolderCard: FC<MyFeedFolderCardProps> = ({ data }) => {
  const { successToast, failToast } = useStatusToast();
  const pathname = usePathname();
  const fragment = readFragment(MyFeedFolderCardFragment, data);

  //   const selectedFeedList = myFeedFolder.feeds.map((feed) => {
  //     return {
  //       ...feed,
  //       myFeeds: [],
  //     };
  //   });
  //   const myFeeds: Array<Pick<MyFeedType, "id" | "feedId">> =
  //     myFeedFolder.feeds.map((feed) => {
  //       return {
  //         id: feed.myFeedId,
  //         feedId: feed.id,
  //       };
  //     });

  const showFeedList = fragment?.feeds
    ? fragment.feeds.slice(0, SHOW_FEED_LIST_COUNT)
    : [];
  const isMoreFeeds = fragment?.feeds
    ? fragment.feeds.length > SHOW_FEED_LIST_COUNT
    : false;

  return (
    <div className="mb-4 bg-primary-foreground">
      <div className="w-full rounded border-2 px-4 py-2">
        <div className="mb-2 flex h-[48px] w-full items-center justify-between border-b-2 pb-2">
          <h3 className="truncate px-2 text-left text-base font-bold tracking-wide md:text-xl">
            <Link href={`/my-feed/article/${fragment.id}`}>
              {fragment.title}
            </Link>
          </h3>

          <UpdateMyFeedFolderDialog data={fragment} />
        </div>

        {/* <p className="line-clamp-3 h-[62px] w-full text-sm">
          <Link href={`/my-feed-folder/${myFeedFolder.id}`}>
            {myFeedFolder?.description ? (
              myFeedFolder.description
            ) : (
              <span className="text-gray-500">{"No description"}</span>
            )}
          </Link>
        </p> */}
        <div className="grid grid-cols-1 gap-4 border-t-2 py-2 md:grid-cols-2">
          {showFeedList.map((feed) => {
            return (
              <div key={`${fragment.id}-${feed.id}`} className="mb-2">
                <Link href={`/my-feed/article/${fragment.id}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="h-8"
                    src={feed.platform.faviconUrl}
                    alt={feed.name}
                  />
                  <span className="line-clamp-2 block w-full pt-2 text-left text-sm font-bold tracking-wide">
                    {feed.name}
                  </span>
                </Link>
              </div>
            );
          })}
          {/* {moreFeedsCount > 0 && (
            <ShowMyFeedListDialog
              buttonLabel={`More +${moreFeedsCount}`}
              feeds={myFeedFolder.feeds}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};
