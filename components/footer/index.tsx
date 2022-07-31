import { Hidden } from "@mui/material";

import { Foot } from "./footer.style";
import SMUpView from "./smUpView";
import SMDownView from "./smDownView";
import RightTag from "./rightTag";

const Footer = () => {
  return (
    <Foot>
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
