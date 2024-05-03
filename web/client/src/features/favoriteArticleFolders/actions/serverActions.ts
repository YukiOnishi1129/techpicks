"use server";

import { revalidatePath } from "next/cache";

export async function serverRevalidateFavoriteArticleFolderPageTag() {
  revalidatePath("/favorite-article-folder");
}
