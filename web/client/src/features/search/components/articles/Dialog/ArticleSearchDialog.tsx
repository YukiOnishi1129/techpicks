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

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Platform } from "@/types/platform";

const formSchema = z.object({
  keyword: z.string().optional(),
  platformIdList: z.array(z.string()).optional(),
  language: z.string().optional(),
  platformType: z.string(),
});

type ArticleSearchDialogProps = {
  platforms: Array<Platform>;
};

export const ArticleSearchDialog: FC<ArticleSearchDialogProps> = ({
  platforms,
}: ArticleSearchDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <CiSearch size="36" />
      </DialogTrigger>
      {open && <ArticleSearchDialogContent platforms={platforms} />}
    </Dialog>
  );
};

type ArticleSearchDialogContentProps = {
  platforms: Array<Platform>;
};

const ArticleSearchDialogContent: FC<ArticleSearchDialogContentProps> = ({
  platforms,
}: ArticleSearchDialogContentProps) => {
  const [loading, setLoading] = useState(false);
  const [showPlatforms, setShowPlatforms] =
    useState<Array<Platform>>(platforms);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
      language: "0",
      platformType: "0",
      platformIdList: [],
    },
  });

  const watchLanguage = form.watch("language");
  const watchPlatformType = form.watch("platformType");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    let keywordPath = "";

    if (values.keyword !== "") {
      keywordPath = `&keyword=${values.keyword}`;
    }
    let platformIdPath = "";
    if (values.platformIdList) {
      platformIdPath = values.platformIdList
        .map((platformId) => `&platformId=${platformId}`)
        .join("");
    }
    router.replace(
      `/article/search/result?languageStatus=${values.language}${keywordPath}${platformIdPath}`
    );
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

  const resetDialog = useCallback(() => {
    form.reset();
  }, [form]);

  return (
    <DialogContent onCloseAutoFocus={resetDialog}>
      <DialogHeader>
        <DialogTitle>{"Article Search"}</DialogTitle>
      </DialogHeader>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <h3>search condition</h3>
            <div className="h-[300px] overflow-y-scroll p-4">
              <FormField
                control={form.control}
                name="keyword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keyword</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      Let&apos;s enter the keyword you want to search.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* language */}
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
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
                    <FormDescription>
                      Let&apos;s select the language you want to search.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* platform type*/}
              <FormField
                control={form.control}
                name="platformType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PlatformType</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
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
                    <FormDescription>
                      Let&apos;s select the platform type you want to search.
                    </FormDescription>
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
                      <FormDescription>
                        Please select the platform you want to search.
                      </FormDescription>
                    </div>
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
                            <FormItem
                              key={platform.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
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
                              <FormLabel className="text-sm font-normal">
                                {platform.name}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))
                    )}
                  </FormItem>
                )}
              />
              {/* category */}
              {/*  */}

              {/* <h3>sort condition</h3> */}
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};