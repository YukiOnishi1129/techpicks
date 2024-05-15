"use server";

import prisma from "@/lib/prisma";

import { ProfileType } from "@/types/profile";

export const getProfileById = async (id: string) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        id,
      },
    });

    if (!profile) return;

    const resProfile: ProfileType = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      emailVerifiedAt: profile.emailVerifiedAt || undefined,
      image: profile.image,
      provider: profile.provider || undefined,
      isSuperAdmin: profile.isSuperAdmin,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };

    return resProfile;
  } catch (err) {
    throw new Error(`Failed to get profile: ${err}`);
  }
};

export const getAdminProfileById = async (id: string) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        id,
        isSuperAdmin: true,
      },
    });

    if (!profile) return;

    const resProfile: ProfileType = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      emailVerifiedAt: profile.emailVerifiedAt || undefined,
      image: profile.image,
      provider: profile.provider || undefined,
      isSuperAdmin: profile.isSuperAdmin,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };

    return resProfile;
  } catch (err) {
    throw new Error(`Failed to get profile: ${err}`);
  }
};
