"use client";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState, useMemo, useCallback } from "react";
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

import { useStatusToast } from "@/hooks/useStatusToast";

import { PlatformType } from "@/types/platform";

import { serverRevalidatePage } from "@/actions/serverAction";

import { PlatformLanguageSelect } from "./PlatformLangaugeSelect";
import { PlatformSearchInput } from "./PlatformSearchInput";
import { PlatformSiteTypeSelect } from "./PlatformSiteTypeSelect";
import {
  UpdatePlatformDTO,
  bulkUpdatePlatform,
} from "../../repository/platform";
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
  const { successToast, failToast } = useStatusToast();

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

  const redirectPage = useCallback(async () => {
    let keywordPath = "";
    const requestOffset = offset ? offset : 1;
    if (keyword && keyword.trim() !== "") {
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
    await serverRevalidatePage(
      `/platform?$offset=${requestOffset}${keywordPath}${languagePath}`
    );
  }, [keyword, language, platformSiteType, offset]);

  const handleUpdateStatusToActive = useCallback(async () => {
    const targetUpdatePlatforms: Array<UpdatePlatformDTO> = [];
    platforms.forEach((platform) => {
      if (selectedPlatformIds.includes(platform.id)) {
        targetUpdatePlatforms.push({
          id: platform.id,
          name: platform.name,
          siteUrl: platform.siteUrl,
          platformSiteType: platform.platformSiteType,
          faviconUrl: platform.faviconUrl,
          isEng: platform.isEng,
          deletedAt: undefined,
        });
      }
    });
    if (targetUpdatePlatforms.length === 0) {
      failToast({
        description: "Fail: could not status active",
      });
      return;
    }
    const data = await bulkUpdatePlatform(targetUpdatePlatforms);
    if (!data) {
      failToast({
        description: "Fail: could not status active",
      });
    }
    successToast({
      description: "Success: status active",
    });

    // revalidate page
    await redirectPage();
  }, [platforms, selectedPlatformIds, successToast, failToast, redirectPage]);

  const handleUpdateStatusToStop = useCallback(async () => {
    const targetUpdatePlatforms: Array<UpdatePlatformDTO> = [];
    platforms.forEach((platform) => {
      if (selectedPlatformIds.includes(platform.id)) {
        targetUpdatePlatforms.push({
          id: platform.id,
          name: platform.name,
          siteUrl: platform.siteUrl,
          platformSiteType: platform.platformSiteType,
          faviconUrl: platform.faviconUrl,
          isEng: platform.isEng,
          deletedAt: new Date().toISOString(),
        });
      }
    });
    if (targetUpdatePlatforms.length === 0) {
      failToast({
        description: "Fail: could not status stop",
      });
    }
    const data = await bulkUpdatePlatform(targetUpdatePlatforms);
    if (!data) {
      failToast({
        description: "Fail: could not status stop",
      });
    }
    successToast({
      description: "Success: status stop",
    });
    // revalidate page
    await redirectPage();
  }, [platforms, selectedPlatformIds, successToast, failToast, redirectPage]);

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
              <Button
                disabled={isDisabledActive}
                variant="ghost"
                onClick={handleUpdateStatusToActive}
              >
                <FaRunning className="mr-1" />
                <span className="text-xs">ACTIVE</span>
              </Button>
            </div>

            {/* stop */}
            <div>
              <Button
                disabled={isDisableStop}
                variant="ghost"
                onClick={handleUpdateStatusToStop}
              >
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
