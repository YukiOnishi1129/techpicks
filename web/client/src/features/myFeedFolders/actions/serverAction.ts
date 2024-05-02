"use server";

import { revalidatePath } from "next/cache";

export async function serverRevalidateMyFeedFolders() {
  revalidatePath("/my-feed-folder");
}

export async function serverRevalidateMyFeedFoldersBtId(id: string) {
  revalidatePath(`/my-feed-folder/${id}`);
}
