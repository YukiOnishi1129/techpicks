"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { z } from "zod";

import { fetchPlatformAPI } from "@/features/platforms/actions/platform";
import { serverRevalidateArticleSearchResult } from "@/features/search/actions/serverAction";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { LanguageStatus } from "@/types/language";
import { Platform, PlatformType } from "@/types/platform";

const formSchema = z.object({
  keyword: z.string().optional(),
  platformIdList: z.array(z.string()).optional(),
  language: z.string().optional(),
  platformType: z.string(),
});

type ArticleSearchDialogProps = {
  platforms: Array<Platform>;
  languageStatus?: LanguageStatus;
  keyword?: string;
  platformIdList?: Array<string>;
  platformType?: PlatformType;
};

export const ArticleSearchDialog: FC<ArticleSearchDialogProps> = ({
  platforms,
  languageStatus,
  keyword,
  platformIdList = [],
  platformType,
}: ArticleSearchDialogProps) => {
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
          platforms={platforms}
          languageStatus={languageStatus}
          keyword={keyword}
          platformIdList={platformIdList}
          platformType={platformType}
          handleClose={handleClose}
        />
      )}
    </Dialog>
  );
};

type ArticleSearchDialogContentProps = {
  platforms: Array<Platform>;
  languageStatus?: LanguageStatus;
  keyword?: string;
  platformIdList?: Array<string>;
  platformType?: PlatformType;
  handleClose: () => void;
};

const ArticleSearchDialogContent: FC<ArticleSearchDialogContentProps> = ({
  platforms,
  languageStatus,
  keyword,
  platformIdList = [],
  platformType,
  handleClose,
}: ArticleSearchDialogContentProps) => {
  const [loading, setLoading] = useState(false);
  const [showPlatforms, setShowPlatforms] =
    useState<Array<Platform>>(platforms);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: keyword ?? "",
      language: languageStatus?.toString() ?? "0",
      platformType: platformType?.toString() ?? "0",
      platformIdList: platformIdList,
    },
  });

  const watchLanguage = form.watch("language");
  const watchPlatformType = form.watch("platformType");

  const resetDialog = useCallback(() => {
    form.reset();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let keywordPath = "";
    if (!!values.keyword && values.keyword.trim() !== "") {
      keywordPath = `&keyword=${values.keyword}`;
    }
    let platformTypePath = "";
    if (values.platformType) {
      platformTypePath = `&platformType=${values.platformType}`;
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
    handleClose();
  };

  const fetchPlatform = useCallback(async () => {
    setLoading(true);
    const response = await fetchPlatformAPI({
      languageStatus: watchLanguage,
      platformType: watchPlatformType !== "0" ? watchPlatformType : undefined,
    });
    setShowPlatforms(response);
    form.setValue("platformIdList", []);
    setLoading(false);
  }, [watchLanguage, watchPlatformType, form]);

  useEffect(() => {
    fetchPlatform();
  }, [fetchPlatform]);

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
                      <Input placeholder="search keyword" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      Let&apos;s enter the keyword you want to search.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* language */}
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem className="mb-4">
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
                    {/* <FormDescription>
                      Let&apos;s select the language you want to search.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* platform type*/}
              <FormField
                control={form.control}
                name="platformType"
                render={({ field }) => (
                  <FormItem className="mb-4">
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
                    {/* <FormDescription>
                      Let&apos;s select the platform type you want to search.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* platform */}
              <FormField
                control={form.control}
                name="platformIdList"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Platform</FormLabel>
                      {/* <FormDescription>
                        Please select the platform you want to search.
                      </FormDescription> */}
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
                                        ? field.onChange([
                                            ...array,
                                            platform.id,
                                          ])
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
                                    className="mr-2 inline-block size-6"
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

            <div className="mt-4 flex w-full justify-center space-x-4">
              <Button type="submit">{"SEARCH"}</Button>
              <DialogClose>
                <Button onClick={resetDialog}>{"CLOSE"}</Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};
