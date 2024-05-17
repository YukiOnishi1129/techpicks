"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { clsx } from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
  allCount: number;
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

const FormSchema = z.object({
  keyword: z.string().optional(),
});

interface PlatformDataTableProps<TData, TValue> {
  allCount: number;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  offset?: number;
  keyword?: string;
}

function PlatformDataTable<TData, TValue>({
  allCount,
  columns,
  data,
  offset,
  keyword,
}: PlatformDataTableProps<TData, TValue>) {
  const router = useRouter();
  const { revalidatePage } = useServerRevalidatePage();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keyword: "",
    },
  });

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const handleSearch = useCallback(
    async (values: z.infer<typeof FormSchema>) => {
      let keywordPath = "";
      const requestOffset = offset ? offset - 1 : 1;
      if (!!values.keyword && values.keyword.trim() !== "") {
        keywordPath = `&keyword=${values.keyword}`;
      }
      await revalidatePage();
      router.replace(`/platform?$offset=${requestOffset}${keywordPath}`);
    },
    [offset, router, revalidatePage]
  );

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
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div>
          <h1 className="text-lg font-bold">Platform Table</h1>
          <p className="text-sm text-gray-500">
            {allCount} results found. Showing {data.length} results.
          </p>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSearch)}>
              <FormField
                control={form.control}
                name="keyword"
                render={({ field }) => (
                  <FormItem className="mb-4 flex items-center">
                    <FormControl>
                      <Input
                        className="border-primary bg-secondary text-primary"
                        placeholder="search keyword"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
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
  allCount,
  platforms,
  offset,
  keyword,
}: PlatformTableProps) {
  const [selectedIds, setSelectedIds] = useState<Array<string>>([]);
  const platformIds = platforms.map((platform) => platform.id);
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

  const columns: ColumnDef<PlatformTableState>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
              setSelectedIds(value ? platformIds : []);
            }}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
              setSelectedIds((prev) => {
                if (value) {
                  return [...prev, row.original.id];
                }
                return prev.filter((id) => id !== row.original.id);
              });
            }}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
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
    ],
    [platformIds]
  );

  return (
    <PlatformDataTable
      allCount={allCount}
      data={data}
      columns={columns}
      offset={offset}
      keyword={keyword}
    />
  );
}
