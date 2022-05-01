import { Link } from "@mui/material";

const BgBubble = ({}: {}) => (
  <Link
    component="button"
    variant="h3"
    onClick={() => {
      console.info("I'm a button.");
    }}
    fontWeight="700"
    color="primary"
    underline="none"
  >
    {"<NT/>"}
  </Link>
);

export default BgBubble;
