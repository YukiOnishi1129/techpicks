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

import { fetchArticleByArticleAndPlatformUrlAPI } from "@/features/articles/actions/article";
import { createArticle } from "@/features/articles/repository/article";
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

import { fetchBookmarkCountByArticleUrlAPI } from "../../actions/bookmark";
import { createBookmark } from "../../repository/bookmark";

type CreateBookmarkDialogProps = {
  user: User | undefined;
};

export const CreateBookmarkDialog: FC<CreateBookmarkDialogProps> = ({
  user,
}: CreateBookmarkDialogProps) => {
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
          description: "Fail: Please login to bookmark this article",
        });
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
          thumbnailURL: article.thumbnailURL,
          isRead: false,
          userId: user?.id || "",
          platformId: article.platform?.id,
          platformName: article.platform?.name,
          platformUrl: article.platform?.siteUrl,
          platformFaviconUrl: article.platform?.faviconUrl,
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
        router.replace(`/bookmark/`);
        resetDialog();
        setOpen(false);
        return;
      }

      // 3. If not, get ogp data and register that data to article table and bookmark table.
      const isEng = !checkJapaneseArticle({
        title: ogpData?.title || "",
        description: ogpData?.description || "",
      });

      const createdArticleId = await createArticle({
        title: ogpData?.title || "",
        description: ogpData?.description || "",
        articleUrl: url,
        thumbnailURL: ogpData?.image || "",
        isEng: isEng,
        isPrivate: false,
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
        thumbnailURL: ogpData?.image || "",
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
      setOpen(false);
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
  ]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{"Add article"}</Button>
      </DialogTrigger>
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
                    <FormLabel className="font-bold">URL</FormLabel>
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
                    <Link href={ogpData.siteUrl} target="_blank">
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
              {"ADD BOOKMARK"}
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
