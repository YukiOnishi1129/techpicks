"use client";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { FaRunning, FaRegStopCircle } from "react-icons/fa";

import { MAX_SHOW_PLATFORM_TABLE_DATA_COUNT } from "@/features/platform/constants/table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { PlatformType } from "@/types/platform";

import { PlatformLanguageSelect } from "./PlatformLangaugeSelect";
import { PlatformSearchInput } from "./PlatformSearchInput";
import { PlatformSiteTypeSelect } from "./PlatformSiteTypeSelect";
import { CreatePlatformDialog } from "../CreatePlatformDialog";

interface PlatformDataTableProps<TData, TValue> {
  allCount: number;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  platforms: Array<PlatformType>;
  selectedPlatformIds: Array<string>;
  offset?: number;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
}

export function PlatformDataTable<TData, TValue>({
  allCount,
  columns,
  data,
  platforms,
  selectedPlatformIds,
  offset,
  keyword,
  language,
  platformSiteType,
}: PlatformDataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});

  const currentDataCount = useMemo(() => {
    if (!offset) return data.length;
    return data.length + (offset - 1) * MAX_SHOW_PLATFORM_TABLE_DATA_COUNT;
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

  const isDisabledActive = useMemo(
    () =>
      !platforms.some((platform) =>
        selectedPlatformIds.some(
          (selectId) => selectId === platform.id && platform.deletedAt
        )
      ),
    [platforms, selectedPlatformIds]
  );

  const isDisableStop = useMemo(
    () =>
      !platforms.some((platform) =>
        selectedPlatformIds.some(
          (selectId) => selectId === platform.id && !platform.deletedAt
        )
      ),
    [platforms, selectedPlatformIds]
  );

  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-between border-b  px-4 py-2">
        <div className="flex items-center">
          <h1 className="text-lg font-bold">Platform Table</h1>
          <p className="ml-4 text-sm ">
            {currentDataCount} / {allCount}
          </p>

          <div className="ml-12 flex items-center justify-between">
            {/* active */}
            <div className="mr-2">
              <Button disabled={isDisabledActive} variant="ghost">
                <FaRunning className="mr-1" />
                <span className="text-xs">ACTIVE</span>
              </Button>
            </div>

            {/* stop */}
            <div>
              <Button disabled={isDisableStop} variant="ghost">
                <FaRegStopCircle className="mr-1" />
                <span className="text-xs">STOP</span>
              </Button>
            </div>
          </div>
        </div>

        <CreatePlatformDialog />
      </div>

      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex  items-center justify-between">
          <div>
            <PlatformSearchInput
              keyword={keyword}
              offset={offset}
              language={language}
              platformSiteType={platformSiteType}
            />
          </div>

          <div className="ml-2">
            <PlatformLanguageSelect
              offset={offset}
              keyword={keyword}
              language={language}
              platformSiteType={platformSiteType}
            />
          </div>
          <div className="ml-2">
            <PlatformSiteTypeSelect
              offset={offset}
              keyword={keyword}
              language={language}
              platformSiteType={platformSiteType}
            />
          </div>
        </div>
      </div>

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
