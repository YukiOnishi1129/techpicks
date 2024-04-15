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

import { ArticleType } from "@/types/article";

export const useArticleBookmark = ({ article }: { article: ArticleType }) => {
  const [bookmarkId, setBookmarkId] = useState<string | undefined>(
    article.bookmarkId
  );

  const handleAddBookmark = useCallback(
    async (articleId: string) => {
      const { data, status } = await fetchBookmarkCountByArticleIdAPI({
        articleId: articleId,
      });
      if (data?.count && data.count > 0) return;

      const user = await getUser();
      // TODO: show error message
      if (!user) return;

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
      setBookmarkId(id);
    },
    [article]
  );

  const handleRemoveBookmark = useCallback(async (bookmarkId: string) => {
    if (!bookmarkId) return;
    const res = await fetchBookmarkByIdCountAPI({
      bookmarkId: bookmarkId,
    });
    // TODO: show 401 error message
    if (res.status !== 200) return;
    // TODO: show 404 error message
    if (!res.data?.count) return;

    const user = await getUser();
    // TODO: show error message
    if (!user) return;

    const id = await deleteBookmark({
      bookmarkId: bookmarkId,
      userId: user?.id || "",
    });
    // TODO: show error message
    if (!id) return;
    setBookmarkId(undefined);
  }, []);

  return {
    bookmarkId,
    handleAddBookmark,
    handleRemoveBookmark,
  };
};
