"use client";
import * as React from "react";
import { GoPlus } from "react-icons/go";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const labels = [
  "feature",
  "bug",
  "enhancement",
  "documentation",
  "design",
  "question",
  "maintenance",
];

export function FollowDropdownMenu() {
  const [label, setLabel] = React.useState("feature");
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {"FOLLOW"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <>
          <DropdownMenuLabel>Assign to...</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Set due date...</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-emerald-500">
            <Button variant="ghost" size="sm" className="p-0">
              <GoPlus />
              NEW FEED FOLDER
            </Button>
          </DropdownMenuLabel>
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
