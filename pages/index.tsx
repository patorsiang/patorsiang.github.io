import type { NextPage } from "next";
import { BubbleProfile } from "@components/bubbleProfile";
import { MainBackground } from "@components/mainBackground";

const Home: NextPage = () => {
  return (
    <MainBackground>
      <BubbleProfile />
    </MainBackground>
  );
};

export default Home;
