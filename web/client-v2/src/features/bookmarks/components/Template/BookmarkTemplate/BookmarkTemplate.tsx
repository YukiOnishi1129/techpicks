import { User } from "@supabase/supabase-js";

import { getBookmarkListQuery } from "@/features/bookmarks/actions/getBookmarkListQuery";

import { BookmarksInput } from "@/graphql/type";

import { CreateBookmarkDialog } from "../../Dialog";
import { BookmarkList } from "../../List";

type BookmarkTemplateProps = {
  user: User;
  keyword?: string;
};

export const BookmarkTemplate = async ({
  user,
  keyword,
}: BookmarkTemplateProps) => {
  const input: BookmarksInput = {
    userId: user.id,
    keyword: keyword,
  };
  const { data, error } = await getBookmarkListQuery(input);

  if (error) {
    throw new Error(error.message);
  }
  return (
    <div>
      <div className="fixed z-10  hidden  w-[90%]  items-center  justify-between bg-card md:flex md:w-[70%] md:px-4">
        <h1 className="my-4 mr-8 hidden text-2xl font-bold  md:mb-4 md:block">
          Bookmark
        </h1>
        <div className="mr-2 w-3/4 md:mr-4">
          {/* <BookmarkArticleKeywordSearchInput /> */}
        </div>
        <CreateBookmarkDialog user={user} />
      </div>
      <div className="h-4 md:h-16" />

      <BookmarkList data={data.bookmarks} user={user} />

      <div className="fixed bottom-20 right-4 z-50  md:hidden">
        {/* <BookmarkSearchKeywordDialogFloatButton keyword={keyword} /> */}
      </div>
    </div>
  );
};
