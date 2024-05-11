"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

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

type PlatformTableProps = {
  platforms: PlatformType[];
  offset?: number;
  keyword?: string;
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
        <>{row.original.deletedAt ? <span>stop</span> : <span>active</span>}</>
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
  offset?: number;
  keyword?: string;
}

function PlatformDataTable<TData, TValue>({
  columns,
  data,
  offset,
  keyword,
}: PlatformDataTableProps<TData, TValue>) {
  const router = useRouter();
  const { revalidatePage } = useServerRevalidatePage();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
  const data: Array<PlatformTableState> = platforms.map((platform) => {
    return {
      id: platform.id,
      name: platform.name,
      siteUrl: platform.siteUrl,
      platformSiteType: platform.platformSiteType,
      faviconUrl: platform.faviconUrl,
      isEng: platform.isEng,
      //   createdAt: platform.createdAt,
      //   updatedAt: platform.updatedAt,
      deletedAt: platform?.deletedAt,
    };
  });

  return (
    <PlatformDataTable
      columns={columns}
      data={data}
      offset={offset}
      keyword={keyword}
    />
  );
}
