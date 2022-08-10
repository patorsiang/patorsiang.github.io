import { Grid, Link } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { Item } from "@components/util";

import { Social, email } from "@res/data";

import { logEvent } from "@utility/ga";

const SMUpView = () => (
  <Grid container sx={{ bgcolor: "primary.contrastText" }}>
    <Grid item xs={12}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={1}>
          <Item>
            <Link
              variant="body2"
              underline="none"
              color="secondary.contrastText"
              href={`mailto:${email}`}
              onClick={() => {
                logEvent({
                  event: `desktop-click-email`,
                });
              }}
            >
              <MailOutlineIcon />
            </Link>
          </Item>
        </Grid>
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
                    event: `desktop-click-${item.name}`,
                  });
                }}
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
