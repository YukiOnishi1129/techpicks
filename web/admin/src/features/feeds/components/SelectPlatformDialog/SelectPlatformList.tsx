"use client";

import { Loader } from "lucide-react";
import { FC, useCallback, useRef, useState, useEffect } from "react";

import { fetchPlatformsAPI } from "@/features/platforms/actions/platform";

import { PlatformType } from "@/types/platform";

type SelectPlatformListProps = {
  initialPlatforms: Array<PlatformType>;
};

export const SelectPlatformList: FC<SelectPlatformListProps> = ({
  initialPlatforms,
}) => {
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
    <div className="h-[300px] w-full overflow-y-scroll">
      {flatPlatforms.length === 0 ? (
        <p>No platforms found</p>
      ) : (
        <>
          {flatPlatforms.map((platform) => (
            <div key={platform.id} className="mb-8">
              <p>{platform.name}</p>
            </div>
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
  );
};
