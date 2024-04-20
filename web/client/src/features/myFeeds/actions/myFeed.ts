"use server";

import { getFetch } from "@/lib/fetch";

type FetchMyFeedCountAPIResponse = {
  data: {
    count?: number;
    message: string;
  };
  status: number;
};

export const fetchMyFeedCountByMyFeedListIdAPI = async ({
  myFeedListId,
}: {
  myFeedListId: string;
}): Promise<FetchMyFeedCountAPIResponse> => {
  const url = `http://localhost:80/api/myfeeds/count/by-myfeed-list-id?myFeedListId=${myFeedListId}`;

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
