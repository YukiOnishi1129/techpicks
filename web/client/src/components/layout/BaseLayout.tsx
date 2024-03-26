"use client";
import { AppShell, Container, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";

import { Header } from "./Header";

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
        <Header desktopOpened={desktopOpened} toggleDesktop={toggleDesktop} />
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
