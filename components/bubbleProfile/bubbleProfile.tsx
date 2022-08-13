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
        <picture>
          <source type="image/png" srcSet={`${profileImage}.png`} />
          <source type="image/jpg" srcSet={`${profileImage}.jpg`} />
          <source type="image/webp" srcSet={`${profileImage}.webp`} />
          <Img
            src={`${profileImage}.png`}
            alt="Napatchol Thaipanich"
            loading="lazy"
            width="100%"
            height="100%"
            property="og:image"
          />
        </picture>
      </Overall>
    </FullScreen>
    <AboutMe />
  </>
);
