import { Grid, Link } from "@mui/material";
import NextLink from "next/link";

import { Item, GridRight, ItemRight } from "@components/util";
import LogoLink from "@components/header/logoLink";

const SMUpViewHeader = () => {
  return (
    <Grid container>
      <Grid item xs={1}>
        <Item>
          <NextLink href="/">
            <Link
              component="button"
              variant="body2"
              underline="none"
              color="secondary.contrastText"
            >
              Home
            </Link>
          </NextLink>
        </Item>
      </Grid>
      <Grid item xs={1}>
        <Item>
          <NextLink href="#about-me">
            <Link
              component="button"
              variant="body2"
              underline="none"
              color="secondary.contrastText"
            >
              About
            </Link>
          </NextLink>
        </Item>
      </Grid>
      <Grid item xs={1}>
        <Item>
          <NextLink href="/experience">
            <Link
              component="button"
              variant="body2"
              underline="none"
              color="secondary.contrastText"
            >
              Experience
            </Link>
          </NextLink>
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
