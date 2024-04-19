"use server";

import { revalidatePath } from "next/cache";

export async function serverRevalidateMyFeedList() {
  revalidatePath("/myfeed-list");
}
