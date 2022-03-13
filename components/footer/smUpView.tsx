import { Grid, Link } from "@mui/material";

import { Item } from "@components/util";

import { Social, email } from "@res/data";

const SMUpView = () => (
  <Grid container sx={{ bgcolor: "primary.contrastText" }}>
    <Grid item xs={3}>
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
    <Grid item xs={8}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {Social.map((item, i) => (
          <Grid item xs={1} key={item.name}>
            <Item>
              <Link
                variant="body2"
                underline="none"
                color="secondary.contrastText"
                href={item.url}
                target={item.target}
              >
                <item.icon />
              </Link>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);

export default SMUpView;
