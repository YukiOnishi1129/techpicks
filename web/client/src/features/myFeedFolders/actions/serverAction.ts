"use server";

import { revalidatePath } from "next/cache";

export async function serverRevalidateMyFeedFolders() {
  revalidatePath("/my-feed-folders");
}
