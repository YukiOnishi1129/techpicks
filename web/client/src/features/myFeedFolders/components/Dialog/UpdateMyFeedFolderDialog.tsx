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
  feeds: FeedType[];
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
  feeds,
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
          feeds={feeds}
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
  feeds: FeedType[];
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
  feeds,
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
  const [isPending, startTransition] = useTransition();
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
                      <div className="grid grid-cols-2 gap-2">
                        {feeds?.length &&
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
                {/* category */}
                {/*  */}

                {/* <h3>sort condition</h3> */}
              </div>

              <div className="mt-4 flex w-full justify-center space-x-4">
                <Button type="submit">{"EDIT"}</Button>
                <DialogClose>
                  <Button onClick={resetDialog}>{"CLOSE"}</Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div>
        <DeleteMyFeedFolderAlertDialog
          myFeedFolderTitle={title}
          onDelete={onDelete}
        />
      </div>
    </DialogContent>
  );
};
