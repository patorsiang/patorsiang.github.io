import { CSSProperties } from "react";
import NextLink from "next/link";
import { Link } from "@mui/material";

const LogoLink = ({ sx }: { sx?: CSSProperties }) => (
  <NextLink href="/" passHref>
    <Link
      component="button"
      variant="h3"
      fontWeight="700"
      color="primary"
      underline="none"
      sx={sx}
    >
      {"<NT/>"}
    </Link>
  </NextLink>
);

export default LogoLink;
