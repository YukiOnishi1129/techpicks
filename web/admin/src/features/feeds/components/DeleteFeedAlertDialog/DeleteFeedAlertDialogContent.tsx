"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { FC, useCallback, useTransition } from "react";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { useServerRevalidatePage } from "@/hooks/useServerRevalidatePage";
import { useStatusToast } from "@/hooks/useStatusToast";

import { deleteFeed } from "../../repository/feed";

type DeleteFeedAlertDialogContentProps = {
  feedId: string;
  feedTitle: string;
  disabled?: boolean;
  handleDialogClose: () => void;
};

export const DeleteFeedAlertDialogContent: FC<
  DeleteFeedAlertDialogContentProps
> = ({ feedId, feedTitle, handleDialogClose }) => {
  const router = useRouter();
  const { revalidatePage } = useServerRevalidatePage();
  const { successToast, failToast } = useStatusToast();
  const [isPending, startTransition] = useTransition();

  const handleDeleteFeed = useCallback(async () => {
    startTransition(async () => {
      const id = await deleteFeed(feedId);
      if (!id) {
        failToast({
          description: "Failed: Feed undeleted",
        });
      }
      successToast({
        description: "Success: Feed deleted",
      });
      await revalidatePage();
      handleDialogClose();
      router.replace(`/feed`);
    });
  }, [
    successToast,
    failToast,
    revalidatePage,
    handleDialogClose,
    router,
    feedId,
    startTransition,
  ]);
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure you want me to delete it?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-left">
          This action cannot be undone. This will permanently remove your data
          from our servers.
          <br></br>
          Delete feed title is {feedTitle}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <div className="flex justify-between gap-4 p-4">
        <AlertDialogCancel>CANCEL</AlertDialogCancel>

        {isPending ? (
          <Button disabled>
            <ReloadIcon className="mr-2 size-4 animate-spin" />
            PLEASE WAIT
          </Button>
        ) : (
          <AlertDialogAction onClick={handleDeleteFeed}>
            DELETE
          </AlertDialogAction>
        )}
      </div>
    </AlertDialogContent>
  );
};
