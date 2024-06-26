"use server";

import { getFetch } from "@/lib/fetch";

import {
  CategoryType,
  FetchCategoriesAPIResponse,
  FetchCategoryAPIResponse,
} from "@/types/category";

type FetchCategoriesAPIRequest = {
  offset?: string;
  keyword?: string;
};

export const fetchCategoriesAPI = async ({
  offset = "1",
  keyword,
}: FetchCategoriesAPIRequest): Promise<FetchCategoriesAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/categories/?offset=${offset}`;
  if (keyword) {
    url += `&keyword=${keyword}`;
  }

  const res = await getFetch({
    url: url,
    tagName: "categories",
    cacheType: "no-store",
  });
  const data = await res.json();
  const status = res.status;

  return {
    data: {
      categories: data.categories as Array<CategoryType>,
      message: "success",
    },
    status,
  };
};

export const fetchCategoryByIdAPI = async (
  id: string
): Promise<FetchCategoryAPIResponse> => {
  const res = await getFetch({
    url: `${process.env.WEB_DOMAIN}/api/categories/${id}`,
    tagName: "category",
    cacheType: "no-store",
  });
  const data = await res.json();
  const status = res.status;

  return {
    data: {
      category: data.category as CategoryType,
      message: "success",
    },
    status,
  };
};
