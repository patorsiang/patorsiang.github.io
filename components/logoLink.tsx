import { CSSProperties } from "react";
import { Link } from "@mui/material";

import { logEvent } from "@utility/ga";

const LogoLink = ({ sx }: { sx?: CSSProperties }) => (
  <Link
    variant="h3"
    fontWeight="700"
    color="primary"
    underline="none"
    href="/"
    sx={sx}
    onClick={() => {
      logEvent({
        event: `click-logo`,
      });
    }}
  >
    {"<NT/>"}
  </Link>
);

export default LogoLink;
