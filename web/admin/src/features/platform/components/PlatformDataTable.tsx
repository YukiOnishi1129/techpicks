"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PlatformType } from "@/types/platform";

type PlatformTableProps = {
  platforms: PlatformType[];
};

type PlatformTableState = {
  id: string;
  name: string;
  //   siteUrl: string;
  platformSiteType: number;
  faviconUrl: string;
  //   isEng: boolean;
  //   createdAt: Date;
  //   updatedAt: Date;
  deletedAt?: Date;
};

export const columns: ColumnDef<PlatformTableState>[] = [
  {
    id: "select",
    header: "id",
  },
  {
    accessorKey: "deletedAt",
    header: () => <div className="text-left">status</div>,
    cell: ({ row }) => {
      return (
        <>{row.original.deletedAt ? <span>active</span> : <span>stop</span>}</>
      );
    },
  },
  {
    accessorKey: "faviconUrl",
    header: () => <div className="text-left">icon</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="size-6" src={row.original.faviconUrl} alt="" />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "name",
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
];

interface PlatformDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function PlatformDataTable<TData, TValue>({
  columns,
  data,
}: PlatformDataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export function PlatformTable({ platforms }: PlatformTableProps) {
  const data: Array<PlatformTableState> = platforms.map((platform) => {
    return {
      id: platform.id,
      name: platform.name,
      //   siteUrl: platform.siteUrl,
      platformSiteType: platform.platformSiteType,
      faviconUrl: platform.faviconUrl,
      //   isEng: platform.isEng,
      //   createdAt: platform.createdAt,
      //   updatedAt: platform.updatedAt,
      deletedAt: platform?.deletedAt,
    };
  });

  return <PlatformDataTable columns={columns} data={data} />;
}
