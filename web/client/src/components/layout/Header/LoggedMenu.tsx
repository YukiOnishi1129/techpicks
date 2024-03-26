"use client";
import { Button, Group } from "@mantine/core";
import { signOut } from "next-auth/react";

export const LoggedMenu = () => {
  return (
    <Group visibleFrom="sm">
      <Button variant="white" onClick={() => signOut()}>
        Logout
      </Button>
    </Group>
  );
};
