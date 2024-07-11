"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { FC, useCallback, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { fetchAllFeedAPI } from "@/features/feeds/actions/feed";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Loader } from "@/components/ui/loader";

import { FeedType } from "@/types/feed";

import { DeleteMyFeedFolderAlertDialog } from "./DeleteMyFeedFolderAlertDialog";

const formSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title is required")
    .max(255, "Title must be less than 25 characters"),
  description: z.string().optional(),
  feedIdList: z.array(z.string()).optional(),
});

type UpdateMyFeedFolderDialogProps = {
  myFeedFolderId: string;
  title: string;
  description: string;
  feedIdList: Array<string>;
  handleUpdateMyFeedFolder: ({
    myFeedFolderId,
    myFeedFolderTitle,
    myFeedDescription,
    selectedFeedIds,
  }: {
    myFeedFolderId: string;
    myFeedFolderTitle: string;
    myFeedDescription: string;
    selectedFeedIds: string[];
  }) => Promise<void>;
  handleDeleteMyFeedFolder: (id: string) => Promise<void>;
};

export const UpdateMyFeedFolderDialog: FC<UpdateMyFeedFolderDialogProps> = ({
  myFeedFolderId,
  title,
  description,
  feedIdList,
  handleUpdateMyFeedFolder,
  handleDeleteMyFeedFolder,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-emerald-500 font-bold text-emerald-500 hover:text-emerald-600 "
        >
          {"EDIT"}
        </Button>
      </DialogTrigger>
      {open && (
        <UpdateMyFeedFolderDialogContent
          myFeedFolderId={myFeedFolderId}
          title={title}
          description={description}
          feedIdList={feedIdList}
          handleUpdateMyFeedFolder={handleUpdateMyFeedFolder}
          handleDeleteMyFeedFolder={handleDeleteMyFeedFolder}
          handleClose={handleClose}
        />
      )}
    </Dialog>
  );
};

type UpdateMyFeedFolderDialogContentProps = {
  myFeedFolderId: string;
  title: string;
  description: string;
  feedIdList: Array<string>;
  handleUpdateMyFeedFolder: ({
    myFeedFolderId,
    myFeedFolderTitle,
    myFeedDescription,
    selectedFeedIds,
  }: {
    myFeedFolderId: string;
    myFeedFolderTitle: string;
    myFeedDescription: string;
    selectedFeedIds: string[];
  }) => Promise<void>;
  handleDeleteMyFeedFolder: (id: string) => Promise<void>;
  handleClose: () => void;
};

export const UpdateMyFeedFolderDialogContent: FC<
  UpdateMyFeedFolderDialogContentProps
> = ({
  myFeedFolderId,
  title,
  description,
  feedIdList,
  handleUpdateMyFeedFolder,
  handleDeleteMyFeedFolder,
  handleClose,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      description: description,
      feedIdList: feedIdList,
    },
  });

  const [feeds, setFeeds] = useState<FeedType[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isFetchFeedPending, startFetchFeedTransition] = useTransition();
  const resetDialog = useCallback(() => {
    form.reset();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const inputDescription = values.description ?? "";
      const inputFeedIdList = values.feedIdList ?? [];
      await handleUpdateMyFeedFolder({
        myFeedFolderId,
        myFeedFolderTitle: values.title,
        myFeedDescription: inputDescription,
        selectedFeedIds: inputFeedIdList,
      });
      handleClose();
    });
  };

  const onDelete = useCallback(async () => {
    await handleDeleteMyFeedFolder(myFeedFolderId);
    handleClose();
  }, [myFeedFolderId, handleDeleteMyFeedFolder, handleClose]);

  const fetchFeedList = useCallback(async () => {
    startFetchFeedTransition(async () => {
      const resFeeds = await fetchAllFeedAPI({});
      setFeeds(resFeeds.data.feeds);
    });
  }, []);

  useEffect(() => {
    fetchFeedList();
  }, [fetchFeedList]);

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
                  name="feedIdList"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Feeds</FormLabel>
                      </div>
                      {isFetchFeedPending && (
                        <div className="flex h-20 w-full items-center justify-center">
                          <Loader />
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-2">
                        {!isFetchFeedPending &&
                          feeds.map((feed) => (
                            <FormField
                              key={feed.id}
                              control={form.control}
                              name="feedIdList"
                              render={({ field }) => (
                                <FormItem key={feed.id} className="mb-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(feed.id)}
                                      onCheckedChange={(checked) => {
                                        const array = field.value ?? [];
                                        return checked
                                          ? field.onChange([...array, feed.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== feed.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="ml-2 w-full text-sm font-normal">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      className="mr-2 inline-block size-6 bg-white"
                                      src={feed.platform?.faviconUrl}
                                      alt=""
                                    />
                                    {feed.name}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
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
        <DeleteMyFeedFolderAlertDialog
          myFeedFolderTitle={title}
          onDelete={onDelete}
        />
      </div>
    </DialogContent>
  );
};
