import { Grid } from "@mui/material";

const RightTag = () => (
  <Grid
    container
    sx={{
      bgcolor: "primary.contrastText",
      fontWeight: "700",
    }}
  >
    <Grid
      item
      xs={12}
      sx={{
        textAlign: "center",
        overflowWrap: "break-word",
        padding: 1,
      }}
    >
      Created by {"<Napatchol Thaipanich/> "}&copy;
      {" " + new Date().getFullYear()}
    </Grid>
  </Grid>
);

export default RightTag;
