"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
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
import { Loader } from "@/components/ui/loader";
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

import { useServerRevalidatePage } from "@/hooks/useServerRevalidatePage";
import { useStatusToast } from "@/hooks/useStatusToast";

import { FeedType } from "@/types/feed";
import { PlatformType } from "@/types/platform";

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
  handleSheetClose: () => void;
};

export const EditFeedSheetContent: FC<EditFeedSheetContentProps> = ({
  feed,
  handleSheetClose,
}) => {
  const router = useRouter();
  const { revalidatePage } = useServerRevalidatePage();
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

  const [selectedPlatform, setSelectedPlatform] = useState<
    PlatformType | undefined
  >(undefined);

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

  useEffect(() => {
    fetchPlatform(feed.platform.id);
  }, [fetchPlatform, feed.platform.id]);

  return (
    <SheetContent className="h-screen overflow-y-scroll">
      <SheetHeader>
        <SheetTitle>Edit platform</SheetTitle>
      </SheetHeader>

      <Form {...form}>
        <form
          className="mt-4"
          //   onSubmit={form.handleSubmit(handleSubmitEditPlatform)}
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
                      <Loader />
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
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* <FormControl>
                    <Input
                      className="border-primary bg-secondary text-primary"
                      placeholder="platformId"
                      {...field}
                    />
                  </FormControl> */}
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
                  <p>{feed.category.name}</p>
                  {/* <FormControl>
                    <Input
                      className="border-primary bg-secondary text-primary"
                      placeholder="categoryId"
                      {...field}
                    />
                  </FormControl> */}
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
                    Rss Url
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

      {/* <div className="mt-12 flex ">
        <DeletePlatformAlertDialog
          platformId={platform.id}
          platformTitle={platform.name}
          disabled={platform.feeds.length !== 0}
          handleDelete={handleSheetClose}
        />
      </div> */}
    </SheetContent>
  );
};
