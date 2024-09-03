import { ReactNode } from "react";

import { getUser } from "@/features/auth/actions/user";

import { LoggedBaseLayout } from "./LoggedBaseLayout";
import { NotLoggedBaseLayout } from "./NotLoggedBaseLayout";

export const BaseLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser();
  return (
    <>
      {user ? (
        <LoggedBaseLayout user={user}>{children}</LoggedBaseLayout>
      ) : (
        <NotLoggedBaseLayout>{children}</NotLoggedBaseLayout>
      )}
    </>
  );
};
