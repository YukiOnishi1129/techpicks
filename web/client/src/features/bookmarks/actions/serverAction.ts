"use server";

import { revalidatePath } from "next/cache";

export async function serverRevalidateBookmark() {
  revalidatePath("/bookmark");
}
