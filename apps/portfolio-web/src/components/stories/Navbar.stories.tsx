import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Navbar } from "@/components/organisms/Navbar";

const meta = {
  title: "Organisms/Navbar",
  component: Navbar,
  args: {
    handle: "@patorsiang",
    name: "Napatchol Thaipanich",
    role: "Full-Stack Developer",
    headline:
      "I build practical software across frontend, backend, cloud, data, and security-focused product workflows.",
    links: [
      { label: "GitHub", href: "https://github.com/patorsiang", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com", external: true },
      { label: "View CV", href: "/en/cv/fullstack-engineer" },
      { label: "Email", href: "mailto:napatchol.tha@gmail.com", variant: "primary" },
    ],
  },
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
