import {
  Bookmark as PrismaPrismaBookmark,
  Profile as PrismaProfile,
  FavoriteArticle as PrismaFavoriteArticle,
} from "@prisma/client";

import { OptionalNullable } from "./util";

export type BookmarkType = Omit<
  OptionalNullable<PrismaPrismaBookmark>,
  "userId"
> & {
  user: Omit<
    PrismaProfile,
    "emailVerifiedAt" | "isSuperAdmin" | "provider" | "deletedAt"
  >;
  favoriteArticles?: Array<Omit<PrismaFavoriteArticle, "userId">>;
  isFollowing?: boolean;
};
