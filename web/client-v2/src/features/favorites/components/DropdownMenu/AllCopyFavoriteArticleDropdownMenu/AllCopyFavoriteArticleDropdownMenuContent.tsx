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
} from "@/shared/components/ui/dropdown-menu";
import { Input } from "@/shared/components/ui/input";

import { AllCopyFavoriteArticleDropdownMenuContentFragment } from "./AllCopyFavoriteArticleDropdownMenuFragment";
import { AllCopyTargetFavoriteArticleFolderItem } from "./AllCopyTargetFavoriteArticleFolderItem";
import { CreateFavoriteArticleFolderDialog } from "../../Dialog";

const formSchema = z.object({
  keyword: z.string(),
});

type AllCopyFavoriteArticleDropdownMenuContentProps = {
  data: FragmentOf<typeof AllCopyFavoriteArticleDropdownMenuContentFragment>;
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
  onCreateFavoriteArticleFolder: (
    favoriteArticleFolderId: string,
    title: string
  ) => Promise<void>;
};

export const AllCopyFavoriteArticleDropdownMenuContent: FC<
  AllCopyFavoriteArticleDropdownMenuContentProps
> = ({
  data,
  articleId,
  articleTitle,
  isLastIncludedFolder,
  onCreateFavoriteArticle,
  onRemoveFavoriteArticle,
  onCreateFavoriteArticleFolder,
}) => {
  const { control, watch } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
    },
  });
  const searchKeyword = watch("keyword");

  const fragment = readFragment(
    AllCopyFavoriteArticleDropdownMenuContentFragment,
    data
  );

  const showFavoriteArticleFolders = useMemo(() => {
    if (!searchKeyword) return fragment.edges;
    const regexp = new RegExp(searchKeyword, "i");
    return fragment.edges.filter((favoriteArticleFolder) =>
      favoriteArticleFolder.node.title.match(regexp)
    );
  }, [fragment, searchKeyword]);

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
      <div className="max-h-[200px] overflow-y-auto overflow-x-hidden">
        {showFavoriteArticleFolders.map((folder) => {
          return (
            <AllCopyTargetFavoriteArticleFolderItem
              key={folder.node.id}
              data={folder.node}
              articleId={articleId}
              articleTitle={articleTitle}
              isLastIncludedFolder={isLastIncludedFolder}
              onCreateFavoriteArticle={onCreateFavoriteArticle}
              onRemoveFavoriteArticle={onRemoveFavoriteArticle}
            />
          );
        })}
      </div>
      <DropdownMenuLabel>
        <CreateFavoriteArticleFolderDialog
          onCreateFavoriteArticleFolder={onCreateFavoriteArticleFolder}
        />
      </DropdownMenuLabel>
    </DropdownMenuContent>
  );
};
