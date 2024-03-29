"use client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

import { LoggedMenu } from "./LoggedMenu";
import { NotLoggedMenu } from "./NotLoggedMenu";

export function Header() {
  const { data: session, status } = useSession();
  return (
    <div>
      <Navigation session={session} status={status} />
    </div>
  );
}

type NavigationProps = {
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
};

const Navigation = ({ session, status }: NavigationProps) => {
  if (status === "loading") {
    return <p>Loading..</p>;
  }

  return <>{session ? <LoggedMenu /> : <NotLoggedMenu />}</>;
};
