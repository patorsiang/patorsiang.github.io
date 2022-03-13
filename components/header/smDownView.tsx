import {
  Grid,
  Box,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";
import { WidgetsRounded, MenuRounded } from "@mui/icons-material";

import { Item } from "@components/util";
import LogoLink from "@components/header/logoLink";

import { actions } from "@res/data";

const SMDownViewHeader = () => (
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
);

export default SMDownViewHeader;
