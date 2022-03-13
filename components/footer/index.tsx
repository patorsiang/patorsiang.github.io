import { Hidden } from "@mui/material";

import SMUpView from "./smUpView";
import SMDownView from "./smDownView";
import RightTag from "./rightTag";

const Footer = () => (
  <footer>
    <Hidden smDown>
      <SMUpView />
    </Hidden>
    <Hidden smUp>
      <SMDownView />
    </Hidden>
    <RightTag />
  </footer>
);

export default Footer;
