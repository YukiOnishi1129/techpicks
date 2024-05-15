import {
  Platform as PrismaPlatform,
  Feed as PrismaFeed,
  Category as PrismaCategory,
} from "@prisma/client";

import { OptionalNullable } from "./util";

export type PlatformType = OptionalNullable<PrismaPlatform> & {
  feeds: Array<
    OptionalNullable<PrismaFeed> & {
      category: OptionalNullable<PrismaCategory>;
    }
  >;
};

export type FetchPlatformAPIResponse = {
  data: {
    platforms: Array<PlatformType>;
    message: string;
  };
  status: number;
};
