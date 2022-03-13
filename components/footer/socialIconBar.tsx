import { Grid, Link } from "@mui/material";

import { Item } from "@components/util";
import SocialIconBar from "@components/footer/socialIconBar";

import { Social, email } from "@res/data";

const SMUpViewHeader = () => (
  <Grid container sx={{ bgcolor: "primary.contrastText" }}>
    <Grid item xs={12}>
      <Item>
        <Link
          variant="body2"
          underline="none"
          color="secondary.contrastText"
          href={`mailto:${email}`}
        >
          {email}
        </Link>
      </Item>
    </Grid>
    <Grid item xs={12}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {Social.map((item) => (
          <SocialIconBar key={item.name} {...item} />
        ))}
      </Grid>
    </Grid>
  </Grid>
);

export default SMUpViewHeader;
