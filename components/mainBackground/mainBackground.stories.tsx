import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { BubbleProfile } from "@components/bubbleProfile";
import { MainBackground } from "./mainBackground";

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Background",
  component: MainBackground,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof MainBackground>;

//👇 We create a “template” of how args map to rendering
const MainBackgroundTemp: ComponentStory<typeof MainBackground> = () => (
  <MainBackground>
    <BubbleProfile />
  </MainBackground>
);

export const BubbleProfileStory = MainBackgroundTemp.bind({});

BubbleProfileStory.args = {};

BubbleProfileStory.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const logoButton = await canvas.getByRole("button", { name: /<NT\/>/i });
  await userEvent.click(logoButton);
};
