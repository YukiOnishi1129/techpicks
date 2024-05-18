import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { EditPlatformSheet } from "./EditPlatformSheet";

const meta = {
  title: "feature/platform/EditPlatformSheet",
  component: EditPlatformSheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {},
} satisfies Meta<typeof EditPlatformSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
