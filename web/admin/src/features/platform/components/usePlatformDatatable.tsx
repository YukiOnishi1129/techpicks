"use client";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { clsx } from "clsx";
import Image from "next/image";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";

import { PlatformType } from "@/types/platform";

import { PlatformTableState } from "./PlatformTable/PlatformTable";

type usePlatformDataTableProps = {
  platforms: PlatformType[];
  offset?: number;
  keyword?: string;
};

export const usePlatformDataTable = ({
  platforms,
  offset,
  keyword,
}: usePlatformDataTableProps) => {
  const [rowSelection, setRowSelection] = useState({});
  const [selectedWorkIds, setSelectedWorkIds] = useState<string[]>([]);
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

  const columns: ColumnDef<PlatformTableState>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    },
    {
      accessorKey: "name",
      header: "name",
      cell: ({ row }) => {
        const style = row.original.deletedAt ? "text-gray-500" : "";
        return (
          <div className="flex text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="size-6" src={row.original.faviconUrl} alt="" />
            <span className={clsx(style, "ml-4")}>{row.original.name}</span>
          </div>
        );
      },
    },

    {
      accessorKey: "isEng",
      header: () => <div className="text-left">lang</div>,
      cell: ({ row }) => {
        const imageUrl = row.original.isEng
          ? "/static/english.png"
          : "/static/japanese.png";
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
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return { data, columns, table };
};
