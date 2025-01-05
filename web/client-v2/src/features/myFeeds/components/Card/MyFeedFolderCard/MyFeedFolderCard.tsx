"use client";
import { FragmentOf, readFragment } from "gql.tada";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

import { ShowMyFeedListDialog } from "@/features/feeds/components/Dialog";

import { useStatusToast } from "@/shared/hooks/useStatusToast";

import { MyFeedFolderCardFragment } from "./MyFeedFolderCardFragment";
import { UpdateMyFeedFolderDialog } from "../../Dialog";

const SHOW_FEED_LIST_COUNT = 3;

type MyFeedFolderCardProps = {
  data: FragmentOf<typeof MyFeedFolderCardFragment>;
  feedsEndCursor?: string;
};

export const MyFeedFolderCard: FC<MyFeedFolderCardProps> = ({
  data,
  feedsEndCursor,
}) => {
  const { successToast, failToast } = useStatusToast();
  const pathname = usePathname();
  const fragment = readFragment(MyFeedFolderCardFragment, data);

  const showFeedList = fragment?.feeds
    ? fragment.feeds.slice(0, SHOW_FEED_LIST_COUNT)
    : [];
  const moreFeedsCount = fragment?.feeds
    ? fragment.feeds.length - SHOW_FEED_LIST_COUNT
    : 0;

  return (
    <div className="rounded border bg-primary-foreground">
      <div className="grid w-full gap-4 px-4 py-2">
        <div className="flex h-[48px] w-full items-center justify-between border-b pb-2">
          <h3 className="truncate px-2 text-left text-base font-bold tracking-wide md:text-xl">
            <Link href={`/my-feed/article/${fragment.id}`}>
              {fragment.title}
            </Link>
          </h3>

          <UpdateMyFeedFolderDialog
            data={fragment}
            feedsEndCursor={feedsEndCursor}
          />
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
        <div className="grid grid-cols-1 gap-4 py-2 md:grid-cols-2">
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
          {moreFeedsCount > 0 && (
            <ShowMyFeedListDialog
              data={fragment}
              buttonLabel={`More +${moreFeedsCount}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};
