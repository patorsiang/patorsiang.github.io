import { CSSProperties } from "react";
import { Link } from "@mui/material";

const LogoLink = ({ sx }: { sx?: CSSProperties }) => (
  <Link
    component="button"
    variant="h3"
    onClick={() => {
      console.info("I'm a button.");
    }}
    fontWeight="700"
    color="primary"
    underline="none"
    sx={sx}
  >
    {"<NT/>"}
  </Link>
);

export default LogoLink;
