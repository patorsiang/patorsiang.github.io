import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import BubbleProfile from "./bubbleProfile";

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Bubble Profile Image",
  component: BubbleProfile,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof BubbleProfile>;

//👇 We create a “template” of how args map to rendering
const BubbleProfileTemp: ComponentStory<typeof BubbleProfile> = (args) => (
  <BubbleProfile {...args} />
);

export const BubbleProfileStory = BubbleProfileTemp.bind({});

BubbleProfileStory.args = { sx: { margin: "8px 16px", fontFamily: "Mali" } };

BubbleProfileStory.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const logoButton = await canvas.getByRole("button", { name: /<NT\/>/i });
  await userEvent.click(logoButton);
};
