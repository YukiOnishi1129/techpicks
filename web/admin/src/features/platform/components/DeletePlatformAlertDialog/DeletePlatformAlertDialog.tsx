"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type DeletePlatformAlertDialogProps = {
  platformTitle: string;
  disabled?: boolean;
  handleDelete: () => void;
};

export const DeletePlatformAlertDialog = ({
  platformTitle,
  disabled,
  handleDelete,
}: DeletePlatformAlertDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={disabled}>
          DELETE
        </Button>
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
            Delete platform title is ${platformTitle}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex justify-between gap-4 p-4">
          <AlertDialogCancel>CANCEL</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>DELETE</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
