import {
  Bookmark as PrismaPrismaBookmark,
  Profile as PrismaProfile,
} from "@prisma/client";

import { OptionalNullable } from "./util";

export type BookmarkType = Omit<
  OptionalNullable<PrismaPrismaBookmark>,
  "userId" | "platformId"
> & {
  user: Omit<
    PrismaProfile,
    "emailVerifiedAt" | "isSuperAdmin" | "provider" | "deletedAt"
  >;
};
