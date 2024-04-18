import { DeleteBookmarkTooltip } from "@/features/articles/components/Tooltip";

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

import { useBookmark } from "../hooks/useBookmark";

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
      <AlertDialogTrigger asChild>
        <DeleteBookmarkTooltip
          bookmarkId={bookmarkId}
          handleRemoveBookmark={handleRemoveBookmark}
        />
      </AlertDialogTrigger>
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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
