"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { fetchPlatformsAPI } from "@/features/platforms/actions/platform";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";

import { PlatformType } from "@/types/platform";

const KeywordFormSchema = z.object({
  keyword: z.string().optional(),
});

const FormSchema = z.object({
  platformId: z
    .string({
      required_error: "Please select the platform",
    })
    .trim()
    .min(1, { message: "Platform is required" }),
  platformName: z.string().optional(),
  platformThumbnailUrl: z.string().optional(),
});

type SelectPlatformListProps = {
  defaultSelectedPlatform?: PlatformType;
  initialPlatforms: Array<PlatformType>;
};

export const SelectPlatformList: FC<SelectPlatformListProps> = ({
  defaultSelectedPlatform,
  initialPlatforms,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      platformId: defaultSelectedPlatform?.id,
      platformName: defaultSelectedPlatform?.name,
      platformThumbnailUrl: defaultSelectedPlatform?.faviconUrl,
    },
  });
  const keywordForm = useForm<z.infer<typeof KeywordFormSchema>>({
    resolver: zodResolver(KeywordFormSchema),
  });

  const selectedPlatformName = form.watch("platformName");

  const observerTarget = useRef(null);

  const [platforms, setPlatforms] = useState<PlatformType[]>(initialPlatforms);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);

  const flatPlatforms = platforms
    ? platforms.flatMap((platform) => platform)
    : [];

  const handleSearch = useCallback(
    async (values: z.infer<typeof KeywordFormSchema>) => {
      const res = await fetchPlatformsAPI({
        keyword: values.keyword,
      });

      if (res.data) {
        setPlatforms(res.data.platforms);
        setOffset(1);
        setHashMore(true);
      }
    },
    [setPlatforms, setOffset, setHashMore]
  );

  const loadMore = useCallback(
    async (offset: number) => {
      const res = await fetchPlatformsAPI({
        offset: offset.toString(),
        keyword: keywordForm.watch("keyword"),
      });

      if (res.data) {
        setPlatforms((prev) => [...prev, ...res.data.platforms]);
        const count = res.data.platforms.length;
        setHashMore(count > 0);
      }
    },
    [keywordForm]
  );

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
      loadMore(offset);
    }
  }, [loadMore, offset, hashMore]);

  return (
    <div className="w-full">
      <div className="mb-4 ml-2 w-full text-sm font-normal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="mr-2 inline-block size-6 bg-white"
          src={form.watch("platformThumbnailUrl")}
          alt=""
        />
        <span>{selectedPlatformName}</span>
      </div>

      <div>
        <Form {...keywordForm}>
          <form onSubmit={keywordForm.handleSubmit(handleSearch)}>
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
        {flatPlatforms.length === 0 ? (
          <p>No platforms found</p>
        ) : (
          <>
            {flatPlatforms.map((platform) => (
              <FormField
                key={platform.id}
                control={form.control}
                name="platformId"
                render={({ field }) => (
                  <FormItem
                    key={platform.id}
                    className="flex w-full cursor-pointer items-center border-t-2 border-t-secondary hover:bg-secondary hover:opacity-10"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(platform.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange(platform.id);
                            form.setValue("platformName", platform.name);
                            form.setValue(
                              "platformThumbnailUrl",
                              platform.faviconUrl
                            );
                          }
                        }}
                      />
                    </FormControl>

                    <FormLabel className="ml-2 flex h-12 w-full cursor-pointer items-center pb-2 text-sm font-normal">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="mr-2 inline-block size-6 bg-white"
                        src={platform?.faviconUrl}
                        alt=""
                      />

                      <p className="flex w-full items-center text-lg">
                        {platform.name}
                      </p>
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
            <div ref={observerTarget}>
              {hashMore && (
                <div className="flex justify-center py-4">
                  <Loader />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
