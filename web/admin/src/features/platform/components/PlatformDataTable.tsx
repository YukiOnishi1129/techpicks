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
    header: "Status",
  },
  {
    accessorKey: "faviconUrl",
    header: "Icon",
  },
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "platformSiteType",
    header: "type",
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
