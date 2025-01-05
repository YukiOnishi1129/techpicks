"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { FragmentOf, readFragment } from "gql.tada";
import { FC, useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { z } from "zod";

import { SelectMultiFeedDialog } from "@/features/feeds/components/Dialog/SelectMultiFeedDialog";
import { useManageMyFeedFolder } from "@/features/myFeeds/hooks/useManageMyFeedFolder";

import { Button } from "@/shared/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { SelectOptionType } from "@/shared/types/utils";

import { UpdateMyFeedFolderDialogFragment } from "./UpdateMyFeedFolderDialogFragment";

const formSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title is required")
    .max(255, "Title must be less than 25 characters"),
  description: z.string().optional(),
  targetFeedList: z
    .object({
      id: z.string(),
      label: z.string(),
    })
    .array(),
});

type UpdateMyFeedFolderDialogContentProps = {
  data: FragmentOf<typeof UpdateMyFeedFolderDialogFragment>;
  feedsEndCursor?: string;
  onClose: () => void;
};

export const UpdateMyFeedFolderDialogContent: FC<
  UpdateMyFeedFolderDialogContentProps
> = ({ data, feedsEndCursor, onClose }) => {
  const fragment = readFragment(UpdateMyFeedFolderDialogFragment, data);

  const { handleUpdateMyFeedFolder, handleDeleteMyFeedFolder } =
    useManageMyFeedFolder({ data: fragment });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: fragment.title,
      description: fragment?.description || undefined,
      targetFeedList: fragment?.feeds
        ? fragment?.feeds.map((feed) => ({
            id: feed.id,
            label: feed.name,
          }))
        : [],
    },
  });

  const [isPending, startTransition] = useTransition();
  const resetDialog = useCallback(() => {
    form.reset();
  }, [form]);

  const handleSelectFeedList = useCallback(
    (selectedFeedList: Array<SelectOptionType>) => {
      form.setValue("targetFeedList", selectedFeedList);
    },
    [form]
  );

  const handleRemoveSelectedFeed = useCallback(
    (targetFeedId: string) => {
      form.setValue(
        "targetFeedList",
        form.getValues("targetFeedList").filter((f) => f.id !== targetFeedId)
      );
    },
    [form]
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const inputDescription = values.description ?? "";
      const inputFeedIdList = values.targetFeedList ?? [];
      await handleUpdateMyFeedFolder({
        title: values.title,
        description: inputDescription,
        selectedFeedIds: inputFeedIdList.map((feed) => feed.id),
      });
      onClose();
    });
  };

  const onDelete = useCallback(async () => {
    await handleDeleteMyFeedFolder();
    onClose();
  }, [handleDeleteMyFeedFolder, onClose]);

  return (
    <DialogContent onCloseAutoFocus={resetDialog}>
      <DialogHeader>
        <DialogTitle>{"Edit My Feed Folder"}</DialogTitle>
      </DialogHeader>
      <div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="h-[300px] overflow-y-scroll border-2 p-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="folder title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="folder description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* feeds */}
                <FormField
                  control={form.control}
                  name="targetFeedList"
                  render={({ field }) => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Feeds</FormLabel>
                        <div>
                          <SelectMultiFeedDialog
                            selectedFeedList={field.value}
                            feedsEndCursor={feedsEndCursor}
                            onSelectFeedList={handleSelectFeedList}
                          />
                        </div>
                        <FormControl>
                          {field.value.length > 0 && (
                            <div className="mt-4 flex  w-full flex-wrap rounded-md border-primary bg-secondary p-2 text-primary">
                              {field.value.map((feed) => {
                                return (
                                  <span
                                    className="mb-2 mr-2 block max-w-64 truncate rounded-full bg-primary-foreground px-2 py-1 text-xs font-normal text-amber-600 "
                                    key={feed.id}
                                  >
                                    # {feed.label}
                                    <Button
                                      variant={"ghost"}
                                      size="sm"
                                      onClick={() =>
                                        handleRemoveSelectedFeed(feed.id)
                                      }
                                    >
                                      <RxCross2 />
                                    </Button>
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-4 flex w-full justify-between space-x-4">
                <DialogClose>
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
                    type="submit"
                    disabled={!form.formState.isValid || isPending}
                  >
                    {"EDIT"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className="mt-8">
        {/* <DeleteMyFeedFolderAlertDialog
          myFeedFolderTitle={title}
          onDelete={onDelete}
        /> */}
      </div>
    </DialogContent>
  );
};
