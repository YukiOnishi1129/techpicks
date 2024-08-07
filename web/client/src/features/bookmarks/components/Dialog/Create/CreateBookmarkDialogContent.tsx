"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { User } from "@supabase/supabase-js";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useState,
  ClipboardEvent,
  useTransition,
  FC,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  fetchArticleByArticleAndPlatformUrlAPI,
  fetchPrivateArticlesByArticleUrlAPI,
} from "@/features/articles/actions/article";
import { createArticle } from "@/features/articles/repository/article";
import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getOgpData } from "@/features/ogp/actions/ogp";

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

import { useServerRevalidatePage } from "@/hooks/useServerRevalidatePage";
import { useStatusToast } from "@/hooks/useStatusToast";

import { checkJapaneseArticle } from "@/lib/check";

import { OgpType } from "@/types/ogp";

import { fetchBookmarkCountByArticleUrlAPI } from "../../../actions/bookmark";
import { createBookmark } from "../../../repository/bookmark";

type CreateBookmarkDialogContentProps = {
  user?: User;
  handleClose: () => void;
};

const FormSchema = z.object({
  url: z
    .string({
      required_error: "Please enter the URL",
    })
    .url({ message: "Invalid URL" }),
});

export const CreateBookmarkDialogContent: FC<
  CreateBookmarkDialogContentProps
> = ({ user, handleClose }) => {
  const router = useRouter();
  const { revalidatePage } = useServerRevalidatePage();
  const [ogpData, setOgpData] = useState<OgpType | null>(null);
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
      const ogp = await getOgpData(data.url);
      // TODO: handle error undefined
      if (ogp) setOgpData(ogp);
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
      if (!user) {
        failToast({
          description: "Fail: Please login to bookmark this article",
        });
        await logoutToLoginPage();
        return;
      }
      // 1. check article is already bookmarked
      const url = form.getValues("url");
      const countResponse = await fetchBookmarkCountByArticleUrlAPI({
        articleUrl: url,
      });
      if (countResponse.status !== 200) {
        failToast({
          description: "Fail: fetch bookmark count failed",
        });
        return;
      }
      const count = countResponse.data?.count;
      if (count != undefined && count > 0) {
        failToast({
          description: "Fail: This article is already bookmarked",
        });
        return;
      }

      // 2. If same article url is in article table, register that date to bookmark table.
      const articleResponse = await fetchArticleByArticleAndPlatformUrlAPI({
        articleUrl: url,
        platformUrl: ogpData?.siteUrl || "",
      });

      if (articleResponse.status === 200 && articleResponse.data?.article) {
        const article = articleResponse.data.article;
        const data = await createBookmark({
          title: article.title,
          description: article.description,
          articleId: article.id,
          articleUrl: article.articleUrl,
          thumbnailUrl: article.thumbnailUrl,
          isRead: false,
          userId: user?.id || "",
          platformId: article.platform?.id,
          platformName: article.platform?.name || "",
          platformUrl: article.platform?.siteUrl || "",
          platformFaviconUrl: article.platform?.faviconUrl || "",
          isEng: article.platform?.isEng || false,
        });
        if (!data) {
          failToast({
            description: "Fail: add bookmark failed",
          });
          return;
        }
        successToast({
          description: "Success: add bookmark",
        });
        await revalidatePage();
        router.replace("/bookmark");
        resetDialog();
        handleClose();
        return;
      }

      // 3. If same article url and private are in article table, only register that data to favorite article table.
      const privateArticlesRes = await fetchPrivateArticlesByArticleUrlAPI({
        articleUrl: url,
      });
      if (privateArticlesRes.data.articles.length > 0) {
        const article = privateArticlesRes.data.articles[0];
        const id = await createBookmark({
          articleId: article.id,
          title: ogpData?.title || "",
          description: ogpData?.description || "",
          articleUrl: url,
          thumbnailUrl: ogpData?.image || "",
          isRead: false,
          userId: user?.id || "",
          platformName: ogpData?.siteName || "",
          platformUrl: ogpData?.siteUrl || "",
          platformFaviconUrl: ogpData?.faviconImage || "",
          isEng: article.isEng,
        });
        if (!id) {
          failToast({
            description: "Fail: add bookmark failed",
          });
          return;
        }
        successToast({
          description: "Success: add bookmark",
        });
        await revalidatePage();
        router.replace(`/bookmark`);
        resetDialog();
        handleClose();
        return;
      }

      // 4. If not, get ogp data and register that data to article table and bookmark table.
      const isEng = !checkJapaneseArticle({
        title: ogpData?.title || "",
        description: ogpData?.description || "",
      });

      const createdArticleId = await createArticle({
        title: ogpData?.title || "",
        description: ogpData?.description || "",
        articleUrl: url,
        thumbnailUrl: ogpData?.image || "",
        isEng: isEng,
        isPrivate: true,
      });

      if (!createdArticleId) {
        failToast({
          description: "Fail: add article failed",
        });
        return;
      }

      const id = await createBookmark({
        articleId: createdArticleId,
        title: ogpData?.title || "",
        description: ogpData?.description || "",
        articleUrl: url,
        thumbnailUrl: ogpData?.image || "",
        isRead: false,
        userId: user?.id || "",
        platformName: ogpData?.siteName || "",
        platformUrl: ogpData?.siteUrl || "",
        platformFaviconUrl: ogpData?.faviconImage || "",
        isEng: isEng,
      });

      if (!id) {
        failToast({
          description: "Fail: add bookmark failed",
        });
        return;
      }
      successToast({
        description: "Success: add bookmark",
      });
      await revalidatePage();
      router.replace(`/bookmark`);
      resetDialog();
      handleClose();
    });
  }, [
    form,
    router,
    revalidatePage,
    resetDialog,
    failToast,
    successToast,
    user,
    ogpData,
    handleClose,
  ]);

  return (
    <DialogContent onCloseAutoFocus={resetDialog}>
      <DialogHeader>
        <DialogTitle>{"Add New Bookmark Article"}</DialogTitle>
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
        <div className="mt-4 w-full">
          <h3 className="text-lg font-bold">PREVIEW</h3>
          <div className="mt-4 flex  w-full justify-around overflow-y-scroll">
            <div className="w-1/3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ogpData.image} alt="" />
            </div>
            <div className="w-3/5">
              <h3 className="line-clamp-2 h-12 w-full text-base font-bold leading-6">
                {ogpData.title}
              </h3>

              <div className="mt-4 flex cursor-pointer items-center space-x-2 hover:underline">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="size-6" src={ogpData.faviconImage} alt="" />

                <span className="text-sm">
                  <Link href={new URL(ogpData.siteUrl)} target="_blank">
                    {ogpData.siteName}
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
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
