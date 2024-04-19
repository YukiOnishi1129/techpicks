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

export const fetchMyFeedList = async () => {
  const url = `http://localhost:80/api/myfeed-list`;
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
        message: "unauthorized",
      },
      status: status,
    };
  }
  if (status === 200) {
    return {
      data: {
        myFeedLists: data.myFeedLists as MyFeedListType[],
        message: "success",
      },
      status: status,
    };
  }
};
