import { Hidden } from "@mui/material";
import { Head } from "./header.style";

import SMUpView from "./smUpView";
import SMDownView from "./smDownView";

const Header = () => (
  <Head>
    <Hidden smDown>
      <SMUpView />
    </Hidden>
    <Hidden smUp>
      <SMDownView />
    </Hidden>
  </Head>
);

export default Header;
