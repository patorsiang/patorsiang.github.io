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
    if (
      footRef.current &&
      window?.innerHeight - footRef?.current?.getBoundingClientRect()?.bottom >
        0
    ) {
      setMarginTop(true);
    }
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
