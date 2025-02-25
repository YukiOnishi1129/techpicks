"use client";

import { FragmentOf, readFragment } from "gql.tada";
import { FC, useCallback, useState } from "react";
import { FaComment } from "react-icons/fa";

import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

import { ShowArticleCommentDialogContent } from "./ShowArticleCommentDialogContent";
import { ShowArticleCommentDialogFragment } from "./ShowArticleCommentDialogFragment";


type ShowArticleCommentDialogProps = {
  data: FragmentOf<typeof ShowArticleCommentDialogFragment>;
};

export const ShowArticleCommentDialog: FC<ShowArticleCommentDialogProps> = ({
  data,
}) => {
  const fragment = readFragment(ShowArticleCommentDialogFragment, data);
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger className="flex cursor-pointer items-center gap-2 hover:text-emerald-500">
              <div>
                <FaComment size={18} className="inline-block cursor-pointer" />
              </div>

              <p className="line-clamp-1 text-sm " w-full>
                {fragment.comment}
              </p>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent className="px-4 py-3 font-semibold">
            <p>Show comment</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {open && (
        <ShowArticleCommentDialogContent data={data} onClose={handleClose} />
      )}
    </Dialog>
  );
};
