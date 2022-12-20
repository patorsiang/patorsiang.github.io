import { Stack, Link } from "@mui/material";
import NextLink from "next/link";

import LogoLink from "@components/header/logoLink";

import { logEvent } from "@utility/ga";
import { actions } from "@res/data";

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
        {actions.map(
          (action) =>
            action?.url && (
              <NextLink href={action.url} key={action.name}>
                <Link
                  component="button"
                  variant="body2"
                  underline="none"
                  color="secondary.contrastText"
                  onClick={() => {
                    logEvent({
                      event: `desktop_head-click-${action.name}`,
                    });
                  }}
                >
                  {action.name}
                </Link>
              </NextLink>
            )
        )}
      </Stack>
      <LogoLink />
      <Stack direction="row" spacing={6}>
        <Link href={actions[3].externalURL} target="_blank">
          <Link
            variant="body2"
            component="button"
            color="secondary.contrastText"
            fontWeight="700"
            onClick={() => {
              logEvent({
                event: `desktop_head-click-${actions[3].name}`,
              });
            }}
          >
            {actions[3].name}
          </Link>
        </Link>

        <MaterialUISwitch
          checked={isDark}
          onClick={() => {
            setIsDark(!isDark);
            logEvent({
              event: `desktop_head-switch_from_${isDark ? "dark" : "light"}`,
            });
          }}
          inputProps={{ "aria-label": "dask or light" }}
        />
      </Stack>
    </Stack>
  );
};

export default SMUpViewHeader;
