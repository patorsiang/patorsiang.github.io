import { useRouter } from "next/router";
import { Grid, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import { WidgetsRounded, MenuRounded } from "@mui/icons-material";

import { Item } from "@components/util";
import LogoLink from "@components/header/logoLink";

import { actions } from "@res/data";
import { logEvent } from "@utility/ga";

import { MaterialUISwitch } from "./header.style";

const SMDownView = ({
  isDark,
  setIsDark,
}: {
  isDark: boolean;
  setIsDark: (isLight: boolean) => void;
}) => {
  const router = useRouter();
  return (
    <>
      <Grid container>
        <Grid item xs={1}>
          <Item>
            <LogoLink sx={{ margin: "8px 16px" }} />
          </Item>
        </Grid>
      </Grid>
      <MaterialUISwitch
        sx={{
          position: "absolute",
          top: 28,
          right: 75,
        }}
        checked={isDark}
        onClick={() => {
          logEvent({
            event: `mobile_head-switch_from_${isDark ? "dark" : "light"}`,
          });

          setIsDark(!isDark);
        }}
      />
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
            onClick={() => {
              logEvent({
                event: `mobile_head-click-${action.name}`,
              });

              if (action?.externalURL) {
                window.open(action.externalURL, action?.target);
              }

              if (action?.url) {
                router.push(action.url);
              }
            }}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default SMDownView;
