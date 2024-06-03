"use client";

import { ColumnDef } from "@tanstack/react-table";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FC, useMemo, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { PaginationUrl, TablePagination } from "@/components/ui/pagination";

import { FeedType, OriginFeedType } from "@/types/feed";

import { ENGLISH_IMAGE, JAPANESE_IMAGE } from "@/constants/image";

import { FeedDataTable } from "./FeedDataTable";
import { MAX_SHOW_FEED_TABLE_DATA_COUNT } from "../../constants/table";

type FeedTableProps = {
  allCount: number;
  feeds: Array<FeedType>;
  offset?: number;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
};

export type FeedTableState = OriginFeedType & {
  platformId: string;
  platformName: string;
  platformSiteType: number;
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
        accessorKey: "isEng",
        header: () => <div className="text-left">lang</div>,
        cell: ({ row }) => {
          const imageUrl = row.original.isEng ? ENGLISH_IMAGE : JAPANESE_IMAGE;
          const imageAlt = row.original.isEng ? "EN" : "JP";
          return (
            <div className="text-left">
              <Image src={imageUrl} alt={imageAlt} width={20} height={20} />
            </div>
          );
        },
      },
      {
        accessorKey: "platformSiteType",
        header: () => <div className="text-left">type</div>,
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
          return <div className="text-left">{showType}</div>;
        },
      },
      {
        accessorKey: "deletedAt",
        header: () => <div className="text-left">status</div>,
        cell: ({ row }) => {
          const style = row.original.deletedAt
            ? "text-gray-500"
            : "text-emerald-500";
          const label = row.original.deletedAt ? "stop" : "active";
          return <span className={clsx(style)}>{label}</span>;
        },
      },
      {
        accessorKey: "id",
        header: () => <div className="text-left">edit</div>,
        cell: ({ row }) => {
          //   const platform = platforms.find((p) => p.id === row.original.id);
          //   if (!platform) return;
          //   return <EditPlatformSheet platform={platform} />;
        },
      },
    ],
    [feedIds]
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
