import { useState, useCallback } from "react";

import {
  fetchBookmarkByIdCountAPI,
  fetchBookmarkCountByArticleIdAPI,
} from "@/features/bookmarks/actions/bookmark";
import {
  createBookmark,
  deleteBookmark,
} from "@/features/bookmarks/repository/bookmark";
import { getUser } from "@/features/users/actions/user";

import { useToast } from "@/components/ui/use-toast";

import { useStatusToast } from "@/hooks/useStatusToast";

import { ArticleType } from "@/types/article";

export const useArticleBookmark = ({ article }: { article: ArticleType }) => {
  const { toast } = useToast();
  const { successToast, failToast } = useStatusToast();
  const [bookmarkId, setBookmarkId] = useState<string | undefined>(
    article.bookmarkId
  );

  const handleAddBookmark = useCallback(
    async (articleId: string) => {
      const { data, status } = await fetchBookmarkCountByArticleIdAPI({
        articleId: articleId,
      });
      if (data?.count && data.count > 0) {
        failToast({
          title: "Fail: This article is already bookmarked",
        });
        return;
      }

      const user = await getUser();
      if (!user) {
        failToast({
          title: "Fail: Please login to bookmark this article",
        });
        return;
      }

      const id = await createBookmark({
        title: article.title,
        description: article.description,
        articleId: article.id,
        articleUrl: article.articleUrl,
        publishedAt: article.publishedAt,
        thumbnailURL: article.thumbnailURL,
        isRead: false,
        userId: user?.id || "",
        platformId: article.platform.id,
        isEng: article.platform.isEng,
        platformName: article.platform.name,
        platformUrl: article.platform.siteUrl,
        platformFaviconUrl: article.platform.faviconUrl,
      });
      if (!id) {
        failToast({
          title: "Fail: Something went wrong",
        });
        return;
      }

      successToast({
        title: "Success: bookmarked",
      });
      setBookmarkId(id);
    },
    [article, successToast, failToast]
  );

  const handleRemoveBookmark = useCallback(
    async (bookmarkId: string) => {
      if (!bookmarkId) return;
      const res = await fetchBookmarkByIdCountAPI({
        bookmarkId: bookmarkId,
      });
      if (res.status === 401) {
        failToast({
          title: "Fail: Unauthorized",
        });
        return;
      }
      if (res.status !== 200) {
        failToast({
          title: "Fail: Something went wrong",
        });
        return;
      }
      if (!res.data?.count) {
        failToast({
          title: "Fail: Bookmark not found",
        });
        return;
      }

      const user = await getUser();
      if (!user) {
        failToast({
          title: "Fail: Please login to remove bookmark",
        });
        return;
      }

      const id = await deleteBookmark({
        bookmarkId: bookmarkId,
        userId: user?.id || "",
      });
      if (!id) {
        toast({
          variant: "destructive",
          title: "Fail: Something went wrong",
        });
        return;
      }
      successToast({
        title: "Success: remove bookmarked",
      });
      setBookmarkId(undefined);
    },
    [toast, successToast, failToast]
  );

  return {
    bookmarkId,
    handleAddBookmark,
    handleRemoveBookmark,
  };
};
