"use client";

import { Group, Burger, Loader } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

import { LoggedMenu } from "./LoggedMenu";
import { NotLoggedMenu } from "./NotLoggedMenu";

type HeaderProps = {
  desktopOpened: boolean;
  toggleDesktop: () => void;
};

export function Header({ desktopOpened, toggleDesktop }: HeaderProps) {
  const { data: session, status } = useSession();
  return (
    <Group h="100%" px="md">
      <Burger
        opened={desktopOpened}
        onClick={toggleDesktop}
        hiddenFrom="sm"
        size="sm"
      />
      <MantineLogo size={30} />
      <Navigation session={session} status={status} />
    </Group>
  );
}

type NavigationProps = {
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
};

const Navigation = ({ session, status }: NavigationProps) => {
  if (status === "loading") {
    return <Loader />;
  }

  return <>{session ? <LoggedMenu /> : <NotLoggedMenu />}</>;
};
