import {
  Bookmark as PrismaPrismaBookmark,
  Profile as PrismaProfile,
} from "@prisma/client";

export type BookmarkType = Omit<
  PrismaPrismaBookmark,
  "userId" | "platformId"
> & {
  user: Omit<
    PrismaProfile,
    "emailVerifiedAt" | "isSuperAdmin" | "provider" | "deletedAt"
  >;
};
