import { Hidden } from "@mui/material";

import SMUpView from "./smUpView";
import SMDownView from "./smDownView";

const Header = () => (
  <header>
    <Hidden smDown>
      <SMUpView />
    </Hidden>
    <Hidden smUp>
      <SMDownView />
    </Hidden>
  </header>
);

export default Header;
