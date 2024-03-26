import { Group, Burger, Button } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { FC } from "react";

import { authOptions } from "@/lib/auth";

type HeaderProps = {
  desktopOpened: boolean;
  toggleDesktop: () => void;
};

export const Header: FC<HeaderProps> = async ({
  desktopOpened,
  toggleDesktop,
}: HeaderProps) => {
  const session = await getServerSession(authOptions);
  return (
    <Group h="100%" px="md">
      <Burger
        opened={desktopOpened}
        onClick={toggleDesktop}
        hiddenFrom="sm"
        size="sm"
      />
      <MantineLogo size={30} />
      {session ? (
        <Group visibleFrom="sm">
          <Button variant="white">Logout</Button>
        </Group>
      ) : (
        <Group visibleFrom="sm">
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
          <Button variant="white">Signup</Button>
        </Group>
      )}
    </Group>
  );
};
