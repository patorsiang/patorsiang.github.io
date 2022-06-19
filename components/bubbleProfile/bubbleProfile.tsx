import { profileImage } from "@res/data";

import {
  FullScreen,
  Overall,
  Span,
  Img,
  Introduction,
} from "./bubbleProfile.style";

export const BubbleProfile = () => (
  <FullScreen>
    <Overall>
      <Introduction>
        สวัสดีค่ะ <br />
        Hi, I&#8217;m&nbsp;
        <Span>
          Napatchol <br />
          Thaipanich
        </Span>
      </Introduction>
      <Img src={profileImage} />
    </Overall>
  </FullScreen>
);
