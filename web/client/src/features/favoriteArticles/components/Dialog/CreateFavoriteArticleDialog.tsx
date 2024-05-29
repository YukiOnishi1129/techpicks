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
  Dialog,
  DialogTrigger,
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

import { fetchFavoriteArticleCountByFolderIdAndArticleUrlAPI } from "../../actions/favoriteArticle";
import { createFavoriteArticle } from "../../repository/favoriteArticle";

type CreateFavoriteArticleDialogProps = {
  user: User | undefined;
  favoriteArticleFolderId: string;
};

export const CreateFavoriteArticleDialog: FC<
  CreateFavoriteArticleDialogProps
> = ({ user, favoriteArticleFolderId }) => {
  const router = useRouter();
  const { revalidatePage } = useServerRevalidatePage();
  const [ogpData, setOgpData] = useState<OgpType | null>(null);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isOgpPending, startOgpPending] = useTransition();
  const { successToast, failToast } = useStatusToast();
  const FormSchema = z.object({
    url: z
      .string({
        required_error: "Please enter the URL",
      })
      .url({ message: "Invalid URL" }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
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
          description: "Fail: Please login to add favorite article",
        });
        await logoutToLoginPage();
        return;
      }

      // 1. check favorite article is already favorite
      const url = form.getValues("url");
      const countResponse =
        await fetchFavoriteArticleCountByFolderIdAndArticleUrlAPI({
          articleUrl: url,
          favoriteArticleFolderId: favoriteArticleFolderId,
        });
      if (countResponse.status !== 200) {
        failToast({
          description: "Fail: fetch favorite article count failed",
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

      // 2. If same article url is in article table, register that date to article table.
      const articleResponse = await fetchArticleByArticleAndPlatformUrlAPI({
        articleUrl: url,
        platformUrl: ogpData?.siteUrl || "",
      });

      if (articleResponse.status === 200 && articleResponse.data?.article) {
        const article = articleResponse.data.article;
        const data = await createFavoriteArticle({
          title: article.title,
          description: article.description,
          articleId: article.id,
          articleUrl: article.articleUrl,
          thumbnailURL: article.thumbnailUrl,
          isRead: false,
          userId: user?.id || "",
          platformId: article.platform?.id,
          platformName: article.platform?.name,
          platformUrl: article.platform?.siteUrl,
          platformFaviconUrl: article.platform?.faviconUrl,
          isEng: article.platform?.isEng || false,
          favoriteArticleFolderId: favoriteArticleFolderId,
        });
        if (!data) {
          failToast({
            description: "Fail: add favorite article failed",
          });
          return;
        }
        successToast({
          description: "Success: add favorite article",
        });
        await revalidatePage();
        router.replace(`/favorite-article-folder/${favoriteArticleFolderId}`);
        resetDialog();
        setOpen(false);
        return;
      }

      // 3. If same article url and private are in article table, only register that data to favorite article table.
      const privateArticlesRes = await fetchPrivateArticlesByArticleUrlAPI({
        articleUrl: url,
      });

      if (privateArticlesRes.data.articles.length > 0) {
        const article = privateArticlesRes.data.articles[0];
        const data = await createFavoriteArticle({
          title: ogpData?.title || "",
          description: ogpData?.description || "",
          articleId: article.id,
          articleUrl: url,
          thumbnailURL: ogpData?.image || "",
          isRead: false,
          userId: user?.id || "",
          platformName: ogpData?.siteName || "",
          platformUrl: ogpData?.siteUrl || "",
          platformFaviconUrl: ogpData?.faviconImage || "",
          isEng: article.isEng,
          favoriteArticleFolderId: favoriteArticleFolderId,
        });
        if (!data) {
          failToast({
            description: "Fail: add favorite article failed",
          });
          return;
        }
        successToast({
          description: "Success: add favorite article",
        });
        await revalidatePage();
        router.replace(`/favorite-article-folder/${favoriteArticleFolderId}`);
        resetDialog();
        setOpen(false);
        return;
      }

      // 4. If not, get ogp data and register that data to article table and favorite article table.
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

      const data = await createFavoriteArticle({
        articleId: createdArticleId,
        title: ogpData?.title || "",
        description: ogpData?.description || "",
        articleUrl: url,
        thumbnailURL: ogpData?.image || "",
        isRead: false,
        userId: user?.id || "",
        platformName: ogpData?.siteName || "",
        platformUrl: ogpData?.siteUrl || "",
        platformFaviconUrl: ogpData?.faviconImage || "",
        isEng: isEng,
        favoriteArticleFolderId: favoriteArticleFolderId,
      });
      if (!data) {
        failToast({
          description: "Fail: add favorite article failed",
        });
        return;
      }
      successToast({
        description: "Success: add favorite article",
      });
      await revalidatePage();
      router.replace(`/favorite-article-folder/${favoriteArticleFolderId}`);
      resetDialog();
      setOpen(false);
    });
  }, [
    form,
    router,
    resetDialog,
    failToast,
    successToast,
    user,
    ogpData,
    favoriteArticleFolderId,
    revalidatePage,
  ]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{"Add new article"}</Button>
      </DialogTrigger>
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
                    <FormLabel className="font-bold">URL</FormLabel>
                    <FormControl>
                      <Input
                        className="block w-full border-primary bg-secondary text-primary"
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

        <div className="mt-4 flex w-full justify-start space-x-4">
          {isOgpPending ? (
            <Button disabled>
              <ReloadIcon className="mr-2 size-4 animate-spin" />
              PLEASE WAIT
            </Button>
          ) : (
            <Button disabled={!ogpData} onClick={handleAddSubmit}>
              {"ADD FAVORITE"}
            </Button>
          )}
          <DialogClose>
            <Button onClick={resetDialog}>{"CLOSE"}</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
