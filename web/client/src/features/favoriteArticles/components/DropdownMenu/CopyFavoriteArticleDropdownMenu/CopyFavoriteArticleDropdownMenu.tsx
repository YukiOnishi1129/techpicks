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

import { CopyTargetFavoriteArticleFolderList } from "./CopyTargetFavoriteArticleFolderList";

const formSchema = z.object({
  keyword: z.string(),
});

type CopyFavoriteArticleDropdownMenuContentProps = {
  articleId: string;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
};

export const CopyFavoriteArticleDropdownMenuContent: FC<
  CopyFavoriteArticleDropdownMenuContentProps
> = ({ articleId, favoriteArticleFolders }) => {
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
          <Input placeholder="search keyword" {...field} />
        )}
      />
      <DropdownMenuSeparator />
      <div className="max-h-[200px] overflow-y-auto">
        {showFavoriteArticleFolders.map((favoriteArticleFolder) => (
          <CopyTargetFavoriteArticleFolderList
            key={favoriteArticleFolder.id}
            articleId={articleId}
            favoriteArticleFolder={favoriteArticleFolder}
          />
        ))}
      </div>
      <DropdownMenuLabel>
        <CreateFavoriteArticleFolderDialog
        //   handleCreateFavoriteArticleFolder={}
        />
      </DropdownMenuLabel>
    </DropdownMenuContent>
  );
};
