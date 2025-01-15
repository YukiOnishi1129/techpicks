"use client";

import { FragmentOf, readFragment } from "gql.tada";
import { FC, useMemo } from "react";

import { Button } from "@/shared/components/ui/button";
import { DropdownMenuSeparator } from "@/shared/components/ui/dropdown-menu";

import { AllCopyRemoveFavoriteArticleAlertDialog } from "./AllCopyRemoveFavoriteArticleAlertDialog";
import { AllCopyTargetFavoriteArticleFolderItemFragment } from "./AllCopyTargetFavoriteArticleFolderItemFragment";

type AllCopyTargetFavoriteArticleFolderItemProps = {
  data: FragmentOf<typeof AllCopyTargetFavoriteArticleFolderItemFragment>;
  articleId: string;
  articleTitle: string;
  isLastIncludedFolder: boolean;
  onCreateFavoriteArticle: (
    targetFavoriteArticleFolderId: string
  ) => Promise<string | undefined>;
  onRemoveFavoriteArticle: (
    favoriteArticleId: string,
    targetFavoriteArticleFolderId: string
  ) => Promise<string | undefined>;
};

export const AllCopyTargetFavoriteArticleFolderItem: FC<
  AllCopyTargetFavoriteArticleFolderItemProps
> = ({
  data,
  articleId,
  articleTitle,
  isLastIncludedFolder,
  onCreateFavoriteArticle,
  onRemoveFavoriteArticle,
}) => {
  const fragment = readFragment(
    AllCopyTargetFavoriteArticleFolderItemFragment,
    data
  );

  const isFollowed = useMemo(
    () =>
      fragment.favoriteArticles.some(
        (favoriteArticle) => favoriteArticle.articleId === articleId
      ),
    [articleId, fragment]
  );

  const targetFavoriteArticleId = useMemo(() => {
    const targetFavoriteArticle = fragment.favoriteArticles.find(
      (favoriteArticle) => favoriteArticle.articleId === articleId
    );
    return targetFavoriteArticle?.id;
  }, [articleId, fragment.favoriteArticles]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="ml-2 w-1/2 truncate">{fragment.title}</p>
        {isFollowed ? (
          <>
            {isLastIncludedFolder ? (
              <AllCopyRemoveFavoriteArticleAlertDialog
                favoriteArticleTitle={articleTitle}
                favoriteArticleId={targetFavoriteArticleId || ""}
                targetFavoriteArticleFolderId={fragment.id}
                onRemoveFavoriteArticle={() =>
                  onRemoveFavoriteArticle(
                    targetFavoriteArticleId || "",
                    fragment.id
                  )
                }
              />
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="group relative border-emerald-500 bg-emerald-500 font-bold text-white hover:border-red-600 hover:text-red-600"
                  onClick={() =>
                    onRemoveFavoriteArticle(
                      targetFavoriteArticleId || "",
                      fragment.id
                    )
                  }
                >
                  <span className="w-full group-hover:invisible">
                    {"COPIED"}
                  </span>
                  <span className="invisible absolute w-full group-hover:visible">
                    {"REMOVE"}
                  </span>
                </Button>
              </>
            )}
          </>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-500 font-bold text-emerald-500 hover:text-emerald-600"
            onClick={() => onCreateFavoriteArticle(fragment.id)}
          >
            {"COPY"}
          </Button>
        )}
      </div>
      <DropdownMenuSeparator />
    </div>
  );
};
