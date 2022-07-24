import { profileImage } from "@res/data";
import { AboutMe } from "@components/aboutMe";
import {
  FullScreen,
  Overall,
  Span,
  Img,
  Introduction,
  CurrentPosition,
} from "./bubbleProfile.style";

export const BubbleProfile = () => (
  <>
    <FullScreen>
      <Overall>
        <Introduction>
          สวัสดีค่ะ <br />
          Hi, I&#8217;m&nbsp;
          <Span>
            Napatchol <br />
            Thaipanich
          </Span>
          <CurrentPosition>Software Engineer</CurrentPosition>
        </Introduction>
        <Img src={profileImage} alt="Napatchol Thaipanich" loading="lazy" />
      </Overall>
    </FullScreen>
    <AboutMe />
  </>
);
