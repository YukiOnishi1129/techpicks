"use client";

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
} from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

type DeleteFavoriteArticleFolderAlertDialogProps = {
  favoriteArticleFolderTitle: string;
  onDelete: () => Promise<void>;
};

export function DeleteFavoriteArticleFolderAlertDialog({
  favoriteArticleFolderTitle,
  onDelete,
}: DeleteFavoriteArticleFolderAlertDialogProps) {
  const showTitle =
    favoriteArticleFolderTitle.length > 35
      ? favoriteArticleFolderTitle.slice(0, 35) + "..."
      : favoriteArticleFolderTitle;
  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <AlertDialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant={"destructive"}>{"DELETE"}</Button>
            </TooltipTrigger>
          </AlertDialogTrigger>
          <TooltipContent className="px-4 py-3 font-semibold">
            <p>Delete favorite article folder</p>
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
            Delete folder title is{" "}
            <span className="font-bold text-white">「{showTitle}」</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>CANCEL</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete()}>
            DELETE
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
