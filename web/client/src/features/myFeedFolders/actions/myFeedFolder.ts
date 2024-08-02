"use server";

import { getFetch } from "@/lib/fetch";

import {
  FetchMyFeedFolderAPIResponse,
  FetchMyFeedFolderByIdAPIResponse,
  MyFeedFolderType,
} from "@/types/myFeedFolder";

type FetchMyFeedFolderListAPIRequest = {
  keyword?: string;
};

export const fetchMyFeedFoldersAPI = async ({
  keyword,
}: FetchMyFeedFolderListAPIRequest): Promise<FetchMyFeedFolderAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/my-feed-folders`;
  if (keyword) {
    url += `?keyword=${keyword}`;
  }

  const response = await getFetch({
    url,
    tagName: "my-feed-folders",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;
  if (status === 401) {
    return {
      data: {
        myFeedFolders: [],
        message: data.message as string,
      },
      status: status,
    };
  }

  return {
    data: {
      myFeedFolders: data.myFeedFolders as MyFeedFolderType[],
      message: data.message as string,
    },
    status: status,
  };
};

export const fetchMyFeedFolderByIdAPI = async (
  id: string
): Promise<FetchMyFeedFolderByIdAPIResponse> => {
  const url = `${process.env.WEB_DOMAIN}/api/my-feed-folders/${id}`;
  const response = await getFetch({
    url,
    tagName: "my-feed-folder",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  if (status === 401) {
    return {
      data: {
        myFeedFolders: undefined,
        message: data.message as string,
      },
      status: status,
    };
  }

  if (status === 404) {
    return {
      data: {
        myFeedFolders: undefined,
        message: data.message as string,
      },
      status: status,
    };
  }

  return {
    data: {
      myFeedFolders: data?.myFeedFolders as MyFeedFolderType,
      message: data.message as string,
    },
    status: status,
  };
};
