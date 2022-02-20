import type { NextPage } from "next";

import { experimentalStyled as styled } from "@mui/material/styles";
import { Grid, Box, Link } from "@mui/material";

const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  height: "100%",
  lineHeight: "54px",
}));

const Home: NextPage = () => {
  return (
    <>
      <header>
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
          <Grid item xs={2} />
          <Grid item xs={1}>
            <Item>
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
            </Item>
          </Grid>
        </Grid>
      </header>
      <footer>
        <Grid
          container
          sx={{ bgcolor: "primary.contrastText", textAlign: "center" }}
        >
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
                napatchol.tha@gmail.com
              </Link>
            </Item>
          </Grid>
          <Grid item xs={11}></Grid>
        </Grid>
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
