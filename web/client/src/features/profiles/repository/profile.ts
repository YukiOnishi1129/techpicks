"use server";

import prisma from "@/lib/prisma";

export const getProfile = async (id: string) => {
  const data = await prisma.profile.findFirst({
    where: {
      id: id,
    },
  });

  return data;
};
