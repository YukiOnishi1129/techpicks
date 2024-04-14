import { useState, useCallback } from "react";

import {
  createBookmarkAPI,
  deleteBookmarkAPI,
  fetchBookmarkCountByArticleIdAPI,
} from "@/features/bookmarks/actions/bookmark";
import { getBookmarkCountById } from "@/features/bookmarks/repository/bookmark";

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

      const createResponse = await createBookmarkAPI({
        title: article.title,
        description: article.description,
        articleId: article.id,
        articleUrl: article.articleUrl,
        publishedAt: article.publishedAt,
        thumbnailURL: article.thumbnailURL,
        platformId: article.platform.id,
        isEng: article.platform.isEng,
        platformName: article.platform.name,
        platformUrl: article.platform.siteUrl,
        platformFaviconUrl: article.platform.faviconUrl,
      });
      const id = createResponse.data?.id;
      if (!id) return;
      setBookmarkId(id);
    },
    [article]
  );

  const handleRemoveBookmark = useCallback(async (bookmarkId: string) => {
    if (!bookmarkId) return;
    // TODO: repair api
    const count = await getBookmarkCountById({
      bookmarkId: bookmarkId,
      userId: "",
    });
    if (count === 0) return;
    const { status } = await deleteBookmarkAPI({
      bookmarkId: bookmarkId,
    });
    // TODO: show error message
    if (status !== 204) return;
    // TODO: show success message
    setBookmarkId(undefined);
  }, []);

  return {
    bookmarkId,
    handleAddBookmark,
    handleRemoveBookmark,
  };
};
