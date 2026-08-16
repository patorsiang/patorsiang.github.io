import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HeroMark } from "@/components/atoms/HeroMark";

const meta = {
  title: "Atoms/HeroMark",
  component: HeroMark,
} satisfies Meta<typeof HeroMark>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
