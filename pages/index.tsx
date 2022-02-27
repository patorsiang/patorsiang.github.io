import type { NextPage } from "next";

import { experimentalStyled as styled } from "@mui/material/styles";
import { Grid, Box, Link, Hidden } from "@mui/material";
import {
  FacebookOutlined,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
  GitHub,
  SmartToyOutlined,
} from "@mui/icons-material";

const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  height: "100%",
  lineHeight: "54px",
}));

const GridRight = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    paddingRight: theme.spacing(1),
  },
  [theme.breakpoints.up("md")]: {
    paddingRight: theme.spacing(6),
  },
  justifyContent: "right",
  textAlign: "right",
}));

const ItemRight = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "right",
  height: "100%",
  lineHeight: "54px",
  width: "100%",
}));

const Social = [
  {
    icon: FacebookOutlined,
    name: "Facebook",
    url: "https://www.facebook.com/napatchol.thaipanich",
    target: "_blank",
  },
  {
    icon: Instagram,
    name: "Instagram",
    url: "https://www.instagram.com/patorseing/",
    target: "_blank",
  },
  {
    icon: LinkedIn,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/napatchol-thaipanich/",
    target: "_blank",
  },
  {
    icon: Twitter,
    name: "Twitter",
    url: "https://twitter.com/SeingOrPat",
    target: "_blank",
  },
  {
    icon: YouTube,
    name: "YouTube",
    url: "https://www.youtube.com/channel/UCaTBr-FOe6pggqCjy47zfcA",
    target: "_blank",
  },
  {
    icon: GitHub,
    name: "GitHub",
    url: "https://github.com/patorseing",
    target: "_blank",
  },
  {
    icon: SmartToyOutlined,
    name: "Line",
    url: "#",
    target: "",
  },
];

const Home: NextPage = () => {
  return (
    <>
      <header>
        <Hidden smDown>
          <Grid container sx={{ bgcolor: "secondary.main" }}>
            <Grid item xs={1}>
              <Item>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    console.info("I'm a button.");
                  }}
                  underline="none"
                  color="secondary.contrastText"
                >
                  Home
                </Link>
              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    console.info("I'm a button.");
                  }}
                  underline="none"
                  color="secondary.contrastText"
                >
                  About
                </Link>
              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    console.info("I'm a button.");
                  }}
                  underline="none"
                  color="secondary.contrastText"
                >
                  Experience
                </Link>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
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
              </Item>
            </Grid>
            <GridRight
              item
              xs={3}
              container
              direction="row"
              justifyContent="right"
              alignItems="right"
            >
              <ItemRight>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    console.info("I'm a button.");
                  }}
                  color="secondary.contrastText"
                  fontWeight="700"
                >
                  Download CV
                </Link>
              </ItemRight>
            </GridRight>
          </Grid>
        </Hidden>
      </header>
      <footer>
        <Hidden smDown>
          <Grid container sx={{ bgcolor: "primary.contrastText" }}>
            <Grid item xs={3}>
              <Item>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    console.info("I'm a button.");
                  }}
                  underline="none"
                  color="secondary.contrastText"
                >
                  napatchol.tha@gmail.com
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
        </Hidden>
        <Grid
          container
          sx={{
            bgcolor: "primary.contrastText",
            fontWeight: "700",
          }}
        >
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            Created by {"<Napatchol Thaipanich/> "}&copy;
            {" " + new Date().getFullYear()}
          </Grid>
        </Grid>
      </footer>
    </>
  );
};

export default Home;
