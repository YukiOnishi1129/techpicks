"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { z } from "zod";

import { serverRevalidatePage } from "@/shared/actions/actServerRevalidatePage";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { joinWithSpace, splitBySpace } from "@/shared/lib/utils";

const formSchema = z.object({
  keyword: z.string().optional(),
});

type MyFeedFolderKeywordSearchFormProps = {
  keywordList: Array<string>;
};

export const MyFeedFolderKeywordSearchForm: FC<
  MyFeedFolderKeywordSearchFormProps
> = ({ keywordList }) => {
  const router = useRouter();
  const pathname = usePathname();
  const keyword = joinWithSpace(keywordList);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let keywordPath = "";
    if (!!values.keyword && values.keyword.trim() !== "") {
      const keywordArray = splitBySpace(values.keyword);
      keywordPath = keywordArray
        .map((keyword) => `keyword=${keyword}`)
        .join("&");
    }
    await serverRevalidatePage(pathname);
    router.replace(`/my-feed?${keywordPath}`);
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
