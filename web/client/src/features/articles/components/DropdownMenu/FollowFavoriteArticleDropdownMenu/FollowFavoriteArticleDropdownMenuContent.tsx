"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { CreateFavoriteArticleFolderDialog } from "@/features/favoriteArticleFolders/components/Dialog";

import {
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

import { FollowTargetFavoriteArticleFolderList } from "./FollowTargetFavoriteArticleFolderList";

const formSchema = z.object({
  keyword: z.string(),
});

type FollowFavoriteArticleDropdownMenuContentProps = {
  articleId: string;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
  handleCreateFavoriteArticle: (
    favoriteArticleFolderId: string,
    createdFavoriteArticleFolder?: FavoriteArticleFolderType
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
  favoriteArticleFolders,
  handleCreateFavoriteArticle,
  handleRemoveFavoriteArticle,
  handleCreateFavoriteArticleFolder,
}) => {
  const { control, watch } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
    },
  });
  const searchKeyword = watch("keyword");

  const showFavoriteArticleFolders = useMemo(() => {
    if (!searchKeyword) return favoriteArticleFolders;
    return favoriteArticleFolders.filter((favoriteArticleFolder) =>
      favoriteArticleFolder.title.includes(searchKeyword)
    );
  }, [favoriteArticleFolders, searchKeyword]);

  return (
    <DropdownMenuContent align="end" className="w-[200px]">
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
      <div className="max-h-[200px] overflow-y-auto">
        {showFavoriteArticleFolders.length > 0 &&
          showFavoriteArticleFolders.map((favoriteArticleFolder) => (
            <FollowTargetFavoriteArticleFolderList
              key={favoriteArticleFolder.id}
              articleId={articleId}
              favoriteArticleFolder={favoriteArticleFolder}
              handleCreateFavoriteArticle={handleCreateFavoriteArticle}
              handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
            />
          ))}
      </div>
      <DropdownMenuLabel>
        <CreateFavoriteArticleFolderDialog
          handleCreateFavoriteArticleFolder={handleCreateFavoriteArticleFolder}
        />
      </DropdownMenuLabel>
    </DropdownMenuContent>
  );
};
