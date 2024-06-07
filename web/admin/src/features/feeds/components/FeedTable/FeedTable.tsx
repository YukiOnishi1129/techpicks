"use client";

import { ColumnDef } from "@tanstack/react-table";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FC, useMemo, useState } from "react";
import { SlFeed } from "react-icons/sl";

import { Checkbox } from "@/components/ui/checkbox";
import { PaginationUrl, TablePagination } from "@/components/ui/pagination";

import { FeedType, OriginFeedType } from "@/types/feed";

import { ENGLISH_IMAGE, JAPANESE_IMAGE } from "@/constants/image";

import { FeedDataTable } from "./FeedDataTable";
import { MAX_SHOW_FEED_TABLE_DATA_COUNT } from "../../constants/table";
import { EditFeedSheet } from "../EditFeedSheet";

type FeedTableProps = {
  allCount: number;
  feeds: Array<FeedType>;
  offset?: number;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  platformId?: string;
};

export type FeedTableState = OriginFeedType & {
  platformId: string;
  platformName: string;
  platformSiteType: number;
  platformImage: string;
  isEng: boolean;
  categoryId: string;
  categoryName: string;
  categoryType: number;
};

export const FeedTable: FC<FeedTableProps> = ({
  allCount,
  feeds,
  offset,
  keyword,
  language,
  platformSiteType,
  platformId,
}) => {
  const [selectedIds, setSelectedIds] = useState<Array<string>>([]);
  const feedIds = feeds.map((feed) => feed.id);
  const data: Array<FeedTableState> =
    feeds &&
    feeds.map((feed) => {
      return {
        id: feed.id,
        name: feed.name,
        description: feed.description,
        rssUrl: feed.rssUrl,
        siteUrl: feed.siteUrl,
        thumbnailUrl: feed.thumbnailUrl,
        trendPlatformType: feed.trendPlatformType,
        apiQueryParam: feed.apiQueryParam,
        createdAt: feed.createdAt,
        updatedAt: feed.updatedAt,
        deletedAt: feed?.deletedAt,
        isEng: feed.platform.isEng,
        platformId: feed.platformId,
        platformName: feed.platform.name,
        platformImage: feed.platform.faviconUrl,
        platformSiteType: feed.platform.platformSiteType,
        categoryId: feed.categoryId,
        categoryName: feed.category.name,
        categoryType: feed.category.type,
      };
    });

  const columns: ColumnDef<FeedTableState>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
              setSelectedIds(value ? feedIds : []);
            }}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
              setSelectedIds((prev) => {
                if (value) {
                  return [...prev, row.original.id];
                }
                return prev.filter((id) => id !== row.original.id);
              });
            }}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: "name",
        cell: ({ row }) => {
          const style = row.original.deletedAt ? "text-gray-500" : "";
          return (
            <Link
              href={new URL(row.original.siteUrl)}
              target="_blank"
              className="flex text-left hover:text-teal-500"
            >
              <div className="flex">
                <div className="flex w-12">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="h-6 max-w-12 bg-white"
                    src={row.original.thumbnailUrl}
                    alt=""
                  />
                </div>

                <span className={clsx(style, "ml-4")}>{row.original.name}</span>
              </div>
            </Link>
          );
        },
      },
      {
        accessorKey: "platformId",
        header: () => <div className="text-left">platform</div>,
        cell: ({ row }) => {
          return (
            <Link
              href={new URL(row.original.siteUrl)}
              target="_blank"
              className="flex text-left hover:text-teal-500"
            >
              <div className="flex">
                <div className="flex w-12">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="h-6 max-w-12 bg-white"
                    src={row.original.platformImage}
                    alt=""
                  />
                </div>
              </div>
            </Link>
          );
        },
      },
      {
        accessorKey: "categoryId",
        header: () => <div className="text-left">category</div>,
        cell: ({ row }) => {
          return (
            <div className="text-left">{`#${row.original.categoryName}`}</div>
          );
        },
      },
      {
        accessorKey: "isEng",
        header: () => <div className="text-center">lang</div>,
        cell: ({ row }) => {
          const imageUrl = row.original.isEng ? ENGLISH_IMAGE : JAPANESE_IMAGE;
          const imageAlt = row.original.isEng ? "EN" : "JP";
          return (
            <div className="flex justify-center">
              <Image src={imageUrl} alt={imageAlt} width={20} height={20} />
            </div>
          );
        },
      },
      {
        accessorKey: "platformSiteType",
        header: () => <div className="text-center">type</div>,
        cell: ({ row }) => {
          const type = row.original.platformSiteType;
          let showType = "unknown";
          switch (type) {
            case 1:
              showType = "site";
              break;
            case 2:
              showType = "company";
              break;
            case 3:
              showType = "summary";
              break;
            default:
              break;
          }
          return <div className="text-center">{showType}</div>;
        },
      },
      {
        accessorKey: "trendPlatformType",
        header: () => <div className="text-center">trend</div>,
        cell: ({ row }) => {
          return (
            <div className="text-center">
              {row.original.trendPlatformType ? "⭐️" : "-"}
            </div>
          );
        },
      },
      {
        accessorKey: "rssUrl",
        header: () => <div className="text-center">rss</div>,
        cell: ({ row }) => {
          return (
            <Link
              href={new URL(row.original.rssUrl)}
              target="_blank"
              className="flex justify-center hover:text-teal-500"
            >
              <SlFeed />
            </Link>
          );
        },
      },
      {
        accessorKey: "deletedAt",
        header: () => <div className="text-center">status</div>,
        cell: ({ row }) => {
          const style = row.original.deletedAt
            ? "text-gray-500"
            : "text-emerald-500";
          const label = row.original.deletedAt ? "stop" : "active";
          return <div className={clsx(style, "text-center")}>{label}</div>;
        },
      },
      {
        accessorKey: "id",
        header: () => <div className="text-center">edit</div>,
        cell: ({ row }) => {
          const feed = feeds.find((f) => f.id === row.original.id);
          if (!feed) return;
          return <EditFeedSheet feed={feed} />;
        },
      },
    ],
    [feedIds, feeds]
  );

  const currentPage = offset || 1;
  const lastPage = Math.ceil(allCount / MAX_SHOW_FEED_TABLE_DATA_COUNT);

  const paginationUrl: PaginationUrl = useMemo(() => {
    let keywordPath = "";
    if (!!keyword && keyword.trim() !== "") {
      keywordPath = `&keyword=${keyword}`;
    }
    let languagePath = "";
    if (language) {
      languagePath = `&language=${language}`;
    }
    let platformSiteTypePath = "";
    if (platformSiteType) {
      platformSiteTypePath = `&platformSiteType=${platformSiteType}`;
    }
    const previousUrl =
      currentPage !== 1
        ? `/feed?offset=${currentPage - 1}${keywordPath}${languagePath}${platformSiteTypePath}`
        : undefined;
    const nextUrl =
      currentPage < lastPage
        ? `/feed?offset=${currentPage + 1}${keywordPath}${languagePath}${platformSiteTypePath}`
        : undefined;
    return {
      previous: previousUrl,
      next: nextUrl,
    };
  }, [keyword, language, platformSiteType, currentPage, lastPage]);

  return (
    <>
      <FeedDataTable
        allCount={allCount}
        data={data}
        columns={columns}
        feeds={feeds}
        selectedPlatformIds={selectedIds}
        offset={offset}
        keyword={keyword}
        language={language}
        platformSiteType={platformSiteType}
        platformId={platformId}
      />

      <div className="mt-4">
        <div className="flex items-center justify-between px-4 py-2">
          <TablePagination
            currentPage={currentPage}
            lastPage={lastPage}
            url={paginationUrl}
          />
        </div>
      </div>
    </>
  );
};
