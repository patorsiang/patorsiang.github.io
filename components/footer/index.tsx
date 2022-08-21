import { useEffect, useRef, useState } from "react";
import { Hidden } from "@mui/material";

import { Foot } from "./footer.style";
import SMUpView from "./smUpView";
import SMDownView from "./smDownView";
import RightTag from "./rightTag";

const Footer = () => {
  const footRef = useRef<HTMLDivElement>(null);
  const [marginTop, setMarginTop] = useState(false);
  useEffect(() => {
    setMarginTop(window?.innerHeight > 1000);
  });

  return (
    <Foot ref={footRef} top={marginTop}>
      <Hidden smDown>
        <SMUpView />
      </Hidden>
      <Hidden smUp>
        <SMDownView />
      </Hidden>
      <RightTag />
    </Foot>
  );
};

export default Footer;
