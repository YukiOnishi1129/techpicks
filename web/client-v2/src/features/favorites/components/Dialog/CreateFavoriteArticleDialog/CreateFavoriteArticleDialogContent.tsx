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
import { z } from "zod";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/auth/actions/user";
import { createFavoriteArticleForUploadArticleMutation } from "@/features/favorites/actions/actCreateFavoriteArticleForUploadArticleMutation";
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

import { getCreateFavoriteArticleDialogOGPQuery } from "./actGetCreateFavoriteArticleDialogOGPQuery";
import { CreateFavoriteArticleDialogContentFragment } from "./CreateFavoriteArticleDialogFragment";

type CreateFavoriteArticleDialogContentProps = {
  favoriteArticleFolderId: string;
  onClose: () => void;
};

const FormSchema = z.object({
  url: z
    .string({
      required_error: "Please enter the URL",
    })
    .url({ message: "Invalid URL" }),
});

export const CreateFavoriteArticleDialogContent: FC<
  CreateFavoriteArticleDialogContentProps
> = ({ favoriteArticleFolderId, onClose }) => {
  const router = useRouter();
  const { revalidatePage } = useServerRevalidatePage();
  const [ogpData, setOgpData] = useState<FragmentOf<
    typeof CreateFavoriteArticleDialogContentFragment
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

  const resetDialog = useCallback(() => {
    form.reset();
    setOgpData(null);
  }, [form]);

  const onSubmit = useCallback(async (data: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      if (!checkURL(data.url)) return;
      const { data: resOgpData, error } =
        await getCreateFavoriteArticleDialogOGPQuery(data.url);
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

  const handleAddSubmit = useCallback(async () => {
    startOgpPending(async () => {
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Fail: Please login to favorite this article",
        });
        await logoutToLoginPage();
        return;
      }

      const fragment = readFragment(
        CreateFavoriteArticleDialogContentFragment,
        ogpData
      );
      if (!fragment) return;

      const { data, error } =
        await createFavoriteArticleForUploadArticleMutation({
          favoriteArticleFolderId: favoriteArticleFolderId,
          title: fragment.articleOpg.title,
          description: fragment?.articleOpg?.description || "",
          articleUrl: form.getValues("url"),
          thumbnailUrl: fragment.articleOpg.thumbnailUrl,
          platformName: fragment.articleOpg.siteName,
          platformUrl: fragment.articleOpg.siteUrl,
          platformFaviconUrl: fragment.articleOpg.faviconUrl,
        });

      if (error) {
        if (error.length > 0) {
          // TODO: Modify the error message response on the BFF side
          const errMsg =
            error[0].message.indexOf("favorite article already exists") != -1
              ? "favorite article already exists"
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

      if (data?.createFavoriteArticleForUploadArticle?.id) {
        successToast({
          description: `Added to the favorite article folder '${fragment.articleOpg.title}'`,
        });
      }
      await revalidatePage();
      router.replace(`/favorite/article/${favoriteArticleFolderId}`);
      resetDialog();
      onClose();
      return;
    });
  }, [
    successToast,
    failToast,
    form,
    ogpData,
    onClose,
    resetDialog,
    revalidatePage,
    router,
    favoriteArticleFolderId,
  ]);

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

      {isPending && <Loader />}
      {!isPending && ogpData && (
        <OGPPreviewContent
          data={
            readFragment(CreateFavoriteArticleDialogContentFragment, ogpData)
              .articleOpg
          }
        />
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
          <Button disabled={!ogpData} onClick={handleAddSubmit}>
            {"ADD"}
          </Button>
        )}
      </div>
    </DialogContent>
  );
};
