"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { fetchPlatformsAPI } from "@/features/platforms/actions/platform";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Loader } from "@/components/ui/loader";

import { PlatformType } from "@/types/platform";

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

  const selectedPlatformName = form.watch("platformName");

  const observerTarget = useRef(null);

  const [platforms, setPlatforms] = useState<PlatformType[]>(initialPlatforms);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);

  const flatPlatforms = platforms
    ? platforms.flatMap((platform) => platform)
    : [];

  const loadMore = useCallback(async (offset: number) => {
    const res = await fetchPlatformsAPI({
      offset: offset.toString(),
    });

    if (res.data) {
      setPlatforms((prev) => [...prev, ...res.data.platforms]);
      const count = res.data.platforms.length;
      setHashMore(count > 0);
    }
  }, []);

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
                    className="w-full flex items-center border-t-2 border-t-secondary hover:bg-secondary hover:bg-opacity-10 cursor-pointer"
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

                    <FormLabel className="ml-2 h-12 pb-2 flex w-full cursor-pointer items-center text-sm font-normal">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="mr-2 inline-block size-6 bg-white"
                        src={platform?.faviconUrl}
                        alt=""
                      />

                      <p className="w-full text-lg flex items-center">
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
