"use server";

import prisma from "@/lib/prisma";

export const getBookmarkList = async () => {
  const data = await prisma.bookmark.findMany();
};
