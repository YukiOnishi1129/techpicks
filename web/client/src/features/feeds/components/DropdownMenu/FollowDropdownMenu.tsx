"use client";
import * as React from "react";

import { CreateMyFeedListDialog } from "@/features/myFeedLists/components/Dialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FollowDropdownMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-emerald-500 font-bold text-emerald-500 hover:text-emerald-600"
        >
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
          <DropdownMenuLabel>
            <CreateMyFeedListDialog />
          </DropdownMenuLabel>
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
