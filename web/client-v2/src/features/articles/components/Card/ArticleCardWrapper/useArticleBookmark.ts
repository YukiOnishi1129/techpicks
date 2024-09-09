import { FragmentOf, readFragment } from "gql.tada";
import { useState } from "react";

import { ArticleCardItemFragment } from "../ArticleCardItem";

export const useArticleBookmark = (
  data: FragmentOf<typeof ArticleCardItemFragment>
) => {
  const fragment = readFragment(ArticleCardItemFragment, data);
  const [bookmarkId, setBookmarkId] = useState<string | null>(
    fragment.bookmarkId
  );

  return { bookmarkId };
};
