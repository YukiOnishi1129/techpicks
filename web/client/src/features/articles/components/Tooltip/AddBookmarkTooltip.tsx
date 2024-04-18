import { FC } from "react";
import { MdOutlineBookmarkAdd } from "react-icons/md";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type AddBookmarkTooltipProps = {
  articleId: string;
  handleAddBookmark: (articleId: string) => Promise<void>;
};

export const AddBookmarkTooltip: FC<AddBookmarkTooltipProps> = ({
  articleId,
  handleAddBookmark,
}: AddBookmarkTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={() => handleAddBookmark(articleId)}>
          <MdOutlineBookmarkAdd className="inline-block" size={36} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Add bookmark</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
