import { CSSProperties } from "react";
import { Link } from "@mui/material";

const LogoLink = ({ sx }: { sx?: CSSProperties }) => (
  <Link
    variant="h3"
    fontWeight="700"
    color="primary"
    underline="none"
    href="/"
    sx={sx}
  >
    {"<NT/>"}
  </Link>
);

export default LogoLink;
