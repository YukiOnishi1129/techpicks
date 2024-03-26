"use client";
import { AppShell, Burger, Container, Group, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import { ReactNode } from "react";

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            hiddenFrom="sm"
            size="sm"
          />
          <MantineLogo size={30} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Container className="mt-16">{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
};
