"use server";

import { revalidatePath } from "next/cache";

export async function serverRevalidateArticleSearchResult() {
  revalidatePath("/article/search/result");
}

export async function serverRevalidateBookmarkSearchResult() {
  revalidatePath("/bookmark/search/result");
}
