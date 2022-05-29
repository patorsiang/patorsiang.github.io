import { CSSProperties } from "react";

import { profileImage } from "@res/data";

import { Div, Span, Img, Introduction } from "./bubbleProfile.style";

const BgBubble = ({ sx }: { sx?: CSSProperties }) => (
  <Div sx={sx}>
    <Introduction className="absolute top-3">
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

export default BgBubble;
