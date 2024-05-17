"use client";

import { ColumnDef } from "@tanstack/react-table";
import { clsx } from "clsx";
import Image from "next/image";
import { useMemo, useState } from "react";

import { MAX_SHOW_PLATFORM_TABLE_DATA_COUNT } from "@/features/platform/constants/table";

import { Checkbox } from "@/components/ui/checkbox";
import {
  PaginationUrl,
  TablePagination,
} from "@/components/ui/pagination/TablePagination";

import { PlatformType } from "@/types/platform";

import { ENGLISH_IMAGE, JAPANESE_IMAGE } from "@/constants/image";

import { PlatformDataTable } from "./PlatformDataTable";

type PlatformTableProps = {
  allCount: number;
  platforms: PlatformType[];
  offset?: number;
  keyword?: string;
  language?: string;
};

export type PlatformTableState = {
  id: string;
  name: string;
  siteUrl: string;
  platformSiteType: number;
  faviconUrl: string;
  isEng: boolean;
  createdAt: Date;
  //   updatedAt: Date;
  deletedAt?: Date;
};

export const PlatformTable = ({
  allCount,
  platforms,
  offset,
  keyword,
  language,
}: PlatformTableProps) => {
  const [selectedIds, setSelectedIds] = useState<Array<string>>([]);
  const platformIds = platforms.map((platform) => platform.id);
  const data: Array<PlatformTableState> = platforms.map((platform) => {
    return {
      id: platform.id,
      name: platform.name,
      siteUrl: platform.siteUrl,
      platformSiteType: platform.platformSiteType,
      faviconUrl: platform.faviconUrl,
      isEng: platform.isEng,
      createdAt: platform.createdAt,
      //   updatedAt: platform.updatedAt,
      deletedAt: platform?.deletedAt,
    };
  });

  const columns: ColumnDef<PlatformTableState>[] = useMemo(
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
              setSelectedIds(value ? platformIds : []);
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
            <div className="flex text-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="size-6 bg-white"
                src={row.original.faviconUrl}
                alt=""
              />
              <span className={clsx(style, "ml-4")}>{row.original.name}</span>
            </div>
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
    ],
    [platformIds]
  );

  const currentDataCount = useMemo(() => {
    if (!offset) return data.length;
    return data.length + (offset - 1) * MAX_SHOW_PLATFORM_TABLE_DATA_COUNT;
  }, [data, offset]);

  const currentPage = offset || 1;
  const lastPage = Math.ceil(allCount / MAX_SHOW_PLATFORM_TABLE_DATA_COUNT);

  const paginationUrl: PaginationUrl = useMemo(() => {
    let keywordPath = "";
    if (!!keyword && keyword.trim() !== "") {
      keywordPath = `&keyword=${keyword}`;
    }
    let languagePath = "";
    if (language) {
      languagePath = `&language=${language}`;
    }
    const previousUrl =
      currentPage !== 1
        ? `/platform?offset=${currentPage - 1}${keywordPath}${languagePath}`
        : undefined;
    const nextUrl =
      currentPage < lastPage
        ? `/platform?offset=${currentPage + 1}${keywordPath}${languagePath}`
        : undefined;
    return {
      previous: previousUrl,
      next: nextUrl,
    };
  }, [keyword, language, currentPage, lastPage]);

  return (
    <>
      <PlatformDataTable
        allCount={allCount}
        data={data}
        columns={columns}
        offset={offset}
        keyword={keyword}
        language={language}
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
