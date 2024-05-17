"use client";

import { FC } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination/pagination";

type TablePaginationProps = {
  currentPage: number;
  lastPage: number;
  url: PaginationUrl;
};

export type PaginationUrl = {
  previous?: string;
  next?: string;
};

export const TablePagination: FC<TablePaginationProps> = ({
  currentPage,
  lastPage,
  url,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem hidden={!url.previous}>
          <PaginationPrevious href={url.previous} />
        </PaginationItem>
        <PaginationItem hidden={currentPage - 1 < 2}>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem hidden={!url.previous}>
          <PaginationLink href={url.previous}>{currentPage - 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem hidden={!url.next}>
          <PaginationLink href={url.next}>{currentPage + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem hidden={currentPage + 1 >= lastPage}>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem hidden={!url.next}>
          <PaginationNext href={url.next} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
