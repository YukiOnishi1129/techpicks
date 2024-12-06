import { FC } from "react";
import { IconContext } from "react-icons";
import { MdOutlineBookmarkAdd } from "react-icons/md";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type AddBookmarkTooltipProps = {
  handleAddBookmark: () => Promise<void>;
};

export const AddBookmarkTooltip: FC<AddBookmarkTooltipProps> = ({
  handleAddBookmark,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className="cursor-pointer rounded "
          onClick={handleAddBookmark}
        >
          <IconContext.Provider value={{ className: "hover:text-rose-600" }}>
            <MdOutlineBookmarkAdd className="inline-block " size={36} />
          </IconContext.Provider>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add bookmark</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
