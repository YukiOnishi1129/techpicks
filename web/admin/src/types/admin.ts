import { User } from "@supabase/supabase-js";

import { ProfileType } from "./profile";

export type AdminUserType = {
  user: User;
  profile: ProfileType;
};

export type FetchAdminUserAPIResponse = {
  data: {
    adminUser?: AdminUserType;
    message: string;
  };
  status: number;
};
