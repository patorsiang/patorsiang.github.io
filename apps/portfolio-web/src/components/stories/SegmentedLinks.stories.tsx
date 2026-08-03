import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SegmentedLinks } from "@/components/molecules/SegmentedLinks";

const meta = {
  title: "Molecules/SegmentedLinks",
  component: SegmentedLinks,
  args: {
    label: "CV variant",
    items: [
      {
        id: "fullstack",
        href: "/en/cv/fullstack-engineer",
        label: "Full-Stack",
        fullLabel: "Full-Stack Engineer",
        active: true,
      },
      {
        id: "ai-ml",
        href: "/en/cv/ai-ml-engineer",
        label: "AI / ML",
        fullLabel: "AI / ML Engineer",
        active: false,
      },
      {
        id: "security",
        href: "/en/cv/security-engineer",
        label: "Security",
        fullLabel: "Security Engineer",
        active: false,
      },
    ],
  },
} satisfies Meta<typeof SegmentedLinks>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** How the CV toolbar renders it on mobile: full width, segments splitting evenly. */
export const FullWidth: Story = {
  args: {
    className: "w-full",
  },
};

export const TwoSegments: Story = {
  args: {
    label: "Language",
    items: [
      {
        id: "en",
        href: "/en/cv/fullstack-engineer",
        label: "EN",
        fullLabel: "English",
        active: true,
      },
      {
        id: "th",
        href: "/th/cv/fullstack-engineer",
        label: "TH",
        fullLabel: "Thai",
        active: false,
      },
    ],
  },
};
