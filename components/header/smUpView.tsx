import { Stack, Link } from "@mui/material";
import NextLink from "next/link";

import LogoLink from "@components/header/logoLink";

import { logEvent } from "@utility/ga";

import { MaterialUISwitch } from "./header.style";

const SMUpViewHeader = ({
  isDark,
  setIsDark,
}: {
  isDark: boolean;
  setIsDark: (isLight: boolean) => void;
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mx: 2 }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={6}
      >
        <NextLink href="/">
          <Link
            component="button"
            variant="body2"
            underline="none"
            color="secondary.contrastText"
            onClick={() => {
              logEvent({
                event: `desktop-click-Home`,
              });
            }}
          >
            Home
          </Link>
        </NextLink>
        <NextLink href="/#about-me">
          <Link
            component="button"
            variant="body2"
            underline="none"
            color="secondary.contrastText"
            onClick={() => {
              logEvent({
                event: `desktop-click-About`,
              });
            }}
          >
            About
          </Link>
        </NextLink>
        <NextLink href="/experience">
          <Link
            component="button"
            variant="body2"
            underline="none"
            color="secondary.contrastText"
            onClick={() => {
              logEvent({
                event: `desktop-click-Experience`,
              });
            }}
          >
            Experience
          </Link>
        </NextLink>
      </Stack>
      <LogoLink />
      <Stack direction="row" spacing={6}>
        <Link
          href="https://drive.google.com/file/d/1-NB3iE8rxRxrTH5i_o6LOty5kdd0QKPs/view?usp=sharing"
          target="_blank"
        >
          <Link
            variant="body2"
            component="button"
            color="secondary.contrastText"
            fontWeight="700"
            onClick={() => {
              logEvent({
                event: `desktop-click-Download CV`,
              });
            }}
          >
            Download CV
          </Link>
        </Link>
        <MaterialUISwitch checked={isDark} onClick={() => setIsDark(!isDark)} />
      </Stack>
    </Stack>
  );
};

export default SMUpViewHeader;
