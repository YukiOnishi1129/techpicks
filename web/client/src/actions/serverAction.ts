"use server";

import { revalidatePath } from "next/cache";

export async function serverRevalidatePage(pathname: string) {
  revalidatePath(pathname);
}
