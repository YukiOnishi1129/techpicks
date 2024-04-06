"use server";

import prisma from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
  const data = await prisma.user.findUnique({
    where: { email: email },
  });

  return data;
};
