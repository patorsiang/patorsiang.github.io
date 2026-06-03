import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProjectCard } from "@/components/molecules/ProjectCard";

const meta = {
  title: "Molecules/ProjectCard",
  component: ProjectCard,
  args: {
    title: "Portfolio Content Engine",
    subtitle: "Personal platform",
    summary:
      "A structured content and CV generation system for maintaining role-specific portfolio material.",
    technologies: ["TypeScript", "Next.js", "Bun", "Tailwind CSS"],
    meta: ["web", "launched"],
    links: [{ label: "Repository", href: "https://github.com/patorsiang/patorsiang.github.io" }],
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Card: Story = {};

export const Plain: Story = {
  args: {
    variant: "plain",
  },
};
