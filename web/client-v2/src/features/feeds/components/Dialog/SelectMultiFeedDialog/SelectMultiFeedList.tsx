"use client";

import { useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { z } from "zod";

import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { DialogClose } from "@/shared/components/ui/dialog";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Loader } from "@/shared/components/ui/loader";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { SELECTABLE_FEED_LIST_LIMIT } from "@/shared/constant/limit";
import { useHookForm } from "@/shared/hooks/useHookForm";
import { SelectOptionType } from "@/shared/types/utils";

import { SelectMultiFeedListQuery } from "./SelectMultiFeedListQuery";

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
  feedsEndCursor?: string;
  onSelectFeedList: (selectedFeedList: Array<SelectOptionType>) => void;
};

export const SelectMultiFeedList: FC<SelectMultiFeedListProps> = ({
  defaultSelectedFeedList,
  feedsEndCursor,
  onSelectFeedList,
}) => {
  const observerTarget = useRef(null);

  const {
    data: res,
    fetchMore,
    error: onlyFetchArticlesError,
  } = useQuery(SelectMultiFeedListQuery, {
    variables: {
      input: {
        first: SELECTABLE_FEED_LIST_LIMIT,
        after: null,
      },
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
  });

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

  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [endCursor, setEndCursor] = useState(feedsEndCursor);
  const [isNextPage, setIsNextPage] = useState(true);

  const handleKeywordSearch = useCallback(
    async (values: z.infer<typeof KeywordFormSchema>) => {
      const keywordList = values.keyword
        ? values.keyword.split(" ")
        : undefined;
      const { data: resData, error: resError } = await fetchMore({
        variables: {
          input: {
            keywords: keywordList,
            platformSiteType: Number(
              platformSiteTypeForm.getValues("platformSiteType")
            ),
            first: SELECTABLE_FEED_LIST_LIMIT,
            after: null,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return fetchMoreResult;
        },
      });

      if (resError) return;

      if (resData.feeds.pageInfo.hasNextPage) {
        const endCursor = resData.feeds.pageInfo?.endCursor || null;
        setEndCursor(endCursor || undefined);
      }
      setIsNextPage(resData.feeds.pageInfo.hasNextPage);

      setHashMore(resData.feeds.edges.length > 0);
    },
    [setHashMore, platformSiteTypeForm, fetchMore]
  );

  const handlePlatformTypeSearch = useCallback(
    async (value: string) => {
      const inputKeyword = keywordForm.getValues("keyword");
      const keywordList = inputKeyword ? inputKeyword.split(" ") : undefined;
      const { data: resData, error: resError } = await fetchMore({
        variables: {
          input: {
            keywords: keywordList,
            platformSiteType: Number(value),
            first: SELECTABLE_FEED_LIST_LIMIT,
            after: null,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return fetchMoreResult;
        },
      });

      if (resError) return;

      if (resData.feeds.pageInfo.hasNextPage) {
        const endCursor = resData.feeds.pageInfo?.endCursor || null;
        setEndCursor(endCursor || undefined);
      }
      setIsNextPage(resData.feeds.pageInfo.hasNextPage);

      setHashMore(resData.feeds.edges.length > 0);
    },
    [setHashMore, keywordForm, fetchMore]
  );

  const handleRemoveChecked = useCallback(
    (targetFeedId: string) => {
      form.setValue(
        "targetFeedList",
        form.getValues("targetFeedList").filter((f) => f.id !== targetFeedId)
      );
    },
    [form]
  );

  const loadMore = useCallback(async () => {
    if (!isNextPage) return;
    const inputKeyword = keywordForm.getValues("keyword");
    const keywordList = inputKeyword ? inputKeyword.split(" ") : undefined;
    const { data: resData, error: resError } = await fetchMore({
      variables: {
        input: {
          keywords: keywordList,
          platformSiteType: Number(
            platformSiteTypeForm.watch("platformSiteType")
          ),
          first: SELECTABLE_FEED_LIST_LIMIT,
          after: endCursor,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          feeds: {
            ...prev.feeds,
            edges: [...prev.feeds.edges, ...fetchMoreResult.feeds.edges],
            pageInfo: fetchMoreResult.feeds.pageInfo,
          },
        };
      },
    });

    if (resError) return;

    if (resData.feeds.pageInfo.hasNextPage) {
      const endCursor = resData.feeds.pageInfo?.endCursor || null;
      setEndCursor(endCursor || undefined);
    }
    setIsNextPage(resData.feeds.pageInfo.hasNextPage);

    setHashMore(resData.feeds.edges.length > 0);
  }, [isNextPage, endCursor, keywordForm, platformSiteTypeForm, fetchMore]);

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
      loadMore();
    }
  }, [offset, hashMore]); // eslint-disable-line

  if (onlyFetchArticlesError) {
    return <div>{onlyFetchArticlesError.message}</div>;
  }

  return (
    <div className="w-full">
      <div className="mb-4 ml-2 flex max-h-12 w-full flex-wrap overflow-y-scroll text-sm font-normal">
        {selectedTargetFeedList.length > 0 &&
          selectedTargetFeedList.map((selectedFeed) => (
            <p
              className="mb-2 mr-2 block max-w-64 truncate rounded-full bg-primary-foreground px-2 py-1 text-xs font-normal text-amber-600 "
              key={`selected-${selectedFeed.id}`}
            >
              # {selectedFeed.label}
              <Button
                variant={"ghost"}
                size="sm"
                onClick={() => handleRemoveChecked(selectedFeed.id)}
              >
                <RxCross2 />
              </Button>
            </p>
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
        {res?.feeds.edges.length === 0 ? (
          <p>No Feeds found</p>
        ) : (
          <Form {...form}>
            <form>
              {res?.feeds?.edges.map((edge, i) => (
                <FormField
                  key={`target-${edge.node.id}-${i}`}
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
                            field.value.some((f) => f.id === edge.node.id)
                          }
                          onCheckedChange={(checked) => {
                            const array = field.value ?? [];
                            return checked
                              ? field.onChange([
                                  ...array,
                                  { id: edge.node.id, label: edge.node.name },
                                ])
                              : field.onChange(
                                  array.filter((f) => f.id !== edge.node.id)
                                );
                          }}
                        />
                      </FormControl>

                      <FormLabel className="ml-2 flex h-12 w-full cursor-pointer items-center pb-2 text-sm font-normal">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="mr-2 inline-block size-6 bg-white"
                          src={edge.node.thumbnailUrl}
                          alt=""
                        />

                        <p className="flex w-full items-center text-lg">
                          {edge.node.name}
                        </p>
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
              <div ref={observerTarget}>
                {hashMore && isNextPage && (
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
