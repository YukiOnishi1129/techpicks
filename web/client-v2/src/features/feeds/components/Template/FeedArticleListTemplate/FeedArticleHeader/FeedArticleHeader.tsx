"use client";
import { useQuery } from "@apollo/client";
import { FC } from "react";

import { useCheckImageExist } from "@/shared/hooks/useImage";
import { useStatusToast } from "@/shared/hooks/useStatusToast";

import { FeedArticleHeaderQuery } from "./FeedArticleHeaderQuery";
import { FeedArticleKeywordSearchForm } from "../../../Search";

type FeedArticleHeaderProps = {
  feedId: string;
  keywordList: Array<string>;
};

export const FeedArticleHeader: FC<FeedArticleHeaderProps> = ({
  feedId,
  keywordList,
}) => {
  const { successToast, failToast } = useStatusToast();

  const { data, loading, error } = useQuery(FeedArticleHeaderQuery, {
    variables: {
      input: {
        id: feedId,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const faviconImage = useCheckImageExist(data?.feed.platform.faviconUrl || "");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  //   const addStateFeedInMyFeedFolder = useCallback(
  //     (
  //       targetMyFeedFolder: MyFeedFolderType,
  //       myFeedId: string
  //     ): MyFeedFolderType => {
  //       const newMyFeedFolder: MyFeedFolderType = {
  //         ...targetMyFeedFolder,
  //         feeds: [
  //           ...targetMyFeedFolder.feeds,
  //           {
  //             id: showFeed.id,
  //             platformId: showFeed.platform.id,
  //             categoryId: showFeed.category.id,
  //             name: showFeed.name,
  //             description: showFeed.description,
  //             thumbnailUrl: showFeed.thumbnailUrl,
  //             siteUrl: showFeed.siteUrl,
  //             rssUrl: showFeed.rssUrl,
  //             apiQueryParam: showFeed.apiQueryParam,
  //             trendPlatformType: showFeed.trendPlatformType,
  //             createdAt: showFeed.createdAt,
  //             updatedAt: showFeed.updatedAt,
  //             category: {
  //               id: showFeed.category.id,
  //               type: showFeed.category.type,
  //               name: showFeed.category.name,
  //               createdAt: showFeed.category.createdAt,
  //               updatedAt: showFeed.category.updatedAt,
  //             },
  //             platform: {
  //               id: showFeed.platform.id,
  //               name: showFeed.platform.name,
  //               siteUrl: showFeed.platform.siteUrl,
  //               faviconUrl: showFeed.platform.faviconUrl,
  //               platformSiteType: showFeed.platform.platformSiteType,
  //               isEng: showFeed.platform.isEng,
  //               createdAt: showFeed.platform.createdAt,
  //               updatedAt: showFeed.platform.updatedAt,
  //             },
  //             myFeedId: myFeedId,
  //           },
  //         ],
  //       };
  //       return newMyFeedFolder;
  //     },
  //     [showFeed]
  //   );

  //   const handleCreateMyFeed = useCallback(
  //     async (myFeedFolderId: string, createdMyFeedFolder?: MyFeedFolderType) => {
  //       // login check
  //       const user = await getUser();
  //       if (!user) {
  //         failToast({
  //           description: "Please sign in to follow the feed",
  //         });
  //         await logoutToLoginPage();
  //         return;
  //       }

  //       // check count myFeed by myFeedFolderId and feedId
  //       const res = await fetchMyFeedCountByMyFeedFolderIdAndFeedIdAPI({
  //         feedId: showFeed.id,
  //         myFeedFolderId,
  //       });
  //       if (res.data?.count && res.data.count > 0) {
  //         failToast({
  //           description: "You are already following the feed",
  //         });
  //         return;
  //       }

  //       // create myFeed
  //       const createdData = await createMyFeed({
  //         userId: user.id,
  //         myFeedFolderId,
  //         feedId: showFeed.id,
  //       });
  //       if (!createdData) {
  //         failToast({
  //           description: "Failed to follow the feed",
  //         });
  //         return;
  //       }
  //       successToast({
  //         description: "Successfully followed the feed",
  //       });

  //       // state update
  //       if (!isFollowing) setIsFollowing(true);
  //       // add feed to myFeedFolder
  //       if (createdMyFeedFolder) {
  //         setShowMyFeedFolders((prev) => [
  //           ...prev,
  //           addStateFeedInMyFeedFolder(createdMyFeedFolder, createdData.id),
  //         ]);
  //         return createdData.id;
  //       }

  //       const targetMyFeedFolder = showMyFeedFolders.find(
  //         (myFeedFolder) => myFeedFolder.id === myFeedFolderId
  //       );
  //       if (targetMyFeedFolder) {
  //         setShowMyFeedFolders((prev) => [
  //           ...prev.filter((myFeedFolder) => myFeedFolder.id !== myFeedFolderId),
  //           addStateFeedInMyFeedFolder(targetMyFeedFolder, createdData.id),
  //         ]);
  //       }

  //       setShowFeed({
  //         ...showFeed,
  //         myFeeds: [
  //           ...(showFeed.myFeeds || []),
  //           {
  //             id: createdData.id,
  //             myFeedFolderId,
  //             userId: user.id,
  //             feedId: showFeed.id,
  //             createdAt: createdData.createdAt,
  //             updatedAt: createdData.updatedAt,
  //           },
  //         ],
  //       });

  //       return createdData.id;
  //     },
  //     [
  //       failToast,
  //       showFeed,
  //       isFollowing,
  //       successToast,
  //       showMyFeedFolders,
  //       addStateFeedInMyFeedFolder,
  //     ]
  //   );

  //   const handleCreatedMyFeedFolder = useCallback(
  //     async (myFeedFolderId: string) => {
  //       const res = await fetchMyFeedFolderByIdAPI(myFeedFolderId);
  //       const newMyFeedFolders = res.data.myFeedFolders;
  //       const id = await handleCreateMyFeed(myFeedFolderId, newMyFeedFolders);

  //       if (id) {
  //         successToast({
  //           description: "Successfully followed the feed",
  //         });
  //       }
  //     },
  //     [handleCreateMyFeed, successToast]
  //   );

  //   const handleRemoveMyFeed = useCallback(
  //     async (myFeedId: string, myFeedFolderId: string) => {
  //       const user = await getUser();
  //       if (!user) {
  //         failToast({
  //           description: "Please sign in to follow the feed",
  //         });
  //         await logoutToLoginPage();
  //         return;
  //       }

  //       // check count myFeed by myFeedId
  //       const targetId = await fetchMyFeedById({
  //         id: myFeedId,
  //       });
  //       if (!targetId) {
  //         failToast({
  //           description: "Failed to unfollow the feed",
  //         });
  //         return;
  //       }

  //       const id = await deleteMyFeed({
  //         id: myFeedId,
  //         userId: user.id,
  //       });

  //       if (!id) {
  //         failToast({
  //           description: "Failed to unfollow the feed",
  //         });
  //         return;
  //       }
  //       successToast({
  //         description: "Successfully unfollowed the feed",
  //       });

  //       // state update
  //       // remove feed from myFeedFolder
  //       const targetMyFeedFolder = showMyFeedFolders.find(
  //         (myFeedFolder) => myFeedFolder.id === myFeedFolderId
  //       );
  //       if (targetMyFeedFolder) {
  //         const newMyFeedFolder: MyFeedFolderType = {
  //           ...targetMyFeedFolder,
  //           feeds: targetMyFeedFolder.feeds.filter(
  //             (myFeed) => myFeed.id !== showFeed.id
  //           ),
  //         };
  //         setShowMyFeedFolders((prev) => [
  //           ...prev.filter((myFeedFolder) => myFeedFolder.id !== myFeedFolderId),
  //           newMyFeedFolder,
  //         ]);
  //       }

  //       if (showFeed?.myFeeds) {
  //         const newFeed: FeedType = {
  //           ...showFeed,
  //           myFeeds: showFeed.myFeeds.filter((myFeed) => myFeed.id !== myFeedId),
  //         };
  //         setShowFeed(newFeed);
  //         if (!newFeed?.myFeeds || newFeed.myFeeds.length === 0) {
  //           setIsFollowing(false);
  //         }
  //       }

  //       return id;
  //     },
  //     [successToast, failToast, showMyFeedFolders, showFeed]
  //   );

  return (
    <div className="flex justify-between">
      <div className="hidden w-4/5 md:block">
        <FeedArticleKeywordSearchForm
          feedId={feedId}
          keywordList={keywordList}
        />
      </div>
      <div className="flex w-auto items-center space-x-4 space-y-4 md:static md:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ml-2 w-12" src={faviconImage} alt="" />
        <div className="w-3/4">
          <h1 className="mb-4 line-clamp-3 text-base font-bold md:mb-0 md:text-2xl">
            {data?.feed.name}
          </h1>
        </div>
      </div>
      {/* {user && (
        <div className="flex justify-end pt-2">
          <FollowDropdownMenu
            isFollowing={isFollowing}
            feedId={showFeed.id}
            myFeedFolders={showMyFeedFolders}
            handleCreateMyFeed={handleCreateMyFeed}
            handleRemoveMyFeed={handleRemoveMyFeed}
            handleCreatedMyFeedFolder={handleCreatedMyFeedFolder}
          />
        </div>
      )} */}
    </div>
  );
};
