"use client";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState, useMemo, useCallback } from "react";

import { MAX_SHOW_PLATFORM_TABLE_DATA_COUNT } from "@/features/platforms/constants/table";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { UpdateStatusForm } from "@/components/ui/UpdateStatusForm";

import { useStatusToast } from "@/hooks/useStatusToast";

import { PlatformType } from "@/types/platform";

import { usePlatformRedirectPage } from "../../hooks/usePlatformRedirectPage";
import {
  UpdatePlatformDTO,
  bulkUpdatePlatform,
} from "../../repository/platform";
import { CreatePlatformDialog } from "../CreatePlatformDialog";
import { PlatformSearchForm } from "../PlatformSearchForm/PlatformSearchForm";

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
  status?: string;
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
  status,
}: PlatformDataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const { successToast, failToast } = useStatusToast();
  const { redirectPage } = usePlatformRedirectPage();

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

  const isDisabledStop = useMemo(
    () =>
      !platforms.some((platform) =>
        selectedPlatformIds.some(
          (selectId) => selectId === platform.id && !platform.deletedAt
        )
      ),
    [platforms, selectedPlatformIds]
  );

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
    await redirectPage({
      offset,
      targetKeyword: keyword,
      targetLanguage: language,
      targetPlatformSiteType: platformSiteType,
      targetStatus: "",
    });
  }, [
    offset,
    keyword,
    language,
    platformSiteType,
    platforms,
    selectedPlatformIds,
    successToast,
    failToast,
    redirectPage,
  ]);

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
    await redirectPage({
      offset,
      targetKeyword: keyword,
      targetLanguage: language,
      targetPlatformSiteType: platformSiteType,
      targetStatus: "",
    });
  }, [
    offset,
    keyword,
    language,
    platformSiteType,
    platforms,
    selectedPlatformIds,
    successToast,
    failToast,
    redirectPage,
  ]);

  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-between border-b  px-4 py-2">
        <div className="flex items-center">
          <h1 className="text-lg font-bold">Platform Table</h1>
          <p className="ml-4 text-sm ">
            {currentDataCount} / {allCount}
          </p>

          <div className="ml-12">
            <UpdateStatusForm
              isDisabledActive={isDisabledActive}
              isDisabledStop={isDisabledStop}
              handleUpdateStatusToActive={handleUpdateStatusToActive}
              handleUpdateStatusToStop={handleUpdateStatusToStop}
            />
          </div>
        </div>

        <CreatePlatformDialog
          offset={offset}
          keyword={keyword}
          language={language}
          platformSiteType={platformSiteType}
          status={status}
        />
      </div>

      <PlatformSearchForm
        keyword={keyword}
        language={language}
        platformSiteType={platformSiteType}
        status={status}
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
