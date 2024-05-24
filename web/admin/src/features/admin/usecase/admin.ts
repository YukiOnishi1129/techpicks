"use server";

import { getAdminProfileById } from "@/features/profiles/repository/profile";
import { getUser } from "@/features/users/repository/user";

import { AdminUserType } from "@/types/admin";

export const getAdminUser = async (): Promise<AdminUserType | undefined> => {
  const user = await getUser();
  if (!user) return;

  const adminProfile = await getAdminProfileById(user.id);
  if (!adminProfile) return;

  const resAdminUser: AdminUserType = {
    user,
    profile: adminProfile,
  };

  return resAdminUser;
};
