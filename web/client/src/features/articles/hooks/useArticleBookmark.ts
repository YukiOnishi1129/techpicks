import { useState, useCallback } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import {
  fetchBookmarkByIdCountAPI,
  fetchBookmarkCountByArticleIdAPI,
} from "@/features/bookmarks/actions/bookmark";
import {
  createBookmark,
  deleteBookmark,
} from "@/features/bookmarks/repository/bookmark";
import { getUser } from "@/features/users/actions/user";

import { useStatusToast } from "@/hooks/useStatusToast";

import { ArticleType } from "@/types/article";

export const useArticleBookmark = ({ article }: { article: ArticleType }) => {
  const { successToast, failToast } = useStatusToast();
  const [bookmarkId, setBookmarkId] = useState<string | undefined>(
    article.bookmarkId
  );

  const handleAddBookmark = useCallback(
    async (articleId: string) => {
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Fail: Please login to bookmark this article",
        });
        await logoutToLoginPage();
        return;
      }

      const { data } = await fetchBookmarkCountByArticleIdAPI({
        articleId: articleId,
      });
      if (data?.count && data.count > 0) {
        failToast({
          description: "Fail: This article is already bookmarked",
        });
        return;
      }

      const newData = await createBookmark({
        title: article.title,
        description: article.description,
        articleId: article.id,
        articleUrl: article.articleUrl,
        publishedAt: article?.publishedAt || undefined,
        thumbnailURL: article.thumbnailURL,
        isRead: false,
        userId: user?.id || "",
        platformId: article.platform?.id,
        isEng: article.platform?.isEng || false,
        platformName: article.platform?.name,
        platformUrl: article.platform?.siteUrl,
        platformFaviconUrl: article.platform?.faviconUrl,
      });
      if (!newData) {
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }

      successToast({
        description: "Add bookmark",
      });
      setBookmarkId(newData.id);
    },
    [article, successToast, failToast]
  );

  const handleRemoveBookmark = useCallback(
    async (bookmarkId: string) => {
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Fail: Please login to remove bookmark",
        });
        await logoutToLoginPage();
        return;
      }

      if (!bookmarkId) return;
      const res = await fetchBookmarkByIdCountAPI({
        bookmarkId: bookmarkId,
      });
      if (res.status !== 200) {
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }
      if (!res.data?.count) {
        failToast({
          description: "Fail: Bookmark not found",
        });
        return;
      }

      const id = await deleteBookmark({
        bookmarkId: bookmarkId,
        userId: user?.id || "",
      });
      if (!id) {
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }
      successToast({
        description: "Remove bookmark",
      });
      setBookmarkId(undefined);
    },
    [successToast, failToast]
  );

  return {
    bookmarkId,
    handleAddBookmark,
    handleRemoveBookmark,
  };
};
