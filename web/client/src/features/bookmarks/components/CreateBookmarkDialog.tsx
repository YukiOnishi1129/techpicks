"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";
import { Loader } from "lucide-react";
import Link from "next/link";
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

import { OgpType } from "@/types/ogp";

import {
  createBookmarkAPI,
  fetchBookmarkCountByArticleUrl,
} from "../actions/bookmark";

type CreateBookmarkDialogProps = {
  user: User | undefined;
};

export const CreateBookmarkDialog: FC<CreateBookmarkDialogProps> = ({
  user,
}: CreateBookmarkDialogProps) => {
  const [ogpData, setOgpData] = useState<OgpType | null>(null);
  const [isPending, startTransition] = useTransition();
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
    console.log("Add bookmark");
    if (!user) return;
    // 1. check article is already bookmarked
    const url = form.getValues("url");
    const countResponse = await fetchBookmarkCountByArticleUrl({
      articleUrl: url,
    });
    const count = countResponse.data?.count;
    if (countResponse.status !== 200 || !count) return;
    // TODO: if count > 0, show error message
    if (count > 0) return;

    // 2. If same article url is in article table, register that date to bookmark table.
    const articleResponse = await fetchArticleByArticleAndPlatformUrlAPI({
      articleUrl: url,
      platformUrl: ogpData?.siteUrl || "",
    });

    if (articleResponse.status === 200 && articleResponse.data?.article) {
      const article = articleResponse.data.article;
      const createResponse = await createBookmarkAPI({
        title: article.title,
        description: article.description,
        articleId: article.id,
        articleUrl: article.articleUrl,
        thumbnailURL: article.thumbnailURL,
        platformId: article.platform.id,
        platformName: article.platform.name,
        platformUrl: article.platform.siteUrl,
        platformFaviconUrl: article.platform.faviconUrl,
        isEng: article.platform.isEng,
      });
      // TODO: show success message
      return;
    }
    // 3. If not, get ogp data and register that data to article table and bookmark table.
    const res = await createBookmarkAPI({
      title: ogpData?.title || "",
      description: ogpData?.description || "",
      articleUrl: url,
      thumbnailURL: ogpData?.image || "",
      platformName: ogpData?.siteName || "",
      platformUrl: ogpData?.siteUrl || "",
      platformFaviconUrl: ogpData?.favIconImage || "",
      isEng: false,
    });
  }, [
    form,
    ogpData?.description,
    ogpData?.favIconImage,
    ogpData?.image,
    ogpData?.siteName,
    ogpData?.siteUrl,
    ogpData?.title,
    user,
  ]);

  return (
    <Dialog>
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
                  <img className="size-6" src={ogpData.favIconImage} alt="" />
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
