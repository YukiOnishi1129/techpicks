"use client";

import { FC } from "react";

import { Breadcrumb, BreadcrumbList } from "@/shared/components/ui/breadcrumb";

import { PageBreadcrumbItem } from "./PageBreadcrumbItem";

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
