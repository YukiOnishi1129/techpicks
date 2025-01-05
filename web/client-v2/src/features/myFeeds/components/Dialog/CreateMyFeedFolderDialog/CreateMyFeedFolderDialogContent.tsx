"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { FC, useTransition, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/auth/actions/user";

import { serverRevalidatePage } from "@/shared/actions/actServerRevalidatePage";
import { Button } from "@/shared/components/ui/button";
import {
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogHeader,
} from "@/shared/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { useStatusToast } from "@/shared/hooks/useStatusToast";


import { createMyFeedFolderMutation } from "./actCreateMyFeedFolderMutation";

const FormSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title is required")
    .max(255, "Title must be less than 25 characters"),
  description: z.string().optional(),
});

type CreateMyFeedFolderDialogContentProps = {
  onCloseDialog: () => void;
  onCreatedMyFeedFolder?: (myFeedId: string) => Promise<void>;
};

export const CreateMyFeedFolderDialogContent: FC<
  CreateMyFeedFolderDialogContentProps
> = ({
  onCloseDialog,
  onCreatedMyFeedFolder,
}: CreateMyFeedFolderDialogContentProps) => {
  const { successToast, failToast } = useStatusToast();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
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
        const { data: resData, error } = await createMyFeedFolderMutation({
          userId: user?.id || "",
          title: data.title,
          description: data?.description || "",
        });
        if (error) {
          if (error.length > 0) {
            // TODO: Modify the error message response on the BFF side
            const errMsg =
              error[0].message.indexOf("my feed folder already exists") != -1
                ? "my feed folder already exists"
                : error[0].message;
            failToast({
              description: errMsg,
            });
            return;
          }
          failToast({
            description: "Fail: Something went wrong",
          });
          return;
        }
        if (!resData?.createMyFeedFolder?.id) {
          failToast({
            description: "Fail: Something went wrong",
          });
          return;
        }
        successToast({
          description: "Successfully created new feed folder",
        });
        if (onCreatedMyFeedFolder !== undefined) {
          await onCreatedMyFeedFolder(resData.createMyFeedFolder.id);
          await serverRevalidatePage(pathname);
          resetDialog();
          onCloseDialog();
          return;
        }
        await serverRevalidatePage(pathname);
        resetDialog();
        onCloseDialog();
      });
    },
    [
      failToast,
      onCreatedMyFeedFolder,
      resetDialog,
      pathname,

      startTransition,
      successToast,
      onCloseDialog,
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
                  <FormLabel className="font-bold">
                    TITLE
                    <span className="text-red-700"> *</span>
                  </FormLabel>
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

            <div className="mt-4 flex w-full justify-between space-x-4">
              <DialogClose asChild>
                <Button variant={"outline"} onClick={resetDialog}>
                  {"CLOSE"}
                </Button>
              </DialogClose>
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
                  {"CREATE"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};
