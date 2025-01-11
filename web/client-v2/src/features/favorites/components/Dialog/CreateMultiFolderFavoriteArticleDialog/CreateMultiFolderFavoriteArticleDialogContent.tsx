"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { FragmentOf, readFragment } from "gql.tada";
import { useRouter } from "next/navigation";
import React, {
  useCallback,
  ClipboardEvent,
  useTransition,
  FC,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { z } from "zod";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/auth/actions/user";
import { createMultiFolderFavoriteArticleForUploadArticleMutation } from "@/features/favorites/actions/actCreateMultiFolderFavoriteArticleForUploadArticleMutation";
import { OGPPreviewContent } from "@/features/ogp/components/Dialog";

import { Button } from "@/shared/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogClose,
} from "@/shared/components/ui/dialog/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Loader } from "@/shared/components/ui/loader";
import { useServerRevalidatePage } from "@/shared/hooks/useServerRevalidatePage";
import { useStatusToast } from "@/shared/hooks/useStatusToast";
import { checkURL } from "@/shared/lib/check";
import { SelectOptionType } from "@/shared/types/utils";

import { getServerGetCreateMultiFolderFavoriteArticleDialogOGPQuery } from "./actGetServerGetCreateMultiFolderFavoriteArticleDialogOGPQuery";
import { OGPCreateMultiFolderFavoriteArticleDialogFragment } from "./OGPCreateMultiFolderFavoriteArticleDialogFragment";
import { SelectMultiFavoriteFolderDialog } from "../SelectMultiFavoriteFolderDialog";

const FormSchema = z.object({
  url: z
    .string({
      required_error: "Please enter the URL",
    })
    .url({ message: "Invalid URL" }),
});

const MutationFormSchema = z.object({
  targetFavoriteFolders: z
    .object({
      id: z.string(),
      label: z.string(),
    })
    .array()
    .min(1),
});

type CreateMultiFolderFavoriteArticleDialogContentProps = {
  foldersEndCursor?: string;
  onClose: () => void;
};

export const CreateMultiFolderFavoriteArticleDialogContent: FC<
  CreateMultiFolderFavoriteArticleDialogContentProps
> = ({ foldersEndCursor, onClose }) => {
  const router = useRouter();
  const { revalidatePage } = useServerRevalidatePage();

  const [ogpData, setOgpData] = useState<FragmentOf<
    typeof OGPCreateMultiFolderFavoriteArticleDialogFragment
  > | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isOgpPending, startOgpPending] = useTransition();
  const { successToast, failToast } = useStatusToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  });

  const mutationForm = useForm<z.infer<typeof MutationFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(MutationFormSchema),
    defaultValues: {
      targetFavoriteFolders: [],
    },
  });

  const resetDialog = useCallback(() => {
    form.reset();
    setOgpData(null);
  }, [form]);

  const onSubmit = useCallback(async (data: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      if (!checkURL(data.url)) return;
      const { data: resOgpData, error } =
        await getServerGetCreateMultiFolderFavoriteArticleDialogOGPQuery(
          data.url
        );
      if (!error && resOgpData) {
        setOgpData(resOgpData);
      }
    });
  }, []);

  const onPaste = useCallback(
    async (event: ClipboardEvent<HTMLInputElement>) => {
      const pastedText = event.clipboardData?.getData("text");
      onSubmit({ url: pastedText });
    },
    [onSubmit]
  );

  const handleSelectFolderList = useCallback(
    (targetSelectFolderList: Array<SelectOptionType>) => {
      mutationForm.setValue("targetFavoriteFolders", targetSelectFolderList);
    },
    [mutationForm]
  );

  const handleRemoveSelectedFolder = useCallback(
    (targetFolderId: string) => {
      mutationForm.setValue(
        "targetFavoriteFolders",
        mutationForm
          .getValues("targetFavoriteFolders")
          .filter((f) => f.id !== targetFolderId)
      );
    },
    [mutationForm]
  );

  const handleAddSubmit = useCallback(
    async (values: z.infer<typeof MutationFormSchema>) => {
      startOgpPending(async () => {
        const folderList = values.targetFavoriteFolders;
        if (folderList.length === 0) {
          failToast({
            description: "Please select a favorite folder",
          });
          return;
        }

        const user = await getUser();
        if (!user) {
          failToast({
            description: "Fail: Please login to favorite this article",
          });
          await logoutToLoginPage();
          return;
        }

        const fragment = readFragment(
          OGPCreateMultiFolderFavoriteArticleDialogFragment,
          ogpData
        );
        if (!fragment) return;

        const targetFolderIds = folderList.map((folder) => folder.id);

        const { data, errors } =
          await createMultiFolderFavoriteArticleForUploadArticleMutation({
            favoriteArticleFolderIds: targetFolderIds,
            title: fragment.articleOpg.title,
            description: fragment?.articleOpg?.description || "",
            articleUrl: form.getValues("url"),
            thumbnailUrl: fragment.articleOpg.thumbnailUrl,
            platformName: fragment.articleOpg.siteName,
            platformUrl: fragment.articleOpg.siteUrl,
            platformFaviconUrl: fragment.articleOpg.faviconUrl,
          });

        if (errors) {
          if (errors.length > 0) {
            // TODO: Modify the error message response on the BFF side
            const errMsg =
              errors[0].message.indexOf("favorite article already exists") != -1
                ? "favorite article already exists"
                : errors[0].message;
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

        if (
          data?.createMultiFavoriteArticleForUploadArticle.favoriteArticle?.id
        ) {
          successToast({
            description: `Added to the favorite article folder '${fragment.articleOpg.title}'`,
          });
        }
        await revalidatePage();
        router.replace(`/favorite/article`);
        resetDialog();
        onClose();
        return;
      });
    },
    [
      successToast,
      failToast,
      form,
      ogpData,
      onClose,
      resetDialog,
      revalidatePage,
      router,
    ]
  );

  return (
    <DialogContent onCloseAutoFocus={resetDialog}>
      <DialogHeader>
        <DialogTitle>{"Add New Favorite Article"}</DialogTitle>
      </DialogHeader>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold">
                    URL
                    <span className="text-red-700"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="block w-full"
                      placeholder="https://example.com"
                      type="url"
                      pattern="https://.*|http://.*"
                      onPaste={onPaste}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <Form {...mutationForm}>
        <form
          onSubmit={mutationForm.handleSubmit(handleAddSubmit)}
          className="space-y-8"
        >
          {isPending && <Loader />}
          {!isPending && ogpData && (
            <>
              <OGPPreviewContent
                data={
                  readFragment(
                    OGPCreateMultiFolderFavoriteArticleDialogFragment,
                    ogpData
                  ).articleOpg
                }
              />
              <FormField
                control={mutationForm.control}
                name="targetFavoriteFolders"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 grid gap-2">
                      <FormLabel className="text-base">
                        Favorite Folders
                      </FormLabel>
                      <FormMessage />
                      <div>
                        <SelectMultiFavoriteFolderDialog
                          selectedFolderList={field.value}
                          foldersEndCursor={foldersEndCursor}
                          onSelectFolderList={handleSelectFolderList}
                        />
                      </div>
                      <FormControl>
                        {field.value.length > 0 && (
                          <div className="mt-4 flex  w-full flex-wrap rounded-md border-primary bg-secondary p-2 text-primary">
                            {field.value.map((folder) => {
                              return (
                                <span
                                  className="mb-2 mr-2 block max-w-64 truncate rounded-full bg-primary-foreground px-2 py-1 text-xs font-normal text-amber-600"
                                  key={folder.id}
                                >
                                  # {folder.label}
                                  <Button
                                    variant={"ghost"}
                                    size="sm"
                                    onClick={() =>
                                      handleRemoveSelectedFolder(folder.id)
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
                    </div>
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="mt-4 flex w-full justify-between space-x-4">
            <DialogClose>
              <Button variant={"outline"} onClick={resetDialog}>
                {"CLOSE"}
              </Button>
            </DialogClose>

            {isOgpPending ? (
              <Button disabled>
                <ReloadIcon className="mr-2 size-4 animate-spin" />
                PLEASE WAIT
              </Button>
            ) : (
              <Button type="submit" disabled={!ogpData}>
                {"ADD"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};
