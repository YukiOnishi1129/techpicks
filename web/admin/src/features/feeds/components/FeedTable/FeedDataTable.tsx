"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { useStatusToast } from "@/hooks/useStatusToast";

import { FeedType } from "@/types/feed";

import { MAX_SHOW_FEED_TABLE_DATA_COUNT } from "../../constants/table";
import { CreateFeedDialog } from "../CreateFeedDialog";
import { FeedSearchForm } from "../FeedSearchForm";

interface FeedDataTableProps<TData, TValue> {
  allCount: number;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  feeds: Array<FeedType>;
  selectedPlatformIds: Array<string>;
  offset?: number;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  platformId?: string;
}

export function FeedDataTable<TData, TValue>({
  allCount,
  columns,
  data,
  feeds,
  selectedPlatformIds,
  offset,
  keyword,
  language,
  platformSiteType,
  platformId,
}: FeedDataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const { successToast, failToast } = useStatusToast();
  const currentDataCount = useMemo(() => {
    if (!offset) return data.length;
    return data.length + (offset - 1) * MAX_SHOW_FEED_TABLE_DATA_COUNT;
  }, [data, offset]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-between border-b  px-4 py-2">
        <div className="flex items-center">
          <h1 className="text-lg font-bold">Feed Table</h1>
          <p className="ml-4 text-sm ">
            {currentDataCount} / {allCount}
          </p>
        </div>

        <CreateFeedDialog />
      </div>

      <FeedSearchForm
        keyword={keyword}
        language={language}
        platformSiteType={platformSiteType}
        platformId={platformId}
      />

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
