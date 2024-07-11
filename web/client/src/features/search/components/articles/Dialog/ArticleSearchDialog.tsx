"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { z } from "zod";

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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { LanguageStatus } from "@/types/language";
import { PlatformSiteType } from "@/types/platform";

import { serverRevalidatePage } from "@/actions/serverAction";

const formSchema = z.object({
  keyword: z.string().optional(),
  feedIdList: z.array(z.string()).optional(),
  language: z.string().optional(),
  platformSiteType: z.string(),
});

type ArticleSearchDialogProps = {
  languageStatus?: LanguageStatus;
  keyword?: string;
  feedIdList?: Array<string>;
  platformSiteType?: PlatformSiteType;
};

export const ArticleSearchDialog: FC<ArticleSearchDialogProps> = ({
  languageStatus,
  keyword,
  feedIdList = [],
  platformSiteType,
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
          languageStatus={languageStatus}
          keyword={keyword}
          feedIdList={feedIdList}
          platformSiteType={platformSiteType}
          handleClose={handleClose}
        />
      )}
    </Dialog>
  );
};

type ArticleSearchDialogContentProps = {
  languageStatus?: LanguageStatus;
  keyword?: string;
  feedIdList?: Array<string>;
  platformSiteType?: PlatformSiteType;
  handleClose: () => void;
};

const ArticleSearchDialogContent: FC<ArticleSearchDialogContentProps> = ({
  languageStatus,
  keyword,
  feedIdList = [],
  platformSiteType,
  handleClose,
}: ArticleSearchDialogContentProps) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: keyword ?? "",
      language: languageStatus?.toString() ?? "0",
      platformSiteType: platformSiteType?.toString() ?? "0",
      feedIdList: feedIdList,
    },
  });

  const watchLanguage = form.watch("language");
  const watchPlatformType = form.watch("platformSiteType");

  const resetDialog = useCallback(() => {
    form.reset();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let keywordPath = "";
    if (!!values.keyword && values.keyword.trim() !== "") {
      keywordPath = `&keyword=${values.keyword}`;
    }
    let platformTypePath = "";
    if (values.platformSiteType) {
      platformTypePath = `&platformSiteType=${values.platformSiteType}`;
    }
    let feedIdPath = "";
    if (values.feedIdList) {
      feedIdPath = values.feedIdList
        .map((feedId) => `&feedId=${feedId}`)
        .join("");
    }
    await serverRevalidatePage(pathname);
    router.replace(
      `/article/search/result?languageStatus=${values.language}${keywordPath}${platformTypePath}${feedIdPath}`
    );
    resetDialog();
    handleClose();
  };

  // const fetchPlatform = useCallback(async () => {
  //   setLoading(true);
  //   const response = await fetchPlatformAPI({
  //     languageStatus: watchLanguage,
  //     platformSiteType:
  //       watchPlatformType !== "0" ? watchPlatformType : undefined,
  //   });
  //   setShowPlatforms(response);
  //   form.setValue("platformIdList", []);
  //   setLoading(false);
  // }, [watchLanguage, watchPlatformType, form]);

  // useEffect(() => {
  //   fetchPlatform();
  // }, [fetchPlatform]);

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
                name="platformSiteType"
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
