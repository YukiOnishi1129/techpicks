"use server";

import { getFetch } from "@/lib/fetch";

import { BookmarkType } from "@/types/bookmark";

export type FetchBookmarkListAPIResponse = {
  data: {
    bookmarks: BookmarkType[];
    message: string;
  };
  status: number;
};

/**
 * Fetch Bookmark List API
 * @param languageStatus
 * @param keyword
 * @param offset
 * @param platformIdList
 */
export const fetchBookmarkListAPI = async ({
  languageStatus,
  keyword,
  offset = "1",
  platformSiteType,
  platformIdList,
}: {
  languageStatus?: string;
  keyword?: string;
  offset?: string;
  platformSiteType?: string;
  platformIdList: Array<string>;
}): Promise<FetchBookmarkListAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/bookmarks/?offset=${offset}`;
  if (languageStatus) {
    url += `&languageStatus=${languageStatus}`;
  }
  if (keyword) {
    url += `&keyword=${keyword}`;
  }
  if (platformSiteType) {
    url += `&platformSiteType=${platformSiteType}`;
  }
  if (platformIdList.length) {
    const platformIdPath = platformIdList
      .map((platformId) => `&platformId=${platformId}`)
      .join("");
    url += platformIdPath;
  }
  const response = await getFetch({
    url,
    tagName: "bookmarks",
    cacheType: "no-store",
  });
  const data = await response.json();

  return {
    data: {
      bookmarks: data.bookmarks as BookmarkType[],
      message: "success",
    },
    status: response.status,
  };
};

type FetchBookmarkCountAPIResponse = {
  data: {
    count?: number;
    message: string;
  };
  status: number;
};

/**
 * Fetch Bookmark By Id Count API
 * @param {bookmarkId: string}
 * @returns
 */
export const fetchBookmarkByIdCountAPI = async ({
  bookmarkId,
}: {
  bookmarkId: string;
}): Promise<FetchBookmarkCountAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/bookmarks/count/${bookmarkId}`;
  const response = await getFetch({
    url,
    tagName: "bookmarks/count",
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

/**
 * Fetch Bookmark Count By ArticleId API
 * @param {articleId: string}
 * @returns
 */
export const fetchBookmarkCountByArticleIdAPI = async ({
  articleId,
}: {
  articleId: string;
}): Promise<FetchBookmarkCountAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/bookmarks/count/by-article-id/?articleId=${articleId}`;
  const response = await getFetch({
    url,
    tagName: "bookmarks/count",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  return {
    data: {
      count: data?.count as number | undefined,
      message: data.message as string,
    },
    status,
  };
};

/**
 * Fetch Bookmark Count By ArticleUrl API
 * @param {articleUrl: string}
 * @returns
 */
export const fetchBookmarkCountByArticleUrlAPI = async ({
  articleUrl,
}: {
  articleUrl: string;
}): Promise<FetchBookmarkCountAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/bookmarks/count/by-article-url/?articleUrl=${articleUrl}`;
  const response = await getFetch({
    url,
    tagName: "bookmarks/count",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  return {
    data: {
      count: data?.count as number | undefined,
      message: data.message as string,
    },
    status,
  };
};

/**
 * Create Bookmark API
 */
// type CreateBookmarkAPIRequest = {
//   title: string;
//   description: string;
//   articleId?: string;
//   articleUrl: string;
//   publishedAt?: Date;
//   thumbnailURL: string;
//   platformId?: string;
//   platformName?: string;
//   platformUrl?: string;
//   platformFaviconUrl?: string;
//   isEng: boolean;
// };

// type CreateBookmarkAPIResponse = {
//   data: {
//     id: string;
//     message: string;
//   };
//   status: number;
// };

/**
 * Create Bookmark API
 * @param {CreateBookmarkAPIRequest}
 * @returns
 */
// export const createBookmarkAPI = async ({
//   title,
//   description,
//   articleId,
//   articleUrl,
//   publishedAt,
//   thumbnailURL,
//   platformId,
//   platformName,
//   platformUrl,
//   platformFaviconUrl,
//   isEng,
// }: CreateBookmarkAPIRequest): Promise<CreateBookmarkAPIResponse> => {
//   let url = `${process.env.WEB_DOMAIN}/api/bookmarks/`;
//   const response = await postFetch({
//     url,
//     body: {
//       title,
//       description,
//       articleId,
//       articleUrl,
//       publishedAt,
//       thumbnailURL,
//       platformId,
//       platformName,
//       platformUrl,
//       platformFaviconUrl,
//       isEng,
//     },
//   });
//   const data = await response.json();
//   const status = response.status;

//   console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
//   console.log(data);

//   return {
//     data: {
//       id: data.id as string,
//       message: data.message as string,
//     },
//     status,
//   };
// };

// /**
//  * Delete Bookmark API
//  */
// type DeleteBookmarkAPIResponse = {
//   data: {
//     message: string;
//   };
//   status: number;
// };

// /**
//  * Delete Bookmark API
//  * @param {bookmarkId: string}
//  * @returns
//  */
// export const deleteBookmarkAPI = async ({
//   bookmarkId,
// }: {
//   bookmarkId: string;
// }): Promise<DeleteBookmarkAPIResponse> => {
//   let url = `${process.env.WEB_DOMAIN}/api/bookmarks/${bookmarkId}`;
//   const response = await deleteFetch({
//     url,
//     tagName: "bookmarks/delete",
//     cacheType: "no-store",
//   });
//   const data = await response.json();
//   const status = response.status;
//   return {
//     data: {
//       message: data.message as string,
//     },
//     status,
//   };
// };
