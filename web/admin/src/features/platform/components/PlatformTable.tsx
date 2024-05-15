"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useServerRevalidatePage } from "@/hooks/useServerRevalidatePage";

import { PlatformType } from "@/types/platform";

import { usePlatformDataTable } from "./usePlatformDatatable";

type PlatformTableProps = {
  platforms: PlatformType[];
  offset?: number;
  keyword?: string;
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

interface PlatformDataTableProps {
  platforms: PlatformType[];
  offset?: number;
  keyword?: string;
}

function PlatformDataTable({
  platforms,
  offset,
  keyword,
}: PlatformDataTableProps) {
  const router = useRouter();
  const { revalidatePage } = useServerRevalidatePage();
  const [rowSelection, setRowSelection] = useState({});

  const { data, columns } = usePlatformDataTable({
    platforms,
    offset,
    keyword,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  console.log(rowSelection);

  const handlePreviousPage = useCallback(async () => {
    const requestOffset = offset ? offset - 1 : 1;
    await revalidatePage();
    router.replace(`/platform?offset=${requestOffset}&keyword=${keyword}`);
  }, [keyword, offset, router, revalidatePage]);

  const handleNextPage = useCallback(async () => {
    let requestOffset = offset ? offset + 1 : 1;
    await revalidatePage();
    router.replace(`/platform?offset=${requestOffset}&keyword=${keyword}`);
  }, [keyword, offset, router, revalidatePage]);

  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPage}
          disabled={offset === 1 || !offset}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={data.length < 8}
        >
          Next
        </Button>
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

export function PlatformTable({
  platforms,
  offset,
  keyword,
}: PlatformTableProps) {
  return (
    <PlatformDataTable
      platforms={platforms}
      offset={offset}
      keyword={keyword}
    />
  );
}
