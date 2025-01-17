"use client";

import { FC, useState, useCallback } from "react";
import { IconContext } from "react-icons";
import { FaRegCommentDots } from "react-icons/fa";

import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

type CreateArticleCommentDialogProps = {
  articleId: string;
  articleTitle: string;
};

export const CreateArticleCommentDialog: FC<
  CreateArticleCommentDialogProps
> = ({ articleId, articleTitle }) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger>
              <IconContext.Provider value={{}}>
                <FaRegCommentDots size={20} className="cursor-pointer" />
              </IconContext.Provider>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent className="px-4 py-3 font-semibold">
            <p>Comment article</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Dialog>
  );
};
