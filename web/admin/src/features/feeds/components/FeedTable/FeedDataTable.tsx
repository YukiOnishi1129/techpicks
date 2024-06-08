"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";

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

import { FeedType } from "@/types/feed";

import { serverRevalidatePage } from "@/actions/serverAction";

import { MAX_SHOW_FEED_TABLE_DATA_COUNT } from "../../constants/table";
import { UpdateFeedDTO, bulkUpdateFeed } from "../../repository/feed";
import { CreateFeedDialog } from "../CreateFeedDialog";
import { FeedSearchForm } from "../FeedSearchForm";

interface FeedDataTableProps<TData, TValue> {
  allCount: number;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  feeds: Array<FeedType>;
  selectedFeedIds: Array<string>;
  offset?: number;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  platformId?: string;
  categoryId?: string;
  trendPlatformType?: string;
  status?: string;
}

export function FeedDataTable<TData, TValue>({
  allCount,
  columns,
  data,
  feeds,
  selectedFeedIds,
  offset,
  keyword,
  language,
  platformSiteType,
  platformId,
  categoryId,
  trendPlatformType,
  status,
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

  const isDisabledActive = useMemo(
    () =>
      !feeds.some((feed) =>
        selectedFeedIds.some(
          (selectId) => selectId === feed.id && feed.deletedAt
        )
      ),
    [feeds, selectedFeedIds]
  );

  const isDisabledStop = useMemo(
    () =>
      !feeds.some((feed) =>
        selectedFeedIds.some(
          (selectId) => selectId === feed.id && !feed.deletedAt
        )
      ),
    [feeds, selectedFeedIds]
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
    let platformIdPath = "";
    if (platformId) {
      platformIdPath = `&platformId=${platformId}`;
    }
    let categoryIdPath = "";
    if (categoryId) {
      categoryIdPath = `&categoryId=${categoryId}`;
    }
    let trendPlatformTypePath = "";
    if (trendPlatformType) {
      trendPlatformTypePath = `&trendPlatformType=${trendPlatformType}`;
    }
    await serverRevalidatePage(
      `/feed?$offset=${requestOffset}${keywordPath}${languagePath}${platformSiteTypePath}${platformIdPath}${categoryIdPath}${trendPlatformTypePath}`
    );
  }, [
    keyword,
    language,
    platformSiteType,
    offset,
    platformId,
    categoryId,
    trendPlatformType,
  ]);

  const handleUpdateStatusToActive = useCallback(async () => {
    const targetUpdateFeeds: Array<UpdateFeedDTO> = [];
    feeds.forEach(async (feed) => {
      if (selectedFeedIds.includes(feed.id)) {
        targetUpdateFeeds.push({
          id: feed.id,
          platformId: feed.platformId,
          categoryId: feed.categoryId,
          name: feed.name,
          description: feed.description,
          rssUrl: feed.rssUrl,
          siteUrl: feed.siteUrl,
          thumbnailUrl: feed.thumbnailUrl,
          trendPlatformType: feed.trendPlatformType,
          apiQueryParam: feed.apiQueryParam,
          deletedAt: undefined,
        });
      }
      if (targetUpdateFeeds.length === 0) {
        failToast({
          description: "Fail: could not status active",
        });
        return;
      }
      const data = await bulkUpdateFeed(targetUpdateFeeds);
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
    });
  }, [successToast, failToast, redirectPage, feeds, selectedFeedIds]);

  const handleUpdateStatusToStop = useCallback(async () => {
    const targetUpdateFeeds: Array<UpdateFeedDTO> = [];
    feeds.forEach(async (feed) => {
      if (selectedFeedIds.includes(feed.id)) {
        targetUpdateFeeds.push({
          id: feed.id,
          platformId: feed.platformId,
          categoryId: feed.categoryId,
          name: feed.name,
          description: feed.description,
          rssUrl: feed.rssUrl,
          siteUrl: feed.siteUrl,
          thumbnailUrl: feed.thumbnailUrl,
          trendPlatformType: feed.trendPlatformType,
          apiQueryParam: feed.apiQueryParam,
          deletedAt: new Date().toISOString(),
        });
      }
      if (targetUpdateFeeds.length === 0) {
        failToast({
          description: "Fail: could not status stop",
        });
        return;
      }
      const data = await bulkUpdateFeed(targetUpdateFeeds);
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
    });
  }, [successToast, failToast, redirectPage, feeds, selectedFeedIds]);

  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-between border-b  px-4 py-2">
        <div className="flex items-center">
          <h1 className="text-lg font-bold">Feed Table</h1>
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

        <CreateFeedDialog
          keyword={keyword}
          language={language}
          platformId={platformId}
          categoryId={categoryId}
          platformSiteType={platformSiteType}
          trendPlatformType={trendPlatformType}
          status={status}
        />
      </div>

      <FeedSearchForm
        keyword={keyword}
        language={language}
        platformSiteType={platformSiteType}
        platformId={platformId}
        categoryId={categoryId}
        trendPlatformType={trendPlatformType}
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
