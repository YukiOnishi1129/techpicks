"use client";

import { FC } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type BreadCrumbType = {
  title: string;
  href: string;
};

type PageBreadcrumbProps = {
  breadcrumbs: BreadCrumbType[];
};

export const PageBreadcrumb: FC<PageBreadcrumbProps> = ({
  breadcrumbs,
}: PageBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <PageBreadcrumbItem
            key={`breadcrumb-${index}-${breadcrumb.title}}`}
            breadcrumb={breadcrumb}
            index={index}
            length={breadcrumbs.length}
          />
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

type PageBreadcrumbItemProps = {
  breadcrumb: BreadCrumbType;
  index: number;
  length: number;
};

const PageBreadcrumbItem: FC<PageBreadcrumbItemProps> = ({
  breadcrumb,
  index,
  length,
}: PageBreadcrumbItemProps) => {
  return (
    <>
      <BreadcrumbItem>
        <BreadcrumbLink href={breadcrumb.href}>
          {breadcrumb.title}
        </BreadcrumbLink>
      </BreadcrumbItem>
      {index < length - 1 && <BreadcrumbSeparator />}
    </>
  );
};
