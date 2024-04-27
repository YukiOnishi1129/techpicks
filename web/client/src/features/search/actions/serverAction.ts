"use server";

import { revalidatePath } from "next/cache";

export async function serverRevalidateArticleSearchResult() {
  revalidatePath("/article/search/result");
}
