"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { useServerRevalidatePage } from "@/shared/hooks/useServerRevalidatePage";
import { splitBySpace } from "@/shared/lib/utils";

const formSchema = z.object({
  keyword: z.string().optional(),
});

type FavoriteArticleFolderKeywordSearchFormProps = {
  keywordList: Array<string>;
};

export const FavoriteArticleFolderKeywordSearchForm: FC<
  FavoriteArticleFolderKeywordSearchFormProps
> = ({ keywordList }) => {
  const router = useRouter();
  const { revalidatePage } = useServerRevalidatePage();
  const keyword = keywordList.filter((keyword) => keyword !== "").join(" ");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: keyword ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let keywordPath = "";
    if (!!values.keyword && values.keyword.trim() !== "") {
      const keywordArray = splitBySpace(values.keyword);
      keywordPath = keywordArray
        .map((keyword) => `&keyword=${keyword}`)
        .join("");
    }
    await revalidatePage();
    router.replace(`/favorite?dummy=dummy${keywordPath}`);
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
                  className="border-primary bg-secondary text-primary "
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
