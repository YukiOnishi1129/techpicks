"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { fetchPlatformAPI } from "@/features/platforms/actions/platform";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { PlatformType } from "@/types/platform";

import { serverRevalidateArticleSearchResult } from "../../actions/serverAction";

const formSchema = z.object({
  keyword: z.string().optional(),
  platformIdList: z.array(z.string()).optional(),
  language: z.string().optional(),
  platformSiteType: z.string(),
});

type ArticleSearchFormProps = {
  platforms: Array<PlatformType>;
};

export const ArticleSearchForm: FC<ArticleSearchFormProps> = ({
  platforms,
}: ArticleSearchFormProps) => {
  const [loading, setLoading] = useState(false);
  const [showPlatforms, setShowPlatforms] =
    useState<Array<PlatformType>>(platforms);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
      language: "0",
      platformSiteType: "0",
      platformIdList: [],
    },
  });

  const watchLanguage = form.watch("language");
  const watchPlatformType = form.watch("platformSiteType");

  const resetDialog = useCallback(() => {
    form.reset();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let keywordPath = "";

    if (values.keyword !== "") {
      keywordPath = `&keyword=${values.keyword}`;
    }
    let platformTypePath = "";
    if (values.platformSiteType) {
      platformTypePath = `&platformSiteType=${values.platformSiteType}`;
    }
    let platformIdPath = "";
    if (values.platformIdList) {
      platformIdPath = values.platformIdList
        .map((platformId) => `&platformId=${platformId}`)
        .join("");
    }
    await serverRevalidateArticleSearchResult();
    router.replace(
      `/article/search/result?languageStatus=${values.language}${keywordPath}${platformTypePath}${platformIdPath}`
    );
    resetDialog();
  };

  const fetchPlatform = useCallback(async () => {
    setLoading(true);
    const response = await fetchPlatformAPI({
      languageStatus: watchLanguage,
      platformSiteType:
        watchPlatformType !== "0" ? watchPlatformType : undefined,
    });
    setShowPlatforms(response);
    setLoading(false);
  }, [watchLanguage, watchPlatformType]);

  useEffect(() => {
    fetchPlatform();
  }, [fetchPlatform]);

  return (
    <div className="w-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="h-[400px] overflow-y-scroll border-2  p-4 md:h-[450px]">
            <FormField
              control={form.control}
              name="keyword"
              render={({ field }) => (
                <FormItem className="mb-8">
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
            {/* language */}
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid-cols-2 md:grid-cols-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={"0"} id={"language-0"} />
                        <Label htmlFor="language-0">All</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={"1"} id={"language-1"} />
                        <Label htmlFor="language-1">Japanese</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={"2"} id={"language-2"} />
                        <Label htmlFor="language-2">English</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* platform type*/}
            <FormField
              control={form.control}
              name="platformSiteType"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormLabel>PlatformType</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
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
            {/* platform */}
            <FormField
              control={form.control}
              name="platformIdList"
              render={() => (
                <FormItem className="m-auto ">
                  <div className="mb-4">
                    <FormLabel className="text-base">Platform</FormLabel>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {loading ? (
                      <Loader />
                    ) : (
                      showPlatforms &&
                      showPlatforms.map((platform) => (
                        <FormField
                          key={platform.id}
                          control={form.control}
                          name="platformIdList"
                          render={({ field }) => (
                            <FormItem key={platform.id} className="mb-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(platform.id)}
                                  onCheckedChange={(checked) => {
                                    const array = field.value ?? [];
                                    return checked
                                      ? field.onChange([...array, platform.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== platform.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="ml-2 w-full text-sm font-normal">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  className="mr-2 inline-block size-6 bg-white"
                                  src={platform.faviconUrl}
                                  alt=""
                                />
                                {platform.name}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))
                    )}
                  </div>
                </FormItem>
              )}
            />
            {/* category */}
            {/*  */}

            {/* <h3>sort condition</h3> */}
          </div>
          <div className="mt-8 flex w-full justify-center space-x-4">
            <Button type="submit">{"SEARCH"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
