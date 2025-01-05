"use client";

import { FragmentOf, readFragment } from "gql.tada";
import { FC } from "react";

import { ZoomableImage } from "@/shared/components/ui/image";
import { Link } from "@/shared/components/ui/link";
import { useCheckImageExist } from "@/shared/hooks/useCheckImageExist";
import { showDiffDateToCurrentDate } from "@/shared/lib/date";

import { BookmarkCardItemFragment } from "./BookmarkCardItemFragment";

type BookmarkCardItemProps = {
  data: FragmentOf<typeof BookmarkCardItemFragment>;
};

export const BookmarkCardItem: FC<BookmarkCardItemProps> = ({ data }) => {
  const fragment = readFragment(BookmarkCardItemFragment, data);
  const imageUrl = useCheckImageExist(fragment.thumbnailUrl);

  return (
    <div className="relative w-full rounded md:px-4">
      <div className="justify-around gap-4 md:flex">
        <div className="grid gap-2 md:flex md:w-[30%] md:justify-center">
          <h3 className="line-clamp-3 block text-left text-lg font-bold tracking-wide md:hidden md:w-full md:text-xl">
            {fragment.title}
          </h3>
          <Link
            url={fragment.articleUrl}
            target={"_blank"}
            className="flex w-full justify-center md:h-36 md:w-48"
          >
            <ZoomableImage imageUrl={imageUrl || ""} alt={fragment.title} />
          </Link>
        </div>

        <div className="grid gap-2 md:w-[65%]">
          <h3 className="line-clamp-3 hidden text-left text-lg font-bold tracking-wide md:block md:w-full md:text-xl">
            {fragment.title}
          </h3>

          <p className="text-sm">
            {`register: ${showDiffDateToCurrentDate(fragment.createdAt)}`}
          </p>
        </div>
      </div>
    </div>
  );
};
