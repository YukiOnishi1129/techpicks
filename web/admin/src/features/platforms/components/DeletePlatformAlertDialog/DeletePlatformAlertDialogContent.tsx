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

import { deletePlatform } from "../../repository/platform";

type DeletePlatformAlertDialogContentProps = {
  platformId: string;
  platformTitle: string;
  handleDialogClose: () => void;
};

export const DeletePlatformAlertDialogContent: FC<
  DeletePlatformAlertDialogContentProps
> = ({ platformId, platformTitle, handleDialogClose }) => {
  const router = useRouter();
  const { revalidatePage } = useServerRevalidatePage();
  const { successToast, failToast } = useStatusToast();
  const [isPending, startTransition] = useTransition();

  const handleDeletePlatform = useCallback(async () => {
    startTransition(async () => {
      const id = await deletePlatform(platformId);
      if (!id) {
        failToast({
          description: "Failed: delete platform",
        });
      }
      successToast({
        description: "Success: Platform deleted",
      });
      await revalidatePage();
      handleDialogClose();
      router.replace(`/platform`);
    });
  }, [
    successToast,
    failToast,
    revalidatePage,
    handleDialogClose,
    router,
    platformId,
    startTransition,
  ]);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure you want me to delete it?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently remove your data
          from our servers.
          <br></br>
          Delete platform title is {platformTitle}
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
          <AlertDialogAction onClick={handleDeletePlatform}>
            DELETE
          </AlertDialogAction>
        )}
      </div>
    </AlertDialogContent>
  );
};
