"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { GoPlus } from "react-icons/go";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const CreateMyFeedListDropdownMenu = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-0 text-emerald-500">
          <GoPlus />
          NEW FEED FOLDER
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>New </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <>
          <DropdownMenuLabel>Title</DropdownMenuLabel>
          <Input />
          <DropdownMenuLabel>Description</DropdownMenuLabel>
          <Input />
          <DropdownMenuLabel>
            <Button variant="ghost" size="sm" className="p-0 text-emerald-500">
              <GoPlus />
              NEW FEED FOLDER
            </Button>
          </DropdownMenuLabel>
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
