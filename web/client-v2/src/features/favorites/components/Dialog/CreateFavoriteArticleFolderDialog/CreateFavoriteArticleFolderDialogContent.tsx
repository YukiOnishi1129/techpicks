"use client";

import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { graphql } from "gql.tada";
import { useCallback, FC, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/auth/actions/user";

import { Button } from "@/components/ui/button";
import {
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

import { FollowTargetFavoriteArticleFolderItemFragment } from "../../DropdownMenu/FollowFavoriteArticleDropdownMenu/FollowFavoriteArticleDropdownMenuFragment";

const CreateFavoriteArticleFolderMutation = graphql(`
  mutation CreateFavoriteArticleFolderMutation(
    $input: CreateFavoriteArticleFolderInput!
  ) {
    createFavoriteArticleFolder(input: $input) {
      id
      title
    }
  }
`);

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
  onCreateFavoriteArticleFolder?: (
    favoriteArticleFolderId: string,
    title: string
  ) => Promise<void>;
};

export const CreateFavoriteArticleFolderDialogContent: FC<
  CreateMyFeedFolderDialogContentProps
> = ({ onCloseDialog, onCreateFavoriteArticleFolder }) => {
  const { successToast, failToast } = useStatusToast();
  const [isPending, startTransition] = useTransition();

  const [createFavoriteArticleFolderMutation] = useMutation(
    CreateFavoriteArticleFolderMutation
  );

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
            description: "Please login to create a favorite article folder",
          });
          await logoutToLoginPage();
          return;
        }

        const { data: folderData, errors } =
          await createFavoriteArticleFolderMutation({
            variables: {
              input: {
                title: data.title,
                description: data.description,
              },
            },
            update: (cache, { data }) => {
              if (!data) return;
              cache.modify({
                fields: {
                  favoriteArticleFolders(existingFolders = []) {
                    const newFolderRef = cache.writeFragment({
                      data: data.createFavoriteArticleFolder,
                      fragment: FollowTargetFavoriteArticleFolderItemFragment,
                    });
                    return {
                      __typename: "FavoriteArticleFolderConnection",
                      edges: [
                        ...existingFolders.edges,
                        {
                          __typename: "FavoriteArticleFolderEdge",
                          node: newFolderRef,
                        },
                      ],
                    };
                  },
                },
              });
            },
          });

        let errMsg = "";
        if (errors) {
          errMsg = "Fail: Something went wrong";
          if (errors.length > 0) {
            errMsg = errors[0].message;
          }
        }

        if (!folderData?.createFavoriteArticleFolder?.id)
          errMsg = "Fail: Something went wrong";

        if (errMsg !== "") {
          failToast({
            description: errMsg,
          });
          return;
        }

        successToast({
          description: "Successfully created favorite article folder",
        });
        if (onCreateFavoriteArticleFolder !== undefined) {
          if (!folderData?.createFavoriteArticleFolder.id) return;
          await onCreateFavoriteArticleFolder(
            folderData.createFavoriteArticleFolder.id,
            data.title
          );
          resetDialog();
          onCloseDialog();
          return;
        }
        resetDialog();
        onCloseDialog();
      });
    },
    [
      failToast,
      onCloseDialog,
      resetDialog,
      successToast,
      onCreateFavoriteArticleFolder,
      createFavoriteArticleFolderMutation,
    ]
  );

  return (
    <DialogContent onCloseAutoFocus={resetDialog}>
      <DialogHeader>
        <DialogTitle>{"Create Favorite Article Folder"}</DialogTitle>
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
                      placeholder="Favorite Article  Folder Title"
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
                      placeholder="Favorite Article Folder Description"
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
