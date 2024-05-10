import { FC } from "react";

import { fetchAdminUserAPI } from "@/features/admin/actions/admin";

import { MainBaseLayout } from "./MainBaseLayout";

export type BaseLayoutProps = {
  children: React.ReactNode;
};

export const BaseLayout: FC<BaseLayoutProps> = async ({ children }) => {
  const res = await fetchAdminUserAPI();
  const adminUser = res.data.adminUser;
  return (
    <>
      {adminUser ? (
        <MainBaseLayout adminUser={adminUser}>{children}</MainBaseLayout>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
