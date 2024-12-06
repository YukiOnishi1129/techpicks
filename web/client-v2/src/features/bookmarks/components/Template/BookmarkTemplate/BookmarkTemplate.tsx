import { User } from "@supabase/supabase-js";
import { Suspense } from "react";

import { PreloadQuery } from "@/lib/apollo/client";

import { BookmarksInput, FavoriteArticleFoldersInput } from "@/graphql/type";

import { BookmarkTemplateQuery } from "./BookmarkTemplateQuery";
import { CreateBookmarkDialog } from "../../Dialog";
import { BookmarkList } from "../../List";
import { BookmarkArticleKeywordSearchInput } from "../../Search";

type BookmarkTemplateProps = {
  user: User;
  keyword?: string;
};

export const BookmarkTemplate = async ({
  user,
  keyword,
}: BookmarkTemplateProps) => {
  const input: BookmarksInput = {
    first: 20,
    after: null,
    userId: user.id,
    keyword: keyword,
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
          <BookmarkArticleKeywordSearchInput keyword={keyword} />
        </div>
        <CreateBookmarkDialog user={user} />
      </div>
      <div className="h-4 md:h-16" />

      <PreloadQuery
        query={BookmarkTemplateQuery}
        variables={{ input, favoriteArticleFoldersInput }}
      >
        <Suspense fallback={null}>
          <BookmarkList user={user} />
        </Suspense>
      </PreloadQuery>

      <div className="fixed bottom-20 right-4 z-50  md:hidden">
        {/* <BookmarkSearchKeywordDialogFloatButton keyword={keyword} /> */}
      </div>
    </div>
  );
};
