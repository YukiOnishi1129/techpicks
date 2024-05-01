"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { useStatusToast } from "@/hooks/useStatusToast";

import { FeedType } from "@/types/feed";

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
  feeds: FeedType[];
  title: string;
  description: string;
  feedIdList: Array<string>;
  handleUpdateMyFeedFolder: ({
    id,
    title,
    description,
    feedIdList,
  }: {
    id: string;
    title: string;
    description: string;
    feedIdList: Array<string>;
  }) => Promise<void>;
  handleDeleteMyFeedFolder: (id: string) => Promise<void>;
};

export const UpdateMyFeedFolderDialog: FC<UpdateMyFeedFolderDialogProps> = ({
  myFeedFolderId,
  feeds,
  title,
  description,
  feedIdList,
  handleUpdateMyFeedFolder,
  handleDeleteMyFeedFolder,
}) => {
  const [open, setOpen] = useState(false);
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
          feeds={feeds}
          title={title}
          description={description}
          feedIdList={feedIdList}
          handleUpdateMyFeedFolder={handleUpdateMyFeedFolder}
          handleDeleteMyFeedFolder={handleDeleteMyFeedFolder}
        />
      )}
    </Dialog>
  );
};

type UpdateMyFeedFolderDialogContentProps = {
  myFeedFolderId: string;
  feeds: FeedType[];
  title: string;
  description: string;
  feedIdList: Array<string>;
  handleUpdateMyFeedFolder: ({
    id,
    title,
    description,
    feedIdList,
  }: {
    id: string;
    title: string;
    description: string;
    feedIdList: Array<string>;
  }) => Promise<void>;
  handleDeleteMyFeedFolder: (id: string) => Promise<void>;
};

export const UpdateMyFeedFolderDialogContent: FC<
  UpdateMyFeedFolderDialogContentProps
> = ({
  myFeedFolderId,
  feeds,
  title,
  description,
  feedIdList,
  handleUpdateMyFeedFolder,
  handleDeleteMyFeedFolder,
}) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      description: description,
      feedIdList: feedIdList,
    },
  });
  console.log("🔥");
  console.log(feedIdList);
  const { successToast, failToast } = useStatusToast();
  const [isPending, startTransition] = useTransition();
  const resetDialog = useCallback(() => {
    form.reset();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

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
                      {/* <FormDescription>
                      Let&apos;s enter the keyword you want to search.
                    </FormDescription> */}
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
                      {/* <FormDescription>
                      Let&apos;s enter the keyword you want to search.
                    </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* platform */}
                <FormField
                  control={form.control}
                  name="feedIdList"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Feeds</FormLabel>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {loading ? (
                          <Loader />
                        ) : (
                          feeds &&
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
                          ))
                        )}
                      </div>
                    </FormItem>
                  )}
                />
                {/* category */}
                {/*  */}

                {/* <h3>sort condition</h3> */}
              </div>

              <div className="mt-4 flex w-full justify-center space-x-4">
                <Button type="submit">{"EDIT"}</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div>
        <Button onClick={() => handleDeleteMyFeedFolder(myFeedFolderId)}>
          {"DELETE"}
        </Button>
        <DialogClose>
          <Button onClick={resetDialog}>{"CLOSE"}</Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
};
