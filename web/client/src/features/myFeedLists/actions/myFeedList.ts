"use server";

import { getFetch } from "@/lib/fetch";

import { MyFeedListType } from "@/types/myFeedList";

export type FetchMyFeedListAPIResponse = {
  data: {
    myFeedLists: MyFeedListType[];
    message: string;
  };
  status: number;
};

export const fetchMyFeedListAPI = async () => {
  const url = `http://localhost:80/api/myfeed-lists`;
  const response = await getFetch({
    url,
    tagName: "myfeed-list",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  if (status === 401) {
    return {
      data: {
        myFeedLists: [],
        message: data.message as string,
      },
      status: status,
    };
  }

  return {
    data: {
      myFeedLists: data.myFeedLists as MyFeedListType[],
      message: data.message as string,
    },
    status: status,
  };
};

export type FetchMyFeedListByIdAPIResponse = {
  data: {
    myFeedList?: MyFeedListType;
    message: string;
  };
  status: number;
};

export const fetchMyFeedListById = async (id: string) => {
  const url = `http://localhost:80/api/myfeed-lists/${id}`;
  const response = await getFetch({
    url,
    tagName: "myfeed-list",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  if (status === 401) {
    return {
      data: {
        myFeedList: undefined,
        message: data.message as string,
      },
      status: status,
    };
  }

  if (status === 404) {
    return {
      data: {
        myFeedList: undefined,
        message: data.message as string,
      },
      status: status,
    };
  }

  return {
    data: {
      myFeedList: data?.myFeedList as MyFeedListType,
      message: data.message as string,
    },
    status: status,
  };
};