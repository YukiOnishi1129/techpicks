"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { z } from "zod";

import { SelectMultiFeedDialog } from "@/features/feeds/components/Dialog";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

import { FeedType } from "@/types/feed";
import { SelectOptionType } from "@/types/util";

import { serverRevalidatePage } from "@/actions/serverAction";

const formSchema = z.object({
  keyword: z.string().optional(),
  targetFeedList: z
    .object({
      id: z.string(),
      label: z.string(),
    })
    .array(),
});

type ArticleSearchDialogProps = {
  keyword?: string;
  selectedFeedList?: Array<FeedType>;
  initialFeedList: Array<FeedType>;
};

export const ArticleSearchDialog: FC<ArticleSearchDialogProps> = ({
  keyword,
  selectedFeedList = [],
  initialFeedList,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <CiSearch size="36" />
      </DialogTrigger>
      {open && (
        <ArticleSearchDialogContent
          keyword={keyword}
          selectedFeedList={selectedFeedList}
          initialFeedList={initialFeedList}
          handleClose={handleClose}
        />
      )}
    </Dialog>
  );
};

type ArticleSearchDialogContentProps = {
  keyword?: string;
  selectedFeedList?: Array<FeedType>;
  initialFeedList: Array<FeedType>;
  handleClose: () => void;
};

const ArticleSearchDialogContent: FC<ArticleSearchDialogContentProps> = ({
  keyword,
  selectedFeedList = [],
  initialFeedList,
  handleClose,
}: ArticleSearchDialogContentProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: keyword ?? "",
      targetFeedList: selectedFeedList.map((feed) => ({
        id: feed.id,
        label: feed.name,
      })),
    },
  });

  const handleSelectFeedList = useCallback(
    (selectedFeedList: Array<SelectOptionType>) => {
      form.setValue("targetFeedList", selectedFeedList);
    },
    [form]
  );

  const resetDialog = useCallback(() => {
    form.reset();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let keywordPath = "";
    if (!!values.keyword && values.keyword.trim() !== "") {
      keywordPath = `&keyword=${values.keyword}`;
    }
    let feedIdPath = "";
    if (values.targetFeedList) {
      feedIdPath = values.targetFeedList
        .map((feed) => `&feedId=${feed.id}`)
        .join("");
    }
    await serverRevalidatePage(
      `/article/search/result?dummy=1${keywordPath}${feedIdPath}`
    );
    router.replace(`/article/search/result?dummy=1${keywordPath}${feedIdPath}`);
    resetDialog();
    handleClose();
  };

  return (
    <DialogContent onCloseAutoFocus={resetDialog}>
      <DialogHeader>
        <DialogTitle>{"Article Search"}</DialogTitle>
      </DialogHeader>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="h-[300px] overflow-y-scroll border-2 p-4">
              <FormField
                control={form.control}
                name="keyword"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Keyword</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary bg-secondary text-primary"
                        placeholder="search keyword"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* feed */}
              <FormField
                control={form.control}
                name="targetFeedList"
                render={({ field }) => (
                  <FormItem className="mb-8">
                    <FormLabel>Feeds</FormLabel>
                    <div>
                      <SelectMultiFeedDialog
                        feedList={initialFeedList}
                        selectedFeedList={field.value}
                        handleSelectFeedList={handleSelectFeedList}
                      />
                    </div>

                    <FormControl>
                      {field.value.length > 0 && (
                        <div className="mt-4 flex max-h-40 w-full flex-wrap overflow-y-scroll rounded-md border-primary bg-secondary p-2 text-primary">
                          {field.value.map((feed) => {
                            return (
                              <span
                                className="mb-2 mr-2 block max-w-64 truncate rounded-full bg-primary-foreground px-2 py-1 text-xs font-normal text-amber-600 "
                                key={feed.id}
                              >
                                # {feed.label}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4 flex w-full justify-between space-x-4">
              <DialogClose>
                <Button variant={"outline"} onClick={resetDialog}>
                  {"CLOSE"}
                </Button>
              </DialogClose>
              <Button type="submit">{"SEARCH"}</Button>
            </div>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};
