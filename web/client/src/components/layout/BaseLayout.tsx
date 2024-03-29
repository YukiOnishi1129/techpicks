"use client";
import { ReactNode } from "react";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Container } from "postcss";

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
