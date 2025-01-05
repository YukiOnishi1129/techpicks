import { FC } from "react";
import { IconContext } from "react-icons";
import { FcBookmark } from "react-icons/fc";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

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
          <IconContext.Provider value={{ className: "hover:text-rose-900" }}>
            <FcBookmark className="inline-block" size={36} />
          </IconContext.Provider>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete bookmark</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
