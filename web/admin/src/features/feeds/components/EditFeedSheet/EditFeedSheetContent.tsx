"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  FC,
  useMemo,
  useCallback,
  useTransition,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { fetchCategoryByIdAPI } from "@/features/categories/actions/category";
import { fetchFeedArticleRelationsToArticlesAPI } from "@/features/feedArticleRelations/actions/feedArticleRelation";
import { fetchPlatformByIdAPI } from "@/features/platforms/actions/platform";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FadeLoaderComponent } from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SheetContent,
  SheetHeader,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

import { useStatusToast } from "@/hooks/useStatusToast";

import { ArticleType } from "@/types/article";
import { CategoryType } from "@/types/category";
import { FeedType } from "@/types/feed";
import { PlatformType } from "@/types/platform";

import { useFeedRedirectPage } from "../../hooks/useFeedRedirectPage";
import { updateFeed } from "../../repository/feed";
import { DeleteFeedAlertDialog } from "../DeleteFeedAlertDialog";
import { SelectCategoryDialog } from "../SelectCategoryDialog";
import { SelectPlatformDialog } from "../SelectPlatformDialog";

const FormSchema = z.object({
  name: z
    .string({
      required_error: "Please enter the name",
    })
    .min(1, { message: "Name is required" }),
  description: z
    .string({
      required_error: "Please enter the name",
    })
    .min(1, { message: "Name is required" }),
  platformId: z
    .string({
      required_error: "Please enter the name",
    })
    .min(1, { message: "Name is required" }),
  platformName: z.string().optional(),
  platformFaviconUrl: z.string().optional(),
  categoryId: z
    .string({ required_error: "Please enter the name" })
    .min(1, { message: "Name is required" }),
  categoryName: z.string().optional(),
  rssUrl: z
    .string({
      required_error: "Please enter the URL",
    })
    .url({ message: "Invalid URL" }),
  siteUrl: z
    .string({
      required_error: "Please enter the URL",
    })
    .url({ message: "Invalid URL" }),
  thumbnailUrl: z
    .string({
      required_error: "Please enter the URL",
    })
    .url({ message: "Invalid URL" }),
  trendPlatformType: z.string().optional(),
  apiQueryParam: z.string().optional(),
});

type EditFeedSheetContentProps = {
  feed: FeedType;
  offset?: number;
  keyword?: string;
  language?: string;
  platformId?: string;
  categoryId?: string;
  platformSiteType?: string;
  trendPlatformType?: string;
  status?: string;
  handleSheetClose: () => void;
};

export const EditFeedSheetContent: FC<EditFeedSheetContentProps> = ({
  feed,
  offset,
  keyword,
  language,
  platformId,
  categoryId,
  platformSiteType,
  trendPlatformType,
  status,
  handleSheetClose,
}) => {
  const { redirectPage } = useFeedRedirectPage();
  const { successToast, failToast } = useStatusToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: feed.name,
      description: feed.description,
      platformId: feed.platformId,
      categoryId: feed.categoryId,
      rssUrl: feed.rssUrl,
      siteUrl: feed.siteUrl,
      thumbnailUrl: feed.thumbnailUrl,
      trendPlatformType: String(feed.trendPlatformType),
      apiQueryParam: feed.apiQueryParam,
    },
  });
  const [isPending, startTransition] = useTransition();
  const [isPlatformPending, startPlatformTransition] = useTransition();
  const [isCategoryPending, startCategoryTransition] = useTransition();
  const [isArticlePending, startArticleTransition] = useTransition();

  const [selectedPlatform, setSelectedPlatform] = useState<
    PlatformType | undefined
  >(undefined);

  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | undefined
  >(undefined);

  const [articles, setArticles] = useState<Array<ArticleType>>([]);

  const inputName = form.watch("name");
  const inputDescription = form.watch("description");
  const inputPlatformId = form.watch("platformId");
  const inputCategoryId = form.watch("categoryId");
  const inputRssUrl = form.watch("rssUrl");
  const inputSiteUrl = form.watch("siteUrl");
  const inputThumbnailUrl = form.watch("thumbnailUrl");
  const inputTrendPlatformType = form.watch("trendPlatformType");
  const inputApiQueryParam = form.watch("apiQueryParam");

  const isEditDisabledCheck = useMemo(() => {
    return (
      feed.name === inputName &&
      feed.description === inputDescription &&
      feed.platformId === inputPlatformId &&
      feed.categoryId === inputCategoryId &&
      feed.rssUrl === inputRssUrl &&
      feed.siteUrl === inputSiteUrl &&
      feed.thumbnailUrl === inputThumbnailUrl &&
      feed.trendPlatformType === Number(inputTrendPlatformType) &&
      feed.apiQueryParam === inputApiQueryParam
    );
  }, [
    feed,
    inputName,
    inputDescription,
    inputPlatformId,
    inputCategoryId,
    inputRssUrl,
    inputSiteUrl,
    inputThumbnailUrl,
    inputTrendPlatformType,
    inputApiQueryParam,
  ]);

  const fetchPlatform = useCallback(
    async (platformId: string) => {
      startPlatformTransition(async () => {
        const res = await fetchPlatformByIdAPI(platformId);
        if (res.data!.platform) {
          form.setValue("platformName", res.data.platform.name);
          form.setValue("platformId", res.data.platform.id);
          form.setValue("platformFaviconUrl", res.data.platform.faviconUrl);
          setSelectedPlatform(res.data.platform);
        }
      });
    },
    [form]
  );

  const fetchCategory = useCallback(
    async (categoryId: string) => {
      startCategoryTransition(async () => {
        const res = await fetchCategoryByIdAPI(categoryId);
        if (res.data!.category) {
          form.setValue("categoryName", res.data.category.name);
          form.setValue("categoryId", res.data.category.id);
          setSelectedCategory(res.data.category);
        }
      });
    },
    [form]
  );

  const fetchFeedArticleRelationsToArticles = useCallback(async () => {
    startArticleTransition(async () => {
      const res = await fetchFeedArticleRelationsToArticlesAPI({
        feedId: feed.id,
      });
      if (res.data!.articles) {
        setArticles(res.data.articles);
      }
    });
  }, [feed.id]);

  const handleSubmitEditFeed = useCallback(
    async (values: z.infer<typeof FormSchema>) => {
      startTransition(async () => {
        if (isEditDisabledCheck) return;
        const updatedId = await updateFeed({
          id: feed.id,
          platformId: values.platformId,
          categoryId: values.categoryId,
          name: values.name,
          description: values.description,
          rssUrl: values.rssUrl,
          siteUrl: values.siteUrl,
          thumbnailUrl: values.thumbnailUrl,
          trendPlatformType: Number(values.trendPlatformType),
          apiQueryParam: values.apiQueryParam,
        });
        if (!updatedId) {
          failToast({
            description: "Failed: Update feed",
          });
          return;
        }

        successToast({
          description: "Success: Update feed",
        });

        // 3. revalidate
        await redirectPage({
          offset: offset,
          targetKeyword: keyword,
          targetLanguage: language,
          targetPlatformSiteType: platformSiteType,
          targetPlatformId: platformId,
          targetCategoryId: categoryId,
          targetTrendPlatformType: trendPlatformType,
          targetStatus: status,
        });
      });
    },
    [
      isEditDisabledCheck,
      feed,
      offset,
      keyword,
      language,
      platformSiteType,
      platformId,
      categoryId,
      trendPlatformType,
      status,
      redirectPage,
      successToast,
      failToast,
    ]
  );

  useEffect(() => {
    fetchPlatform(feed.platform.id);
    fetchCategory(feed.category.id);
    fetchFeedArticleRelationsToArticles();
  }, [
    fetchPlatform,
    fetchCategory,
    fetchFeedArticleRelationsToArticles,
    feed.platform.id,
    feed.category.id,
  ]);

  return (
    <SheetContent className="h-screen overflow-y-scroll">
      <SheetHeader>
        <SheetTitle>Edit platform</SheetTitle>
      </SheetHeader>

      <Form {...form}>
        <form
          className="mt-4"
          onSubmit={form.handleSubmit(handleSubmitEditFeed)}
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>
                    Feed name
                    <span className="text-red-700"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-primary bg-secondary text-primary"
                      placeholder="feed name"
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
                <FormItem className="">
                  <FormLabel>
                    Description
                    <span className="text-red-700"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="border-primary bg-secondary text-primary"
                      placeholder="description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="platformId"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>
                    Platform
                    <span className="text-red-700"> *</span>
                  </FormLabel>
                  <div className="flex h-6 w-full items-center">
                    {isPlatformPending ? (
                      <FadeLoaderComponent />
                    ) : (
                      <div className="flex w-full items-center justify-between">
                        <div className="flex ">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className="size-6 bg-white"
                            src={form.getValues("platformFaviconUrl")}
                            alt=""
                          />
                          <p className="ml-2">
                            {form.getValues("platformName")}
                          </p>
                        </div>
                        <div>
                          <SelectPlatformDialog
                            selectedPlatform={selectedPlatform}
                            handleSelectPlatform={fetchPlatform}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>
                    Category
                    <span className="text-red-700"> *</span>
                  </FormLabel>
                  {isCategoryPending ? (
                    <FadeLoaderComponent />
                  ) : (
                    <div className="flex w-full items-center justify-between">
                      <div className="flex">
                        <p>{form.getValues("categoryName")}</p>
                      </div>
                      <div>
                        <SelectCategoryDialog
                          selectedCategory={selectedCategory}
                          handleSelectCategory={fetchCategory}
                        />
                      </div>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="trendPlatformType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Trend platform type
                    <span className="text-red-700"> *</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-primary bg-secondary">
                        <SelectValue
                          placeholder="platformSiteType"
                          className="text-gray-400"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">
                        <span>Unknown</span>
                      </SelectItem>
                      <SelectItem value="1">
                        <span>Zenn</span>
                      </SelectItem>
                      <SelectItem value="2">
                        <span>Qiita</span>
                      </SelectItem>
                      <SelectItem value="3">
                        <span>Hatena</span>
                      </SelectItem>
                      <SelectItem value="4">
                        <span>DevCommunity</span>
                      </SelectItem>
                      <SelectItem value="5">
                        <span>Hashnode</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rssUrl"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>
                    Rss Url
                    <span className="text-red-700"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-primary bg-secondary text-primary"
                      placeholder="rss url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="siteUrl"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>
                    Site Url
                    <span className="text-red-700"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-primary bg-secondary text-primary"
                      placeholder="site url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thumbnailUrl"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>
                    ThumbnailUrl
                    <span className="text-red-700"> *</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between">
                      <Input
                        className="w-3/4 border-primary bg-secondary
                          text-primary
                          "
                        placeholder="favicon url"
                        {...field}
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="h-8 max-w-16 bg-white"
                        src={field.value}
                        alt=""
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apiQueryParam"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Api query param</FormLabel>
                  <FormControl>
                    <Input
                      className="border-primary bg-secondary text-primary"
                      placeholder="api query param"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-16 flex items-center justify-between">
            <SheetClose asChild className="inline-block">
              <Button variant={"outline"} onClick={handleSheetClose}>
                {"CLOSE"}
              </Button>
            </SheetClose>
            {isPending ? (
              <Button disabled>
                <ReloadIcon className="mr-2 size-4 animate-spin" />
                PLEASE WAIT
              </Button>
            ) : (
              <Button disabled={!form.formState.isValid || isEditDisabledCheck}>
                {"EDIT"}
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="mt-12 flex ">
        <DeleteFeedAlertDialog
          feedId={feed.id}
          feedTitle={feed.name}
          disabled={isArticlePending || articles.length > 0}
        />
      </div>
    </SheetContent>
  );
};
