import { Suspense } from "react";

import { SkeltonArticleList } from "@/features/articles/components/List";

import { BookmarksInput, FavoriteArticleFoldersInput } from "@/graphql/type";
import { PreloadQuery } from "@/shared/lib/apollo/client";
import { SearchParamsType } from "@/shared/types/utils";

import { BookmarkTemplateQuery } from "./BookmarkTemplateQuery";
import {
  CreateBookmarkDialog,
  SearchBookmarkKeywordDialogFloatButton,
} from "../../Dialog";
import { BookmarkList } from "../../List";
import { BookmarkArticleKeywordSearchInput } from "../../Search";

type BookmarkTemplateProps = {
  searchParams: SearchParamsType;
  keywordList: Array<string>;
};

export const BookmarkTemplate = async ({
  searchParams,
  keywordList,
}: BookmarkTemplateProps) => {
  const input: BookmarksInput = {
    first: 20,
    after: null,
    keywords: keywordList,
  };

  const favoriteArticleFoldersInput: FavoriteArticleFoldersInput = {
    isAllFetch: true,
    isFolderOnly: true,
  };

  return (
    <div>
      <div className="fixed z-10  hidden  w-[90%]  items-center  justify-between bg-card md:flex md:w-[70%] md:px-4">
        <h1 className="my-4 mr-8 hidden text-2xl font-bold  md:mb-4 md:block">
          Bookmark
        </h1>
        <div className="mr-2 w-3/4 md:mr-4">
          <BookmarkArticleKeywordSearchInput keywordList={keywordList} />
        </div>
        <CreateBookmarkDialog />
      </div>
      <div className="h-4 md:h-16" />

      <PreloadQuery
        query={BookmarkTemplateQuery}
        variables={{
          input,
          favoriteArticleFoldersInput,
        }}
      >
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<SkeltonArticleList />}
        >
          <BookmarkList keywordList={keywordList} />
        </Suspense>
      </PreloadQuery>

      <div className="fixed bottom-20 right-4 z-50  md:hidden">
        <SearchBookmarkKeywordDialogFloatButton keywordList={keywordList} />
      </div>
    </div>
  );
};
