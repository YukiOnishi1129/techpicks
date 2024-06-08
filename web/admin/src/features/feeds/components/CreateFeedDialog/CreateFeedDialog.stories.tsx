import { CreateFeedDialog } from "./CreateFeedDialog";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "feature/feed/CreateFeedDialog",
  component: CreateFeedDialog,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CreateFeedDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
