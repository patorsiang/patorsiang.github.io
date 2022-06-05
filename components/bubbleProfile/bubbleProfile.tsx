import { profileImage } from "@res/data";

import { Div, Span, Img, Introduction } from "./bubbleProfile.style";

export const BubbleProfile = () => (
  <Div>
    <Introduction>
      สวัสดีค่ะ <br />
      Hi, I&#8217;m&nbsp;
      <Span>
        Napatchol <br />
        Thaipanich
      </Span>
    </Introduction>
    <Img src={profileImage} />
  </Div>
);
