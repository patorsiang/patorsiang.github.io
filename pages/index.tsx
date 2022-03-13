import type { NextPage } from "next";

import { experimentalStyled as styled } from "@mui/material/styles";
import {
  Grid,
  Box,
  Link,
  Hidden,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";
import {
  FacebookOutlined,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
  GitHub,
  SmartToyOutlined,
  HomeRounded,
  InfoRounded,
  WorkRounded,
  FileDownloadRounded,
  WidgetsRounded,
  MenuRounded,
} from "@mui/icons-material";

import LogoLink from "@/components/logoLink";

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

const email = "napatchol.tha@gmail.com";

const actions = [
  { icon: <HomeRounded />, name: "Home" },
  { icon: <InfoRounded />, name: "About" },
  { icon: <WorkRounded />, name: "Experience" },
  { icon: <FileDownloadRounded />, name: "Download_CV" },
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
                <LogoLink />
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
        <Hidden smUp>
          <Box
            sx={{
              height: 320,
              transform: "translateZ(0px)",
              flexGrow: 1,
              backgroundColor: "secondary.main",
            }}
          >
            <Grid container sx={{ bgcolor: "secondary.main" }}>
              <Grid item xs={1}>
                <Item>
                  <LogoLink sx={{ margin: "8px 16px" }} />
                </Item>
              </Grid>
            </Grid>
            <SpeedDial
              ariaLabel="menu"
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
              }}
              icon={
                <SpeedDialIcon
                  openIcon={<WidgetsRounded />}
                  icon={<MenuRounded />}
                  color="primary"
                  aria-label="add"
                />
              }
              direction="down"
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  tooltipOpen
                />
              ))}
            </SpeedDial>
          </Box>
        </Hidden>
      </header>
      <footer>
        <Hidden smDown>
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
        </Hidden>
        <Hidden smUp>
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
      </footer>
    </>
  );
};

export default Home;
