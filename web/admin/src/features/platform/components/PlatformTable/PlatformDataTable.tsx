"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { useServerRevalidatePage } from "@/hooks/useServerRevalidatePage";

interface PlatformDataTableProps<TData, TValue> {
  allCount: number;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  offset?: number;
  keyword?: string;
}
const FormSchema = z.object({
  keyword: z.string().optional(),
});

const MAX_SHOW_DATA_COUNT = 8;

export function PlatformDataTable<TData, TValue>({
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

  const currentDataCount = useMemo(() => {
    if (!offset) return data.length;
    return data.length + (offset - 1) * MAX_SHOW_DATA_COUNT;
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
    let keywordPath = "";
    const requestOffset = offset ? offset - 1 : 1;
    if (!!keyword && keyword.trim() !== "") {
      keywordPath = `&keyword=${keyword}`;
    }
    await revalidatePage();
    router.replace(`/platform?offset=${requestOffset}${keywordPath}`);
  }, [keyword, offset, router, revalidatePage]);

  const handleNextPage = useCallback(async () => {
    let keywordPath = "";
    let requestOffset = offset ? offset + 1 : 1;
    if (!!keyword && keyword.trim() !== "") {
      keywordPath = `&keyword=${keyword}`;
    }
    await revalidatePage();
    router.replace(`/platform?offset=${requestOffset}${keywordPath}`);
  }, [keyword, offset, router, revalidatePage]);

  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div>
          <h1 className="text-lg font-bold">Platform Table</h1>
          <p className="text-sm text-gray-500">
            {allCount} results found. Showing {currentDataCount} results.
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
