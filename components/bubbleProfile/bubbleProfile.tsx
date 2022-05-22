import { CSSProperties } from "react";
import { Typography } from "@mui/material";

import { profileImage } from "@res/data";

import { Div } from "./bubbleProfile.style";

const BgBubble = ({ sx }: { sx?: CSSProperties }) => (
  <Div className="relative" sx={sx}>
    <Typography variant="h1" component="h2">
      สวัสดีค่ะ Hi, I&#8217;m Napatchol Thaipanich
    </Typography>
    <img src={profileImage} />
  </Div>
);

export default BgBubble;
