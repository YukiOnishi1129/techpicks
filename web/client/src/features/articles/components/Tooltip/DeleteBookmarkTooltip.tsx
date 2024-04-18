import { FC } from "react";
import { FcBookmark } from "react-icons/fc";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type DeleteBookmarkTooltipProps = {
  bookmarkId: string;
  handleRemoveBookmark: (bookmarkId: string) => Promise<void>;
};

export const DeleteBookmarkTooltip: FC<DeleteBookmarkTooltipProps> = ({
  bookmarkId,
  handleRemoveBookmark,
}: DeleteBookmarkTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={() => handleRemoveBookmark(bookmarkId)}>
          <FcBookmark className="inline-block" size={36} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete bookmark</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
