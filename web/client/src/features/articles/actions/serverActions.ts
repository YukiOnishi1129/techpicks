"use server";

import { revalidateTag } from "next/cache";

export async function serverRevalidateArticlesTag() {
  revalidateTag("articles");
}
