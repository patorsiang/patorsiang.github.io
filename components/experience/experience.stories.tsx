import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { Experience } from "./experience";

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Experience",
  component: Experience,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Experience>;

//👇 We create a “template” of how args map to rendering
const ExperienceTemp: ComponentStory<typeof Experience> = () => <Experience />;

export const ExperienceStory = ExperienceTemp.bind({});

ExperienceStory.args = {};

ExperienceStory.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const logoButton = await canvas.getByRole("button", { name: /<NT\/>/i });
  await userEvent.click(logoButton);
};
