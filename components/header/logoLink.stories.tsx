import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import LogoLink from "./logoLink";

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Logo Link",
  component: LogoLink,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof LogoLink>;

//👇 We create a “template” of how args map to rendering
const LogoLinkTemp: ComponentStory<typeof LogoLink> = (args) => (
  <LogoLink {...args} />
);

export const LogoLinkStory = LogoLinkTemp.bind({});

LogoLinkStory.args = { sx: { margin: "8px 16px" } };

LogoLinkStory.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const logoButton = await canvas.getByRole("button", { name: /<NT\/>/i });
  await userEvent.click(logoButton);
};
