"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { fetchFeedsAPI } from "@/features/feeds/actions/feed";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useHookForm } from "@/hooks/useHookForm";

import { FeedType } from "@/types/feed";
import { SelectOptionType } from "@/types/util";

const KeywordFormSchema = z.object({
  keyword: z.string().optional(),
});

const PlatformSiteTypeSchema = z.object({
  platformSiteType: z.string(),
});

const FormSchema = z.object({
  targetFeedList: z
    .object({
      id: z.string(),
      label: z.string(),
    })
    .array(),
});

type SelectMultiFeedListProps = {
  defaultSelectedFeedList?: Array<SelectOptionType>;
  initialFeedList: Array<FeedType>;
  onSelectFeedList: (selectedFeedList: Array<SelectOptionType>) => void;
};

export const SelectMultiFeedList: FC<SelectMultiFeedListProps> = ({
  defaultSelectedFeedList,
  initialFeedList,
  onSelectFeedList,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      targetFeedList: defaultSelectedFeedList,
    },
  });
  const keywordForm = useForm<z.infer<typeof KeywordFormSchema>>({
    resolver: zodResolver(KeywordFormSchema),
  });
  const platformSiteTypeForm = useForm<z.infer<typeof PlatformSiteTypeSchema>>({
    resolver: zodResolver(PlatformSiteTypeSchema),
    defaultValues: {
      platformSiteType: "0",
    },
  });

  const { stopPropagate } = useHookForm();

  const selectedTargetFeedList = form.watch("targetFeedList");

  const observerTarget = useRef(null);

  const [feedList, setFeedList] = useState<FeedType[]>(initialFeedList);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);

  const flatFeedList = feedList ? feedList.flatMap((feed) => feed) : [];

  const handleKeywordSearch = useCallback(
    async (values: z.infer<typeof KeywordFormSchema>) => {
      const res = await fetchFeedsAPI({
        keyword: values.keyword,
        platformSiteType: platformSiteTypeForm.getValues("platformSiteType"),
      });

      if (res.data) {
        setFeedList(res.data.feeds);
        setOffset(1);
        setHashMore(true);
      }
    },
    [setFeedList, setOffset, setHashMore, platformSiteTypeForm]
  );

  const handlePlatformTypeSearch = useCallback(
    async (value: string) => {
      const res = await fetchFeedsAPI({
        keyword: keywordForm.getValues("keyword"),
        platformSiteType: value,
      });

      if (res.data) {
        setFeedList(res.data.feeds);
        setOffset(1);
        setHashMore(true);
      }
    },
    [setFeedList, setOffset, setHashMore, keywordForm]
  );

  const loadMore = useCallback(
    async (offset: number) => {
      const res = await fetchFeedsAPI({
        offset: offset.toString(),
        keyword: keywordForm.watch("keyword"),
        platformSiteType: platformSiteTypeForm.watch("platformSiteType"),
      });

      if (res.data) {
        setFeedList((prev) => [...prev, ...res.data.feeds]);
        const count = res.data.feeds.length;
        setHashMore(count > 0);
      }
    },
    [keywordForm, platformSiteTypeForm]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hashMore) {
            setOffset((prev) => prev + 1);
          }
        });
      },
      { threshold: 1 }
    );

    let observerRefValue: null = null;

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
      observerRefValue = observerTarget.current;
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [hashMore]);

  useEffect(() => {
    if (offset > 1) {
      loadMore(offset);
    }
  }, [loadMore, offset, hashMore]);

  return (
    <div className="w-full">
      <div className="mb-4 ml-2 flex max-h-12 w-full flex-wrap overflow-y-scroll text-sm font-normal">
        {selectedTargetFeedList.length > 0 &&
          selectedTargetFeedList.map((selectedFeed) => (
            <span
              className="mb-2 mr-2 block max-w-64 truncate rounded-full bg-primary-foreground px-2 py-1 text-xs font-normal text-amber-600 "
              key={`selected-${selectedFeed.id}`}
            >
              # {selectedFeed.label}
            </span>
          ))}
      </div>

      <div className="mb-2">
        <Form {...keywordForm}>
          <form
            onSubmit={stopPropagate(
              keywordForm.handleSubmit(handleKeywordSearch)
            )}
          >
            <FormField
              control={keywordForm.control}
              name="keyword"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormControl>
                    <Input
                      className="border-primary bg-secondary text-primary"
                      placeholder="search keyword"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <div>
        <FormField
          control={platformSiteTypeForm.control}
          name="platformSiteType"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>PlatformType</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={async (value) => {
                    await handlePlatformTypeSearch(value);
                    return field.onChange(value);
                  }}
                  defaultValue={field.value}
                  className="grid-cols-2 md:grid-cols-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={"0"} id={"platform-type-0"} />
                    <Label htmlFor="platform-type-0">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={"1"} id={"platform-type-1"} />
                    <Label htmlFor="platform-type-1">Site</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={"2"} id={"platform-type-2"} />
                    <Label htmlFor="platform-type-2">Company</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={"3"} id={"platform-type-3"} />
                    <Label htmlFor="platform-type-3">Summary</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="h-[300px] w-full overflow-y-scroll border-2 border-secondary p-4">
        {flatFeedList.length === 0 ? (
          <p>No Feeds found</p>
        ) : (
          <Form {...form}>
            <form>
              {flatFeedList.map((feed, i) => (
                <FormField
                  key={`target-${feed.id}-${i}`}
                  control={form.control}
                  name="targetFeedList"
                  render={({ field }) => (
                    <FormItem
                      // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
                      className="flex w-full cursor-pointer items-center border-t-2 border-t-secondary hover:bg-secondary hover:bg-opacity-10"
                    >
                      <FormControl>
                        <Checkbox
                          checked={
                            field.value.length > 0 &&
                            field.value.some((f) => f.id === feed.id)
                          }
                          onCheckedChange={(checked) => {
                            const array = field.value ?? [];
                            return checked
                              ? field.onChange([
                                  ...array,
                                  { id: feed.id, label: feed.name },
                                ])
                              : field.onChange(
                                  array.filter((f) => f.id !== feed.id)
                                );
                          }}
                        />
                      </FormControl>

                      <FormLabel className="ml-2 flex h-12 w-full cursor-pointer items-center pb-2 text-sm font-normal">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="mr-2 inline-block size-6 bg-white"
                          src={feed?.thumbnailUrl}
                          alt=""
                        />

                        <p className="flex w-full items-center text-lg">
                          {feed.name}
                        </p>
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
              <div ref={observerTarget}>
                {hashMore && (
                  <div className="flex justify-center py-4">
                    <Loader />
                  </div>
                )}
              </div>
            </form>
          </Form>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <DialogClose asChild className="inline-block">
          <Button variant={"outline"}>{"CLOSE"}</Button>
        </DialogClose>
        <Button
          onClick={() => onSelectFeedList(form.getValues("targetFeedList"))}
        >
          {"DONE"}
        </Button>
      </div>
    </div>
  );
};
