"use client";
import { User } from "@supabase/supabase-js";
import { FC, useCallback, useRef, useState, useEffect } from "react";

import { NotFoundList } from "@/components/layout/NotFoundList";
import { Loader } from "@/components/ui/loader";

import {
  FetchMyFeedFolderAPIResponse,
  MyFeedFolderType,
} from "@/types/myFeedFolder";

import { CreateMyFeedFolderDialog } from "./Dialog";

type MyFeedFolderListProps = {
  initialMyFeedFolders: MyFeedFolderType[];
  user?: User;
  fetchMyFeedFoldersAPI({
    offset,
  }: {
    offset?: string;
  }): Promise<FetchMyFeedFolderAPIResponse>;
};

export const MyFeedFolderList: FC<MyFeedFolderListProps> = ({
  initialMyFeedFolders,
  user,
  fetchMyFeedFoldersAPI,
}) => {
  const observerTarget = useRef(null);

  const [myFeedFolders, setMyFeedFolders] =
    useState<MyFeedFolderType[]>(initialMyFeedFolders);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);

  const flatMyFeedFolders = myFeedFolders
    ? myFeedFolders.flatMap((myFeedFolder) => myFeedFolder)
    : [];

  const loadMore = useCallback(
    async (offset: number) => {
      const res = await fetchMyFeedFoldersAPI({
        offset: offset.toString(),
      });
      setMyFeedFolders((prev) => [...prev, ...res.data.myFeedFolders]);

      const count = res.data.myFeedFolders.length;
      setHashMore(count > 0);
    },
    [fetchMyFeedFoldersAPI]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hashMore) {
            setOffset((prev) => prev + 1);
          }
        });
      },
      { threshold: 1 }
    );

    let observerRefValue: null = null;

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
      observerRefValue = observerTarget.current;
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [hashMore]);

  useEffect(() => {
    setMyFeedFolders(initialMyFeedFolders);
  }, [initialMyFeedFolders]);

  useEffect(() => {
    if (offset > 1) {
      loadMore(offset);
    }
  }, [loadMore, offset, hashMore]);

  return (
    <>
      {flatMyFeedFolders.length === 0 ? (
        <div className="h-[590px] md:h-[540px]">
          <CreateMyFeedFolderDialog />
          <NotFoundList message="No articles found" />
        </div>
      ) : (
        <div className="m-auto h-[590px] overflow-y-scroll md:h-[540px]">
          {flatMyFeedFolders.map((myFeedFolder) => (
            <div key={myFeedFolder.id} className="mb-4">
              <p>{myFeedFolder.title}</p>
            </div>
          ))}
          <div ref={observerTarget}>
            {hashMore && (
              <div className="flex justify-center py-4">
                <Loader />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
