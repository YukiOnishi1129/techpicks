import { Meta, StoryObj } from "@storybook/react";

import { DeletePlatformAlertDialog } from "./DeletePlatformAlertDialog";

const meta = {
  title: "feature/platform/DeletePlatformAlertDialog",
  component: DeletePlatformAlertDialog,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
  args: {
    platformId: "platform_id_1",
    platformTitle: "Pedro Duarte",
  },
} satisfies Meta<typeof DeletePlatformAlertDialog>;

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
