"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { FC, useCallback, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { createMyFeedFolder } from "@/features/myFeedFolders/repository/myFeedFolder";
import { getUser } from "@/features/users/actions/user";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useStatusToast } from "@/hooks/useStatusToast";

import { serverRevalidatePage } from "@/actions/serverAction";

const FormSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title is required")
    .max(255, "Title must be less than 25 characters"),
  description: z.string().optional(),
});

type CreateMyFeedFolderDialogProps = {
  buttonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  handleCreatedMyFeedFolder?: (myFeedId: string) => Promise<void>;
};

export const CreateMyFeedFolderDialog: FC<CreateMyFeedFolderDialogProps> = ({
  buttonVariant,
  handleCreatedMyFeedFolder,
}) => {
  const [open, setOpen] = useState(false);

  const handleCloseDialog = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>{"Create folder"}</Button>
      </DialogTrigger>
      {open && (
        <CreateMyFeedFolderDialogContent
          handleCloseDialog={handleCloseDialog}
          handleCreatedMyFeedFolder={handleCreatedMyFeedFolder}
        />
      )}
    </Dialog>
  );
};

type CreateMyFeedFolderDialogContentProps = {
  handleCloseDialog: () => void;
  handleCreatedMyFeedFolder?: (myFeedId: string) => Promise<void>;
};

const CreateMyFeedFolderDialogContent: FC<
  CreateMyFeedFolderDialogContentProps
> = ({
  handleCloseDialog,
  handleCreatedMyFeedFolder,
}: CreateMyFeedFolderDialogContentProps) => {
  const { successToast, failToast } = useStatusToast();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const resetDialog = useCallback(() => {
    form.reset();
  }, [form]);

  const onSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      startTransition(async () => {
        const user = await getUser();

        if (!user) {
          failToast({
            description: "Please login to create a new feed folder",
          });
          await logoutToLoginPage();
          return;
        }
        const createdId = await createMyFeedFolder({
          title: data.title,
          description: data?.description ?? "",
          userId: user?.id,
        });
        if (!createdId) {
          failToast({
            description: "Failed to create new feed folder",
          });
          return;
        }
        successToast({
          description: "Successfully created new feed folder",
        });
        if (handleCreatedMyFeedFolder !== undefined) {
          await handleCreatedMyFeedFolder(createdId);
          await serverRevalidatePage(pathname);
          resetDialog();
          handleCloseDialog();
          return;
        }
        await serverRevalidatePage(pathname);
        resetDialog();
        handleCloseDialog();
      });
    },
    [
      failToast,
      handleCreatedMyFeedFolder,
      resetDialog,
      pathname,

      startTransition,
      successToast,
      handleCloseDialog,
    ]
  );

  return (
    <DialogContent onCloseAutoFocus={resetDialog}>
      <DialogHeader>
        <DialogTitle>{"Create My Feed Folder"}</DialogTitle>
      </DialogHeader>

      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold">TITLE</FormLabel>
                  <FormControl>
                    <Input
                      className="block w-full border-primary bg-secondary text-primary"
                      placeholder="Feed Folder Title"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold">DESCRIPTION</FormLabel>
                  <FormControl>
                    <Input
                      className="block w-full border-primary bg-secondary text-primary"
                      placeholder="Feed Folder Description"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isPending ? (
              <Button disabled>
                <ReloadIcon className="mr-2 size-4 animate-spin" />
                PLEASE WAIT
              </Button>
            ) : (
              <Button
                disabled={!form.formState.isValid || isPending}
                type="submit"
              >
                {"CREATE MY FEED FOLDER"}
              </Button>
            )}
          </form>
        </Form>
      </div>

      <div className="mt-4 flex w-full justify-start space-x-4">
        <DialogClose asChild>
          <Button onClick={resetDialog}>{"CLOSE"}</Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
};
