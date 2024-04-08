import {
  Platform as PrismaPlatform,
  Bookmark as PrismaPrismaBookmark,
  Profile as PrismaProfile,
} from "@prisma/client";

export type BookmarkType = Omit<
  PrismaPrismaBookmark,
  "userId" | "platformId"
> & {
  platform?: Omit<PrismaPlatform, "deletedAt">;
  user: Omit<
    PrismaProfile,
    "emailVerifiedAt" | "isSuperAdmin" | "provider" | "deletedAt"
  >;
};
