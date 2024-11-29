import { FragmentOf, readFragment } from "gql.tada";
import { useCallback, useState } from "react";

import { createArticleBookmarkMutation } from "@/features/articles/actions/actCreateArticleBookmarkMutation";
import { deleteArticleBookmarkMutation } from "@/features/articles/actions/actDeleteArticleBookmarkMutation";
import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/auth/actions/user";

import { useStatusToast } from "@/hooks/useStatusToast";

import { ArticleCardItemFragment } from "../ArticleCardItem";

export const useArticleBookmark = (
  data: FragmentOf<typeof ArticleCardItemFragment>
) => {
  const fragment = readFragment(ArticleCardItemFragment, data);
  const [bookmarkId, setBookmarkId] = useState<string | null>(
    fragment.bookmarkId
  );
  const { successToast, failToast } = useStatusToast();

  const handleAddBookmark = useCallback(
    async (articleId: string) => {
      if (!fragment.platform) return;
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Fail: Please login to bookmark this article",
        });
        await logoutToLoginPage();
        return;
      }

      const { data, error } = await createArticleBookmarkMutation({
        articleId,
        userId: user.id,
        platformId: fragment.platform?.id,
        title: fragment.title,
        description: fragment.description,
        articleUrl: fragment.articleUrl,
        thumbnailUrl: fragment.thumbnailUrl,
        publishedAt: fragment.publishedAt,
        platformName: fragment.platform?.name,
        platformUrl: fragment.platform?.siteUrl,
        platformFaviconUrl: fragment.platform?.faviconUrl,
        isEng: fragment.isEng,
        isRead: false,
      });

      if (error) {
        if (error.length > 0) {
          failToast({
            description: error[0].message,
          });
          return;
        }
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }

      if (data?.createBookmark?.id) {
        successToast({
          description: "Add bookmark",
        });
        setBookmarkId(data.createBookmark.id);
      }
    },
    [fragment, successToast, failToast]
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

      const { data, error } = await deleteArticleBookmarkMutation({
        bookmarkId,
        userId: user.id,
      });

      if (error) {
        if (error.length > 0) {
          failToast({
            description: error[0].message,
          });
          return;
        }
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }

      if (data?.deleteBookmark) {
        successToast({
          description: "Remove bookmark",
        });
        setBookmarkId(null);
      }
    },
    [successToast, failToast]
  );

  return { bookmarkId, handleAddBookmark, handleRemoveBookmark };
};
