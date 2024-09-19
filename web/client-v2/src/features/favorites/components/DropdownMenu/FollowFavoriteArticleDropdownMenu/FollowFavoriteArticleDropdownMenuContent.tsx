"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FragmentOf, readFragment } from "gql.tada";
import { FC, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import {
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import {
  FollowFavoriteArticleDropdownMenuContentFragment,
  FollowTargetFavoriteArticleFolderItemFragment,
} from "./FollowFavoriteArticleDropdownMenuFragment";
import { FollowTargetFavoriteArticleFolderItem } from "./FollowTargetFavoriteArticleFolderItem";

const formSchema = z.object({
  keyword: z.string(),
});

type FollowFavoriteArticleDropdownMenuContentProps = {
  articleId: string;
  data: FragmentOf<typeof FollowFavoriteArticleDropdownMenuContentFragment>;
  followedFolderIds: Array<string>;
  handleCreateFavoriteArticle: (
    favoriteArticleFolderId: string,
    createdFavoriteArticleFolder?: FragmentOf<
      typeof FollowTargetFavoriteArticleFolderItemFragment
    >
  ) => Promise<string | undefined>;
  handleRemoveFavoriteArticle: (
    favoriteArticleId: string,
    favoriteArticleFolderId: string
  ) => Promise<string | undefined>;
  handleCreateFavoriteArticleFolder: (
    favoriteArticleFolderId: string
  ) => Promise<void>;
};

export const FollowFavoriteArticleDropdownMenuContent: FC<
  FollowFavoriteArticleDropdownMenuContentProps
> = ({
  articleId,
  data,
  followedFolderIds,
  handleCreateFavoriteArticle,
  handleRemoveFavoriteArticle,
  handleCreateFavoriteArticleFolder,
}) => {
  const fragment = readFragment(
    FollowFavoriteArticleDropdownMenuContentFragment,
    data
  );
  const { control, watch } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
    },
  });
  const searchKeyword = watch("keyword");

  const showFavoriteArticleFolders = useMemo(() => {
    if (!searchKeyword) return fragment.edges;
    return fragment.edges.filter((favoriteArticleFolder) => {
      const nodeFragment = readFragment(
        FollowTargetFavoriteArticleFolderItemFragment,
        favoriteArticleFolder.node
      );
      return nodeFragment.title.includes(searchKeyword);
    });
  }, [searchKeyword, fragment.edges]);

  return (
    <DropdownMenuContent align="end" className="max-w-[200px]">
      <Controller
        name="keyword"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            className="border-primary bg-secondary text-primary"
            placeholder="search keyword"
            {...field}
          />
        )}
      />
      <DropdownMenuSeparator />
      <div className="max-h-[200px] overflow-y-auto overflow-x-hidden">
        {showFavoriteArticleFolders.length > 0 &&
          showFavoriteArticleFolders.map((favoriteArticleFolder) => {
            const nodeFragment = readFragment(
              FollowTargetFavoriteArticleFolderItemFragment,
              favoriteArticleFolder.node
            );
            return (
              <FollowTargetFavoriteArticleFolderItem
                key={nodeFragment.id}
                articleId={articleId}
                data={favoriteArticleFolder.node}
                followedFolderIds={followedFolderIds}
                handleCreateFavoriteArticle={handleCreateFavoriteArticle}
                handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
              />
            );
          })}
      </div>
      <DropdownMenuLabel>
        {/* <CreateFavoriteArticleFolderDialog
          handleCreateFavoriteArticleFolder={handleCreateFavoriteArticleFolder}
        /> */}
      </DropdownMenuLabel>
    </DropdownMenuContent>
  );
};
