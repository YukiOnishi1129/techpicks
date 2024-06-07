import { CreatePlatformDialog } from "./CreatePlatformDialog";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "feature/platform/CreatePlatformDialog",
  component: CreatePlatformDialog,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CreatePlatformDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
