"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { DeleteFavoriteArticleFolderAlertDialog } from "../DeleteFavoriteArticleFolderAlertDialog";

const formSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title is required")
    .max(255, "Title must be less than 25 characters"),
  description: z.string().optional(),
});

type UpdateFavoriteArticleFolderDialogContentProps = {
  favoriteArticleFolderId: string;
  title: string;
  description?: string;
  onUpdateFavoriteArticleFolder: ({
    id,
    title,
    description,
  }: {
    id: string;
    title: string;
    description?: string;
  }) => Promise<void>;
  onDeleteFavoriteArticleFolder: (id: string, title: string) => Promise<void>;
  onClose: () => void;
};

export const UpdateFavoriteArticleFolderDialogContent: FC<
  UpdateFavoriteArticleFolderDialogContentProps
> = ({
  favoriteArticleFolderId,
  title,
  description,
  onClose,
  onUpdateFavoriteArticleFolder,
  onDeleteFavoriteArticleFolder,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      description: description,
    },
  });
  const resetDialog = useCallback(() => {
    form.reset();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const inputDescription = values.description ?? "";
    await onUpdateFavoriteArticleFolder({
      id: favoriteArticleFolderId,
      title: values.title,
      description: inputDescription,
    });
    onClose();
  };

  const onDelete = useCallback(async () => {
    await onDeleteFavoriteArticleFolder(favoriteArticleFolderId, title);
    onClose();
  }, [favoriteArticleFolderId, onDeleteFavoriteArticleFolder, onClose, title]);

  return (
    <DialogContent onCloseAutoFocus={resetDialog}>
      <DialogHeader>
        <DialogTitle>{"Edit Favorite Article Folder"}</DialogTitle>
      </DialogHeader>
      <div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className=" p-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          className="border-primary bg-secondary text-primary"
                          placeholder="folder title"
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
                    <FormItem className="mb-4">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          className="border-primary bg-secondary text-primary"
                          placeholder="folder description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
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
                <Button type="submit">{"EDIT"}</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className="mt-8">
        <DeleteFavoriteArticleFolderAlertDialog
          favoriteArticleFolderTitle={title}
          onDelete={onDelete}
        />
      </div>
    </DialogContent>
  );
};
