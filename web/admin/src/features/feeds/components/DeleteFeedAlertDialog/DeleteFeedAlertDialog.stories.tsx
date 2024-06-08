import { Meta, StoryObj } from "@storybook/react";

import { DeleteFeedAlertDialog } from "./DeleteFeedAlertDialog";

const meta = {
  title: "feature/feed/DeleteFeedAlertDialog",
  component: DeleteFeedAlertDialog,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
  args: {
    feedId: "feed_id_1",
    feedTitle: "Pedro Duarte",
  },
} satisfies Meta<typeof DeleteFeedAlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
