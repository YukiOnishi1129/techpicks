import { useMutation } from "@apollo/client";
import { FragmentOf, graphql, readFragment } from "gql.tada";
import { useCallback } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/auth/actions/user";
import { CreateBookmarkMutation } from "@/features/bookmarks/mutations/CreateBookmarkMutation";
import { DeleteBookmarkMutation } from "@/features/bookmarks/mutations/DeleteBookmarkMutation";

import { serverRevalidatePage } from "@/shared/actions/actServerRevalidatePage";
import { useStatusToast } from "@/shared/hooks/useStatusToast";


export const UseArticleManageBookmarkFragment = graphql(`
  fragment UseArticleManageBookmarkFragment on Article {
    id
    platform {
      id
      name
      siteUrl
      faviconUrl
    }
    title
    description
    articleUrl
    publishedAt
    thumbnailUrl
    isEng
  }
`);

type UseArticleManageBookmarkParam = {
  data: FragmentOf<typeof UseArticleManageBookmarkFragment>;
};

export const useArticleManageBookmark = ({
  data,
}: UseArticleManageBookmarkParam) => {
  const fragment = readFragment(UseArticleManageBookmarkFragment, data);
  const { successToast, failToast } = useStatusToast();

  const [createArticleBookmarkMutation] = useMutation(CreateBookmarkMutation);

  const [deleteArticleBookmarkMutation] = useMutation(DeleteBookmarkMutation);

  const handleCreateBookmark = useCallback(async () => {
    const user = await getUser();
    if (!user) {
      failToast({
        description: "Fail: Please login to bookmark this article",
      });
      await logoutToLoginPage();
      return;
    }

    const { errors } = await createArticleBookmarkMutation({
      variables: {
        input: {
          articleId: fragment.id,
          userId: user.id,
          platformId: fragment.platform?.id,
          title: fragment.title,
          description: fragment.description,
          articleUrl: fragment.articleUrl,
          thumbnailUrl: fragment.thumbnailUrl,
          publishedAt: fragment.publishedAt,
          platformName: fragment.platform?.name || "",
          platformUrl: fragment.platform?.siteUrl || "",
          platformFaviconUrl: fragment.platform?.faviconUrl || "",
          isEng: fragment.isEng,
          isRead: false,
        },
      },
      update: (cache, { data }) => {
        cache.modify({
          id: cache.identify(fragment),
          fields: {
            isBookmarked: () => true,
            bookmarkId: () => data?.createBookmark.id,
          },
        });
      },
    });

    if (errors) {
      if (errors.length > 0) {
        failToast({
          description: errors[0].message,
        });
        return;
      }
      failToast({
        description: "Fail: Something went wrong",
      });
      return;
    }

    successToast({
      description: `Added bookmark title '${fragment.title}'`,
    });

    // Revalidate bookmarks page
    await serverRevalidatePage("/bookmarks");
  }, [createArticleBookmarkMutation, fragment, successToast, failToast]);

  const handleDeleteBookmark = useCallback(
    async (bookmarkId: string) => {
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Fail: Please login to remove bookmark",
        });
        await logoutToLoginPage();
        return;
      }

      const { errors } = await deleteArticleBookmarkMutation({
        variables: {
          input: {
            bookmarkId,
            userId: user.id,
          },
        },
        update: (cache) => {
          cache.modify({
            id: cache.identify(fragment),
            fields: {
              isBookmarked: () => false,
              bookmarkId: () => null,
            },
          });
        },
      });

      if (errors) {
        if (errors.length > 0) {
          failToast({
            description: errors[0].message,
          });
          return;
        }
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }

      successToast({
        description: `Removed bookmark title '${fragment.title}'`,
      });

      // Revalidate bookmarks page
      await serverRevalidatePage("/bookmarks");
    },
    [deleteArticleBookmarkMutation, fragment, failToast, successToast]
  );

  return { handleCreateBookmark, handleDeleteBookmark };
};
