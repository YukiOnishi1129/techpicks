"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useStatusToast } from "@/hooks/useStatusToast";

import { checkJapaneseArticle } from "@/lib/check";

import { LanguageStatus } from "@/types/language";
import { OgpType } from "@/types/ogp";

import { fetchBookmarkCountByArticleUrlAPI } from "../actions/bookmark";
import { serverRevalidateBookmark } from "../actions/serverAction";
import { createBookmark } from "../repository/bookmark";

type CreateBookmarkDialogProps = {
  user: User | undefined;
  languageStatus: LanguageStatus;
};

export const CreateBookmarkDialog: FC<CreateBookmarkDialogProps> = ({
  user,
  languageStatus,
}: CreateBookmarkDialogProps) => {
  const router = useRouter();
  const [ogpData, setOgpData] = useState<OgpType | null>(null);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { successToast, failToast } = useStatusToast();
  const FormSchema = z.object({
    url: z.string().min(1, {
      message: "Please enter a valid URL",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = useCallback(async (data: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const ogp = await getOgpData(data.url);
      setOgpData(ogp);
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
      const id = await createBookmark({
        title: article.title,
        description: article.description,
        articleId: article.id,
        articleUrl: article.articleUrl,
        thumbnailURL: article.thumbnailURL,
        isRead: false,
        userId: user?.id || "",
        platformId: article.platform.id,
        platformName: article.platform.name,
        platformUrl: article.platform.siteUrl,
        platformFaviconUrl: article.platform.faviconUrl,
        isEng: article.platform.isEng,
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
      await serverRevalidateBookmark();
      router.replace(`/bookmark/?languageStatus=${languageStatus}`);
      setOpen(false);
      return;
    }
    // 3. If not, get ogp data and register that data to article table and bookmark table.
    const isEng = !checkJapaneseArticle({
      title: ogpData?.title || "",
      description: ogpData?.description || "",
    });
    const id = await createBookmark({
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
    await serverRevalidateBookmark();
    router.replace(`/bookmark/?languageStatus=${languageStatus}`);
    setOpen(false);
  }, [form, router, languageStatus, failToast, successToast, user, ogpData]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{"Add new article"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{"Add New Bookmark Article"}</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article url</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com"
                        type="url"
                        pattern="https://.*|http://.*"
                        onPaste={onPaste}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {
                        "Please enter the URL of the article you want to bookmark"
                      }
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        {isPending && <Loader />}
        {!isPending && ogpData && (
          <div className="mt-8 w-full">
            <div className="flex h-[200px] w-full justify-around overflow-y-scroll">
              <div className="w-2/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ogpData.image} alt="" />
              </div>
              <div className="w-2/5">
                <h3>{ogpData.title}</h3>
                <p className="overflow-hidden truncate">
                  {ogpData.description}
                </p>

                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="size-6" src={ogpData.faviconImage} alt="" />
                  <span>
                    <Link href={ogpData.siteUrl} target="_blank">
                      {ogpData.siteName}
                    </Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={handleAddSubmit}>{"Add bookmark"}</Button>
            </div>
          </div>
        )}
        <DialogClose>
          <Button>{"Close"}</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
