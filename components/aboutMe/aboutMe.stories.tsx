import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { AboutMe } from "./aboutMe";

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "aboutMe",
  component: AboutMe,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof AboutMe>;

//👇 We create a “template” of how args map to rendering
const AboutMeTemp: ComponentStory<typeof AboutMe> = () => <AboutMe />;

export const AboutMeStory = AboutMeTemp.bind({});

AboutMeStory.args = {};

AboutMeStory.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const logoButton = await canvas.getByRole("button", { name: /<NT\/>/i });
  await userEvent.click(logoButton);
};
