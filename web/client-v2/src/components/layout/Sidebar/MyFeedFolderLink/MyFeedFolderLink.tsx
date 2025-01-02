import { FragmentOf, readFragment } from "gql.tada";
import Link from "next/link";
import { FC } from "react";

import { MyFeedFolderLinkFragment } from "./MyFeedFolderLinkFragment";

// import { MyFeedFolderType } from "@/types/myFeedFolder";

// import { FeedAccordion } from "./Accordion";

type MyFeedFolderLinkProps = {
  data: FragmentOf<typeof MyFeedFolderLinkFragment>;
  handleCloseSheet?: () => void;
};

export const MyFeedFolderLink: FC<MyFeedFolderLinkProps> = ({
  data,
  handleCloseSheet,
}) => {
  const fragment = readFragment(MyFeedFolderLinkFragment, data);
  return (
    <div className="max-w-[198px]">
      <div className="relative flex min-h-10 items-center space-x-2 truncate">
        <Link
          className="absolute left-10 top-0  w-4/6 pt-2 hover:bg-secondary"
          href={`/my-feed/article/${fragment.id}`}
          onClick={handleCloseSheet}
        >
          <span className="inline-block w-full truncate">{fragment.title}</span>
        </Link>

        <div>{/* <FeedAccordion myFeedFolder={myFeedFolder} /> */}</div>
      </div>
    </div>
  );
};
