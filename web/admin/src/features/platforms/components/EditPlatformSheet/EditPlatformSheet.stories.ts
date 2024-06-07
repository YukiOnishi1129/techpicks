import { EditPlatformSheet } from "./EditPlatformSheet";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "feature/platform/EditPlatformSheet",
  component: EditPlatformSheet,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
  args: {
    platform: {
      id: "1",
      name: "Pedro Duarte",
      siteUrl: "https://peduarte.com",
      platformSiteType: 1,
      faviconUrl: "https://peduarte.com/favicon.ico",
      isEng: true,
      feeds: [],
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  },
} satisfies Meta<typeof EditPlatformSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
