import { Grid, Link } from "@mui/material";

import { Item } from "@components/util";

import { email, Social } from "@res/data";

import { logEvent } from "@utility/ga";

const SMDownView = () => (
  <Grid container sx={{ bgcolor: "primary.contrastText" }}>
    <Grid item xs={12}>
      <Item>
        <Link
          variant="body2"
          underline="none"
          color="secondary.contrastText"
          href={`mailto:${email}`}
          aria-label="email"
          onClick={() => {
            logEvent({
              event: `mobile_footer-click-email`,
            });
          }}
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
          <Grid item xs={1} key={item.name}>
            <Item>
              <Link
                variant="body2"
                underline="none"
                color="secondary.contrastText"
                href={item.url}
                target={item.target}
                onClick={() => {
                  logEvent({
                    event: `mobile_footer-click-${item.name}`,
                  });
                }}
                aria-label={item.name}
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

export default SMDownView;
