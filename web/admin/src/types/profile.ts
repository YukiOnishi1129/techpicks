import { Profile as PrismaProfile } from "@prisma/client";

import { OptionalNullable } from "./util";

export type ProfileType = OptionalNullable<PrismaProfile>;
