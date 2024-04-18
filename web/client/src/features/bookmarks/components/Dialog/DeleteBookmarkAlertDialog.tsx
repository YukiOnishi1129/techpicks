import { FcBookmark } from "react-icons/fc";

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

import { useBookmark } from "../../hooks/useBookmark";

type DeleteBookmarkAlertDialogProps = {
  bookmarkTitle: string;
  bookmarkId: string;
};

export function DeleteBookmarkAlertDialog({
  bookmarkTitle,
  bookmarkId,
}: DeleteBookmarkAlertDialogProps) {
  const { handleRemoveBookmark } = useBookmark();
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
            Delete bookmark title is ${bookmarkTitle}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>CANCEL</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleRemoveBookmark(bookmarkId)}>
            DELETE
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
