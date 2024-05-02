"use server";

import { getFetch } from "@/lib/fetch";

import {
  FetchMyFeedFolderAPIResponse,
  FetchMyFeedFolderByIdAPIResponse,
  MyFeedFolderType,
} from "@/types/myFeedFolder";

export const fetchMyFeedFoldersAPI =
  async (): Promise<FetchMyFeedFolderAPIResponse> => {
    const url = `http://localhost:80/api/my-feed-folders`;
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
  const url = `http://localhost:80/api/my-feed-folders/${id}`;
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
