"use client";
import { FC } from "react";
import { FcBookmark } from "react-icons/fc";

import { useDeleteBookmarkMutation } from "@/features/bookmarks/hooks/useDeleteBookmarkMutation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// import { useBookmark } from "../../hooks/useBookmark";

type DeleteBookmarkAlertDialogProps = {
  bookmarkTitle: string;
  bookmarkId: string;
};

export const DeleteBookmarkAlertDialog: FC<DeleteBookmarkAlertDialogProps> = ({
  bookmarkId,
  bookmarkTitle,
}) => {
  const { handleRemoveBookmark } = useDeleteBookmarkMutation();
  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <AlertDialogTrigger asChild>
            <TooltipTrigger>
              <FcBookmark className="inline-block" size={36} />
            </TooltipTrigger>
          </AlertDialogTrigger>
          <TooltipContent className="px-4 py-3 font-semibold">
            <p>Delete bookmark</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want me to delete it?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove your data
            from our servers.
            <br></br>
            The title of the bookmark to be deleted is{" "}
            <span className="font-bold text-white">{`'${bookmarkTitle}'`}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>CANCEL</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleRemoveBookmark(bookmarkId, bookmarkTitle)}
          >
            DELETE
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
