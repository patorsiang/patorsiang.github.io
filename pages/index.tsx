import type { NextPage } from "next";
import { BubbleProfile } from "@components/bubbleProfile";
import { AboutMe } from "@components/aboutMe";

const Home: NextPage = () => {
  return (
    <>
      <BubbleProfile />
      <AboutMe />
    </>
  );
};

export default Home;
