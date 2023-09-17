"use client";
import { createContext, useContext } from "react";
import { IconButton, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Brightness4, Brightness7 } from "@mui/icons-material";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export function Header() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        bgcolor: "background.default",
        color: "text.light",
        justifyContent: "space-between",
        p: 3,
      }}
    >
      <Typography
        variant="h6"
        component="h1"
        my="auto"
        fontWeight="bold"
        color="text.primary"
      >
        {"<NT/>"}
      </Typography>
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );
}
