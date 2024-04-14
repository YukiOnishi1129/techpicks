import { useState, useCallback } from "react";

import { createBookmarkAPI } from "@/features/bookmarks/actions/bookmark";
import {
  getBookmarkCountByArticleId,
  getBookmarkCountById,
  deleteBookmark,
} from "@/features/bookmarks/repository/bookmark";

import { ArticleType } from "@/types/article";

export const useArticleBookmark = ({ article }: { article: ArticleType }) => {
  const [bookmarkId, setBookmarkId] = useState<string | undefined>(
    article.bookmarkId
  );
  const handleAddBookmark = useCallback(
    async (articleId: string) => {
      // TODO: repair api
      const count = await getBookmarkCountByArticleId({
        articleId: articleId,
        userId: "",
      });
      if (count > 0) return;

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
    // TODO: repair api
    await deleteBookmark({
      bookmarkId: bookmarkId,
      userId: "",
    });
    setBookmarkId(undefined);
  }, []);

  return {
    bookmarkId,
    handleAddBookmark,
    handleRemoveBookmark,
  };
};
