import { Grid, Link } from "@mui/material";
import { useRouter } from "next/router";

import { Item, GridRight, ItemRight } from "@components/util";
import LogoLink from "@components/header/logoLink";

const SMUpViewHeader = () => {
  const router = useRouter();
  return (
    <Grid container sx={{ bgcolor: "secondary.main" }}>
      <Grid item xs={1}>
        <Item>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              router.push("/");
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
              router.push("/about");
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
  );
};

export default SMUpViewHeader;
