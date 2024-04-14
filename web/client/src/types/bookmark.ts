import {
  Bookmark as PrismaPrismaBookmark,
  Profile as PrismaProfile,
} from "@prisma/client";

export type BookmarkType = Omit<
  OptionalNullable<PrismaPrismaBookmark>,
  "userId" | "platformId"
> & {
  user: Omit<
    PrismaProfile,
    "emailVerifiedAt" | "isSuperAdmin" | "provider" | "deletedAt"
  >;
};

type PickNullable<T> = {
  [P in keyof T as null extends T[P] ? P : never]: T[P];
};

type PickNotNullable<T> = {
  [P in keyof T as null extends T[P] ? never : P]: T[P];
};

type OptionalNullable<T> = {
  [K in keyof PickNullable<T>]?: Exclude<T[K], null>;
} & {
  [K in keyof PickNotNullable<T>]: T[K];
};
