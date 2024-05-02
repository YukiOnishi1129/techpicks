"use server";

import { getFetch } from "@/lib/fetch";

import { MyFeedType } from "@/types/myFeed";

type FetchMyFeedsResponse = {
  data: {
    myFeeds: Array<MyFeedType>;
    message: string;
  };
  status: number;
};

export const fetchMyFeedsByMyFeedFolderIdAPI = async ({
  myFeedFolderId,
}: {
  myFeedFolderId: string;
}): Promise<FetchMyFeedsResponse> => {
  const url = `http://localhost:80/api/my-feeds/my-feed-folders/${myFeedFolderId}`;
  const response = await getFetch({
    url,
    tagName: "myFeed/myFeedFolders",
    cacheType: "no-store",
  });

  const data = await response.json();
  const status = response.status;

  if (status !== 200) {
    return {
      data: {
        myFeeds: [] as Array<MyFeedType>,
        message: data.message as string,
      },
      status: status,
    };
  }

  return {
    data: {
      myFeeds: data.myFeeds as Array<MyFeedType>,
      message: data.message as string,
    },
    status: status,
  };
};

export const fetchMyFeedById = async ({ id }: { id: string }) => {
  const url = `http://localhost:80/api/my-feeds/${id}`;

  const response = await getFetch({
    url,
    tagName: "myFeed",
    cacheType: "no-store",
  });

  const data = await response.json();
  const status = response.status;

  if (status !== 200) {
    return {
      data: {
        message: data.message as string,
      },
      status: status,
    };
  }

  return {
    data: {
      myFeed: data.myFeed as MyFeedType,
      message: data.message as string,
    },
    status: status,
  };
};

type FetchMyFeedCountAPIResponse = {
  data: {
    count?: number;
    message: string;
  };
  status: number;
};

export const fetchMyFeedCountByMyFeedFolderIdAndFeedIdAPI = async ({
  feedId,
  myFeedFolderId,
}: {
  feedId: string;
  myFeedFolderId: string;
}): Promise<FetchMyFeedCountAPIResponse> => {
  const url = `http://localhost:80/api/my-feeds/count/by-myfeed-list-and-feed-id?myFeedFolderId=${myFeedFolderId}&feedId=${feedId}`;

  const response = await getFetch({
    url,
    tagName: "myFeeds/count",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  return {
    data: {
      count: data?.count as number,
      message: data.message as string,
    },
    status,
  };
};
