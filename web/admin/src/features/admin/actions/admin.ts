import { getFetch } from "@/lib/fetch";

import { AdminUserType, FetchAdminUserAPIResponse } from "@/types/admin";

export const fetchAdminUserAPI =
  async (): Promise<FetchAdminUserAPIResponse> => {
    const url = new URL(`${process.env.WEB_DOMAIN}/api/admin/user`);

    const response = await getFetch({
      url: url.toString(),
      tagName: "admin/user",
      cacheType: "no-store",
    });
    const data = await response.json();
    const status = response.status;

    if (!data.adminUser) {
      return {
        data: {
          message: data.message as string,
        },
        status,
      };
    }

    return {
      data: {
        adminUser: data.adminUser as AdminUserType,
        message: data.message,
      },
      status,
    };
  };
