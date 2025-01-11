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
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Loader } from "@/shared/components/ui/loader";
import { SELECTABLE_FAVORITE_ARTICLE_FOLDER_LIST_LIMIT } from "@/shared/constant/limit";
import { useHookForm } from "@/shared/hooks/useHookForm";
import { SelectOptionType } from "@/shared/types/utils";

import { SelectMultiFavoriteFolderListQuery } from "./SelectMultiFavoriteFolderListQuery";

const KeywordFormSchema = z.object({
  keyword: z.string().optional(),
});

const FormSchema = z.object({
  targetFolderList: z
    .object({
      id: z.string(),
      label: z.string(),
    })
    .array(),
});

type SelectMultiFavoriteFolderListProps = {
  defaultSelectedFolderList?: Array<SelectOptionType>;
  foldersEndCursor?: string;
  onSelectFolderList: (selectedFolderList: Array<SelectOptionType>) => void;
};

export const SelectMultiFavoriteFolderList: FC<
  SelectMultiFavoriteFolderListProps
> = ({ defaultSelectedFolderList, foldersEndCursor, onSelectFolderList }) => {
  const observerTarget = useRef(null);

  const {
    data: res,
    fetchMore,
    error: onlyFetchArticlesError,
  } = useQuery(SelectMultiFavoriteFolderListQuery, {
    variables: {
      input: {
        first: SELECTABLE_FAVORITE_ARTICLE_FOLDER_LIST_LIMIT,
        after: null,
      },
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      targetFolderList: defaultSelectedFolderList,
    },
  });
  const keywordForm = useForm<z.infer<typeof KeywordFormSchema>>({
    resolver: zodResolver(KeywordFormSchema),
  });

  const { stopPropagate } = useHookForm();

  const selectedTargetFeedList = form.watch("targetFolderList");

  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [endCursor, setEndCursor] = useState(foldersEndCursor);
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
            first: SELECTABLE_FAVORITE_ARTICLE_FOLDER_LIST_LIMIT,
            after: null,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return fetchMoreResult;
        },
      });

      if (resError) return;

      if (resData.favoriteArticleFolders.pageInfo.hasNextPage) {
        const endCursor =
          resData.favoriteArticleFolders.pageInfo?.endCursor || null;
        setEndCursor(endCursor || undefined);
      }
      setIsNextPage(resData.favoriteArticleFolders.pageInfo.hasNextPage);

      setHashMore(resData.favoriteArticleFolders.edges.length > 0);
    },
    [setHashMore, fetchMore]
  );

  const handleRemoveChecked = useCallback(
    (targetFolderId: string) => {
      form.setValue(
        "targetFolderList",
        form
          .getValues("targetFolderList")
          .filter((f) => f.id !== targetFolderId)
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
          first: SELECTABLE_FAVORITE_ARTICLE_FOLDER_LIST_LIMIT,
          after: endCursor,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          favoriteArticleFolders: {
            ...prev.favoriteArticleFolders,
            edges: [
              ...prev.favoriteArticleFolders.edges,
              ...fetchMoreResult.favoriteArticleFolders.edges,
            ],
            pageInfo: fetchMoreResult.favoriteArticleFolders.pageInfo,
          },
        };
      },
    });

    if (resError) return;

    if (resData.favoriteArticleFolders.pageInfo.hasNextPage) {
      const endCursor =
        resData.favoriteArticleFolders.pageInfo?.endCursor || null;
      setEndCursor(endCursor || undefined);
    }
    setIsNextPage(resData.favoriteArticleFolders.pageInfo.hasNextPage);

    setHashMore(resData.favoriteArticleFolders.edges.length > 0);
  }, [isNextPage, endCursor, keywordForm, fetchMore]);

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

      <div className="h-[300px] w-full overflow-y-scroll border-2 border-secondary p-4">
        {res?.favoriteArticleFolders.edges.length === 0 ? (
          <p>No Feeds found</p>
        ) : (
          <Form {...form}>
            <form>
              {res?.favoriteArticleFolders?.edges.map((edge, i) => (
                <FormField
                  key={`target-${edge.node.id}-${i}`}
                  control={form.control}
                  name="targetFolderList"
                  render={({ field }) => (
                    <FormItem
                      // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
                      className="flex w-full cursor-pointer items-center border-t border-t-secondary hover:bg-secondary hover:bg-opacity-10"
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
                                  { id: edge.node.id, label: edge.node.title },
                                ])
                              : field.onChange(
                                  array.filter((f) => f.id !== edge.node.id)
                                );
                          }}
                        />
                      </FormControl>

                      <FormLabel className="ml-2 flex h-12 w-full cursor-pointer items-center pb-2 text-sm font-normal">
                        <p className="flex w-full items-center text-lg">
                          {edge.node.title}
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
          onClick={() => onSelectFolderList(form.getValues("targetFolderList"))}
        >
          {"DONE"}
        </Button>
      </div>
    </div>
  );
};
