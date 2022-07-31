import { Hidden } from "@mui/material";
import { Head } from "./header.style";

import SMUpView from "./smUpView";
import SMDownView from "./smDownView";

const Header = ({
  isDark,
  setIsDark,
}: {
  isDark: boolean;
  setIsDark: (isLight: boolean) => void;
}) => (
  <Head>
    <Hidden smDown>
      <SMUpView isDark={isDark} setIsDark={setIsDark} />
    </Hidden>
    <Hidden smUp>
      <SMDownView isDark={isDark} setIsDark={setIsDark} />
    </Hidden>
  </Head>
);

export default Header;
