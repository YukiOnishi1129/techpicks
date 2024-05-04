"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { z } from "zod";

import { serverRevalidateMyFeedFoldersBtId } from "@/features/myFeedFolders/actions/serverAction";

import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  keyword: z.string().optional(),
});

type MyFeedFolderArticleKeywordSearchInputProps = {
  myFeedFolderId: string;
};

export const MyFeedFolderArticleKeywordSearchInput: FC<
  MyFeedFolderArticleKeywordSearchInputProps
> = ({ myFeedFolderId }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let keywordPath = "";
    if (!!values.keyword && values.keyword.trim() !== "") {
      keywordPath = `?keyword=${values.keyword}`;
    }
    await serverRevalidateMyFeedFoldersBtId(myFeedFolderId);
    router.replace(`/my-feed-folder/${myFeedFolderId}/${keywordPath}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="keyword"
          render={({ field }) => (
            <FormItem className="mb-4 flex items-center">
              <div className="mr-2 h-full">
                <CiSearch size="30" />
              </div>

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
  );
};
