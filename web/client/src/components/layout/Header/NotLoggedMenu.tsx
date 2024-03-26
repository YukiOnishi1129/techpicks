"use client";

import { Group, Button } from "@mantine/core";
import Link from "next/link";

export const NotLoggedMenu = () => {
  return (
    <Group visibleFrom="sm">
      <Link href="/login">
        <Button variant="default">Login</Button>
      </Link>
      <Button variant="white">Signup</Button>
    </Group>
  );
};
