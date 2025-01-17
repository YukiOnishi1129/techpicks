"use client";

import { FC, useState, useCallback } from "react";
import { IconContext } from "react-icons";
import { FaComment } from "react-icons/fa";

import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

type UpdateArticleCommentDialogProps = {
  articleId: string;
  articleTitle: string;
};

export const UpdateArticleCommentDialog: FC<
  UpdateArticleCommentDialogProps
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
              <IconContext.Provider
                value={{ className: "hover:text-rose-900" }}
              >
                <FaComment size={20} className="cursor-pointer" color="red" />
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
